<template>
  <div class="logo">
    <a href="/">
      <img :src="logoUrl" :width="logoWidth" :height="logoHeight">
    </a>
  </div>
</template>
    
<script>
export default {
  name: 'SiteLogo',
  data(){
    return {
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
    fetch(`${window.projectURL}/wp-json/theme_API/v1/get_theme_logo`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    width: 118px; 
    img {
      max-width: 100%;
      height: auto;
      margin: 0;
    }
  }
</style>