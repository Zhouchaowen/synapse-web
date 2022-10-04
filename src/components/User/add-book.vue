<template>
  <el-form :model="form" :rules="ruleForm" ref="formRef">
    <el-form-item label="文档名称" label-width="120px" prop="title">
      <el-input v-model="form.title" autocomplete="off" placeholder="不超过100字"></el-input>
    </el-form-item>
    <el-form-item label="文档标识" label-width="120px" prop="name">
      <el-input v-model="form.name" autocomplete="off" placeholder="不超过50字"></el-input>
    </el-form-item>
    <el-form-item label="简介" label-width="120px">
      <el-input v-model="form.desc" type="textarea" maxlength="500" show-word-limit :autosize="{ minRows: 3, maxRows: 6 }" placeholder="简介不超过500字"></el-input>
    </el-form-item>
    <el-form-item label="可见性" label-width="120px">
      <el-radio-group v-model="form.isvisib">
        <el-radio label="pravite">私有 <span class="note">(只有参与者或使用令牌才能访问)</span></el-radio>
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

export default {
  name: 'addBook',
  setup () {
    const formRef = ref(null)
    const form = reactive({
      name: '',
      title: '',
      desc: '',
      isvisib: 'pravite'
    })

    const ruleForm = reactive({
      name: [
        {
          required: true,
          message: '请输入文档标识',
          trigger: 'blur'
        },
        {
          max: 50,
          message: '文档名称不超过50字',
          trigger: 'blur'
        }
      ],
      title: [
        {
          required: true,
          message: '请输入文档名称',
          trigger: 'blur'
        },
        {
          max: 10,
          message: '文档名称不超过100字',
          trigger: 'blur'
        }
      ]
    })
    const submitForm = () => {
      formRef.value.validate().then(res => {
        console.log(res)
        console.log(form)
        if (res) {
          // 调用保存图书的接口
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
</style>
