<template>
  <ul>
    <li class="question-item" v-for="(item, index) in items" :key="item.quiz_question_item">
      <button class="seletor" @click.prevent="clickQuestionItem(index)">
        {{item.quiz_question_item}}
      </button>
    </li>
  </ul>
</template>

<script>
import EventBus from '../../EventBus';

export default {
  name: 'QuizQuestionItems',
  props: {
    items: Array
  },
  methods: {
    clickQuestionItem(index) {
      this.userPickLogging(index)
      this.nextQuestion()
    },
    nextQuestion(){
      EventBus.$emit('nextQuestion');
    },
    userPickLogging(index){
      const picked = this.items[index].quiz_question_value;

      EventBus.$emit('userPickLogging', picked);
    }
  }
}
</script>

<style lang="scss">
  .question-item {
    .seletor {
      display: block;
      width: 100%;
      background-color: #fff;
      color: #999999;
      border: 1px solid #dedede;
      margin-bottom: 10px;
      padding: 10px;
      font-size: 18px;
      text-align: left;

      &:hover, &:focus, &:active {
        color: #016afd;
        border-color: #016afd;
      }
    }
  }
</style>