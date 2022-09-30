<template>
  <div class="wrap w1224">
<!--    <div class="listTitle">-->
<!--      <div class="title">基本信息</div>-->

<!--    </div>-->
    <div class="setLeft">
      <div class="item">基本信息</div>
      <div class="item">修改密码</div>
    </div>
    <div class="setRight"></div>
  </div>
</template>

<script>
export default {
  name: 'accountSet'
}
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  .setLeft {
    height: 500px;
    flex: 0 0 auto;
    .item{
      color: rgba(0,0,0,.87);
      height: 44px;
      width: 160px;
      line-height: 44px;
    }
  }
  .setRight {
    height: 500px;
    flex: 1 1 auto;
  }
}
.listTitle {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;

  //.title {
  //  border-bottom: 2px solid #55bb47;
  //  height: 48px;
  //  line-height: 48px;
  //  font-size: 18px;
  //}
}
</style>
