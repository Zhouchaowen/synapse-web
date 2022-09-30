<template>
  <div class="navbar">
    <div class="w1224">
      <div class="navbarLeft">
        <div class="logo" @click="returnTo">MianBa</div>
      </div>
      <div class="navbarRight">
        <div class="tag" v-if="isLogin == false" @click="isLogin = true">
          <i class="iconfont icondenglu"></i>
          登录
        </div>
        <div class="tag userDrop" v-if="isLogin">
          <div class="userTitle">
            <img src="https://avatar.kancloud.cn/5c/5866fec066cd197efb52f93c73d0b3!middle" class="usericon" alt="">
            <span class="username" @click="isDropShow=!isDropShow">admin</span>
            <i class="iconfont iconxia"></i>
            <div class="dropList" v-if="isDropShow">
              <div class="dropItem" @click="gotoAccountSet">账号设置</div>
              <div class="dropItem logout">退出账号</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HeaderIndex',
  setup () {
    const router = useRouter()
    const data = reactive({
      onInput: '0',
      searchvalue: '',
      isLogin: false,
      isDropShow: false // 是否显示下拉菜单
    })
    const handleBlur = (item) => {
      data.onInput = '0'
    }
    const handleFocus = (item) => {
      data.onInput = '1'
    }
    const gotoMybooks = () => {
      router.push('/mybooks')
    }
    // 个人中心
    const gotoUserIndex = () => {
      router.push('/user')
    }
    // 返回首页
    const returnTo = () => {
      router.push('/index')
    }
    // 账号设置
    const gotoAccountSet = () => {
      router.push('/accountSet')
    }
    return {
      ...toRefs(data),
      handleBlur,
      handleFocus,
      returnTo,
      gotoMybooks,
      gotoUserIndex,
      gotoAccountSet
    }
  }
}
</script>

<style scoped lang="scss">
  .navbar {
    height: 49px;
    //border-bottom: 2px solid #efefef;
    padding: 0 100px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 99;
    line-height: 49px;
    background-image: linear-gradient(135deg,#f1eeee,#fff),linear-gradient(110deg,#E70303,#FFFF44,#4caf50);
    background-clip: padding-box,border-box;
    background-origin: padding-box,border-box;
    border-bottom: 2px transparent solid;
    .navbarLeft {
      float: left;
      .logo {
        font-size: 30px;
        cursor: pointer;
      }
    }
    .navbarRight {
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
      .searchBox {
        width: 150px;
        height: 34px;
        border: 1px solid #eee;
        position: relative;
        transition: .3s;
        &.inSearch {
          width: 260px;
          transition: .3s;
        }
        .searchInput {
          height: 100%;
          padding: 0;
        }
        .iconsearch {
          position: absolute;
          right: 10px;
          top: 8px;
        }
      }
      .searchSmall {
        width: 34px;
        height: 34px;
        border: 1px solid #ddd;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0,0,0,.5);
      }
      .tag {
        margin-left: 10px;
        cursor: pointer;
      }
      .userDrop {
        margin-left: 20px;
        position: relative;
        .userTitle {
          display: flex;
          align-items: center;
          //&:hover .dropList{
          //  opacity: 1;
          //}
          .usericon {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
          .username {
            margin-right: 10px;
           }
          .dropList {
            width: 130px;
            height: auto;
            position: absolute;
            top: 50px;
            right: 0px;
            border: 1px solid rgba(34,36,38,.15);
            box-shadow: 0 1px 3px 0 rgba(0,0,0 ,.08);
            border-radius: 2px;
            transition: all .1s ease;
            background: #fff;
            &.dropSlide {
              opacity: 1;
              transition: opacity .1s ease;
            }
            &:after {
              content: '';
              display: block;
              width: 5px;
              height: 5px;
              background: #fff;
              border-top: 1px solid #dededf;
              border-left: 1px solid #dededf;
              position: absolute;
              right: 8px;
              top: -5px;
              transform: rotate(45deg);
            }
            .dropItem {
              height: 34px;
              color: #333333;
              font-size: 14px;
              display: flex;
              align-items: center;
              padding-left: 20px;;
              &.logout {
                border-top: 1px solid rgba(34,36,38,.1);
              }
            }
          }
        }
      }
    }
  }
  /deep/ .el-input__inner {
    height: 100%;
  }
</style>
