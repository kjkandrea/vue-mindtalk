<template>
  <div class="notice container">
   <p>이 어플리케이션은 단순한 토이 프로젝트이며, 등록된 콘텐츠들을 영리적 목적으로 활용하지 않습니다. 🥺</p>
  </div>
</template>
    
<script>

export default {
  name: 'NoticeBar'
}
</script>

<style lang="scss">
  :root {
    .notice {
      margin: 20px auto 10px;
      background-color: rgba(255, 255, 255, 0.6);
      text-align: center;
      border-radius: .25rem;
      p {
        margin: 20px 0;
        color: #666;
        font-size: 0.875rem;
      }
    }
  }
</style>