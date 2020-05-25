<template>
  <div>
    <h3>{{title}}</h3>
    <div class="contents" v-html="description"></div>
    <button @click="clickRestart" class="button-submit">다시하기</button>
    <button @click="clickReset" class="button-submit ghost">처음으로 돌아가기</button>
  </div>
</template>
    
<script>
export default {
  name: 'ResultContent',
  props: {
    title: String,
    description: String
  },
  methods: {
    clickRestart(){
      this.$emit('clickRestart');
    },
    clickReset(){
      this.$emit('clickRestart');
    },
  }
}
</script>

<style lang="scss">
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
</style>