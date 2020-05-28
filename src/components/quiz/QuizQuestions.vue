<template>
    <ol>
      <li v-for="(quiz, index) in items" v-show="index + 1 === step" :key="quiz.quiz_question">
        <span class="question">
          <span>{{index + 1}}.</span>
          <div v-html="quiz.quiz_question" />
        </span>
        <quiz-question-items 
          v-bind:parentIndex="index"
          v-bind:items="quiz.quiz_question_items"
        />
      </li>
  </ol>
</template>
    
<script>
import QuizQuestionItems from './QuizQuestionItems.vue'

export default {
  components: {
    QuizQuestionItems
  },
  name: 'QuizQuestions',
  props: {
    step: Number,
    items: Array
  },
}
</script>

<style lang="scss">
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
</style>