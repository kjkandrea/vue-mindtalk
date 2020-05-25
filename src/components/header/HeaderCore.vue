<template>
  <header>
    {{test}}
    <site-logo />
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
    min-height: 60px;
    background-color: #fff;
  }
</style>