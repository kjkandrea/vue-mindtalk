<template>
  <div class="placeholder"></div>
</template>
    
<script>
export default {
  name: 'LoadingPlaceholder'
}
</script>

<style lang="scss" scoped>
  :root {
    .placeholder {
      position: static;
      overflow: hidden;
      animation: placeholderShimmer 2s linear;
      animation-iteration-count: infinite;
      background: none;
      background-image: linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
      background-size: 1200px 100%;
    }
  }
  

  @keyframes placeholderShimmer {
    0% {
      background-position: -500px 0
    }100% {
      background-position: 500px 0
    }
  }
</style>