<template>
  <div id="app">
    <header-core />
    <quiz-core />
  </div>
</template>

<script>

import HeaderCore from './components/header/HeaderCore'
import QuizCore from './components/quiz/QuizCore'

export default {
  name: 'App',
  components: {
    HeaderCore,
    QuizCore,
  }
}
</script>