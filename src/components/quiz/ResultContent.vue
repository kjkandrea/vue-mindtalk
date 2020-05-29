<template>
  <div>
    <div v-if="resultSingle()">
      <h2>{{resultFinalArray[0].quiz_result_title}}</h2>
      <div class="contents" v-html="resultFinalArray[0].quiz_result_desc"></div>
    </div>
    <div v-else>
      <div v-for="(item, index) in resultFinalArray" :key="item.quiz_result_match_value">
        <h2 v-if="index >= 1" class="other">또한, 다음 유형과 일치합니다. </h2>
        <h2>{{item.quiz_result_title}}</h2>
        <div class="contents" v-html="item.quiz_result_desc"></div>
      </div>
    </div>
    <button @click="clickRestart" class="button-submit">다시하기</button>
    <button @click="clickReset" class="button-submit ghost">처음으로 돌아가기</button>
  </div>
</template>
    
<script>
export default {
  name: 'ResultContent',
  props: {
    resultFinalArray: Array
  },
  methods: {
    resultSingle(){
      if(this.resultFinalArray.length >= 2){
        return false;
      }

      return true;
    },
    clickRestart(){
      this.$emit('clickRestart');
    },
    clickReset(){
      this.$emit('clickReset');
    },
  },
}
</script>

<style lang="scss">
  .result {
    h2, h3 {
      font-size: 1.25rem;
      font-weight: 500;
      margin: 0 0 20px 0;
      padding: 0;
      color: #016afd;
    }

    .other {
      margin: 1.5rem 0;
      padding: 0.75rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.25rem;
      background-color: #f1f2f2;
      text-align: center;
      font-size: 1.125rem;
      color: #111;
    }

    p {
      margin-bottom: 1em;
    }
  }
</style>