<template>
  <div v-loading.fullscreen.lock="loading" class="personalAcct">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/individualAcct">個人帳戶</a>
    </span>

    <div id="content" class="personalAcct--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>個人帳戶</h2>
    </div>

    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="form_item">
        <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" disabled />
        </el-form-item>
        <el-form-item prop="feature" :rules="[{ required: true, message: '請選擇性別', trigger: 'change' }]">
          <label for="feature">性別<p>(必填)</p></label>
          <el-select id="feature" v-model="form.feature" placeholder="" name="feature" popper-class="defaultSelect">
            <el-option label="男性" value="M" />
            <el-option label="女性" value="F" />
          </el-select>
        </el-form-item>
      </div>
      <div class="form_item sone">
        <el-form-item>
          <label for="verifyId">身分證字號/居留證號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled />
        </el-form-item>
      </div>
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
      <div class="form_item">
        <el-form-item>
          <label for="lineId">Line ID</label>
          <el-input id="lineId" v-model="form.lineId" name="lineId" />
        </el-form-item>
        <el-form-item prop="Email" :rules="[{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
          <label for="Email">電子信箱</label>
          <el-input id="Email" v-model="form.Email" name="Email" placeholder="範例：ntcst@nad.org.tw" />
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
              placeholder="請選擇"
              popper-class="defaultSelect"
              @change="getByType(form.city);form.dist = ''"
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
          <el-input id="address" v-model="form.address" name="address" />
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
          <label>密碼</label>
          <el-input v-model="form.newsPass" />
        </el-form-item>
        <el-form-item prop="pass">
          <label>確認密碼</label>
          <el-input v-model="form.pass" />
        </el-form-item>
      </div>
      <p class="passtext">
        (檔案大小限制為10MB，檔案格式僅支援doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw 或加LINE官方帳號：@ntpc0963047746傳送檔案。)
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
            :on-remove="removeUpload"
          />
        </div>
      </div>

      <div class="personalAcct_btn">
        <el-button class="TSLbutton" @click="deletePopUp">
          <p>停用帳號</p>
        </el-button>
        <el-button class="TSLbutton red" @click="submitedit('form')">
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
import acctinformation from '~/mixin/acctinformation'
import frontendApi from '@/assets/api/frontendApi'
export default {
  mixins: [acctinformation],
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
        expirydate: '',
        newsPass: '',
        pass: '',
        isReal: ''
      },
      editform: {},
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctDelete: false,
      logoutSuccess: false,
      featureloading: false,
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
    async handlang_acctInfo () {
      const vm = this
      const obj = {
        token: this.TSLtoken
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.fileList = []
        vm.fileIdList = []
        vm.editform = data
        vm.form.name = data.name
        vm.form.verifyId = data.verifyId
        vm.form.cellphone = data.cellphone
        vm.form.feature = data.feature
        vm.form.telphone = data.telphone
        vm.form.telphoneFirst = data.telphone.split('-')[0]
        vm.form.telphoneSecond = data.telphone.split('-')[1]
        vm.form.lineId = data.lineId
        vm.form.Email = data.email
        vm.form.city = data.city
        vm.form.dist = data.dist
        vm.form.address = data.address
        vm.form.eContactName = data.eContactName
        vm.form.eContactNum = data.eContactNum
        vm.form.hCategory = vm.closeDiv(data.hCategory) !== false ? data.hCategory.split(',').map(Number) : []
        vm.form.hCategoryNote = data.hCategoryNote
        vm.form.hLevel = vm.closeDiv(data.hLevel) !== false ? data.hLevel.split(',').map(Number) : []
        vm.form.hLevelNote = data.hLevelNote
        vm.form.usualComm = vm.closeDiv(data.usualComm) !== false ? data.usualComm.split(',').map(Number) : []
        vm.form.usualCommNote = data.usualCommNote
        if (data.expirydate === '9999-12-31T00:00:00') {
          vm.form.expiryType = [0]
        } else {
          vm.form.expiryType = [1]
        }
        vm.form.expirydate = data.expirydate
        vm.form.isReal = data.isReal
        if (data.files.length !== 0) {
          for (let i = 0; i < data.files.length; i++) {
            const item = data.files[i]
            vm.$set(item, 'name', item.oriFileName)
            this.fileList.push(item)
          }
        }
      }
    },
    submitedit (formName) {
      const vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          if (vm.fileList.length !== 0) {
            this.loading = true
            const editList = []
            let valedit = false
            for (let i = 0; i < vm.fileList.length; i++) {
              const item = vm.fileList[i]
              if (vm.closeDiv(item.rangeKey) === false) {
                editList.push(item)
                const fileItem = this.UploadFile(item.raw)
                fileItem.then((result) => {
                  vm.fileIdList.push(result)
                  if (vm.fileIdList.length === editList.length) {
                    this.submitForm(vm.form, true)
                  }
                })
                valedit = true
              }
            }
            if (!valedit) {
              this.submitForm(vm.form, false)
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
    async submitForm (vForm, fileToList) {
      const vm = this
      const form = Object.assign({}, vForm)
      const obj = {
        name: form.name,
        feature: form.feature,
        verifyId: form.verifyId,
        telphone: vm.nullreturn(form.telphoneFirst) + '-' + vm.nullreturn(form.telphoneSecond),
        cellphone: form.cellphone,
        lineId: form.lineId,
        Email: form.Email,
        city: form.city,
        dist: form.dist,
        address: form.address,
        eContactName: form.eContactName,
        eContactNum: form.eContactNum,
        hCategory: form.hCategory.length !== 0 ? form.hCategory.join() : '',
        hCategoryNote: form.hCategoryNote,
        hLevel: form.hLevel.length !== 0 ? form.hLevel.join() : '',
        hLevelNote: form.hLevelNote,
        usualComm: form.usualComm.length !== 0 ? form.usualComm.join() : '',
        usualCommNote: form.usualCommNote,
        expirydate: form.expirydate,
        password: form.newsPass,
        acctType: '1',
        positionTitle: '',
        department: '',
        files: '',
        remark: '',
        isReal: form.isReal,
        acctStatus: vm.editform.acctStatus
      }
      const res = await frontendApi.acctInfo_register_edit(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          this.UpdateForeignKey()
          vm.defaultText = '您的修改已儲存'
        } else {
          vm.defaultText = '您的修改已儲存'
          vm.defaultId = 1
          this.defaultPopUps = true
          this.loading = false
          this.handlang_acctInfo()
        }
      } else {
        vm.defaultText = res.message
        vm.defaultId = 1
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
      this.loading = false
      if (res.isSuccess === true) {
        this.defaultPopUps = true
        this.handlang_acctInfo()
      } else {
        vm.defaultText = res.message
        this.defaultPopUps = true
      }
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
        this.defaultPopUps = true
      }
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
          // }
          break
        case 'hLevel':
          if (this.form.hLevel.length > 1) {
            this.form.hLevel.splice(0, 1)
            if (this.form.hLevel !== 0) {
              this.form.hLevelNote = ''
            }
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
        const element = document.getElementById('a_c')
        element.scrollIntoView({
          behavior: 'smooth'
        })
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
    beforeUpload (file) {
      const vm = this
      const fileName = file.name.split('.')[1]
      const fileList = ['pdf', 'zip', 'xlsx', 'odt', 'ods', 'odp',
        'jpg', 'jpeg', 'bmp', 'gif', 'png', '7z', 'docx', 'doc'
      ]
      if (!fileList.includes(fileName)) {
        vm.defaultText = '檔案格式僅支援: doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw 或加LINE官方帳號：@ntpc0963047746傳送檔案。'
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
    removeUpload (file) {
      if (this.closeDiv(file.id) !== false) {
        this.filemanagerDeleteFile(file.id)
      }
      this.removeArr(this.fileList, file)
    },
    async filemanagerDeleteFile (key) {
      const vm = this
      const res = await frontendApi.filemanagerDeleteFile(key)
      if (res.isSuccess === false) {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    FileToList (fileList) {
      const vm = this
      vm.fileList.push(fileList)
    },
    onSuccess () {
      document.querySelector('.file-uploader input').click()
    }
  }
}
</script>

<style lang="scss">
.personalAcct{
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
      min-width: 113px;
    }
    @include phSize{
      justify-content: center;
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
