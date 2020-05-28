<template>
  <div id="app">
    <header>
      <div class="container">
        <site-logo />
        <nav>
          <ul if="primaryMenu">
            <li v-for="item in primaryMenu" :key="item.ID">
              <!-- :href="'/quiz/'+item.id" -->
              <router-link :to="item.object+'/'+item.object_id">{{item.title}}</router-link>
            </li>
            <li>
              <a class="coffee" href="https://www.buymeacoffee.com/jkkim" target="_blank">
                <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy Me A Coffee" >
              </a>
            </li>
          </ul>
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
  },
  data() {
    return {
      primaryMenu: []
    }
  },
  mounted(){
    fetch(`https://mindtalk.shoplic.store/wp-json/menus/v1/menus/primary-menu`)
      .then((r) => r.json())
      .then((res) => this.primaryMenu = res.items);
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
    font-size: 16px;
  }

  .container {
    overflow-x: hidden;
    max-width: 1030px;
    margin: 0 auto;
  }

  header {
    background-color: #fff;
    > .container {
      box-sizing: border-box;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (max-width: 1040px) {
        padding: 0 0.5rem;
      }
    }

    nav {
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        li{
          a {
            color: #1b2733;
            text-decoration: none;
            font-size: 1.125rem;
            font-weight: 500;
          }

          a:not(.coffee){
            display: block;
            padding: 0.25rem;
          }
        }

        li:nth-child(n + 2){
          margin-left: 1rem;
        }
      }
    }

    .coffee {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      background-color: #ff813f;
      border-radius: 0.5rem;

      &:hover, &:focus, &:active {
        background-color: #fc681b;
      } 

      img {
        width: 1.85rem;
        margin: 0;
      }
    }
  }
</style>