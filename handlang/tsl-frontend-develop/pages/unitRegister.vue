<template>
  <div class="unitRegister">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/unitRegister">單位註冊</a>
    </span>

    <div class="unitRegister_form">
      <div id="content" class="unitRegister_form--title">
        <img src="~/static/img/doubleRight.png" alt="">
        <h2>單位註冊</h2>
      </div>

      <el-form ref="form" :rules="rules" :model="form" class="form">
        <p class="text">
          <font style="color:#0048C2">
            個人帳號長度2碼(含)以上，允許使用英文字母、數字。
          </font>
          通過驗證後不得修改。
        </p>
        <div class="form_item">
          <el-form-item
            prop="verifyId"
            :rules="[
              { required: true, message: '請輸入個人帳號', trigger: 'blur' },
              { pattern: /^[a-zA-Z0-9]{2}/, message: '帳號長度最少兩碼', trigger: 'blur' }
            ]"
          >
            <label for="verifyId">個人帳號<p>(必填)</p></label>
            <el-input id="verifyId" v-model="form.verifyId" name="verifyId" placeholder="範例：ntpc0963047746" />
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
              ref="featureselect"
              v-model="form.feature"
              remote
              filterable
              reserve-keyword
              :remote-method="remoteMethod"
              placeholder="範例：中華民國聾人協會"
              :loading="featureloading"
              popper-class="defaultSelect"
              @blur.native.capture="onblur"
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
            <el-input id="name" v-model="form.name" name="name" placeholder="範例：王小明" />
          </el-form-item>
          <el-form-item>
            <label for="positionTitle">職稱</label>
            <el-input id="positionTitle" v-model="form.positionTitle" name="positionTitle" />
          </el-form-item>
        </div>
        <el-form-item prop="Email" :rules="[{ required: true, message: '請輸入電子信箱', trigger: 'blur' },{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
          <label for="Email">電子信箱<p>(必填)</p></label>
          <el-input id="Email" v-model="form.Email" name="Email" placeholder="範例：ntcst@nad.org.tw" />
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
            <el-input id="cellphone" v-model="form.cellphone" inputmode="numeric" name="cellphone" placeholder="範例：0963047746" />
          </el-form-item>
        </div>
        <p class="passtext">
          密碼必須包含6碼以上，且不能與您的帳號相同。允許使用英文字母、數字和符號。
        </p>
        <div class="form_item pass">
          <el-form-item prop="newsPass">
            <label for="newsPass">密碼<p>(必填)</p></label>
            <el-input id="newsPass" v-model="form.newsPass" type="password" name="newsPass" />
          </el-form-item>
          <el-form-item prop="pass">
            <label for="pass">確認密碼<p>(必填)</p></label>
            <el-input id="pass" v-model="form.pass" type="password" name="pass" />
          </el-form-item>
        </div>

        <div class="read">
          <el-checkbox v-model="read">
            <p class="readcheck">
              我已詳閱<el-button @click="privacyPolicy=true">
                隱私權政策
              </el-button>。
            </p>
          </el-checkbox>
        </div>

        <div class="unitRegister_btn">
          <el-button class="TSLbutton" @click="$router.push({ path: '/' })">
            <p>返回</p>
          </el-button>
          <el-button class="TSLbutton red" @click="submitForm('form',form)">
            <p>送出</p>
          </el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      top="5vh"
      :visible.sync="privacyPolicy"
      class="privacyPolicy"
      :close-on-click-modal="false"
      tabindex="0"
      @open="customerDialogOpen"
    >
      <div class="privacyPolicy_title">
        <h6>網站個人隱私權及資訊安全宣告</h6>
      </div>
      <div class="privacyPolicy_content">
        <p>歡迎來到新北市手語翻譯暨同步聽打服務線上申辦網站！本網站為了保障您線上隱私，讓您能夠安心的使用本網站為您所提供的各項服務，我們在此先向您說明本網站的資料安全及隱私權保護政策。</p>
        <br><br>
        <h6>個人資料之收集及運用</h6>
        <p>使用者進入本網站時，並不需要輸入個人資料，而使用者瀏覽網站網頁或使用網站上查詢服務功能時，伺服器將自動產生相關紀錄，包括如使用者上站的IP位址、使用時間、使用者的瀏覽器、瀏覽及點選資料紀錄等。但這些資料僅供作網站流量分析和網路行為調查，以便提供更好的服務，進而提昇網站的使用效能，作為日後網站改進的參考。</p>
        <br><br>
        <p>除了上述方式以外，如參與本市手語翻譯及同步聽打服務或其他相關服務時，我們會保存您的通訊紀錄，以作為用戶聯絡之用。</p>
        <br><br>
        <p>本網站遵守「個人資料保護法」之規範，保障用戶隱私權益，保證不對外公開，但事先獲得用戶明確授權、依據有關法律規章規定、應司法機關調查要求、為維護社會公眾利益、為維護本網站合法權益之情形，不在此限。</p>
        <br><br>
        <h6>資料安全及保護</h6>
        <p>本網站的伺服器設有防火牆及入侵偵測系統，防止非法入侵、破壞或竊取資料，避免相關資料遭到非法存取使用。</p>
        <br><br>
        <h6>傳送資訊或電子郵件之政策</h6>
        <p>本網站所傳送之電子郵件係於取得您的同意後，將服務相關資訊以電子郵件傳送給您。</p>

        <div class="privacyPolicy_content--btn">
          <el-button class="TSLbutton red" @click="privacyPolicy=false;read=true">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>

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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/' })">
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
      if (value === '') {
        callback(new Error('此欄位為必填'))
      } else if (value === this.form.verifyId) {
        callback(new Error('密碼不能與您的帳號相同'))
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
        department: ''
      },
      asGroup: [],
      read: false,
      privacyPolicy: false,
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
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
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-單位註冊'
  },
  mounted () {
    this.getCodeAsGroup()
  },
  methods: {
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (vm.read !== true) {
            this.defaultPopUps = true
            vm.defaultText = '請先詳閱隱私權政策。'
            return
          }
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
            acctStatus: '1',
            files: '',
            remark: ''
          }
          const res = await frontendApi.personal_register(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '已收到您的註冊申請，待行政人員審核後即可使用。'
            vm.defaultId = 1
            this.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            this.defaultPopUps = true
          }
        } else {
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        }
      })
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
    },
    onblur () {
      setTimeout(() => {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { // 判断iPhone|iPad|iPod|iOS
          this.$refs.featureselect.blur()
        }
        const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    },
    customerDialogOpen () {
      this.$nextTick(function () {
        document.querySelectorAll('.privacyPolicy')[0].focus()
      })
    }
  }
}
</script>

<style lang="scss">
.unitRegister{
  max-width: 1289px;
  margin: 0 auto;
  padding: 20px 16px;
  box-sizing: border-box;
  &_btn{
    margin-bottom: clamp(min(0px), pc(20), max(20px));
    .TSLbutton{
      min-width: 113px;
    }
  }
  &_form{
    margin-top: clamp(min(17px), pc(42), max(42px));
    &--title{
      height: 50px;
      display: flex;
      align-items: center;
      color: $red;
      background: #FFF9F9;
      padding: 0 clamp(min(22px), pc(36), max(36px));
      margin-bottom: clamp(min(20px), pc(68), max(68px));
      box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
      img{
        width: 20px;
        height: 33px;
        margin-right: 10px;
      }
    }
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
