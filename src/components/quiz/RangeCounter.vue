<template>
  <div class="range-bar">
    <div class="range" :style="{ width: rangeWidth + '%'}"></div>
  </div>
</template>
    
<script>
export default {
  name: 'RangeCouner',
  props: {
    step: Number,
    stepRange: Number
  },
  methods: {
    allQuestionFinish(){
      this.$emit('allQuestionFinish')
    }
  },
  computed: {
    rangeWidth: function() {
      return (Number(this.step - 1)/Number(this.stepRange)) * 100
    }
  },
  watch: {
    step: function () {
      if(this.step > this.stepRange){
        this.allQuestionFinish()
      }
    }
  }
}
</script>

<style lang="scss">
  .range-bar {
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
</style>