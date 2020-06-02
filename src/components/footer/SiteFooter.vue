<template>
  <footer>
    <div class="container">
      <p class="copy">
        © 2020 <a href="mailto:kjkandrea@gmail.com">KJK</a>
         | 
        <a href="https://icons8.com/icon/vIV5Mr3QA1dV/bug">Bug icon by Icons8</a>
      </p>
      <a class="git" href="https://github.com/kjkandrea/vue-mind-test" target="_blank">
        Github
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
    box-sizing: border-box;
    margin-top: 40px;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-color: rgba(0, 0, 0, 0.15);
    background-color: #fff; 

    @media (min-width:1030px) {
      padding: 20px 0;
    }

    .container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
              justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
              align-items: center;
    }

    .copy {
      color: #666;
      font-size: 0.875rem;

      a {
        color: #999;
        font-size: 0.875rem;
        text-decoration: none;
      }
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