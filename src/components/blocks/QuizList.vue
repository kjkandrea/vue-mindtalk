<template>
  <section>
    <ul class="grids"  v-if="wpdata">
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
    <loading-spinner v-else />
  </section>
</template> 
    
<script>

import LoadingSpinner from '../LoadingSpinner.vue'

export default {
  name: 'QuizList',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      wpdata : []
    }
  },
  mounted(){
    fetch(`${window.projectURL}/wp-json/wp/v2/quiz?per_page=8&_embed`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res)
  }
  
}
</script>

<style lang="scss">
  .grids{
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin: 5px -5px 40px;

    * {
      box-sizing: border-box;
    }

    .grid {
      background: #fff;
      flex-basis: calc(25% - 10px);
      margin: 5px;
      position: relative;
      overflow: hidden;
      border-radius: 0.25rem;

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
          transform: translateX(-50%) translateY(-50%) translateZ(0);
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
        font-size: 1.285rem;
        letter-spacing: -0.025em;
        line-height: 1.4;
        font-weight: 500;
        word-break: keep-all;
      }
    }
  }
</style>