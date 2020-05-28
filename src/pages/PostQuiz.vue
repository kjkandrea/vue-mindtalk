<template>
  <div class="container">
      {{hello}}
      {{currentQuiz}}
      <quiz-core 
        v-bind:id="currentQuiz"
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
  data() {
    return {
      hello : 'Hello, Fuckers. Im Post Quiz'
    }
  },
  computed: {
    currentQuiz: function() {
      return this.$route.params.id
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>