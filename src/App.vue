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

<style lang="scss">
  body {
    margin: 0;
    background-color: #ebecee;
    button {
      -webkit-appearance: none;
      outline: 0;
      margin: 0;
      padding: 0;
      border: 0 none;
      background-color: transparent;
      cursor: pointer;
    }

    p {
      margin: 0;
    }

    ol, ul, li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    img {
      display: block;
      max-width: 100%;
      height: auto;
      border: 0;
      margin: 0 auto 1em;
      padding: 0;
    }
  }

  html, body {
    fons-size: 16px;
  }

  .container {
    width: 100%;
    max-width: 1030px;
    margin: 0 auto;
  }
</style>