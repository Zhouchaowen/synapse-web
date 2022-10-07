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
      console.log(state.markdown,"load")
      state.markdown = ""
      api.md.getMdById(nodeId).then((ret) =>{
        state.markdown = ret.content
      }).catch(err => {
        ElMessage({
          message: err.message,
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
        console.log(ret)
        ElMessage({
          message: "保存成功",
          type: 'success',
          duration: 3 * 1000
        })
      }).catch(err => {
        console.log(err)
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
