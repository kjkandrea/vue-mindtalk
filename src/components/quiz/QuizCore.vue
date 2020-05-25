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
        return this.wpdata.acf.quiz_result_section.quiz_result_items;
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
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const sum = this.pickedArray.reduce(reducer);
      const resultLength = Object.keys(this.resultArray).length;

      for(let i = 0; i < resultLength; i++){
          const endResultRange = Number(this.resultArray[i].quiz_result_end_range);

          if(endResultRange >= sum){
            this.resultIndex = Number(i);

            i = resultLength;
          }
      }

      this.finish = true;
    },
    nextQuestion(){
      this.step++
    },
    pickedArrayPush(v){
      this.pickedArray.push(Number(v));
    },
    start(v){
      this.intro = v;
    },
    restart(){
      this.picked = [];
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
    fetch(`https://mindtalk.shoplic.store/wp-json/wp/v2/quiz/1842`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    background-color: #ebecee;
    button {
      -webkit-appearance: none;
      outline: 0;
      margin: 0;
      padding: 0;
      border: 0 none;
      background-color: transparent;
      cursor: pointer;
    }

    p {
      margin: 0;
    }

    ol, ul, li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      border: 0;
      margin: 0 auto 1em;
      padding: 0;
    }
  }

  .quizzes-container {
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