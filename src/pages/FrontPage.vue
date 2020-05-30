<template>
  <div class="container">
      <spotlight-banner />
      <quiz-list />
  </div>
</template> 
    
<script>
import SpotlightBanner from '../components/blocks/SpotlightBanner'
import QuizList from '../components/blocks/QuizList'

export default {
  name: 'FrontPage',
  components: {
    SpotlightBanner,
    QuizList
  }
}
</script>