<template>
  <div class="wrap">
<!--    <el-empty description="暂无数据"></el-empty>-->
    <div class="item" v-for="(item,index) in privateBookList" :key="index">
      <div class="left">
        <img :src="(item.bookImg == null || item.bookImg == undefined || item.bookImg == '')?'https://cover.kancloud.cn/wddd/wudan!small' : item.bookImg" alt="">
      </div>
      <div class="right">
        <span class="title">{{item?.bookname??''}}</span>
        <div class="tag">
          <div class="t">阅读：{{item?.readNum??''}}</div>
          <div class="t">收藏：{{item?.collectNUm??''}}</div>
        </div>
        <div class="desc">{{item?.bookdesc??''}}</div>
        <div class="func">
          <el-dropdown split-button type="primary" size="small " @click="handleToRead">
            编辑
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>阅读</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'privateBook',
  props: {
    privateBookList: Array
  },
  setup () {
    const state = reactive({
    })
    const handleToRead = () => {}
    return {
      ...toRefs(state),
      handleToRead
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    min-height: 300px;
    .item {
      display: flex;
      position: relative;
      margin: 20px 0;
      .left {
        height: 130px;
        width: 100px;
        img {
          width: 100%;
        }
      }
      .right {
        margin-left: 15px;
        .title {
          font-size: 22px;
        }
        .desc {
          font-size: 14px;
          margin-top: 10px;
        }
        .tag {
          color: rgba(0, 0, 0, 0.6);
          font-size: 14px;
          margin-top: 8px;
          display: flex;
          .t {
            margin-right: 10px;
          }
        }
      }
      .func {
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
  /deep/ .el-dropdown .el-button-group .el-button {
    background: #fff;
    color: #888;
    border: 1px solid #ddd;
  }
</style>
