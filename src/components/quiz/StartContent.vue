<template>
  <div>
    <div v-html="startContent"></div>
    <button @click="introEnd" class="button-submit">시작하기</button>
  </div>
</template>
    
<script>
export default {
  name: 'StartContent',
  props: {
    startContent: String
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