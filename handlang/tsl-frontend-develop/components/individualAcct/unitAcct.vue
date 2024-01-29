<template>
  <div class="unitAcct">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/individualAcct">個人帳戶</a>
    </span>

    <div id="content" class="unitAcct--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>個人帳戶</h2>
    </div>

    <el-form ref="form" :rules="rules" :model="form" class="form">
      <div class="form_item">
        <el-form-item prop="verifyId" :rules="[{ required: true, message: '請輸入個人帳號', trigger: 'blur' }]">
          <label>個人帳號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled />
        </el-form-item>
        <el-form-item>
          <label for="department">部門/組別</label>
          <el-input id="department" v-model="form.department" name="department" />
        </el-form-item>
      </div>
      <el-form-item style="max-width: 600px;" prop="feature" :rules="[{ required: true, message: '請選擇機關代碼與名稱', trigger: 'change' }]">
        <label for="feature">機關代碼與名稱<p>(必填)</p></label>
        <div class="featureInput">
          <el-select
            ref="select"
            v-model="form.feature"
            remote
            filterable
            reserve-keyword
            :remote-method="remoteMethod"
            placeholder="關鍵字請輸入2個字(含)以上"
            :loading="featureloading"
            popper-class="defaultSelect"
            @hook:mounted="cancalReadOnly"
            @visible-change="cancalReadOnly"
          >
            <el-option v-for="item,key,index in asGroup" :key="index" :label="key + item" :value="key" />
          </el-select>
          <div v-if="closeDiv(form.feature)==false" class="inputText" @click="remoteMethod">
            搜尋
            <i class="el-icon-search" />
          </div>
          <div v-else class="inputText" style="cursor: pointer;" @click="clearablefeature">
            清除
          </div>
        </div>
      </el-form-item>
      <div class="form_item">
        <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" />
        </el-form-item>
        <el-form-item>
          <label for="positionTitle">職稱</label>
          <el-input id="positionTitle" v-model="form.positionTitle" name="positionTitle" />
        </el-form-item>
      </div>
      <el-form-item prop="Email" :rules="[{ required: true, message: '請輸入電子信箱', trigger: 'blur' },{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
        <label for="Email">電子信箱<p>(必填)</p></label>
        <el-input id="Email" v-model="form.Email" name="Email" />
      </el-form-item>
      <div class="form_item">
        <el-form-item prop="telphone">
          <label for="telphone">電話號碼</label>
          <el-col :span="7">
            <!-- <el-form-item prop="telphoneFirst"> -->
            <el-select id="telphoneFirst" v-model="form.telphoneFirst" placeholder="請選擇" name="telphoneFirst" popper-class="defaultSelect">
              <el-option label="02" value="02" />
              <el-option label="03" value="03" />
              <el-option label="037" value="037" />
              <el-option label="04" value="04" />
              <el-option label="049" value="049" />
              <el-option label="05" value="05" />
              <el-option label="06" value="06" />
              <el-option label="07" value="07" />
              <el-option label="08" value="08" />
              <el-option label="082" value="082" />
              <el-option label="0826" value="0826" />
              <el-option label="0836" value="0836" />
              <el-option label="089" value="089" />
            </el-select>
            <!-- </el-form-item> -->
            <!-- <el-input id="telphoneFirst" v-model="form.telphoneFirst" name="telphoneFirst" placeholder="範例：04" maxlength="3" /> -->
          </el-col>
          <el-col :span="2">
            <div style="text-align:center;padding:10px;font-size: 25px;">
              -
            </div>
          </el-col>
          <el-col :span="15">
            <el-input id="telphoneSecond" v-model="form.telphoneSecond" name="telphoneSecond" placeholder="範例：12345678分機123" maxlength="13" />
          </el-col>
        </el-form-item>
        <el-form-item prop="cellphone">
          <label for="cellphone">手機號碼<p>(必填)</p></label>
          <el-input id="cellphone" v-model="form.cellphone" inputmode="numeric" name="cellphone" placeholder="範例：0963047746"/>
        </el-form-item>
      </div>
      <p class="passtext">
        密碼必須包含6碼以上，且不能與您的帳號相同。允許使用英文字母、數字和符號。
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

      <div class="unitAcct_btn">
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
  data () {
    const newsPass = (rule, value, callback) => {
      if (value === this.form.verifyId) {
        callback(new Error('密碼不能與您的帳號相同'))
      } else if (value.length > 0) {
        // eslint-disable-next-line no-useless-escape
        const regex = /^[a-zA-Z0-9@|$|^|.|*|#|?|%|&|!|(|)|{|}|<|>|+|-|,|.|=|~|`|_|/|\|:|；]{6}/
        if (!regex.test(value)) {
          callback(new Error('密碼必須包含6碼以上'))
        } else {
          callback()
        }
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
        verifyId: '',
        feature: '',
        name: '',
        positionTitle: '',
        Email: '',
        telphone: '',
        telphoneFirst: '',
        telphoneSecond: '',
        cellphone: '',
        newsPass: '',
        pass: '',
        department: '',
        isReal: '',
        acctStatus: ''
      },
      asGroup: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctDelete: false,
      logoutSuccess: false,
      featureloading: false,
      rules: {
        newsPass: [{ validator: newsPass, trigger: 'blur' }],
        pass: [{ validator: pass, trigger: 'blur' }],
        // telphone: [{ pattern: /\d{2}-\d{7}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        telphoneFirst: [{ pattern: /\d{3}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        telphoneSecond: [{ pattern: /\d{8}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        cellphone: [{ required: true, pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.handlang_acctInfo()
  },
  methods: {
    toTop () {
      const element = document.getElementById('a_c')
      element.scrollIntoView({
        behavior: 'smooth'
      })
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            verifyId: form.verifyId,
            feature: form.feature,
            name: form.name,
            positionTitle: vm.closeDiv(form.positionTitle) !== false ? form.positionTitle : '',
            Email: form.Email,
            telphone: vm.nullreturn(form.telphoneFirst) + '-' + vm.nullreturn(form.telphoneSecond),
            cellphone: form.cellphone,
            password: form.newsPass,
            department: vm.closeDiv(form.department) !== false ? form.department : '',
            acctType: '2',
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
            files: '',
            remark: '',
            isReal: form.isReal,
            acctStatus: form.acctStatus
          }
          const res = await frontendApi.acctInfo_register_edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '您的修改已儲存'
            vm.defaultId = 1
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
    async handlang_acctInfo () {
      const vm = this
      const obj = {
        token: this.TSLtoken
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.form.name = data.name
        vm.form.verifyId = data.verifyId
        vm.form.cellphone = data.cellphone
        vm.form.positionTitle = data.positionTitle
        vm.form.Email = data.email
        vm.form.telphone = data.telphone
        vm.form.telphoneFirst = data.telphone.split('-')[0]
        vm.form.telphoneSecond = data.telphone.split('-')[1]
        vm.form.department = data.department
        vm.getCodeAsGroup(data.featureName)
        vm.form.feature = data.feature
        vm.form.isReal = data.isReal
        vm.form.acctStatus = data.acctStatus
      }
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
    },
    remoteMethod (query) {
      if (query.length >= 2) {
        this.getCodeAsGroup(query)
      }
    },
    clearablefeature () {
      this.form.feature = ''
      this.asGroup = []
    },
    async getCodeAsGroup (StrVal) {
      const obj = {
        StrVal
      }
      const res = await frontendApi.getCodeAsGroup(obj)
      if (res.isSuccess === true) {
        this.asGroup = res.data
      }
    }
  }
}
</script>

<style lang="scss">
.unitAcct{
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
    margin-top: clamp(min(20px), pc(40), max(40px));
    .TSLbutton{
      min-width: 113px;
    }
  }

  .el-form{
    .featureInput{
      display: flex;
      align-items: center;
      .el-input__inner{
        border-radius: 10px 0 0 10px;
      }
      .el-select .el-input.is-focus .el-input__inner{
        border: 1px solid #545454;
      }
    }
    .inputText{
      width: 96px;
      height: 54px;
      flex-shrink: 0;
      box-sizing: border-box;
      border: 1px solid #545454;
      border-left: 0;
      background-color: $red;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      border-radius: 0 10px 10px 0;
      cursor: default;
      font-size: clamp(min(1.125em), pc(20), max(1.250em));
      i{
        margin-left: 8px;
        font-size: clamp(min(1.125em), pc(20), max(1.250em));
      }
    }
  }
}
</style>
