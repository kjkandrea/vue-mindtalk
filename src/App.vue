<template>
  <div id="app">
    <header>
      <div class="container">
        <site-logo />
        <nav>
          <ul>
            <template v-if="executed">
              <li v-for="item in wpdata" :key="item.ID">
                <router-link :to="item.object+'/'+item.object_id">{{item.title}}</router-link>
              </li>
            </template>
            <template v-else>
              <li>
                <a href="/page/1914">마인드톡 소개</a>
              </li>
            </template>
            <li>
              <a class="coffee" href="https://www.buymeacoffee.com/jkkim" target="_blank">
                <img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy Me A Coffee" >
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <notice-bar />
    <router-view v-cloak></router-view>
    <site-footer />
  </div>
</template>

<script>
import axios from 'axios'

import router from './routes'
import SiteLogo from './components/header/SiteLogo'
import NoticeBar from './components/blocks/NoticeBar'
import SiteFooter from './components/footer/SiteFooter'

export default {
  router,
  name: 'App',
  components: {
    SiteLogo,
    NoticeBar,
    SiteFooter
  },
  data() {
    return {
      executed: false,
      wpdata: null
    }
  },
  mounted(){
     axios
        .get(`${window.projectURL}/wp-json/menus/v1/menus/primary-menu`)
        .then(response => {
          this.wpdata = response.data.items;
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          setTimeout(() => {
            this.executed = true;
          }, 200)
        })
  }
}
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }

  body {
    margin: 0;
    background-color: #ebecee;
    word-break: keep-all;
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

  section h1 {
    font-size: 1.5rem;
    font-weight: 500;
    color: #111;
    border-color: #016afd;

    &:before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      border: 0.5rem solid #666;
      border-color: inherit;
      width: 1px;
      height: 1px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }
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