<template>
  <div class="admainAcct">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/individualAcct">個人帳戶</a>
    </span>

    <div id="content" class="admainAcct--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>個人帳戶</h2>
    </div>

    <el-form ref="form" :rules="rules" :model="form" class="form">
      <div class="form_item">
        <el-form-item prop="verifyId">
          <label for="verifyId">個人帳號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled />
        </el-form-item>
        <el-form-item>
          <label for="department">單位名稱</label>
          <el-input id="department" v-model="form.department" name="department" />
        </el-form-item>
      </div>
      <el-form-item prop="Email" :rules="[{ required: true, message: '請輸入電子信箱', trigger: 'blur' },{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
        <label for="Email">電子信箱<p>(必填)</p></label>
        <el-input id="Email" v-model="form.Email" name="Email" />
      </el-form-item>
      <div class="form_item">
        <el-form-item prop="telphone">
          <label for="telphone">電話號碼<p>(必填)</p></label>
          <el-input id="telphone" v-model="form.telphone" name="telphone" placeholder="範例：04-12345678" />
        </el-form-item>
        <el-form-item prop="cellphone">
          <label for="cellphone">手機號碼<p>(必填)</p></label>
          <el-input id="cellphone" v-model="form.cellphone" inputmode="numeric" name="cellphone" />
        </el-form-item>
      </div>
      <p class="passtext">
        密碼必須包含{{ passco }}碼以上，最多{{ passmax }}碼，並且須包含{{ passen }}英文跟{{ passtf }}位數字，可使用特殊符號。
      </p>
      <div class="form_item pass">
        <el-form-item prop="newsPass">
          <label>密碼</label>
          <el-input v-model="form.newsPass" />
        </el-form-item>
        <el-form-item prop="pass">
          <label>確認密碼</label>
          <el-input v-model="form.pass" />
        </el-form-item>
      </div>

      <div class="admainAcct_btn">
        <el-button class="TSLbutton" @click="deletePopUp">
          <p>停用帳號</p>
        </el-button>
        <el-button class="TSLbutton red" @click="submitForm('form',form)">
          <p>儲存</p>
        </el-button>
      </div>
    </el-form>

    <el-dialog
      :visible.sync="defaultPopUps"
      :show-close="false"
      class="defaultPopUps"
      @close="closedialog"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button v-if="acctDelete" class="TSLbutton" @click="defaultPopUps = false">
            <p>取消</p>
          </el-button>
          <el-button v-if="!acctDelete" class="TSLbutton red" @click="defaultPopUps = false;">
            <p>確定</p>
          </el-button>
          <el-button v-else class="TSLbutton red" @click="handlang_acctDelete(form.verifyId)">
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
  layout: 'navMenu',
  data () {
    const newsPass = (rule, value, callback) => {
      if (value === this.form.verifyId) {
        callback(new Error('密碼不能與您的帳號相同'))
      } else if (value.length > 0) {
        const passen = new RegExp('[a-zB-Z]{' + this.passen + '}')
        const passtf = new RegExp('[0-9]{' + this.passtf + '}')
        if (!passen.test(value) || !passtf.test(value)) {
          callback(new Error('須包含' + this.passen + '英文跟' + this.passtf + '位數字'))
        } else if (value.length < this.passco) {
          callback(new Error('密碼必須包含' + this.passco + '碼以上'))
        } else if (value.length > this.passmax) {
          callback(new Error('密碼最多' + this.passmax + '碼'))
        }
        callback()
      } else {
        if (this.form.pass !== '') {
          this.$refs.form.validateField('change')
        }
        callback()
      }
    }
    const pass = (rule, value, callback) => {
      if (value !== this.form.newsPass) {
        callback(new Error('兩次密碼不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        department: '',
        verifyId: '',
        Email: '',
        telphone: '',
        cellphone: '',
        newsPass: '',
        pass: '',
        acctType: '',
        acctStatus: '',
        isReal: ''
      },
      editform: {},
      read: false,
      privacyPolicy: false,
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctDelete: false,
      logoutSuccess: false,
      rules: {
        newsPass: [{ validator: newsPass }],
        pass: [{ validator: pass }],
        telphone: [{ required: true, pattern: /\d{2}-\d{7}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        cellphone: [{ required: true, pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }]
      },
      // 密碼強度
      passco: 0, // 密碼必需包含X碼
      passmax: 0, // 最多X碼
      passen: 0, // 密碼必需包含X碼英文
      passtf: 0 // 密碼必需包含X碼數字
    }
  },
  mounted () {
    this.handlang_acctInfo()
    this.getACTST()
  },
  methods: {
    async handlang_acctInfo () {
      const vm = this
      const obj = {
        token: this.TSLtoken
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.editform = data
        vm.form.name = data.name
        vm.form.verifyId = data.verifyId
        vm.form.cellphone = data.cellphone
        vm.form.telphone = data.telphone
        vm.form.Email = data.email
        vm.form.department = data.department
        vm.form.acctType = data.acctType
        vm.form.acctStatus = data.acctStatus
        vm.form.isReal = data.isReal
      }
    },
    async getACTST () {
      const vm = this
      const obj = {
        codeType: 'ACTST'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          switch (item.codeId) {
            case 'PASSCO':
              vm.passco = item.intVal
              break
            case 'PASMAX':
              vm.passmax = item.intVal
              break
            case 'PASSEN':
              vm.passen = item.intVal
              break
            case 'PASSTF':
              vm.passtf = item.intVal
              break
            default:
              break
          }
        }
      }
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            verifyId: form.verifyId,
            feature: '',
            name: form.verifyId,
            positionTitle: '',
            Email: form.Email,
            telphone: form.telphone,
            cellphone: form.cellphone,
            password: form.newsPass,
            department: form.department,
            acctType: form.acctType,
            lineId: '',
            city: '',
            dist: '',
            address: '',
            eContactName: '',
            eContactNum: '',
            hCategory: '',
            hCategoryNote: '',
            hLevel: '',
            hLevelNote: '',
            usualComm: '',
            usualCommNote: '',
            expirydate: '',
            pCategory: '',
            pLevel: '',
            lisenceLevel: '',
            cantractExpaireDate: '',
            ltcBeginDate: '',
            htcBeginDate: '',
            serviceDateTimesB: '',
            serviceDateTimesE: '',
            bankCode: '',
            bankName: '',
            accountNum: '',
            allowSupport: '',
            acctStatus: vm.editform.acctStatus,
            files: '',
            remark: '',
            isReal: form.isReal
          }
          const res = await frontendApi.acctInfo_register_edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '您的修改已儲存'
            vm.defaultId = 0
            this.defaultPopUps = true
            this.handlang_acctInfo()
          } else {
            vm.defaultText = '修改失敗，請重新嘗試'
            this.defaultPopUps = true
            this.handlang_acctInfo()
          }
        } else {
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        }
      })
    },
    deletePopUp () {
      const vm = this
      vm.acctDelete = true
      vm.defaultText = '停用帳號後將無法繼續使用本系統服務，如欲重新啟用帳號，請聯絡行政窗口。是否確定停用帳號?'
      vm.defaultId = 0
      this.defaultPopUps = true
    },
    async handlang_acctDelete (verifyId) {
      const vm = this
      const obj = {
        verifyId
      }
      const res = await frontendApi.handlang_acctDelete(obj)
      if (res.isSuccess === true) {
        this.$cookies.remove('TSLtoken')
        localStorage.removeItem('TSLtoken')
        localStorage.removeItem('TSLform')
        this.$router.replace({ path: '/' })
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
        vm.acctDelete = false
      }
    },
    closedialog () {
      const vm = this
      if (vm.logoutSuccess === true) {
        this.logout()
      } else {
        this.acctDelete = false
      }
    },
    async logout () {
      const token = localStorage.getItem('TSLtoken')
      if (this.closeDiv(token) !== false) {
        const obj = {
          token
        }
        const res = await frontendApi.logout(obj)
        if (res.isSuccess === true) {
          this.$cookies.remove('TSLtoken')
          localStorage.removeItem('TSLtoken')
          localStorage.removeItem('TSLform')
          window.dispatchEvent(new CustomEvent('locate-localstorage-changed', {
            detail: {
              TSLtoken: localStorage.getItem('TSLtoken'),
              TSLform: localStorage.getItem('TSLform')
            }
          }))
          this.$router.replace({ path: '/' })
        }
      } else {
        this.$cookies.remove('TSLtoken')
        localStorage.removeItem('TSLtoken')
        localStorage.removeItem('TSLform')
        window.dispatchEvent(new CustomEvent('locate-localstorage-changed', {
          detail: {
            TSLtoken: localStorage.getItem('TSLtoken'),
            TSLform: localStorage.getItem('TSLform')
          }
        }))
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>

<style lang="scss">
.admainAcct{
  &--title{
    height: 50px;
    display: flex;
    align-items: center;
    color: $red;
    background: #FFF9F9;
    padding: 0 clamp(min(22px), pc(36), max(36px));
    margin-top: clamp(min(20px), pc(40), max(40px));
    margin-bottom: clamp(min(20px), pc(48), max(48px));
    box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
    img{
      width: 20px;
      height: 33px;
      margin-right: 10px;
    }
  }

  &_btn{
    display: flex;
    align-items: center;
    margin-top: clamp(min(20px), pc(30), max(30px));
    .TSLbutton{
      width: 100%;
      max-width: 121px;
      min-width: 109px;
    }
    @include phSize{
      justify-content: center;
    }
  }
}
</style>
