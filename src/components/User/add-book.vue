<template>
  <el-form :model="form" :rules="ruleForm" ref="formRef">
    <el-form-item label="文档名称" label-width="120px" prop="name">
      <el-input v-model="form.name" autocomplete="off" placeholder="不超过20字"></el-input>
    </el-form-item>
    <el-form-item label="文档封面" label-width="120px" prop="cover">
      <el-input v-model="form.cover" autocomplete="off" placeholder="不超过50字"></el-input>
    </el-form-item>
    <el-form-item label="文档简介" label-width="120px">
      <el-input v-model="form.description" type="textarea" maxlength="500" show-word-limit :autosize="{ minRows: 3, maxRows: 6 }" placeholder="简介不超过500字"></el-input>
    </el-form-item>
    <el-form-item label="是否公开" label-width="120px">
      <el-radio-group v-model="form.is_visible">
        <el-radio label="private">私有 <span class="note">(只有参与者或使用令牌才能访问)</span></el-radio>
        <el-radio label="public">公开<span class="note">(任何人都可以访问)</span></el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div class="button">
    <span class="dialog-footer">
    <el-button>取消</el-button>
    <el-button type="primary" @click="submitForm"
    >确认</el-button
    >
  </span>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils'

export default {
  name: 'addBook',
  setup () {
    const router = useRouter()
    const formRef = ref(null)
    const form = reactive({
      name: '',
      cover: '',
      description: '',
      is_visible: 'private'
    })

    const ruleForm = reactive({
      name: [
        {
          required: true,
          message: '请输入文档名称',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '文档名称不超过50字',
          trigger: 'blur'
        }
      ],
    })
    const submitForm = () => {
      formRef.value.validate().then(ok => {
        if (ok) {
          // 调用保存图书的接口
          api.book.saveBook(JSON.stringify(form)).then((res) =>{
            router.push("/bookList")
          })
        }
      }, err => {
        console.log(err)
      }).catch(error => {
        console.log(error)
      })
    }
    return {
      form,
      ruleForm,
      formRef,
      submitForm
    }
  }
}
</script>

<style scoped lang="scss">
  .note {
    font-size: 12px;
    color: #999999;
    font-weight: 200;
  }
  .button{
    justify-content: center;
    display: flex;
  }
  .el-form{
    padding: 15px 30px 15px 10px;
  }
</style>
