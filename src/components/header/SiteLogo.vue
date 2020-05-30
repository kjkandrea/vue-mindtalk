<template>
  <div class="logo">
    <a href="/" v-if="logoUrl">
      <img :src="logoUrl" :width="logoWidth" :height="logoHeight">
    </a>
  </div>
</template>
    
<script>

import axios from 'axios'

export default {
  name: 'SiteLogo',
  data(){
    return {
      executed: false,
      wpdata : []
    }
  },
  computed: {
    logoUrl() {
      if(this.wpdata !== undefined){
        return this.wpdata[0];
      }

      return false;
    },
    logoWidth() {
      if(this.wpdata !== undefined){
        return this.wpdata[1];
      }

      return false;
    },
    logoHeight() {
      if(this.wpdata !== undefined){
        return this.wpdata[2];
      }

      return false;
    },
  },
  mounted(){
     axios
        .get(`${window.projectURL}/wp-json/theme_API/v1/get_theme_logo`)
        .then(response => {
          this.wpdata = response.data;
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          this.executed = true;
        })
  }
}
</script>

<style lang="scss">
  .logo {
    width: 118px; 
    img {
      max-width: 100%;
      height: auto;
      margin: 0;
    }
  }
</style>