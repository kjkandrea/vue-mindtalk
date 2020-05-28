<template>
  <div class="container">
      {{current}}
      <quiz-core 
        v-bind:id="current"
      />
  </div>
</template> 
    
<script>

import QuizCore from '../components/quiz/QuizCore';

export default {
  name: 'Post',
  components: {
    QuizCore
  },
  computed: {
    current: function() {
      return this.$route.params.id
    }
  }
}
</script>