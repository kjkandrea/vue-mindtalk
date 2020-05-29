<template>
  <div class="spotlight-banner">
    <template v-if="wpdata[3]">
      <div 
        class="grid"
        v-for="(item) in wpdata" 
        :key="item.id"
      >
        <a :href="'/quiz/'+item.id">
          <h2>{{item.title.rendered}}</h2>
        </a>
        
        <img 
          :src="item._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url" 
          :alt="item._embedded['wp:featuredmedia'][0].media_details.image_meta.caption"
        />
      </div>
    </template>
    <loading-spinner v-else />
  </div>
</template> 
    
<script>

import LoadingSpinner from '../LoadingSpinner.vue'

export default {
  name: 'SpotlightBanner',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      wpdata : [],
      wpdataEmbedImageArray: []
    }
  },
  mounted(){
    // Primary 카테고리로 등록된 Quiz 콘텐츠 json 불러오기
    fetch(`https://mindtalk.shoplic.store/wp-json/wp/v2/quiz?categories=3&_embed`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res)
  }
  
}
</script>

<style lang="scss">
  .spotlight-banner{
    display: block;
    overflow: hidden;
    margin: 5px -5px 40px;

    * {
      box-sizing: border-box;
    }

    .grid {
      background: #000;
      float: left;
      margin: 5px;
      width: calc(100% - 10px);
      position: relative;
      overflow: hidden;
      padding: 40px;
      border-radius: 0.25rem;

      &:before {
        content: '';
        display: block;
        padding-top: 55%;
      }

      a {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-image: linear-gradient(0deg,#000 0,rgba(0,0,0,.917) 5.3%,rgba(0,0,0,.834) 10.6%,rgba(0,0,0,.753) 15.9%,rgba(0,0,0,.672) 21.3%,rgba(0,0,0,.591) 26.8%,rgba(0,0,0,.511) 32.5%,rgba(0,0,0,.433) 38.4%,rgba(0,0,0,.357) 44.5%,rgba(0,0,0,.283) 50.9%,rgba(0,0,0,.213) 57.7%,rgba(0,0,0,.147) 65%,rgba(0,0,0,.089) 72.9%,rgba(0,0,0,.042) 81.4%,rgba(0,0,0,.011) 90.6%,transparent 100%);
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: auto;
        margin: 0;
        transform: translateX(-50%) translateY(-50%) translateZ(0);
        object-fit: cover;
      }

      @media (min-width: 900px){
        width: calc(50% - 10px);

        &:nth-child(n + 3){
          width: calc(25% - 10px);
        }

        &:before {
          padding-top: 65%;
        }

        &:nth-child(1):before{
          padding-top: 75%;
        }

        &:nth-child(2):before{
          padding-top: 28.5%;
        }

        &:not(:nth-child(2)) img {
          max-width: 99999rem;
          width: auto;
          height: 100%;
        }
      }


      h2 {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 0;
        padding: 20px;
        color: white;
        z-index: 2;
        font-size: 1.285rem;
        letter-spacing: -0.025em;
        line-height: 1.4;
        font-weight: 500;
      }
    }
  }
</style>