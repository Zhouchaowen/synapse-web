<template>
  <div class="container w1224">
    <div class="bookBox">
      <book :bookList="bookList"></book>
    </div>
  </div>
</template>

<script>
import book from '@/components/Book/book'
import { reactive, toRefs } from 'vue'
export default {
  name: 'recommend',
  components: {
    book
  },
  setup () {
    const state = reactive({
      bookList: [
        {
          id: '1',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }, {
          id: '2',
          name: '零基础学Docker',
          bgsrc: ''
        }, {
          id: '3',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }, {
          id: '4',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }, {
          id: '5',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }, {
          id: '6',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }, {
          id: '7',
          name: '零基础学Docker',
          bgsrc: 'https://box.kancloud.cn/cover_thinkphp_route-master.jpg-bookmiddle'
        }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="scss">
.container,
.bookBox{
  height: 100%;
}
.bookBox {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
