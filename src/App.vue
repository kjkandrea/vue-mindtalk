<template>
  <div id="app">
    <header-core />
    <front-page />
  </div>
</template>

<script>

import HeaderCore from './components/header/HeaderCore'
import FrontPage from './components/FrontPage'

export default {
  name: 'App',
  components: {
    HeaderCore,
    FrontPage,
  }
}
</script>
