<template>
  <div id="md" class="md" ref="previewRef">
    <v-md-editor :model-value="markdown" height="100%"></v-md-editor>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router';
export default {
  name: 'md-editor',
  setup(){
    const router = useRouter()
    const state=reactive({
      titles:[],
      id: router.currentRoute.value.query.id,
      markdown: "# test",
    })

    // function save() {
    //   console.log(state.markdown)
    // }
    return {
      ...toRefs(state),
    }
  }

}
</script>

<style scoped>
.md {
  height: 100%;
}
</style>
