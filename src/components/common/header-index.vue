<template>
  <div class="navbar">
    <div class="w1224">
      <div class="navbarLeft">
        <div class="logo" @click="returnTo">
          <svg xmlns="http://www.w3.org/2000/svg" font-size="32" style="height: 48px;">
            <text text-anchor="middle" x="20%" y="66%" text-transform="uppercase" fill="none" stroke="#293462"
                  text-shadow="0 0 5px #293462" stroke-width="1px" stroke-dasharray="90 150"> MainBa
              <animate attributeName="stroke-dashoffset" begin="-1.5s" dur="6s" from="0" to="-200"
                       repeatCount="indefinite"></animate>
            </text>
            <text text-anchor="middle" x="20%" y="66%" text-transform="uppercase" fill="none" stroke="#1CD6CE"
                  text-shadow="0 0 5px #1CD6CE" stroke-width="1px" stroke-dasharray="90 150"> MainBa
              <animate attributeName="stroke-dashoffset" begin="-3s" dur="6s" from="0" to="-200"
                       repeatCount="indefinite"></animate>
            </text>
            <text text-anchor="middle" x="20%" y="66%" text-transform="uppercase" fill="none" stroke="#FEDB39"
                  text-shadow="0 0 5px #FEDB39" stroke-width="1px" stroke-dasharray="90 150"> MainBa
              <animate attributeName="stroke-dashoffset" begin="-4.5s" dur="6s" from="0" to="-200"
                       repeatCount="indefinite"></animate>
            </text>
            <text text-anchor="middle" x="20%" y="66%" text-transform="uppercase" fill="none" stroke="#D61C4E"
                  text-shadow="0 0 5px #D61C4E" stroke-width="1px" stroke-dasharray="90 150"> MainBa
              <animate attributeName="stroke-dashoffset" begin="-6s" dur="6s" from="0" to="-200"
                       repeatCount="indefinite"></animate>
            </text>
          </svg>
        </div>
      </div>
      <div class="navbarRight">
        <div class="tag" v-if="isLogin == false" @click="login">
          <i class="iconfont icondenglu"></i>
          登录
        </div>
        <div class="tag userDrop" v-if="isLogin" >
          <div class="userTitle">
            <img src="https://avatar.kancloud.cn/5c/5866fec066cd197efb52f93c73d0b3!middle" class="usericon" alt="">
            <span class="username" @click.stop="isDropShow=!isDropShow">admin</span>
            <i class="iconfont iconxia"></i>
            <div class="dropList" v-if="isDropShow">
              <div class="dropItem" @click="gotoAccountSet">账号设置</div>
              <div class="dropItem" @click="addBook">添加图书</div>
              <div class="dropItem" @click="bookList">我的图书</div>
              <div class="dropItem logout" @click="logout">退出账号</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisibleLoginFrom"
    title="登录"
    width="30%"
  >
    <loginFrom ref="loginFromRef"></loginFrom>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisibleLoginFrom = false">取消</el-button>
        <el-button type="primary" @click="loginSubmit"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {onMounted, reactive, ref, toRefs} from 'vue'
import { useRouter } from 'vue-router'
import loginFrom from '../User/login'
import api from '@/utils'
import Cookies from 'js-cookie'

export default {
  name: 'HeaderIndex',
  components: {
    loginFrom,
  },
  setup () {
    const router = useRouter()
    const data = reactive({
      onInput: '0',
      isLogin: false,
      isDropShow: false, // 是否显示下拉菜单
      username:'',
      password:'',
      dialogVisibleLoginFrom:false,
    })

    const loginFromRef = ref(null)
    let loginToken = Cookies.get('token')
    if (loginToken){
      data.isLogin = true
    }

    onMounted(()=>{
      document.addEventListener('click',bodyCloseMenus)
    })

    const handleBlur = (item) => {
      data.onInput = '0'
    }
    const handleFocus = (item) => {
      data.onInput = '1'
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
    // 添加图书
    const addBook = () => {
      router.push('/addBook')
    }

    const bookList = () =>{
      router.push('/bookList')
    }

    function login(){
      data.dialogVisibleLoginFrom = true
    }

    function loginSubmit(){
      const Base64 = require('js-base64').Base64
      let loginAuth = Base64.encode(loginFromRef.value.loginFrom.username+':'+loginFromRef.value.loginFrom.password)
      console.log(loginAuth)
      // 创建一个名称为name，对应值为value的cookie，由于没有设置失效时间，默认失效时间为该网站关闭时
      Cookies.set('token', 'Basic '+loginAuth)

      api.user.login().then((ret) =>{
        console.log(ret)
        Cookies.set('token', 'bearer '+ret.token)
        data.isLogin = true
        data.dialogVisibleLoginFrom = false
      }).catch(err => {
        Cookies.remove('token')
      })
    }

    function logout(){
      Cookies.remove('token')
      data.isLogin = false
    }

    function bodyCloseMenus(){
      if(data.isDropShow == true){
        data.isDropShow = false
      }
    }

    return {
      ...toRefs(data),
      handleBlur,
      handleFocus,
      returnTo,
      gotoUserIndex,
      gotoAccountSet,
      addBook,
      bookList,
      loginFromRef,
      login,
      loginSubmit,
      logout,
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
