<template>
  <HomeHeader></HomeHeader>
  <div class="mainbody">
    <router-view/>
  </div>
  <HomeFooter></HomeFooter>
</template>

<script>
import HomeHeader from './HeaderIndex'
import HomeFooter from './footerIndex'
export default {
  name: 'layoutIndex',
  components: {
    HomeHeader,
    HomeFooter
  }
}
</script>

<style scoped>
  .mainbody {
    margin-top: 50px;
    height: calc(100vh - 151px);
    background-color: #f5f4f4;
  }
</style>
