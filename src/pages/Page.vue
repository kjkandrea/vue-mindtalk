<template>
  <div class="container">
    <template v-if="wpdata.id">
      <div v-html="wpdata.content.rendered" />
    </template>
  </div>
</template> 
    
<script>

export default {
  name: 'Page',
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
    fetch(`${window.projectURL}/wp/v2/pages/${this.current}`)
      .then((r) => r.json())
      .then((res) => this.wpdata = res);
  }
}
</script>