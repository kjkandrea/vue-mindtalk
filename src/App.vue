<template>
  <div id="app">
    <header>
      <div class="container">
        <site-logo />
        <nav>
          <ul>
            <template v-if="executed">
              <li v-for="item in wpdata" :key="item.ID">
                <router-link :to="'/'+item.object+'/'+item.object_id">{{item.title}}</router-link>
              </li>
            </template>
            <template v-else>
              <li>
                <a href="/page/1914">마인드톡 소개</a>
              </li>
            </template>
            <li>
              <a class="bug" href="https://github.com/kjkandrea/vue-mindtalk/issues" target="_blank">
                <img src="https://img.icons8.com/officel/80/000000/bug.png" alt="Bug Report" />
              </a>
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
  @import url('./assets/css/common.css');

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
      -webkit-box-sizing: border-box;
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
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      min-height: 60px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
       justify-content: space-between;
      @media (max-width: 1040px) {
        padding: 0 0.5rem;
      }
    }

    nav {
      ul {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
            flex-wrap: wrap;
        -webkit-box-align: center;
        -ms-flex-align: center;
                align-items: center;

        li{
          a {
            color: #1b2733;
            text-decoration: none;
            font-size: 1.125rem;
            font-weight: 500;
          }

          a:not(.coffee, .bug){
            display: block;
            padding: 0.25rem;
          }
        }

        li:nth-child(n + 2){
          margin-left: 1rem;
        }
      }
    }

    .bug {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
              justify-content: center;
      width: 2rem;
      height: 2rem;
      background-color: #FBC02D;
      border-radius: 0.5rem;

      &:hover, &:focus, &:active {
        background-color: #F9A825;
      } 

      img {
        width: 1.4rem;
        margin: 0;
      }
    }

    .coffee {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
              align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
              justify-content: center;
      width: 2rem;
      height: 2rem;
      background-color: #ff813f;
      border-radius: 0.5rem;

      &:hover, &:focus, &:active {
        background-color: #fc681b;
      } 

      img {
        width: 1.5rem;
        margin: 0;
      }
    }
  }
</style>