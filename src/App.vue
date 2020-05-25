<template>
  <div id="app" class="quizzes-container"> 
    <div v-if="wpdata.id">
      <h2>{{wpdata.title.rendered}}</h2>
      <div v-if="!start">
        <div v-html="wpdata.content.rendered"></div>
        <div v-if="!start">
          <button @click="start = true" class="button-submit">시작하기</button>
        </div>
      </div>
      <div v-else>
      <start-content v-if="intro" v-on:introEnd="start" v-bind:content="wpdata.content.rendered" />
        <div class="step-range-bar">
          <div class="range" :style="{ width: rangeWidth + '%'}"></div>
        </div>
        <ol v-if="!finish">
          <li v-show="quizIndex + 1 === step" v-for="(quiz, quizIndex) in wpdata.acf.quiz_section" :key="quiz.quiz_question">
              <span class="question">
                <span>{{quizIndex + 1}}.</span>
                {{quiz.quiz_question}}
              </span>
              <ul>
                <li v-for="(item, index) in quiz.quiz_question_items" :key="item.quiz_question_item">
                  <button class="seletor" @click.prevent="nextQuestion(quizIndex, index)">
                    {{item.quiz_question_item}}
                    <!-- {{item.quiz_question_value}} -->
                  </button>
                </li>
              </ul>
          </li>
        </ol>
        <div v-else class="result">
          <h3>{{resultTitle}}</h3>
          <div class="contents" v-html="resultDescription"></div>
          <button @click="restart" class="button-submit">다시하기</button>
          <button @click="reset" class="button-submit ghost">처음으로 돌아가기</button>
        </div>
      </div>
        <result-content v-else class="result" v-on:clickRestart="restart" v-on:clickReser="reset" v-bind:title="resultTitle" v-bind:description="resultDescription" />
    </div>
    <div v-else>
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
      </div>
      <loading-spinner />
    </div>
    <Quizzes />
  </div>
</template>

<script>
import StartContent from './components/quiz/StartContent.vue'
import ResultContent from './components/quiz/ResultContent.vue'

import Quizzes from './components/Quizzes.vue'
import LoadingSpinner from './components/LoadingSpinner.vue'

export default {
  name: 'App',
  components: {
    Quizzes
    LoadingSpinner
    StartContent
    Quizzes,
    LoadingSpinner,
    StartContent,
    ResultContent
  },
  data(){
    return {
      wpdata: [], // 외부(wordpress) 데이터 바인딩
      picked: [], // 고른 항목에 대한 '값' 배열
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
    rangeWidth: function() {
      return (Number(this.step - 1)/Number(this.stepRange)) * 100
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
  watch: {
    step: function () {
      if(this.step > this.stepRange){
        this.result()
      }
    }
  },
  methods: {
    nextQuestion(quizIndex, index){
      const picked = this.wpdata.acf.quiz_section[quizIndex].quiz_question_items[index].quiz_question_value;
      this.picked.push(Number(picked));
      this.step++
    },
    result(){
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const sum = this.picked.reduce(reducer);
      const resultLength =  Object.keys(this.resultArray).length;

      console.log(sum)

      for(let i = 0; i < resultLength; i++){
          const endResultRange = Number(this.resultArray[i].quiz_result_end_range);

          if(endResultRange >= sum){
            this.resultIndex = Number(i);

            i = resultLength;
          }
      }

      this.finish = true;
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
  mounted(){
    fetch(`https://wireframe.kr/wp-json/wp/v2/quiz/1842`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>

<style lang="scss">
  body {
    background-color: #ebecee;
    button {
      -webkit-appearance: none;
      outline: 0;
      margin: 0;
      padding: 0;
      border: 0 none;
      background-color-color: transparent;
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

    .question {
      display: block;
      position: relative;
      min-height: 46px;
      padding-left: 1.5em;
      margin-bottom: 20px;
      color: #666666;
      font-size: 18px;
      line-height: 1.3;
      span {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .seletor {
      display: block;
      width: 100%;
      color: #999999;
      border: 1px solid #dedede;
      margin-bottom: 10px;
      padding: 10px;
      font-size: 18px;
      text-align: left;
    }

    .step-range-bar {
      height: 3px;
      margin-bottom: 20px;
      background-color: #eaeaea;
      .range {
        width: 100%;
        height: 100%;
        background-color: #016afd;
        transition: width 250ms;
      }
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

    .result {
      h3 {
        font-size: 20px;
        font-weight: 500;
        margin: 0 0 20px 0;
        padding: 0;
        color: #016afd;
      }

      p {
        margin-bottom: 1em;
      }
    }
  }
</style>