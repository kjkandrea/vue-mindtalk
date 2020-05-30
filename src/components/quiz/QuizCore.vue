<template>
  <main>
    <section class="quizzes-container col">
      <template v-if="executed">
        <h1>{{wpdata.title.rendered}}</h1>
        <start-content 
          v-if="intro"
          v-on:introEnd="start" 
          v-bind:content="wpdata.content.rendered" 
        />
        <template v-else>
          <range-counter 
            v-on:allQuestionFinish="result"
            v-bind:step="step"
            v-bind:stepRange="stepRange"
          />
          <quiz-questions 
            v-if="!finish" 
            v-on:pickedArrayPush="pickedArrayPush"
            v-on:nextQuestion="nextQuestion"
            v-bind:step="step"
            v-bind:items="wpdata.acf.quiz_section"
          />
          <result-content 
            class="result"
            v-else
            v-on:clickRestart="restart"
            v-on:clickReset="reset"
            v-bind:resultFinalArray="resultFinalArray"
          />
        </template>
      </template>
      <template v-else>
        <loading-placeholder-title />
        <loading-placeholder-grid />
      </template>
    </section>
    <aside class="col">
      <aside-quiz-rating-widget />
    </aside>
  </main>
</template>

<script>

function modeArray(array) { // 가장 많이 선택된 후보군 배열로 반환
  if (array.length == 0) return null;
  let modeMap = {}, maxCount = 1, modes = [];

  for (let i = 0; i < array.length; i++) {
    const el = array[i];

    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;

    if (modeMap[el] > maxCount) {
      modes = [el];
      maxCount = modeMap[el];
    } else if (modeMap[el] == maxCount) {
      modes.push(el);
      maxCount = modeMap[el];
    }
  }
  return modes;
}

import axios from 'axios'
import EventBus from '../../EventBus'

import QuizQuestions from './QuizQuestions'
import StartContent from './StartContent'
import ResultContent from './ResultContent'
import RangeCounter from './RangeCounter'
import AsideQuizRatingWidget from '../blocks/AsideQuizRatingWidget'
import LoadingPlaceholderTitle from '../loading-animation/LoadingPlaceholderTitle'
import LoadingPlaceholderGrid from '../loading-animation/LoadingPlaceholderGrid'

export default {
  name: 'QuizCore',
  components: {
    QuizQuestions,
    StartContent,
    ResultContent,
    RangeCounter,
    AsideQuizRatingWidget,
    LoadingPlaceholderTitle,
    LoadingPlaceholderGrid
  },
  props: {
    id : Number && String
  },
  data(){
    return {
      executed: false, // ajax 통신이 완료되었을때 true
      wpdata: null, // 외부(wordpress) 데이터 바인딩
      pickedArray: [], // 고른 항목에 대한 '값' 배열
      resultIndex: [], // picked에 push될 고른 항목에 대한 '값'
      resultFinalArray: [], // resultArray에서 정제된 결과 값 (가장 많이 선택된 값에 대한 결과 유형 에서만 사용)
      step: 1, // 문제가 몇 단계인지
      intro : true, // false 시 문제 풀기 시작
      finish: false // true 시 문제 풀기 끝
    }
  },
  computed: {
    stepRange: function() {
      if(this.wpdata.id !== undefined){
        const questions = this.wpdata.acf.quiz_section;
        return Object.keys(questions).length;
      }

      return false;
    },
    quizType: function() {
      return this.wpdata.acf.quiz_type;
    },
    resultArray: function() { // 퀴즈 유형에 따라 다른 키에서 데이터를 가져와 배열로 담음
      if(this.wpdata.id !== undefined){
        if(this.quizType === 'score'){
          return this.wpdata.acf.quiz_result_score.quiz_result_items;
        }else if(this.quizType === 'match'){
          return this.wpdata.acf.quiz_result_match.quiz_result_items;
        }
      }

      return false;
    },
  },
  methods: {
    result(){
      if(this.wpdata.acf.quiz_type === 'score'){
        this.scoreCalculator()
        this.quizFinish()
        return
      }else if(this.wpdata.acf.quiz_type === 'match'){
        this.matchCaculator()
        this.quizFinish()
        return
      }

      console.warn('무언가 잘못되었습니다! : method result error')
    },
    scoreCalculator() {
      const reducer = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);
      const sum = this.pickedArray.reduce(reducer); // 숫자형 배열의 총 합
      const resultLength = Object.keys(this.resultArray).length; // 결과 유형의 갯수

      //console.log(sum)

      for(let i = 0; i < resultLength; i++){
        const endResultRange = Number(this.resultArray[i].quiz_result_end_range)

        if(endResultRange >= sum){
          this.resultIndex.push(i);

          i = resultLength;
        }
      }

      this.resultFinalArrayPush();
    },
    matchCaculator(){ 
      // const testArr = ["a", "a", "b", "b", "c", "d"]
      const resultLength = Object.keys(this.resultArray).length;
      const mostPick = modeArray(this.pickedArray);
      
      if (mostPick.length === 1) { // 결과값이 한가지 일 때
        for(let i = 0; i < resultLength; i++){
          const resultMatchValue = this.resultArray[i].quiz_result_match_value;
          if(mostPick[0] === resultMatchValue){
            this.resultIndex.push(i);
          }
        }
      }else if (mostPick.length >= 2) { // 결과값이 복수 일 때
        // const randomPick = mostPick[Math.floor(Math.random() * (mostPick.length - 1))]
        for(let i = 0; i < mostPick.length; i++ ) {
          for(let j = 0; j < resultLength; j++){
            const resultMatchValue = this.resultArray[j].quiz_result_match_value
            if(mostPick[i] === resultMatchValue){
              this.resultIndex.push(j);
            }
          }
        }
      }

      this.resultFinalArrayPush();
    },
    resultFinalArrayPush(){
      if(this.quizType === 'score'){
        this.resultFinalArray.push(this.resultArray[this.resultIndex[0]])
      }else if(this.quizType === 'match'){
        for(let i = 0; i < this.resultIndex.length; i++){
          this.resultFinalArray.push(this.resultArray[this.resultIndex[i]])
        }
      }
    },
    nextQuestion(){
      this.step++
    },
    pickedArrayPush(v){
      this.pickedArray.push(v);
    },
    start(){
      this.intro = false;
    },
    quizFinish(){
      this.finish = true;
    },
    restart(){
      this.pickedArray = [];
      this.resultIndex = [];
      this.resultFinalArray = [];
      this.step = 1;
      this.finish = false;
    },
    reset(){
      this.intro = true;
      this.restart();
    }
  },
  created(){
    EventBus.$on('nextQuestion',() => {
        this.nextQuestion()
    });

    EventBus.$on('userPickLogging',v => {
        this.pickedArrayPush(v)
    })
  },
  mounted(){
    axios
      .get(`${window.projectURL}/wp-json/wp/v2/quiz/${this.id}`)
      .then(response => {
        this.wpdata = response.data
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setTimeout(() => {
          this.executed = true;
        }, 200)
      })
  }
}
</script>

<style lang="scss">
  main{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -10px;
    .col {
      flex-basis: calc(100% - 10px);
      margin: 20px 10px 0;
    }
  @media (min-width: 900px) {
      > .col {
        min-height: 504px;

        &:nth-child(1) {
          flex-basis: calc(68% - 20px);
        }

        &:nth-child(2) {
          flex-basis: calc(32% - 20px);
        }
      }
    }
  }

  .quizzes-container {
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    padding: 30px;
    background-color: white;

    h1 {
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 20px 0;
      padding: 0;
    }

    .button-submit {
      display: block;
      width: 80%;
      max-width: 360px;
      height: 50px;
      border-radius: 25px;
      text-align: center;
      color: #ffffff;
      font-size: 20px;
      border: 1px solid #016afd;
      background-color: #016afd;
      margin: 20px auto;
      &.ghost {
        background-color: transparent;
        color: #016afd;
      }
    }
  }
</style>