<template>
  <footer>
    <div class="container">
      <p class="copy">© 2020 KJK</p>
      <a class="git" href="https://github.com/kjkandrea/vue-mind-test" target="_blank">
        github
      </a>
    </div>
  </footer>
</template>
    
<script>

export default {
  name: 'SiteFooter'
}
</script>

<style lang="scss">
  footer {
    margin-top: 40px;
    padding: 20px 0;
    border-top: 1px solid #ccc;
    border-color: rgba(0, 0, 0, 0.15);
    background-color: #fff; 

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .copy {
      color: #666;
      font-size: 0.875rem;
    }

    .git {
      display: block;
      padding: 5px 10px;
      border: 1px solid #e5e5e5;
      color: #999;
      font-size: 0.875rem;
      text-decoration: none;
      border-radius: 0.25rem;
    }
  }
</style>