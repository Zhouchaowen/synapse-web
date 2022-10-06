<template>
  <div class="container w1224">
    <div class="bookBox">
      <book :bookList="bookList"></book>
    </div>
  </div>
</template>

<script>
import book from '@/components/Book/book'
import {onMounted, reactive, toRefs} from 'vue'
import api from '@/utils'

export default {
  name: 'recommend',
  components: {
    book
  },
  setup () {
    const state = reactive({
      bookList: []
    })

    console.log(api)
    onMounted(() => {
      api.book.getBookList("5cf37266-3473-4006-984f-9325122678b7").then((ret) =>{
        state.bookList = ret
      })
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
