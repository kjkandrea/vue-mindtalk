<template>
  <div id="app">
    <header>
      <div class="container">
        <site-logo />
        <nav>
          <router-link to="/intro"><h1>intro</h1></router-link>
        </nav>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

import router from './routes'
import SiteLogo from './components/header/SiteLogo'

export default {
  router,
  name: 'App',
  components: {
    SiteLogo,
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

      img {
        width: 1.85rem;
        margin: 0;
      }
    }
  }
</style>