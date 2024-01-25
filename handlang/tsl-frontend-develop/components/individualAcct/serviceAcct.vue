<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="serviceAcct">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/individualAcct">個人帳戶</a>
    </span>

    <div id="content" class="serviceAcct--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>個人帳戶</h2>
    </div>

    <el-form ref="form" :rules="rules" :model="form" class="form">
      <div class="form_item">
        <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" />
        </el-form-item>
        <el-form-item prop="verifyId">
          <label for="verifyId">身分證字號/居留證號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled />
        </el-form-item>
      </div>
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
      <el-form-item prop="Email" :rules="[{ required: true, message: '請輸入電子信箱', trigger: 'blur' },{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]">
        <label for="Email">電子信箱<p>(必填)</p></label>
        <el-input id="Email" v-model="form.Email" name="Email" />
      </el-form-item>
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
      <el-form-item class="form_radio">
        <label for="pCategory">專業類別</label>
        <el-checkbox-group v-model="form.pCategory" @change="changePCategory(form.pCategory)">
          <el-checkbox label="1">
            手語翻譯
          </el-checkbox>
          <el-checkbox label="2">
            同步聽打
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="form.pCategory.length!=0" class="form_radio">
        <label for="pLevel">遴聘等級</label>
        <el-checkbox-group v-if="form.pCategory.indexOf('1')!==-1" v-model="form.pLevel" @change="bindCheckBox(form.pLevel)">
          <el-checkbox label="HCLA">
            手譯甲級
          </el-checkbox>
          <el-checkbox label="HCLB">
            手譯乙級
          </el-checkbox>
          <el-checkbox label="HCLC">
            手譯丙級
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-if="form.pCategory.indexOf('2')!==-1" v-model="form.lLevel" @change="bindCheckBox(form.lLevel)">
          <el-checkbox label="LCLA">
            聽打甲級
          </el-checkbox>
          <el-checkbox label="LCLB">
            聽打乙級
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="form.pCategory.length!=0" class="form_radio">
        <label>證照等級</label>
        <el-checkbox-group v-if="form.pCategory.indexOf('1')!==-1" v-model="form.plisence" @change="bindCheckBox(form.plisence)">
          <el-checkbox label="HCLB">
            手譯乙證
          </el-checkbox>
          <el-checkbox label="HCLC">
            手譯丙證
          </el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-if="form.pCategory.indexOf('2')!==-1" v-model="form.llisence" @change="bindCheckBox(form.llisence)">
          <el-checkbox label="LC">
            聽打
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="form_item htcBeginDate">
        <el-form-item v-if="form.pCategory.indexOf('1')!==-1" prop="htcBeginDate" :rules="[{ required: true, message: '請輸入簽約到期日', trigger: 'blur' }]">
          <label>取得手譯證照日期<p>(必填)</p></label>
          <el-date-picker
            v-model="form.htcBeginDate"
            type="date"
            :clearable="false"
            placeholder="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </el-form-item>
        <el-form-item v-if="form.pCategory.indexOf('2')!==-1" prop="ltcBeginDate" :rules="[{ required: true, message: '請輸入簽約到期日', trigger: 'blur' }]">
          <label>取得聽打證照日期<p>(必填)</p></label>
          <el-date-picker
            v-model="form.ltcBeginDate"
            type="date"
            :clearable="false"
            placeholder="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </el-form-item>
      </div>
      <div class="form_item time">
        <el-form-item prop="cantractExpaireDate" :rules="[{ required: true, message: '請輸入簽約到期日', trigger: 'blur' }]">
          <label for="cantractExpaireDate">簽約到期日<p>(必填)</p></label>
          <el-date-picker
            id="cantractExpaireDate"
            v-model="form.cantractExpaireDate"
            name="cantractExpaireDate"
            type="date"
            :clearable="false"
            placeholder="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </el-form-item>
      </div>
      <div class="form_item weekTime">
        <el-form-item>
          <label for="serviceDateTimes">可提供服務時段<p>(必填)</p></label>
          <div class="weekTime">
            <template v-for="item,index in form.serviceDateTimes">
              <el-form-item :key="item.key" :prop="'serviceDateTimes.'+index +'.time'" class="weekTime_inner">
                <label for="time">{{ '星期' + item.title }}</label>
                <el-select v-model="item.time" multiple placeholder="" popper-class="defaultSelect">
                  <el-option label="上午" value="上午" />
                  <el-option label="下午" value="下午" />
                  <el-option label="晚間" value="晚間" />
                </el-select>
              </el-form-item>
            </template>
          </div>
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="bankCode">匯款帳戶銀行</label>
          <el-select
            id="bankCode"
            v-model="form.bankCode"
            placeholder=""
            name="bankCode"
            filterable
            popper-class="defaultSelect"
            @change="getBankName(form.bankCode)"
          >
            <el-option v-for="item,index in bankList" :key="index" :label="'('+item.codeId+')'+item.strVal" :value="item.codeId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <label for="accountNum">匯款帳戶號碼</label>
          <el-input id="accountNum" v-model="form.accountNum" name="accountNum" />
        </el-form-item>
      </div>
      <el-form-item style="max-width: 600px;">
        <label for="allowSupport">是否外部支援</label>
        <el-select id="allowSupport" v-model="form.allowSupport" placeholder="" name="allowSupport" popper-class="defaultSelect">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
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
        (檔案大小限制為{{ fileMB }}MB，檔案格式僅支援doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw或加LINE ID：0963047746傳送檔案。)
      </p>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <div class="uploadfile_top">
            <p>匯款帳戶封面檔案上傳</p>
            <el-button @click="onSuccess(1)">
              <img src="~/static/img/uploadImg.png" alt="匯款帳戶封面檔案上傳">
            </el-button>
          </div>
        </div>
        <div class="uploadfile_file">
          <el-upload
            class="bankfile-uploader"
            action=""
            :auto-upload="false"
            :file-list="bankfileList"
            :before-upload="beforeUpload"
            :on-change="bankFileToList"
            :on-remove="removebankUpload"
          />
        </div>
      </div>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <div class="uploadfile_top">
            <p>證照檔案上傳</p>
            <el-button @click="onSuccess(2)">
              <img src="~/static/img/uploadImg.png" alt="證照檔案上傳">
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

      <el-form-item>
        <label for="remark">備註</label>
        <el-input
          id="remark"
          v-model="form.remark"
          name="remark"
          type="textarea"
          :rows="2"
          placeholder="我是備註"
          resize="none"
        />
      </el-form-item>

      <div class="serviceAcct_btn">
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
  layout: 'navMenu',
  data () {
    const serviceDateTimes = (rule, value, callback) => {
      const arr = this.form.serviceDateTimes
      let arrNull = true
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item.time.length !== 0) {
          arrNull = false
        }
      }
      if (arrNull) {
        callback(new Error('至少填寫一段服務時段'))
      } else {
        callback()
        this.$refs.form.clearValidate('serviceDateTimes.0.time')
        this.$refs.form.clearValidate('serviceDateTimes.1.time')
        this.$refs.form.clearValidate('serviceDateTimes.2.time')
        this.$refs.form.clearValidate('serviceDateTimes.3.time')
        this.$refs.form.clearValidate('serviceDateTimes.4.time')
        this.$refs.form.clearValidate('serviceDateTimes.5.time')
        this.$refs.form.clearValidate('serviceDateTimes.6.time')
      }
    }
    const newsPass = (rule, value, callback) => {
      if (value !== '') {
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
      } else {
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
        verifyId: '',
        telphone: '',
        cellphone: '',
        Email: '',
        city: '',
        dist: '',
        address: '',
        pCategory: [],
        pLevel: [], // 遴聘等級
        plisence: [], // 手語證照等級
        lLevel: [], // 聽打遴聘等級
        llisence: [], // 聽打證照等級
        htcBeginDate: '',
        ltcBeginDate: '',
        cantractExpaireDate: '',
        bankCode: '',
        bankName: '',
        accountNum: '',
        allowSupport: '',
        remark: '',
        isReal: '',
        acctStatus: '',
        newsPass: '',
        pass: '',
        serviceDateTimes: [
          {
            key: 1,
            title: '一',
            time: []
          },
          {
            key: 2,
            title: '二',
            time: []
          },
          {
            key: 3,
            title: '三',
            time: []
          },
          {
            key: 4,
            title: '四',
            time: []
          },
          {
            key: 5,
            title: '五',
            time: []
          },
          {
            key: 6,
            title: '六',
            time: []
          },
          {
            key: 7,
            title: '日',
            time: []
          }
        ]
      },
      editform: {},
      bankList: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctDelete: false,
      logoutSuccess: false,
      featureloading: false,
      fileMB: 0, // 檔案大小
      fileList: [],
      bankfileList: [],
      fileIdList: [],
      loading: false,
      rules: {
        newsPass: [{ validator: newsPass, trigger: 'blur' }],
        pass: [{ validator: pass, trigger: 'blur' }],
        telphone: [{ pattern: /\d{2}-\d{7}/, message: '電話號碼格式錯誤', trigger: 'blur' }],
        cellphone: [{ required: true, pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }],
        'serviceDateTimes.0.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.1.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.2.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.3.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.4.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.5.time': [{ validator: serviceDateTimes, trigger: 'change' }],
        'serviceDateTimes.6.time': [{ validator: serviceDateTimes, trigger: 'change' }]
      }
    }
  },
  mounted () {
    this.getBybank()
    this.getFILST()
    this.handlang_acctInfo()
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
        vm.fileList = []
        vm.bankfileList = []
        vm.fileIdList = []
        vm.editform = data
        vm.form.name = data.name
        vm.form.feature = data.feature
        vm.form.verifyId = data.verifyId
        vm.form.telphone = data.telphone
        vm.form.cellphone = data.cellphone
        vm.form.Email = data.email
        vm.form.city = data.city
        vm.form.dist = data.dist
        vm.form.address = data.address
        vm.form.htcBeginDate = vm.closeDiv(data.htcBeginDate) !== false ? vm.$moment(data.htcBeginDate).format('yyyy/MM/DD') : ''
        vm.form.ltcBeginDate = vm.closeDiv(data.ltcBeginDate) !== false ? vm.$moment(data.ltcBeginDate).format('yyyy/MM/DD') : ''
        vm.form.cantractExpaireDate = vm.closeDiv(data.cantractExpaireDate) !== false ? vm.$moment(data.cantractExpaireDate).format('yyyy/MM/DD') : ''
        if (vm.closeDiv(data.serviceTimePeriod) !== false) {
          vm.form.serviceDateTimes = JSON.parse(data.serviceTimePeriod)
        }
        vm.form.bankCode = data.bankCode
        vm.form.bankName = data.bankName
        vm.form.accountNum = data.accountNum
        vm.form.allowSupport = data.allowSupport
        vm.form.isReal = data.isReal
        vm.form.acctStatus = data.acctStatus
        vm.form.remark = data.remark
        vm.form.pCategory = vm.closeDiv(data.pCategory) !== false ? data.pCategory.split(',') : []
        if (data.files.length !== 0) {
          for (let i = 0; i < data.files.length; i++) {
            const item = data.files[i]
            vm.$set(item, 'name', item.oriFileName)
            if (item.category.trim() === '1') {
              this.bankfileList.push(item)
            } else if (item.category.trim() === '2') {
              this.fileList.push(item)
            }
          }
        }
        if (vm.closeDiv(data.pLevel) !== false) {
          const pLevel = data.pLevel.split(',')
          for (let i = 0; i < pLevel.length; i++) {
            const item = pLevel[i]
            if (item === 'LCLA' || item === 'LCLB') {
              vm.form.lLevel.push(item)
            } else {
              vm.form.pLevel.push(item)
            }
          }
        }
        if (vm.closeDiv(data.lisenceLevel) !== false) {
          const lisenceLevel = data.lisenceLevel.split(',')
          for (let i = 0; i < lisenceLevel.length; i++) {
            const item = lisenceLevel[i]
            if (item !== 'LC') {
              vm.form.plisence.push(item)
            } else {
              vm.form.llisence.push(item)
            }
          }
        }
      }
    },
    submitedit (formName) {
      const vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          if (vm.fileList.length !== 0 || vm.bankfileList.length !== 0) {
            const fileArr = vm.bankfileList.concat(vm.fileList)
            this.loading = true
            const editList = []
            let valedit = false
            for (let i = 0; i < fileArr.length; i++) {
              const item = fileArr[i]
              if (vm.closeDiv(item.rangeKey) === false) {
                editList.push(item)
                const fileItem = this.UploadFile(item.raw, item.Category)
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
    async submitForm (vForm, fileToList) {
      const vm = this
      const form = Object.assign({}, vForm)
      const serviceDateTimes = JSON.stringify(form.serviceDateTimes)
      const pLevel = form.pLevel.concat(form.lLevel)
      const lisenceLevel = form.plisence.concat(form.llisence)
      const obj = {
        verifyId: form.verifyId,
        feature: '',
        name: form.name,
        positionTitle: '',
        Email: form.Email,
        telphone: form.telphone,
        cellphone: form.cellphone,
        password: vm.closeDiv(form.pass) !== false ? form.pass : '',
        department: '',
        acctType: vm.editform.acctType,
        lineId: '',
        city: form.city,
        dist: form.dist,
        address: form.address,
        eContactName: '',
        eContactNum: '',
        hCategory: '',
        hCategoryNote: '',
        hLevel: '',
        hLevelNote: '',
        usualComm: '',
        usualCommNote: '',
        expirydate: '',
        pCategory: form.pCategory.length !== 0 ? form.pCategory.join() : '',
        pLevel: pLevel.length !== 0 ? pLevel.join() : '',
        lisenceLevel: lisenceLevel.length !== 0 ? lisenceLevel.join() : '',
        cantractExpaireDate: form.cantractExpaireDate,
        ltcBeginDate: form.ltcBeginDate,
        htcBeginDate: form.htcBeginDate,
        serviceTimePeriod: serviceDateTimes,
        bankCode: form.bankCode,
        bankName: form.bankName,
        accountNum: form.accountNum,
        allowSupport: form.allowSupport,
        acctStatus: vm.editform.acctStatus,
        files: '',
        remark: form.remark,
        isReal: form.isReal
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
        this.$refs.form.resetFields()
      } else {
        vm.defaultText = res.message
        vm.defaultId = 1
        this.defaultPopUps = true
        this.loading = false
      }
    },
    async UploadFile (File, Category) {
      const vm = this
      const obj = {
        File,
        Type: '1',
        Category
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
    changePCategory (val) {
      const vm = this
      if (val.includes('1') === false) {
        vm.form.pLevel = []
        vm.form.plisence = []
      } else if (val.includes('2') === false) {
        vm.form.lLevel = []
        vm.form.llisence = []
      }
    },
    async getBybank () {
      const obj = {
        codeType: 'BKCOD'
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        this.bankList = res.data
      }
    },
    getBankName (id) {
      let bankName = ''
      this.bankList.forEach(function (item) {
        if (item.codeId === id) {
          bankName = item.strVal
        }
      })
      this.form.bankName = bankName
    },
    bindCheckBox (val) {
      if (val.length > 1) {
        val.splice(0, 1)
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
    async getFILST () {
      const vm = this
      const obj = {
        codeType: 'FILST'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          if (item.codeId === 'SERUPD') {
            vm.fileMB = item.intVal
          }
        }
      }
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
    removeUpload (file) {
      if (this.closeDiv(file.id) !== false) {
        this.filemanagerDeleteFile(file.id)
      }
      this.removeArr(this.fileList, file)
    },
    removebankUpload (file) {
      if (this.closeDiv(file.id) !== false) {
        this.filemanagerDeleteFile(file.id)
      }
      this.removeArr(this.bankfileList, file)
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
    bankFileToList (fileList) {
      const vm = this
      vm.$set(fileList, 'Category', 1)
      vm.bankfileList.push(fileList)
    },
    FileToList (fileList) {
      const vm = this
      vm.$set(fileList, 'Category', 2)
      vm.fileList.push(fileList)
    },
    onSuccess (val) {
      if (val === 1) {
        document.querySelector('.bankfile-uploader input').click()
      } else {
        document.querySelector('.file-uploader input').click()
      }
    }
  }
}
</script>

<style lang="scss">
.el-picker-panel{
  &__content{
    font-size: 100%;
  }
  &__footer{
    font-size: 100%;
  }
  .el-button--mini{
    font-size: 100%;
  }
  .el-time-panel__btn{
    font-size: 90%;
  }
  .el-time-spinner__item{
    font-size: 90%;
  }
}
.serviceAcct{
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
  .el-form-item.severTime{
    margin-top: 0;
    .el-form-item__content{
      display: flex;
      align-items: center;
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
      p{
        margin: 0 10px;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
        @include phSize{
          margin: 10px 0;
        }
      }
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
  .form_item.time{
    .el-form-item{
      margin-right: 0;
    }
    .el-input__suffix{
      display: none;
    }
    @include phSize{
      .el-form-item__content{
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
  .form_item.weekTime{
    .el-form-item{
      margin-right: 0;
      label{
        margin-bottom: 0;
      }
    }
    .weekTime{
      display: flex;
      flex-wrap: wrap;
      box-sizing: border-box;
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
      .el-form-item{
        margin-right: 0;
        margin-top: clamp(min(20px), pc(30), max(30px));
      }
    }
    .weekTime_inner{
      width: 49%;
      @include phSize{
        width: 100%;
      }
      &:nth-child(odd){
        margin-right: 2%;
      }
      .el-tag .el-icon-close{
        flex-shrink: 0;
        font-size: 12px;
      }
      .el-form-item__content{
        display: flex;
        align-items: center;
        label{
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
