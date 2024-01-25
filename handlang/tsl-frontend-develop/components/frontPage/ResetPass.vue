<template>
  <div class="resetPass">
    <div class="title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>重設密碼</h2>
    </div>
    <el-form ref="form" :model="form" :rules="rules" class="resetPass_form">
      <el-form-item prop="newsPass">
        <label for="newsPass">新密碼<p>(必填)</p></label>
        <el-input id="newsPass" v-model="form.newsPass" type="password" name="newsPass" placeholder="請輸入新密碼" />
      </el-form-item>
      <el-form-item class="againPass" prop="pass">
        <label for="pass">再次輸入密碼<p>(必填)</p></label>
        <el-input id="pass" v-model="form.pass" type="password" name="pass" placeholder="再次輸入密碼" />
      </el-form-item>
      <el-form-item prop="pinCode">
        <label for="pinCode">驗證碼<p>(必填)</p></label>
        <el-input id="pinCode" v-model="form.pinCode" name="pinCode" placeholder="請輸入驗證碼" />
      </el-form-item>
    </el-form>
    <div class="resetPass_tool">
      <div class="pinCode">
        <img :src="pinCodeBase64" width="100"></img>
        <!-- <p>{{ pinCodeNumber }}</p> -->
      </div>
      <el-button class="TSLbutton" @click="getVerifyCode()">
        <img src="~/static/img/icon/changepinCode.png" alt="">
        <p>更換驗證碼</p>
      </el-button>
      <el-button class="TSLbutton" @click="speakTtsSpeech()">
        <img src="~/static/img/icon/playCode.png" alt="">
        <p>播放驗證碼</p>
      </el-button>
    </div>

    <div class="resetPass_btn">
      <el-button class="TSLbutton red" @click="cancelBack">
        <p>取消</p>
      </el-button>
      <el-button class="TSLbutton" @click="submitForm('form',form)">
        <p>確定</p>
      </el-button>
    </div>

    <el-dialog
      :visible.sync="defaultPopUps"
      :show-close="false"
      class="defaultPopUps"
      @close="defaultId==0?defaultPopUps = false:$router.push({ path: '/' })"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/' })">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Speech from 'speak-tts'
import frontendApi from '@/assets/api/frontendApi'
export default {
  data () {
    const newsPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此欄位為必填'))
      } else {
        // eslint-disable-next-line no-useless-escape
        const regex = /^[a-zA-Z0-9@|$|^|.|*|#|?|%|&|!|(|)|{|}|<|>|+|-|,|.|=|~|`|_|/|\|:|；]{6}/
        if (!regex.test(value)) {
          callback(new Error('密碼必須包含6碼以上'))
        }
        if (this.form.pass !== '') {
          this.$refs.form.validateField('change')
        }
        callback()
      }
    }
    const pinCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入驗證碼'))
      } else if (value !== this.pinCodeNumber) {
        callback(new Error('驗證碼輸入錯誤'))
      } else {
        callback()
      }
    }
    const pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此欄位為必填'))
      } else if (value !== this.form.newsPass) {
        callback(new Error('兩次密碼不一致!'))
      } else {
        callback()
      }
    }
    return {
      speech: null,
      passToken: '',
      pinCodeNumber: '',
      pinCodeBase64: '',
      form: {
        newsPass: '',
        pass: '',
        pinCode: ''
      },
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      gid: '',
      rules: {
        newsPass: [{ validator: newsPass, trigger: 'blur' }],
        pass: [{ validator: pass, trigger: 'blur' }],
        pinCode: [{ validator: pinCode, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.speechInit()
    this.getVerifyCode()
  },
  methods: {
    async getVerifyCode () {
      const vm = this
      const res = await frontendApi.getVerifyCode()
      if (res.isSuccess === true) {
        vm.gid = res.data.gid
        vm.pinCodeNumber = res.data.verifyCode
        vm.pinCodeBase64 = 'data:image/png;base64, ' + res.data.imgBase64
      }
    },
    submitForm (formName, form) {
      const vm = this
      this.$refs[formName].validate(async (valid) => {
        this.passToken = sessionStorage.getItem('passToken')
        if (valid) {
          const obj = {
            token: this.passToken,
            password: form.newsPass
          }
          const res = await frontendApi.forgotPass_resetPassword(obj)
          if (res.isSuccess === true) {
            vm.defaultText = '您的密碼已重新設定，請重新登入。'
            vm.defaultId = 1
            vm.defaultPopUps = true
            sessionStorage.removeItem('passToken')
            localStorage.removeItem('TSLtoken')
            localStorage.removeItem('TSLform')
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
    },
    cancelBack () {
      sessionStorage.removeItem('passToken')
      this.$router.push({ path: '/' })
    },
    speechInit () {
      this.speech = new Speech()
      this.speech.setLanguage('zh-TW')
      this.speech.init().then(() => {})
    },
    speakTtsSpeech () {
      this.speech.speak({ text: this.pinCodeNumber })
    }
  }
}
</script>

<style lang="scss">
.resetPass{
  &_form{
    width: 100%;
    max-width: 625px;
    margin: 0 auto;
    margin-top: clamp(min(10px), pc(89), max(89px));
  }
  .el-form-item.againPass{
    label{
      flex-direction: column;
      align-items: flex-end;
      @include phSize{
        flex-direction: row;
        align-items: flex-start;
      }
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
        max-width: 100%;
        font-size: 1.286em;
        margin-bottom: 10px;
        margin-right: 0;
        justify-content: flex-start;
        box-sizing: border-box;
      }
    }
    &__error{
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
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
  &_tool{
    display: flex;
    justify-content: center;
    .TSLbutton{
      width: 100%;
      max-width: 170px;
      margin: 0 10px;
    }
    .pinCode{
      width: 100%;
      max-width: 134px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 10px;
      background: #545454;
      p{
        color: #ffffff;
      }
    }
    @include phSize{
      flex-direction: column;
      align-items: center;
      .TSLbutton{
        margin: 10px 0;
      }
    }
  }
  &_btn{
    display: flex;
    justify-content: center;
    .TSLbutton{
      width: 100%;
      max-width: 180px;
      margin-top: clamp(min(10px), pc(96), max(96px));
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
