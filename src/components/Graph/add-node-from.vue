<template>
  <el-form
    ref="ruleFormRef"
    :model="nodeFrom"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="名称" prop="name">
      <el-input v-model="nodeFrom.name" />
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'

export default {
  name: 'graph',
  setup () {

    const nodeFrom = reactive({
      name: '',
    })

    return {
      nodeFrom,
    }
  }
}
</script>
