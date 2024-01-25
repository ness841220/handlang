<template>
  <div v-loading.fullscreen.lock="loading" class="serviceAcct">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/acctmanage">系統管理-帳號管理</a> / <a href="/sysadmin/acctmanage/unitAcct">{{ !editAcct?'新增帳號':'編輯帳號' }}</a>
    </span>

    <div id="content" class="serviceAcct--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>{{ !editAcct?'新增帳號':'編輯帳號' }}</h2>
    </div>

    <el-form ref="form" :rules="rules" :model="form" class="form">
      <p v-if="!editAcct" class="text">
        個人帳號於通過驗證後不得修改
      </p>
      <div class="form_item">
        <el-form-item prop="name" :rules="[{ required: true, message: '請輸入姓名', trigger: 'blur' }]">
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" />
        </el-form-item>
        <el-form-item prop="verifyId">
          <label for="verifyId">身分證字號/居留證號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" :disabled="!editAcct?false:true" :placeholder="!editAcct?'這將會是您的帳號':''" />
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
      <div v-if="form.pCategory.length!=0" class="form_item htcBeginDate">
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
            popper-class="defaultSelect"
            filterable
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
      <el-form-item v-if="editAcct" prop="isReal" style="max-width: 600px;" :rules="[{ required: true, message: '需填寫資料有效否', trigger: 'change' }]">
        <label for="isReal">資料有效否<p>(必填)</p></label>
        <el-select v-model="form.isReal" placeholder="" popper-class="defaultSelect">
          <el-option label="無效" value="0" />
          <el-option label="有效" value="1" />
          <el-option label="身分失效" value="2" />
        </el-select>
      </el-form-item>

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

      <div v-if="!editAcct" class="read">
        <el-checkbox v-model="read">
          <p class="readcheck">
            我已詳閱<el-button @click="privacyPolicy=true">
              隱私權政策
            </el-button>。
          </p>
        </el-checkbox>
      </div>

      <div v-if="editAcct" class="serviceAcct_btn">
        <el-button class="TSLbutton red" @click="handlang_acctRestPassWord(form.verifyId)">
          <p>重置密碼</p>
        </el-button>
      </div>

      <div class="serviceAcct_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/sysadmin/acctmanage' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="editAcct" class="TSLbutton" @click="deletePopUp">
          <p>停用帳號</p>
        </el-button>
        <el-button v-if="!editAcct" class="TSLbutton red" @click="submit('form')">
          <p>送出</p>
        </el-button>
        <el-button v-else class="TSLbutton red" @click="submitedit('form')">
          <p>儲存</p>
        </el-button>
      </div>
    </el-form>

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
      :close-on-click-modal="false"
      @close="acctDelete = false"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button v-if="acctDelete" class="TSLbutton" @click="defaultPopUps = false">
            <p>取消</p>
          </el-button>
          <el-button v-if="!acctDelete" class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/sysadmin/acctmanage' })">
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
    return {
      editAcct: false,
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
      read: false,
      privacyPolicy: false,
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctDelete: false,
      bankList: [],
      fileMB: 0, // 檔案大小
      fileList: [],
      bankfileList: [],
      fileIdList: [],
      loading: false,
      rules: {
        verifyId: [{ required: true, message: '請輸入身分證字號/居留證號', trigger: 'blur' }, { pattern: /^[A-Z]\d{9}$|^[A-Z][A-Z]\d{8}$/, message: '身分證字號/居留證號格式錯誤', trigger: 'blur' }],
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
    this.editAcctForm()
    this.getBybank()
    this.getFILST()
  },
  methods: {
    editAcctForm () {
      const vm = this
      const id = sessionStorage.getItem('editAcctID')
      if (vm.closeDiv(id) !== false) {
        vm.editAcct = true
        vm.editForm(id)
      } else {
        vm.editAcct = false
      }
    },
    async editForm (id) {
      const vm = this
      const obj = {
        verifyId: id,
        createdDateTimeBegin: '',
        createdDateTimeEnd: '',
        name: '',
        acctType: ''
      }
      const res = await frontendApi.acctSelect(obj)
      if (res.isSuccess === true) {
        const data = res.data[0]
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
        vm.form.remark = data.remark
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
        vm.form.pCategory = vm.closeDiv(data.pCategory) !== false ? data.pCategory.split(',') : []
        if (vm.closeDiv(data.pLevel) !== false) {
          const pLevel = data.pLevel.split(',')
          vm.form.pLevel = []
          vm.form.lLevel = []
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
          vm.form.plisence = []
          vm.form.llisence = []
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
    bindCheckBox (val) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
    },
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
          const fileArr = vm.bankfileList.concat(vm.fileList)
          if (vm.fileList.length !== 0 && vm.bankfileList.length !== 0) {
            this.loading = true
            for (let i = 0; i < fileArr.length; i++) {
              const item = fileArr[i]
              const fileItem = this.UploadFile(item.raw, item.Category)
              fileItem.then((result) => {
                vm.fileIdList.push(result)
                if (vm.fileIdList.length === fileArr.length) {
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
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    submitedit (formName) {
      const vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          const fileArr = vm.bankfileList.concat(vm.fileList)
          if (vm.fileList.length !== 0 && vm.bankfileList.length !== 0) {
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
                    this.submiteditform(vm.form, true)
                  }
                })
                valedit = true
              }
            }
            if (!valedit) {
              this.submiteditform(vm.form, false)
            }
          } else {
            this.submiteditform(vm.form, false)
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
        password: '',
        department: '',
        acctType: '3',
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
        acctStatus: '3',
        files: '',
        isReal: '1',
        remark: form.remark
      }
      const res = await frontendApi.personal_register(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          this.UpdateForeignKey()
          vm.defaultText = '已收到您的註冊申請，待行政人員審核後即可使用。'
        } else {
          vm.defaultText = '已收到您的註冊申請，待行政人員審核後即可使用。'
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
        vm.defaultId = 1
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 1
        this.defaultPopUps = true
      }
      this.loading = false
    },
    async submiteditform (vForm, fileToList) {
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
        password: '',
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
          vm.defaultText = res.message
        } else {
          vm.defaultText = res.message
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
    async handlang_acctRestPassWord (verifyId) {
      const vm = this
      const obj = {
        verifyId
      }
      const res = await frontendApi.handlang_acctRestPassWord(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '密碼已重置，重新登入後請修改密碼。'
        vm.defaultId = 1
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
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
        vm.defaultText = '帳號刪除成功'
        vm.defaultId = 1
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
      vm.acctDelete = false
    },
    changePCategory (val) {
      const vm = this
      if (val.includes('1') === false) {
        vm.form.pLevel = []
        vm.form.plisence = []
        vm.form.htcBeginDate = ''
      } else if (val.includes('2') === false) {
        vm.form.lLevel = []
        vm.form.llisence = []
        vm.form.ltcBeginDate = ''
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
    customerDialogOpen () {
      this.$nextTick(function () {
        document.querySelectorAll('.privacyPolicy')[0].focus()
      })
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
        this.editAcctForm()
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
    .el-input__suffix{
      display: none;
    }
  }
  .form_item.htcBeginDate{
    .el-input__suffix{
      display: none;
    }
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
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
