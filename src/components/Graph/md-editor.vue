<template>
  <div id="md" class="md" ref="previewRef">
    <v-md-editor v-model="markdown" height="100%" @save="save"></v-md-editor>
  </div>
</template>

<script>
import {onMounted, reactive, ref, toRefs, watch} from 'vue'
import api from '@/utils'
import {ElMessage} from "element-plus";

export default {
  name: 'md-editor',
  props: ['nodeId'],
  setup(props){
    console.log(props)
    const state=reactive({
      markdown: "",
    })

    watch(
      props,
      (newProps) => {
        console.log("watch",newProps.nodeId); //这里看到新值
        getMarkDown(newProps.nodeId)
      }
    )

    getMarkDown(props.nodeId)
    function getMarkDown(nodeId){
      state.markdown = ""
      api.md.getMdById(nodeId).then((ret) =>{
        if (ret != null){
          state.markdown = ret.content
        }
        ElMessage({
          message: "加载成功",
          type: 'success',
          duration: 3 * 1000
        })
      })
    }

    function save(text) {
      let form = {
        node_id: props.nodeId,
        content: text,
      }

      api.md.saveMd(JSON.stringify(form)).then((ret) =>{
        ElMessage({
          message: "保存成功",
          type: 'success',
          duration: 3 * 1000
        })
      }).catch(err => {
        ElMessage({
          message: "保存失败",
          type: 'error',
          duration: 3 * 1000
        })
      })
    }
    return {
      ...toRefs(state),
      save,
    }
  }

}
</script>

<style scoped>
.md {
  height: 100%;
}
</style>
