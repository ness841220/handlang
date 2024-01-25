<template>
  <div v-loading.fullscreen.lock="loading" class="prsonalRegister">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/prsonalRegister">個人註冊</a>
    </span>

    <div class="prsonalRegister_form">
      <div class="prsonalRegister_form--title">
        <img src="~/static/img/doubleRight.png" alt="">
        <h2>個人註冊</h2>
      </div>

      <el-form ref="form" :rules="rules" :model="form" class="form">
        <p class="text">
          姓名及身分證字號於通過驗證後不得修改
        </p>
        <div class="form_item">
          <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
            <label for="name">姓名<p>(必填)</p></label>
            <el-input id="name" v-model="form.name" name="name" />
          </el-form-item>
          <el-form-item prop="feature" :rules="[{ required: true, message: '請選擇性別', trigger: 'change' }]">
            <label for="feature">性別<p>(必填)</p></label>
            <el-select id="feature" v-model="form.feature" placeholder="" name="feature" popper-class="defaultSelect">
              <el-option label="男性" value="M" />
              <el-option label="女性" value="F" />
            </el-select>
          </el-form-item>
        </div>
        <div class="form_item one">
          <el-form-item prop="verifyId">
            <label for="verifyId">身分證字號/居留證號<p>(必填)</p></label>
            <el-input v-if="!isPassed" id="verifyId" v-model="form.verifyId" name="verifyId" placeholder="這將會是您的帳號" />
            <el-input
              v-else
              id="verifyId"
              v-model="form.verifyId"
              name="verifyId"
              disabled
              placeholder="這將會是您的帳號"
            />
          </el-form-item>
          <el-button v-if="!isPassed" class="TSLbutton green" @click="acct_verify()">
            <p>驗證</p>
          </el-button>
          <el-button v-else class="TSLbutton green">
            <p>驗證</p>
          </el-button>
        </div>
        <div class="form_item">
          <el-form-item prop="telphone">
            <label for="telphone">電話號碼</label>
            <el-col :span="7">
              <!-- <el-form-item prop="telphoneFirst"> -->
              <el-select id="telphoneFirst" v-model="form.telphoneFirst" placeholder="區碼" name="telphoneFirst" popper-class="defaultSelect">
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
              <el-input id="telphoneSecond" v-model="form.telphoneSecond" name="telphoneSecond" placeholder="範例：12345678" maxlength="8" />
            </el-col>
          </el-form-item>
          <el-form-item prop="cellphone">
            <label for="cellphone">手機號碼<p>(必填)</p></label>
            <el-input id="cellphone" v-model="form.cellphone" inputmode="numeric" name="cellphone" />
          </el-form-item>
        </div>
        <div class="form_item">
          <el-form-item>
            <label for="lineId">Line ID</label>
            <el-input id="lineId" v-model="form.lineId" name="lineId" />
          </el-form-item>
          <el-form-item prop="Email" :rules="[{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
            <label for="Email">電子信箱</label>
            <el-input id="Email" v-model="form.Email" name="Email" />
          </el-form-item>
        </div>
        <p class="mark">
          戶籍地址
        </p>
        <div class="form_item address">
          <div class="address_top">
            <el-form-item>
              <label for="city">縣市</label>
              <el-select
                id="city"
                v-model="form.city"
                name="city"
                placeholder=""
                popper-class="defaultSelect"
                @change="getByType(form.city);"
              >
                <el-option v-for="item,index in cityData" :key="index" :label="item.strVal" :value="item.strVal" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <label for="dist">區</label>
              <el-select id="dist" v-model="form.dist" name="dist" placeholder="請先選擇縣市" popper-class="defaultSelect">
                <el-option v-for="item,index in genderData" :key="index" :label="item.strVal" :value="item.strVal" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item>
            <label for="address">地址</label>
            <el-input id="address" v-model="form.address" placeholder="XX街XX號" name="address" />
          </el-form-item>
        </div>
        <div class="form_item">
          <el-form-item>
            <label for="eContactName">緊急聯絡人</label>
            <el-input id="eContactName" v-model="form.eContactName" name="eContactName" />
          </el-form-item>
          <el-form-item>
            <label for="eContactNum">緊急聯絡人電話</label>
            <el-input id="eContactNum" v-model="form.eContactNum" name="eContactNum" />
          </el-form-item>
        </div>
        <el-form-item class="form_radio">
          <label for="hCategory">障礙類別</label>
          <el-checkbox-group v-model="form.hCategory" @change="bindCheckBox('hCategory')">
            <el-checkbox :label="1">
              第一類
            </el-checkbox>
            <el-checkbox :label="2">
              第二類
            </el-checkbox>
            <el-checkbox :label="3">
              第三類
            </el-checkbox>
            <el-checkbox :label="4">
              第四類
            </el-checkbox>
            <el-checkbox :label="5">
              第五類
            </el-checkbox>
            <el-checkbox :label="6">
              第六類
            </el-checkbox>
            <el-checkbox :label="7">
              第七類
            </el-checkbox>
            <el-checkbox :label="8">
              第八類
            </el-checkbox>
            <el-checkbox :label="0">
              其他
            </el-checkbox>
            <el-col :span="4">
              <el-input id="hCategoryNot" v-model="form.hCategoryNote" name="hCategoryNot" :disabled="!form.hCategory.includes(0)" :placeholder="form.hCategory[0]!=0?'選擇即可填寫':''" />
            </el-col>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio">
          <label for="hLevel">障礙等級</label>
          <el-checkbox-group v-model="form.hLevel" @change="bindCheckBox('hLevel')">
            <el-checkbox :label="1">
              極重度
            </el-checkbox>
            <el-checkbox :label="2">
              重度
            </el-checkbox>
            <el-checkbox :label="3">
              中度
            </el-checkbox>
            <el-checkbox :label="0">
              <label for="hLevelNote">其他</label>
              <el-input id="hLevelNote" v-model="form.hLevelNote" name="hLevelNote" :disabled="form.hLevel[0]!=0?true:false" :placeholder="form.hLevel[0]!=0?'選擇即可填寫':''" />
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio">
          <label for="usualComm">聽語障者慣用語言(可複選)</label>
          <el-checkbox-group v-model="form.usualComm" @change="bindCheckBox('usualComm')">
            <el-checkbox :label="1">
              自然手語
            </el-checkbox>
            <el-checkbox :label="2">
              手勢中文（文字手語）
            </el-checkbox>
            <el-checkbox :label="3">
              口手語並用
            </el-checkbox>
            <el-checkbox :label="4">
              筆談
            </el-checkbox>
            <el-checkbox :label="5">
              口語
            </el-checkbox>
            <el-checkbox :label="0">
              <!-- 其他 -->
              <label for="usualCommNote">其他</label>
              <el-input id="usualCommNote" v-model="form.usualCommNote" name="usualCommNote" :disabled="form.usualComm.indexOf(0)==-1?true:false" :placeholder="form.usualComm.indexOf(0)==-1?'選擇即可填寫':''" />
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <div class="form_item">
          <el-form-item class="form_radio">
            <label for="expirydate">身障效期</label>
            <el-checkbox-group v-model="form.expiryType" @change="bindCheckBox('hExpiryType')">
              <el-checkbox :label="0">
                永久效期
              </el-checkbox>
              <el-checkbox :label="1">
                有效期限
              </el-checkbox>
              <el-col v-show="form.expiryType[0] === 1" :span="4">
                <el-date-picker
                  id="expirydate"
                  v-model="form.expirydate"
                  type="date"
                  name="expirydate"
                  placeholder="yyyy/MM/dd"
                  value-format="yyyy/MM/dd"
                  format="yyyy/MM/dd"
                  :disabled="form.expiryType.includes(0)"
                />
              </el-col>
            </el-checkbox-group>
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
        <p class="passtext">
          (檔案大小限制為{{ fileMB }}MB，檔案格式僅支援doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw或加LINE ID：0963047746傳送檔案。)
        </p>
        <div class="uploadfile" style="margin-top: 10px;">
          <div class="uploadfile_text">
            <div class="uploadfile_top">
              <p>證明文件</p>
              <el-button @click="onSuccess">
                <img src="~/static/img/uploadImg.png" alt="上傳證明文件">
              </el-button>
            </div>
          </div>
          <div class="uploadfile_file">
            <el-upload
              class="file-uploader"
              action=""
              :auto-upload="false"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-change="FileToList"
            />
          </div>
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

        <div class="prsonalRegister_btn">
          <el-button class="TSLbutton" @click="$router.push({ path: '/' })">
            <p>返回</p>
          </el-button>
          <el-button class="TSLbutton red" @click="submit('form')">
            <p>送出</p>
          </el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      top="5vh"
      :visible.sync="privacyPolicy"
      :close-on-click-modal="false"
      class="privacyPolicy"
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
import acctinformation from '~/mixin/acctinformation'
import frontendApi from '@/assets/api/frontendApi'
export default {
  mixins: [acctinformation],
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
        name: '',
        feature: '',
        verifyId: '',
        telphone: '',
        telphoneFirst: '',
        telphoneSecond: '',
        cellphone: '',
        lineId: '',
        Email: '',
        city: '',
        dist: '',
        address: '',
        eContactName: '',
        eContactNum: '',
        hCategory: [],
        hCategoryNote: '',
        hLevel: [],
        hLevelNote: '',
        usualComm: [],
        usualCommNote: '',
        expiryType: [0],
        expirydate: '9999/12/31',
        newsPass: '',
        pass: '',
        isReal: '0'
      },
      isPassed: false,
      read: false,
      privacyPolicy: false,
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      fileMB: 0, // 檔案大小
      fileList: [],
      fileIdList: [],
      loading: false,
      rules: {
        newsPass: [{ validator: newsPass, trigger: 'blur' }],
        pass: [{ validator: pass, trigger: 'blur' }],
        verifyId: [{ required: true, message: '請輸入身分證字號/居留證號', trigger: 'blur' }, { pattern: /^[A-Z]\d{9}$|^[A-Z][A-Z]\d{8}$/, message: '身分證字號/居留證號格式錯誤', trigger: 'blur' }],
        // telphone: [{ pattern: /\d{2}-\d{7}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        telphoneFirst: [{ pattern: /\d{3}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        telphoneSecond: [{ pattern: /\d{8}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        cellphone: [{ required: true, pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }]
      }
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-個人註冊'
  },
  watch: {
    'form.city' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.dist = ''
      }
    },
    deep: true,
    immediate: true
  },
  mounted () {
    this.getFILST()
  },
  methods: {
    submit (formName) {
      const vm = this
      if (vm.read !== true) {
        this.defaultPopUps = true
        vm.defaultText = '請先詳閱隱私權政策。'
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          if (vm.fileList.length !== 0) {
            this.loading = true
            for (let i = 0; i < vm.fileList.length; i++) {
              const item = vm.fileList[i]
              const fileItem = this.UploadFile(item.raw)
              fileItem.then((result) => {
                vm.fileIdList.push(result)
                if (vm.fileIdList.length === vm.fileList.length) {
                  this.submitForm(vm.form, true)
                }
              })
            }
          } else {
            this.submitForm(vm.form, false)
          }
        } else {
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        }
      })
    },
    async UploadFile (File) {
      const vm = this
      const obj = {
        File,
        Type: '1',
        Category: ''
      }
      const res = await frontendApi.UploadFile(obj)
      if (res.isSuccess === true) {
        return res.data
      } else {
        this.loading = false
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async submitForm (vForm, fileToList) {
      const vm = this
      const form = Object.assign({}, vForm)
      const obj = {
        name: vm.nullreturn(form.name),
        feature: form.feature,
        verifyId: form.verifyId,
        telphone: vm.nullreturn(form.telphoneFirst) + '-' + vm.nullreturn(form.telphoneSecond),
        cellphone: form.cellphone,
        lineId: vm.nullreturn(form.lineId),
        Email: vm.nullreturn(form.Email),
        city: vm.nullreturn(form.city),
        dist: vm.nullreturn(form.dist),
        address: vm.nullreturn(form.address),
        eContactName: vm.nullreturn(form.eContactName),
        eContactNum: vm.nullreturn(form.eContactNum),
        hCategory: form.hCategory.length !== 0 ? form.hCategory.join() : '',
        hCategoryNote: vm.nullreturn(form.hCategoryNote),
        hLevel: form.hLevel.length !== 0 ? form.hLevel.join() : '',
        hLevelNote: vm.nullreturn(form.hLevelNote),
        usualComm: form.usualComm.length !== 0 ? form.usualComm.join() : '',
        usualCommNote: vm.nullreturn(form.usualCommNote),
        expirydate: vm.nullreturn(form.expirydate),
        password: vm.nullreturn(form.newsPass),
        acctType: '1',
        positionTitle: '',
        department: '',
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
        acctStatus: (this.isPassed) ? '3' : '1',
        files: '',
        remark: '',
        isReal: vm.form.isReal
      }
      const res = await frontendApi.personal_register(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          this.UpdateForeignKey()
        } else {
          vm.defaultText = (this.isPassed) ? '已收到您的註冊申請，待行政人員審核後即可使用。' : '已收到您的註冊申請，待行政人員審核後即可使用。'
          vm.defaultId = 1
          this.defaultPopUps = true
          this.loading = false
        }
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
        this.loading = false
      }
    },
    async UpdateForeignKey () {
      const vm = this
      const list = []
      for (let i = 0; i < vm.fileIdList.length; i++) {
        const item = vm.fileIdList[i]
        list.push(item)
      }
      const obj = {
        ids: list,
        foreignKey: vm.form.verifyId
      }
      const res = await frontendApi.UpdateForeignKey(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '已收到您的註冊申請，待行政人員審核後即可使用。'
        vm.defaultId = 1
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 1
        this.defaultPopUps = true
      }
      this.loading = false
    },
    bindCheckBox (name) {
      switch (name) {
        case 'hCategory':
          if (!this.form.hCategory.includes(0)) {
            this.form.hCategoryNote = ''
          }
          // if (this.form.hCategory.length > 1) {
          //   this.form.hCategory.splice(0, 1)
          //   if (this.form.hCategory !== 0) {
          //     this.form.hCategoryNote = ''
          //   }
          // } else if (this.form.hCategory[0] === undefined) {
          //   this.form.hCategoryNote = ''
          // }
          break
        case 'hLevel':
          if (this.form.hLevel.length > 1) {
            this.form.hLevel.splice(0, 1)
            if (this.form.hLevel !== 0) {
              this.form.hLevelNote = ''
            }
          } else if (this.form.hLevel[0] === undefined) {
            this.form.hLevelNote = ''
          }
          break
        case 'usualComm':
          // eslint-disable-next-line no-case-declarations
          const langid = this.form.usualComm.indexOf(0)
          if (langid === -1) {
            this.form.usualCommNote = ''
          }
          break
        case 'hExpiryType':
          if (this.form.expiryType.length > 1) {
            this.form.expiryType.splice(0, 1)
            if (this.form.expiryType[0] !== 0) {
              this.form.expirydate = ''
            } else {
              this.form.expirydate = '9999/12/31'
            }
          } else if (this.form.expiryType[0] === undefined) {
            this.form.expirydate = '9999/12/31'
            this.form.expiryType = [0]
          }
          break
      }
    },
    customerDialogOpen () {
      this.$nextTick(function () {
        document.querySelectorAll('.privacyPolicy')[0].focus()
      })
    },
    beforeUpload (file) {
      const vm = this
      const fileName = file.name.split('.')[1]
      const fileList = ['pdf', 'zip', 'xlsx', 'odt', 'ods', 'odp',
        'jpg', 'jpeg', 'bmp', 'gif', 'png', '7z', 'docx', 'doc'
      ]
      if (!fileList.includes(fileName)) {
        vm.defaultText = '檔案格式僅支援: doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，若系統上傳文件失敗，請將檔案直接mail至ntcst@nad.org.tw。'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
      const isMB = file.size / 1024 / 1024 < Number(vm.fileMB)
      if (!isMB) {
        vm.defaultText = '上傳檔案大小限制為' + vm.fileMB + 'MB'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
    },
    FileToList (fileList) {
      const vm = this
      vm.fileList.push(fileList)
    },
    async acct_verify () {
      const vm = this
      if (vm.closeDiv(this.form.verifyId) === false) {
        vm.defaultText = '請先輸入身分證字號/居留證號'
        vm.defaultId = 0
        this.defaultPopUps = true
        return
      }
      const obj = {
        verifyId: this.form.verifyId
      }
      const res = await frontendApi.acct_verify(obj)
      if (res.isSuccess === true) {
        if (res.message.includes('未符合')) { this.isPassed = false }
        if (res.message.includes('驗證通過')) { this.isPassed = true }

        vm.form.isReal = '1'
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      } else {
        vm.form.isReal = '0'
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async getFILST () {
      const vm = this
      const obj = {
        codeType: 'FILST'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          if (item.codeId === 'REGUPD') {
            vm.fileMB = item.intVal
          }
        }
      }
    },
    onSuccess () {
      document.querySelector('.file-uploader input').click()
    }
  }
}
</script>

<style lang="scss">
.el-picker-panel{
  &__icon-btn{
    margin-top: 0;
  }
}
.prsonalRegister{
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
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
