<template>
  <div>
    <h2 class="sub-title">추천 심리테스트</h2>
    <ul class="grids" v-if="executed">
      <li 
        class="grid"
        v-for="(item) in wpdata" 
        :key="item.id"
      >
        <router-link :to="'/quiz/'+item.id" />
          <div class="landscape-image">
            <img 
              :src="item._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url" 
              :alt="item._embedded['wp:featuredmedia'][0].media_details.image_meta.caption"
            />
          </div>
        <h3>{{item.title.rendered}}</h3>
      </li>
    </ul>

    <div v-else class="grids" style="margin-top:0">
      <loading-placeholder-grid class="grid" v-for="n in parseInt(pageRenge)" :key="n" />
    </div>
  </div>
</template> 
    
<script>

import axios from 'axios'
import router from '../../routes'
import LoadingPlaceholderGrid from '../loading-animation/LoadingPlaceholderGrid.vue'

export default {
  router,
  name: 'SpotilightContentGrid',
  components: {
    LoadingPlaceholderGrid
  },
  data() {
    return {
      executed: false,
      wpdata : [],
      perPage: 3,
      pageRenge: 3
    }
  },
  mounted() {
    axios
      .get(`${window.projectURL}/wp-json/wp/v2/quiz?categories=3&per_page=${this.perPage}&_embed`)
      .then(response => {
        this.wpdata =response.data;
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setTimeout(() => {
            this.executed = true;
          }, 200)
      });
  }
}
</script>

<style lang="scss" scoped>
  .sub-title {
    margin-top: 2rem;
    font-size: 1.25rem;
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

  .grids{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    overflow: hidden;
    margin: 5px -5px 0;

    * {
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
    }

    .grid {
      &:not(.placeholder) {
        background: #fff;
      }
      -ms-flex-preferred-size: calc(100% - 10px);
      flex-basis: calc(100% - 10px);
      margin: 5px;
      position: relative;
      overflow: hidden;
      border-radius: 0.25rem;

      @media (min-width: 600px){
        -ms-flex-preferred-size: calc(50% - 10px);
            flex-basis: calc(50% - 10px);
      }

      @media (min-width: 1030px){
        -ms-flex-preferred-size: calc(33.3333% - 10px);
            flex-basis: calc(33.3333% - 10px);
      }

      .landscape-image {
        position: relative;
        background-color: black;
        &:before {
          content: '';
          display: block;
          padding-top: 66%;
        }

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          width: auto;
          height: 100%;
          margin: 0;
          -webkit-transform: translateX(-50%) translateY(-50%) translateZ(0);
          transform: translateX(-50%) translateY(-50%) translateZ(0);
          -o-object-fit: cover;
             object-fit: cover;
        }
      }

      a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        text-decoration: none;
        z-index: 1;
      }

      h3 {
        margin: 0;
        padding: 1rem;
        color: #111;
        z-index: 2;
        font-size: 1.2rem;
        letter-spacing: -0.05em;
        line-height: 1.4;
        font-weight: 500;
        word-break: keep-all;
      }
    }
  }

  .no-more{
      margin: 20px 0;
      color: #666;
      font-size: 0.875rem;
  }
</style>
