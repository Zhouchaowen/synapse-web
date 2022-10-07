<template>
  <HomeHeader></HomeHeader>
  <div class="mainbody">
    <router-view/>
  </div>
  <HomeFooter></HomeFooter>
</template>

<script>
import HomeHeader from './header-index'
import HomeFooter from './footer-index'
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
    height: calc(100vh - 101px);
    background-color: #f5f4f4;
  }
</style>
