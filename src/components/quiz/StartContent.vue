<template>
  <div>
    <div v-html="content"></div>
    <button @click="introEnd" class="button-submit">시작하기</button>
  </div>
</template>
    
<script>
export default {
  name: 'StartContent',
  props: {
    content: String
  },
  methods: {
    introEnd(){
      this.$emit('introEnd', false);
    }
  }
}
</script>

<style lang="scss">

</style>