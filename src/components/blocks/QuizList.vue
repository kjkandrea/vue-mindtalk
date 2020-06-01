<template>
  <section>
    <h1>최신 심리테스트</h1>
    <ul class="grids" v-if="executed">
      <li 
        class="grid"
        v-for="(item) in wpdata" 
        :key="item.id"
      >
        <a :href="'/quiz/'+item.id"></a>
          <div class="landscape-image">
            <img 
              :src="item._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url" 
              :alt="item._embedded['wp:featuredmedia'][0].media_details.image_meta.caption"
            />
          </div>
        <h2>{{item.title.rendered}}</h2>
      </li>
    </ul>

    <infinite-loading @infinite="infiniteHandler">
      <div slot="spinner">
        <div class="grids" style="margin-top:0">
          <loading-placeholder-grid class="grid" v-for="n in parseInt(pageRenge)" :key="n" />
        </div>
      </div>
      <div slot="no-more" class="no-more">더이상 콘텐츠가 없어요 🙄</div>
    </infinite-loading>
  </section>
</template> 
    
<script>

import isMobile from 'ismobilejs';

import axios from 'axios'
import LoadingPlaceholderGrid from '../loading-animation/LoadingPlaceholderGrid.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'QuizList',
  components: {
    LoadingPlaceholderGrid,
    InfiniteLoading
  },
  data() {
    return {
      executed: false,
      wpdata : [],
      perPage: 2,
      pageRenge: 2,
      interval : 0
    }
  },
  methods: {
    infiniteHandler($state) {
        axios
          // .get(`${window.projectURL}/wp-json/wp/v2/quiz?per_page=${this.perPage}&_embed`, {
          .get(`${window.projectURL}/wp-json/wp/v2/quiz?per_page=${this.perPage}&_embed`)
          .then(response => {
            setTimeout(() => {
              if(response.data.length){
                this.wpdata = response.data;
                $state.loaded();
                this.perPage += this.pageRenge
                if(this.wpdata.length === 10) { // 10개 이상 불러왔으면 로딩 중단.. 
                  $state.complete();
                }
              } else {
                $state.complete();
              }

              this.interval = 250;
            }, this.interval);
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => {
            this.executed = true;
          })
    },
  },
  created() {
    if(!isMobile().any){
      this.perPage = 4
      this.pageRenge = 4
    }
  }
}
</script>

<style lang="scss">
  .grids{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin: 5px -5px 0;

    * {
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
        -ms-flex-preferred-size: calc(25% - 10px);
            flex-basis: calc(25% - 10px);
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

      h2 {
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