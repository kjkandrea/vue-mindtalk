<template>
  <div>
    <div class="start-content" v-html="content"></div>
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
      this.$emit('introEnd');
    }
  }
}
</script>

<style lang="scss">
  .start-content {
    p {
      margin-bottom: 1em;
    }

    a {
      display: block;
      margin: 2rem 0 1rem;
      color: #777;
      text-decoration: none;
      font-size: 0.9375rem;
    }
  }
</style>