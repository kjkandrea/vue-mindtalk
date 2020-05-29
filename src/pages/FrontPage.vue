<template>
  <div class="container">
      <spotlight-banner />
      <quiz-list />
  </div>
</template> 
    
<script>
import SpotlightBanner from '../components/blocks/SpotlightBanner'

export default {
  name: 'FrontPage',
  components: {
    SpotlightBanner
  }
}
</script>