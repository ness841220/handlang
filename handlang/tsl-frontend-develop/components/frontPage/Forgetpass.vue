<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="Forgetpass">
    <div class="title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>忘記密碼</h2>
    </div>
    <el-form ref="form" :model="form" class="Forgetpass_form">
      <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
        <label for="name">姓名<p>(必填)</p></label>
        <el-input id="name" v-model="form.name" name="name" placeholder="請輸入姓名" />
      </el-form-item>
      <el-form-item prop="verifyId" :rules="[{ required: true, message: '請輸入帳號', trigger: 'blur' }]">
        <label for="verifyId">帳號<p>(必填)</p></label>
        <el-input id="verifyId" v-model="form.verifyId" name="verifyId" placeholder="請輸入帳號" />
      </el-form-item>
    </el-form>

    <div class="Forgetpass_btn">
      <el-button class="TSLbutton" @click="$emit('update:forgetPass', false)">
        <p>取消</p>
      </el-button><!--defaultPopUps = true-->
      <el-button class="TSLbutton red" @click="submitForm('form',form)">
        <p>確定</p>
      </el-button>
    </div>

    <el-dialog
      :visible.sync="defaultPopUps"
      :show-close="false"
      class="defaultPopUps"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$emit('update:forgetPass', false)">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import frontendApi from '@/assets/api/frontendApi'
export default {
  props: {
    forgetPass: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        verifyId: ''
      },
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  methods: {
    submitForm (formName, form) {
      const vm = this
      const obj = Object.assign({}, form)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await frontendApi.forgotPass_verifyAcct(obj)
          if (res.isSuccess === true) {
            vm.defaultText = res.message
            vm.defaultId = 1
            vm.defaultPopUps = true
            this.$refs[formName].resetFields()
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            vm.defaultPopUps = true
          }
        } else {
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.Forgetpass{
  &_form{
    margin-top: clamp(min(10px), pc(211), max(211px));
    margin-bottom: clamp(min(10px), pc(140), max(140px));
  }
  &_btn{
    display: flex;
    justify-content: center;
    .TSLbutton{
      width: 100%;
      max-width: 180px;
      margin-top: 0;
    }
  }
  .el-form-item{
    label{
      width: 100%;
      max-width: 160px;
      font-size: 1.42857em;
      font-weight: 400;
      line-height: normal;
      letter-spacing: 3px;
      color: $default;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      margin-right: 20px;
      p{
        font-size: 100%;
        color: $red;
      }
      @include phSize{
        font-size: 1.286em;
        margin-bottom: 10px;
        justify-content: flex-start;
      }
    }
    &__content{
      width: 100%;
      display: flex;
      align-items: center;
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
      }
    }
    &__error{
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .el-input{
      &__inner{
        height: 54px;
        display: flex;
        align-items: center;
        border-radius: 10px;
        font-size: 1.111em;
        line-height: 54px;
        border: 1px solid #545454;
        &::placeholder{
          line-height: 54px;
          font-size: 1.111em;
          color: $default;
          display: flex;
          align-items: center;
        }
        &:focus{
          outline: 3px dashed #990094;
        }
      }
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
