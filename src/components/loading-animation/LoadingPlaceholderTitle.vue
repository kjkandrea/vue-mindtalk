<template>
  <div class="placeholder" style="width:60%"></div>
</template>
    
<script>
export default {
  name: 'LoadingPlaceholderLine'
}
</script>

<style lang="scss" scoped>
  :root {
    .placeholder {
      margin: 1rem .5rem;
      position: static;
      overflow: hidden;
      border-radius: 10rem;
      animation: placeholderShimmer 2s linear;
      animation-iteration-count: infinite;
      background: none;
      background-image: linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
      background-size: 1200px 100%;

      &:before {
        content: '';
        display: block;
        padding-top: .6rem;
      }
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