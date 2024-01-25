<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="TSL_login">
    <div class="title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>會員登入</h2>
    </div>
    <el-form ref="form" :model="form" :rules="rules" class="TSL_login_form">
      <el-form-item prop="verifyId">
        <label for="verifyId">帳號<p>(必填)</p></label>
        <el-input
          id="verifyId"
          v-model="form.verifyId"
          name="verifyId"
          placeholder="請輸入帳號"
          @change="chgInput('1', form.verifyId)"
          @keyup.enter.native="submitForm('form', form)"
        />
      </el-form-item>
      <el-form-item prop="password">
        <label for="password">密碼<p>(必填)</p></label>
        <el-input
          id="password"
          v-model="form.password"
          type="password"
          name="password"
          placeholder="請輸入密碼"
          @change="chgInput('2', form.password)"
          @keyup.enter.native="submitForm('form',form)"
        />
      </el-form-item>
      <el-form-item prop="pinCode">
        <label for="pinCode">驗證碼<p>(必填)</p></label>
        <el-input
          id="pinCode"
          v-model="form.pinCode"
          name="pinCode"
          placeholder="請輸入驗證碼"
          @change="chgInput('3', form.pinCode)"
          @keyup.enter.native="submitForm('form',form)"
        />
      </el-form-item>
    </el-form>
    <div class="TSL_login_tool">
      <div class="pinCode" style="border: #545454 solid 1px">
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

    <div class="TSL_login_btn" style="padding-top: 5px;">
      <el-button class="TSLbutton" @click="$emit('update:forgetPass', true)">
        <p>忘記密碼</p>
      </el-button>
      <el-button class="TSLbutton red" @click="submitForm('form',form)">
        <p>登入</p>
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
          <el-button v-if="defaultId == 0 || defaultId == 1" class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/' })">
            <p>確定</p>
          </el-button>
          <el-button v-else-if="defaultId == 2" class="TSLbutton red" @click="resetPass(passToken)">
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
  props: {
    forgetPass: {
      type: Boolean,
      default () {
        return false
      }
    },
    input1: {
      type: String,
      default: ''
    },
    input2: {
      type: String,
      default: ''
    },
    input3: {
      type: String,
      default: ''
    }
  },
  data () {
    const pinCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入驗證碼'))
      } else if (value !== this.pinCodeNumber) {
        callback(new Error('驗證碼輸入錯誤'))
      } else {
        callback()
      }
    }
    return {
      speech: null,
      passToken: '',
      form: {
        verifyId: '',
        password: '',
        pinCode: ''
      },
      gid: '',
      pinCodeNumber: '',
      pinCodeBase64: '',
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      rules: {
        pinCode: [{ validator: pinCode, trigger: 'blur' }],
        verifyId: [{ required: true, message: '請輸入帳號', trigger: 'change' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'change' }]
      }
    }
  },
  watch: {
    input1: {
      handler (newValue, oldValue) {
        this.form.verifyId = newValue
      }
    },
    input2: {
      handler (newValue, oldValue) {
        this.form.password = newValue
      }
    },
    input3: {
      handler (newValue, oldValue) {
        this.form.pinCode = newValue
      }
    }
  },
  mounted () {
    const vm = this
    vm.speechInit()
    vm.$nextTick(() => {
      vm.getVerifyCode()
    })
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
    chgInput (type, val) {
      this.$emit('rtnUpdateInput', type, val)
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (!valid) {
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        } else {
          const obj = {
            gid: vm.gid,
            verifyCode: vm.pinCodeNumber
          }
          const res = await frontendApi.chkVerifyCode(obj)
          if (res.isSuccess === true) {
            this.handlang_login(formName, form)
          } else {
            vm.defaultText = '驗證碼錯誤'
            vm.defaultId = 0
            vm.defaultPopUps = true
          }
        }
      })
    },
    async handlang_login (formName, form) {
      const vm = this
      const obj = {
        verifyId: form.verifyId,
        password: form.password
      }
      const res = await frontendApi.handlang_login(obj)
      if (res.isSuccess === true) {
        if (res.data.isChangePass === true) {
          vm.defaultId = 2
          vm.defaultText = '密碼已重置，請修改密碼'
          vm.defaultPopUps = true
          vm.passToken = res.data.token
        } else {
          vm.defaultId = 0
          const obj = {
            name: res.data.name.replace(/\s*/g, ''),
            token: res.data.token,
            isReal: res.data.isReal,
            acctType: Number(res.data.acctType.replace(/\s*/g, '')),
            isLogin: true,
            verifyId: form.verifyId
          }
          this.$cookies.set('TSLtoken', res.data.token)
          localStorage.setItem('TSLtoken', res.data.token)
          localStorage.setItem('TSLform', JSON.stringify(obj))
          localStorage.setItem('TSLtype', Number(res.data.acctType.replace(/\s*/g, '')))
          window.dispatchEvent(new CustomEvent('locate-localstorage-changed', {
            detail: {
              TSLtoken: localStorage.getItem('TSLtoken'),
              TSLform: localStorage.getItem('TSLform')
            }
          }))
          this.$refs[formName].resetFields()
          this.$router.push({ path: '/caseInquiry' })
        }
      } else {
        if (res.data.isLock === true) {
          vm.defaultText = '此帳號已被鎖定，請聯絡行政窗口。'
        } else if (res.data.isWorngPass !== 0) {
          vm.defaultText = '密碼錯誤 ' + res.data.isWorngPass + '次'
        } else {
          vm.defaultText = res.message
        }
        vm.defaultPopUps = true
      }
    },
    resetPass (passToken) {
      this.$router.push({ path: '/forgetpass?passToken=' + passToken })
    },
    speechInit () {
      this.speech = new Speech()
      this.speech.setLanguage('zh-TW')
      this.speech.init().then(() => {})
    },
    speakTtsSpeech () {
      let code = this.pinCodeNumber.split('')
      code = code.join(' ')
      this.speech.speak({ text: code })
    }
    // playVoice () {
    //   this.handleSpeak('012345') // 传入需要播放的文字
    // },
    // // 语音播报的函数
    // handleSpeak (text) {
    //   const synth = window.speechSynthesis
    //   const msg = new SpeechSynthesisUtterance()
    //   msg.text = text // 文字内容: 小朋友，你是否有很多问号
    //   msg.lang = 'zh-TW' // 使用的语言:中文
    //   msg.volume = 1 // 声音音量：1
    //   msg.rate = 1 // 语速：1
    //   msg.pitch = 1 // 音高：1
    //   synth.speak(msg) // 播放
    // },
    // // 语音停止
    // handleStop (e) {
    //   const synth = window.speechSynthesis
    //   const msg = new SpeechSynthesisUtterance()
    //   msg.text = e
    //   msg.lang = 'zh-CN'
    //   synth.cancel(msg)
    // }
  }
}
</script>

<style lang="scss">
.TSL_login{
  &_form{
    width: 100%;
    max-width: 625px;
    margin: 0 auto;
    margin-top: clamp(min(10px), pc(89), max(89px));
  }
  .el-form-item{
    margin-bottom: 25px;
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
    &__error{
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: clamp(min(1.125em), pc(20), max(1.250em));
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
      background: #ffffff;
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
      margin-top: 100px;
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
