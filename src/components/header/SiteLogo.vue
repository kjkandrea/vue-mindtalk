<template>
  <div class="logo">
    <a href="/">
      <img v-if="logoUrl" :src="logoUrl" :width="logoWidth" :height="logoHeight" :alt="this.appName">
      <img v-else src="../../assets/logo.png" :alt="this.appName">
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
      wpdata : [],
      appName : "마인드톡"
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
        setTimeout(() => {
          this.executed = true;
        }, 200)
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