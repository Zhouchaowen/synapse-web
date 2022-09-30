<template>
  <div class="wrap" v-for="(item , index) in attList" :key="index">
    <div class="userbody">
      <div class="left">
        <img :src="(item.toux == null || item.toux == undefined || item.toux == '') ? 'http://imianba.cn/static/images/avatar.png' : item.toux" alt="">
      </div>
      <div class="right">
        <span class="uername">{{ item.username }}</span>
        <div class="desc">{{ item.desc }}</div>
      </div>
    </div>
    <div class="userAttention">
      <span class="attentionBtn isAttent" v-if="item.state == '1'">
        已关注
      </span>
      <span class="attentionBtn noAttent" v-else>
        关注Ta
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'attention',
  props: {
    attList: Array
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    &+.wrap {
      border-top: 1px solid #f0f0f2;
    }
    .userbody {
      display: flex;
      .left {
        height: 48px;
        width: 48px;
        border-radius: 50%;;
        overflow: hidden;
        flex: 0 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1 1 auto;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        .uername {
          font-size: 16px;
          color: #222226;
        }
        .desc {
          font-size: 14px;
          color: #555666;
        }
      }
    }
    .userAttention {
      .attentionBtn {
        height: 24px;
        border-radius: 12px;
        border: 1px solid #ccccd8;
        font-size: 14px;
        display: inline-block;
        padding: 0 15px;
        line-height: 24px;
        &.isAttent {
          color: #999aaa;
        }
        &。noAteent {
          color: #555666;
        }
      }
    }
  }
</style>
