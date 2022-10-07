<template>
  <el-form :model="loginFrom" :rules="ruleForm" label-width="60px"  ref="formRef">
    <el-form-item label="账号" prop="username">
      <el-input v-model="loginFrom.username" autocomplete="off" placeholder="邮箱/电话"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="cover">
      <el-input v-model="loginFrom.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'addBook',
  setup () {
    const router = useRouter()
    const formRef = ref(null)
    const loginFrom = reactive({
      username: '',
      password: '',
    })

    const ruleForm = reactive({
      username: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ],
    })

    return {
      loginFrom,
      ruleForm,
      formRef,
    }
  }
}
</script>

<style scoped lang="scss">
.el-input {
  height: 100%;
}
</style>
