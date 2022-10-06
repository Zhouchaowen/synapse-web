<template>
  <div class="card" @click="gotoDetail(item.id)" v-for="(item , index) in bookList" :key="index">
    <img :src="(item.cover == null || item.cover == undefined || item.cover == '')?'https://cover.kancloud.cn/thinkphp/thinkphp-the-hard-way!middle' : item.cover" alt="" class="cardBg">
    <div class="content">
      <span class="cc">{{item.name}}</span>
    </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router'

export default {
  name: 'book',
  props: {
    bookList: Array
  },
  setup (props) {
    const router = useRouter()
    console.log(props.bookList)
    const gotoDetail = (id) => {
      console.log(this)
      let url = router.resolve({
        path: '/graph',
        query: {
          id: id
        }
      })
      window.open(url.href,'_blank')
    }
    return {
      gotoDetail
    }
  }
}
</script>

<style scoped lang="scss">
  .card {
    height: 200px;
    width: 150px;
    border: 1px solid #d4d4d5;
    border-radius: 8px;
    position: relative;
    transition: all .5s;
    overflow: hidden;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
    .cardBg {
      width: 100%;
      height: 100%;
    }
    .content {
      font-size: 18px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      color: #fff;
      border-radius: 8px;
      .cc {
        display: inline-block;
        width: 80px;
      }
    }
    &:hover{
      box-shadow: 0 1px 3px 0 #bcbdbd, 0 0 0 0 #d4d4d5;
      transform: translateY(-3px);
      .content {
        background-color: #000c;
        opacity: .85;
        transition: background-color .5s;
      }
    }
  }
</style>
