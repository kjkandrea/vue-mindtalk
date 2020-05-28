<template>
  <div class="container">
      <spotlight-banner />
  </div>
</template> 
    
<script>
import SpotlightBanner from './banner/SpotlightBanner'

export default {
  name: 'HeaderCore',
  components: {
    SpotlightBanner
  }
}
</script>