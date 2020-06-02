<template>
  <div class="result-load-message">
    <p>결과를 계산 중입니다.. 🤔</p>
    <loadingSpinner />
  </div>
</template>
    
<script>
import LoadingSpinner from '../loading-animation/LoadingSpinner';

export default {
  name: 'ResultLoader',
  components: {
    LoadingSpinner
  }
}
</script>

<style lang="scss" scoped>
  .result-load-message {
    padding: 4rem 0;
    color: #666;
    font-size: 0.875rem;
    text-align: center;
  }
</style>