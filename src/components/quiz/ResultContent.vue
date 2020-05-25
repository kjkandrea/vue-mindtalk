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

</style>