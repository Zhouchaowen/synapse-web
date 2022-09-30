<template>
<div class="wrap" v-for="(item, index) in docList" :key="index">
  <div class="item">
    <div class="left">
      <img :src="(item.bookImg == null || item.bookImg == undefined || item.bookImg == '')?'https://cover.kancloud.cn/wddd/wudan!small' : item.bookImg" alt="">
    </div>
    <div class="right">
      <span class="title">{{item?.bookname??''}}</span>
      <div class="desc">{{item?.bookdesc??''}}</div>
      <div class="tag">
        <div><i class="iconfont iconjiantou_xiangyouliangci"></i>{{item?.likeNum??''}}</div>
        <div><i class="iconfont iconjiantou_xiangyouliangci"></i>{{item?.createtime??''}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'document',
  props: {
    docList: Array
  },
  setup (props) {
    console.log(props.docList)
  }
}
</script>

<style scoped lang="scss">
.wrap {
  padding: 15px 0;
  &+.wrap {
    border-top: 1px solid #f0f0f2;
  }
  .item {
    display: flex;
    .left {
      height: 118px;
      width: 88px;
      flex: 0 0 auto;
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1 1 auto;
      margin-left: 15px;
      position: relative;
      .title {
        font-size: 18px;
      }
      .desc {
        font-size: 14px;
        margin-top: 10px;
      }
      .tag {
        position: absolute;
        bottom: 0;
        color: #777;
        font-size: 12px;
        display: flex;
        & div:nth-of-type(2) {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
