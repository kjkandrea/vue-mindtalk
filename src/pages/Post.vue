<template>
  <div class="container">
      {{wpdata}}
  </div>
</template> 
    
<script>

export default {
  name: 'Post',
  data() {
    return {
      wpdata: []
    }
  },
  computed: {
    current: function() {
      return this.$route.params.id
    }
  },
  mounted(){
    fetch(`${window.projectURL}/wp-json/wp/v2/posts/${this.current}`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>