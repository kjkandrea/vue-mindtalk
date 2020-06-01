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
      -webkit-animation: placeholderShimmer 2s linear;
              animation: placeholderShimmer 2s linear;
      -webkit-animation-iteration-count: infinite;
              animation-iteration-count: infinite;
      background: none;
      background-image: -webkit-gradient(linear,left top, right top,color-stop(0, rgba(0,0,0,.08)),color-stop(15%, rgba(0,0,0,.15)),color-stop(30%, rgba(0,0,0,.08)));
      background-image: -o-linear-gradient(left,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
      background-image: linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
      background-size: 1200px 100%;

      &:before {
        content: '';
        display: block;
        padding-top: .6rem;
      }
    }
  }
  

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: -500px 0
    }100% {
      background-position: 500px 0
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