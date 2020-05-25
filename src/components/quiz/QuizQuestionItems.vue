<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.quiz_question_item">
      <button class="seletor" @click.prevent="clickQuestionItem(index)">
        {{item.quiz_question_item}}
      </button>
    </li>
  </ul>
</template>
    
<script>
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
      this.$emit('nextQuestion')
    },
    userPickLogging(index){
      const picked = this.items[index].quiz_question_value;

      this.$emit('pickedArrayPush', Number(picked))
    }
  }
}
</script>

<style lang="scss">
  .question {
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
  }
</style>