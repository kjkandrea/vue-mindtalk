<template>
  <div class="quizzes-container">
    <template v-if="wpdata.id">
      <h2>{{wpdata.title.rendered}}</h2>
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
          v-on:clickReser="reset"
          v-bind:title="resultTitle"
          v-bind:description="resultDescription"
        />
      </template>
    </template>
    <loading-spinner v-else />
  </div>
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

import EventBus from '../../EventBus'

import QuizQuestions from './QuizQuestions.vue'
import StartContent from './StartContent.vue'
import ResultContent from './ResultContent.vue'
import RangeCounter from './RangeCounter.vue'
import LoadingSpinner from '../LoadingSpinner.vue'

export default {
  name: 'QuizCore',
  components: {
    LoadingSpinner,
    QuizQuestions,
    StartContent,
    ResultContent,
    RangeCounter,
  },
  props: {
    id : Number && String
  },
  data(){
    return {
      wpdata: [], // 외부(wordpress) 데이터 바인딩
      pickedArray: [], // 고른 항목에 대한 '값' 배열
      resultIndex: null, // picked에 push될 고른 항목에 대한 '값'
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
    resultArray: function() {
      if(this.wpdata.id !== undefined){
        if(this.wpdata.acf.quiz_type === 'score'){
          return this.wpdata.acf.quiz_result_score.quiz_result_items;
        }else if(this.wpdata.acf.quiz_type === 'match'){
          return this.wpdata.acf.quiz_result_match.quiz_result_items;
        }
      }

      return false;
    },
    resultTitle: function() {
      if(this.resultIndex !== null){
        return this.resultArray[this.resultIndex].quiz_result_title;
      }
      return false;
    },
    resultDescription: function() {
      if(this.resultIndex !== null){
        return this.resultArray[this.resultIndex].quiz_result_desc;
      }
      return false;
    }
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
            this.resultIndex = i;

            i = resultLength;
          }
      }
    },
    matchCaculator(){ 
      // const testArr = ["a", "a", "b", "b", "c", "d"]
      const resultLength = Object.keys(this.resultArray).length;
      const mostPick = modeArray(this.pickedArray);
      const OnePick = mostPick[Math.floor(Math.random() * (mostPick.length - 1))]
      
      console.log(Math.floor(Math.random() * (mostPick - 1)))
      console.log('신랑'+OnePick);

      for(let i = 0; i < resultLength; i++){
          const resultMatchValue = this.resultArray[i].quiz_result_match_value

          console.log('신부'+resultMatchValue);

          if(OnePick === resultMatchValue){
            console.log('드디어 매치가 성사되었다.')

            this.resultIndex = i;

            return
          }
      }
      
      console.wran('무언가 잘못되었습니다! : method matchCaculator error')
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
      this.step = 1;
      this.finish = false;
    },
    reset(){
      this.restart();
      this.start = false;
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
    fetch(`${window.projectURL}/wp-json/wp/v2/quiz/${this.id}`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>

<style lang="scss">
  .quizzes-container {
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    padding: 30px;
    background-color: white;
    @media (min-width:769px){
      margin-top: 20px;
    }

    h2 {
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