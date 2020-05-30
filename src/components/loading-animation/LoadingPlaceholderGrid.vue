<template>
  <div class="placeholder">
    <div class="image" />
    <div class="line" style="width:80%" />
    <div class="line" style="width:40%" />
  </div>
</template>
    
<script>
export default {
  name: 'LoadingPlaceholderGrid'
}
</script>

<style lang="scss" scoped>
  :root {
    .placeholder {
      padding: .5rem .5rem 1rem;
      background-color: #fff;

      &:after {
        content: '';
        display: block;
        clear: both;
      }

      .image {
        position: static;
        overflow: hidden;
        margin-bottom: 1rem;
        animation: placeholderShimmer 2s linear;
        animation-iteration-count: infinite;
        background: none;
        background-image: linear-gradient(to right,rgba(0,0,0,.08) 0,rgba(0,0,0,.15) 15%,rgba(0,0,0,.08) 30%);
        background-size: 1200px 100%;

        &:before {
          content: '';
          display: block;
          padding-top: 66%;
        }
      }

      .line {
        margin: 1.125rem 0;
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
          padding-top: .5rem;
        }
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