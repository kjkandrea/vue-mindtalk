<template>
  <div class="container">
    <section class="content" v-if="!notFound">
      <article v-html="wpdata.content.rendered" v-if="executed">
      </article>
      <template v-else>
        <loading-placeholder-title />
        <loading-placeholder-grid />
      </template>
    </section>
    <not-found v-else />
  </div>
</template> 
    
<script>

import axios from 'axios'

import NotFound from './NotFound'
import LoadingPlaceholderGrid from '../components/loading-animation/LoadingPlaceholderGrid'
import LoadingPlaceholderTitle from '../components/loading-animation/LoadingPlaceholderTitle'

export default {
  name: 'Post',
  components: {
    NotFound,
    LoadingPlaceholderGrid,
    LoadingPlaceholderTitle
  },
  data() {
    return {
      executed: false,
      wpdata: [],
      notFound: false
    }
  },
  computed: {
    current: function() {
      return this.$route.params.id
    }
  },
  mounted(){
    axios
        .get(`${window.projectURL}/wp-json/wp/v2/posts/${this.current}`)
        .then(response => {
          this.wpdata = response.data
          this.executed = false
          this.notFound = false
        })
        .catch(error => {
          this.notFound = true
          console.log(error)
        })
        .then(() => {
          setTimeout(() => {
            this.executed = true;
          }, 200)
        })
  }
}
</script>