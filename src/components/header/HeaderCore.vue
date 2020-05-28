<template>
  <header>
    <div class="container">
      <site-logo />
    </div>
  </header>
</template> 
    
<script>
import SiteLogo from './SiteLogo'

export default {
  name: 'HeaderCore',
  components: {
    SiteLogo
  },
  data() {
    return {
      test : 'Hello, Fuckers'
    }
  },
}
</script>

<style lang="scss">
  header {
    background-color: #fff;
    > .container {
      min-height: 60px;
      display: flex;
      align-items: center;
      @media (max-width: 1040px) {
        margin: 0 1rem;
      }
    }
  }
</style>