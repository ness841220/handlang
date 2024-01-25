<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="editCaseInquiryForm">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/caseInquiry" title="案件查詢">案件查詢</a> / <nuxt-link :to="'/caseInquiry/form?lang=' + $route.query.lang" :title="title + '服務申請'">{{ title }}服務申請</nuxt-link>
    </span>

    <div id="content" class="editCaseInquiryForm--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>{{ title }}服務申請</h2>
    </div>

    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="form_item">
        <el-form-item>
          <label for="caseNum">案件號碼<p>(必填)</p></label>
          <el-input id="caseNum" v-model="form.caseNum" name="caseNum" disabled />
        </el-form-item>
        <el-form-item v-if="TSLform.acctType == 4 || TSLform.acctType == 5" style="max-width: 600px;">
          <label for="assistName">協助申請者身分<p>(必填)</p></label>
          <el-input id="assistName" v-model="form.assistName" name="assistName" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="identity">申請者身分<p>(必填)</p></label>
          <el-input id="identity" v-model="form.identity" name="identity" disabled placeholder="系統帶入" />
        </el-form-item>
        <el-form-item>
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label id="verifyId">身分證字號/居留證號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled />
        </el-form-item>
        <el-form-item>
          <label for="email">E-mail</label>
          <el-input id="email" v-model="form.email" name="email" disabled placeholder="系統帶入" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="telphone">電話號碼</label>
          <el-input id="telphone" v-model="form.telphone" name="telphone" disabled placeholder="系統帶入" />
        </el-form-item>
        <el-form-item>
          <label for="cellphone">手機號碼</label>
          <el-input id="cellphone" v-model="form.cellphone" name="cellphone" disabled />
        </el-form-item>
      </div>
      <p class="mark">
        本服務請於服務時間5天前提出申請(警政、醫療等緊急案件，不受5天前提出規定限制，請電聯本中心或加LINE ID：0963047746)
      </p>

      <div class="form_item time">
        <el-form-item class="severTime">
          <div class="timeName">
            <label for="beginDate">申請服務時間<p>(必填)</p></label>
            <p>
              扣除休息時間，本次申請時數共計 {{ applyTime }} 小時
            </p>
          </div>
          <div class="timeItme">
            <el-form-item prop="beginDate" style="margin-top: 0;margin-right: 5px;">
              <el-date-picker
                v-model="form.beginDate"
                disabled
                type="date"
                :clearable="false"
                placeholder="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                @change="convertTime"
              />
            </el-form-item>
            <el-form-item prop="beginTime" style="margin-top: 0;margin-right: 5px;">
              <el-time-picker
                v-model="form.beginTime"
                arrow-control
                size="large"
                format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="開始時間"
                @change="convertTime"
              />
            </el-form-item>
            <p>至</p>
            <el-form-item prop="endDate" style="margin-top: 0;margin-right: 5px;">
              <el-date-picker
                v-model="form.endDate"
                disabled
                type="date"
                :clearable="false"
                placeholder="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                @change="convertTime"
              />
            </el-form-item>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-form-item prop="endTime" style="margin-top: 0;margin-right: 5px;">
              <el-time-picker
                v-model="form.endTime"
                arrow-control
                size="large"
                format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="結束時間"
                @change="convertTime"
              />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item class="hrTime" prop="breakTime">
          <label for="breakTime">休息時間</label>
          <div class="hrTime_hr">
            <!-- <el-select id="breakTime" v-model="form.breakTime" name="breakTime" placeholder="" @change="convertBreakTime(form.breakTime)">
              <el-option v-for="(item,index) in 25" :key="index" :label="index" :value="index" />
            </el-select> -->
            <!-- <el-time-picker
              v-model="form.breakTime"
              arrow-control
              size="large"
              format="HH:mm"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              placeholder="休息時間"
              @change="convertBreakTime(form.breakTime)"
            /> -->
            <el-select id="breakTime" v-model="form.breakHour" name="breakHour" placeholder="" @change="convertBreakTime">
              <el-option v-for="(item,index) in 24" :key="index" :label="index" :value="index" />
            </el-select>
            <p style="margin-right: 5px;">
              時
            </p>
            <el-select id="breakTime" v-model="form.breakMinute" name="breakMinute" placeholder="" @change="convertBreakTime">
              <el-option v-for="(item,index) in 60" :key="index" :label="index" :value="index" />
            </el-select>
            <p>分</p>
          </div>
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="caseType">案件類別</label>
          <el-select id="caseType" v-model="form.caseType" name="caseType" placeholder="" popper-class="defaultSelect">
            <el-option v-for="item,index in caseTypeList" :key="index" :label="item.strVal" :value="item.codeId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <label for="applyNote">服務事由</label>
          <el-input id="applyNote" v-model="form.applyNote" name="applyNote" />
        </el-form-item>
      </div>
      <el-form-item>
        <label for="location"><div>服務地點<span style="color: #0048C2;">（如：台大醫院腸胃科、教室A102）</span></div></label>
        <el-input id="location" v-model="form.location" name="location" />
      </el-form-item>
      <p class="mark">
        服務地址
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
          <el-input id="address" v-model="form.address" name="address" placeholder="XX街XX號" />
        </el-form-item>
      </div>
      <el-form-item>
        <label for="liveUrl">視訊網址</label>
        <el-input id="liveUrl" v-model="form.liveUrl" name="liveUrl" />
      </el-form-item>
      <el-form-item class="form_radio">
        <label for="usualComm">聽語障者慣用語言(可複選)</label>
        <el-checkbox-group id="usualComm" v-model="form.usualComm" name="usualComm">
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
            <label>其他</label>
            <el-input v-model="form.usualCommNote" :disabled="form.usualComm.indexOf(0)==-1?true:false" placeholder="選擇即可填寫" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="form_item">
        <el-form-item>
          <label for="totlePerson">現場總人數</label>
          <el-input id="totlePerson" v-model="form.totlePerson" name="totlePerson" />
        </el-form-item>
        <el-form-item>
          <label for="damagePerson">聽語障者人數</label>
          <el-input id="damagePerson" v-model="form.damagePerson" name="damagePerson" />
        </el-form-item>
      </div>
      <el-form-item style="max-width:600px;">
        <label for="participantsNote">人數說明</label>
        <el-input id="participantsNote" v-model="form.participantsNote" name="participantsNote" />
      </el-form-item>
      <el-form-item class="form_radio contact ">
        <label for="participantsContact">現場聯絡方式</label>
        <el-checkbox-group v-model="participantsContact" @change="bindCheckBox(participantsContact, 0)">
          <el-checkbox label="1">
            同申請人
          </el-checkbox>
          <el-checkbox label="2">
            同現場聯絡人
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div v-if="participantsContact == '2'" class="form_item">
        <el-form-item class="havecheckbox">
          <div class="title">
            <label for="contactName">現場聯絡人姓名</label> <!-- @change="changeEName(checkEContactName)"-->
            <el-checkbox-group v-model="checkEContactName" @change="changeEName(checkEContactName)">
              <el-checkbox :label="true">
                同緊急聯絡人
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <el-input id="contactName" v-model="form.contactName" name="contactName" />
        </el-form-item>
        <el-form-item>
          <label for="contactRelation">現場聯絡人關係/職稱</label>
          <el-input id="contactRelation" v-model="form.contactRelation" name="contactRelation" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item v-if="participantsContact == '2'" prop="contactNumber">
          <label for="contactNumber">現場聯絡人手機</label>
          <el-input id="contactNumber" v-model="form.contactNumber" name="contactNumber" />
        </el-form-item>
        <el-form-item style="max-width: 600px;">
          <label for="applierPrice">申請者預計負擔費用</label>
          <el-input id="applierPrice" v-model="form.applierPrice" name="applierPrice" />
        </el-form-item>
      </div>
      <p v-if="!langtsl" class="mark">
        空間設備
      </p>
      <div v-if="!langtsl" class="loptop">
        <el-form-item class="form_radio">
          <label for="loptop">1.筆記型電腦</label>
          <el-checkbox-group v-model="form.loptop" @change="bindCheckBox(form.loptop,0)">
            <el-checkbox :label="1">
              場地自備
            </el-checkbox>
            <el-checkbox :label="2">
              請聽打員自備
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <p v-if="!langtsl" class="loptop_text">
        2. 3位聽障者（含）以上活動，場地須自備
      </p>
      <div v-if="!langtsl" class="loptop">
        <el-form-item class="form_radio">
          <label for="projector">(1) 投影機</label>
          <el-checkbox-group v-model="form.projector" @change="bindCheckBox(form.projector,0)">
            <el-checkbox :label="1">
              可移動式
            </el-checkbox>
            <el-checkbox :label="2">
              固定式
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio">
          <label for="projectorScreen">(2) 投影幕</label>
          <el-checkbox-group v-model="form.projectorScreen" @change="bindCheckBox(form.projectorScreen,1)">
            <el-checkbox :label="1">
              投影/電子布幕
            </el-checkbox>
            <el-checkbox :label="2">
              液晶電視/螢幕
            </el-checkbox>
            <el-checkbox :label="3">
              牆面
            </el-checkbox>
            <el-checkbox :label="4">
              白板
            </el-checkbox>
            <el-checkbox :label="5">
              <label>其他</label>
              <el-input v-model="form.projectorScreenNote" :disabled="form.projectorScreen.indexOf(5)==-1?true:false" placeholder="選擇即可填寫" />
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <p class="passtext">
        (檔案大小限制為10MB，檔案格式僅支援doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，若系統上傳文件失敗，請將檔案直接mail至ntcst@nad.org.tw。)
      </p>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <p>相關資料 <span style="color: #0048C2;">（如：門診掛號單、會議通知單、活動簡介/流程表、法院傳票…等）</span></p>
          <div class="uploadfile_top">
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
      <el-form-item>
        <label for="remark">
          <div>
            <span>備註</span>
            <span style="color: #0048C2; letter-spacing: 3px;">（如為錄影或公開直播、自費、是否自備聽打設備(如:桌椅、外接螢幕、延長線等)或有其他告知事項請於備註說明）</span>
          </div>
        </label>
        <el-input
          id="remark"
          v-model="form.remark"
          type="textarea"
          :rows="6"
          placeholder="我是備註"
          resize="none"
          name="remark"
        />
      </el-form-item>

      <div class="editCaseInquiryForm_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/caseInquiry' })">
          <p>返回</p>
        </el-button>
        <el-button class="TSLbutton red" @click="submitedit('form')">
          <p>送出</p>
        </el-button>
      </div>
    </el-form>

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
import acctinformation from '~/mixin/acctinformation'
export default {
  mixins: [acctinformation],
  layout: 'navMenu',
  // eslint-disable-next-line require-await
  async asyncData ({ app, redirect }) {
    const TSLtoken = app.$cookies.get('TSLtoken')
    if (TSLtoken === undefined || TSLtoken === null) {
      redirect('/')
    }
  },
  data () {
    const beginDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請選擇起始申請服務時間'))
      } else {
        callback()
      }
    }
    const beginTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請選擇起始申請服務時間'))
      } else {
        callback()
      }
    }
    const endDate = (rule, value, callback) => {
      let bd = this.$moment(this.form.beginDate + ' ' + this.chgTimeToString(this.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value + ' ' + this.chgTimeToString(this.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value === '') {
        callback(new Error('請選擇結束申請服務時間'))
      } else if (ed < bd) {
        callback(new Error('結束時間勿小於起始時間'))
      } else {
        callback()
      }
    }
    const endTime = (rule, value, callback) => {
      let bd = this.$moment(this.form.beginDate + ' ' + this.chgTimeToString(this.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value + ' ' + this.chgTimeToString(this.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value === '') {
        callback(new Error('請選擇結束申請服務時間'))
      } else if (ed < bd) {
        callback(new Error('結束時間勿小於起始時間'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      langtsl: true,
      checkList: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      loading: false,
      form: {
        git: '',
        caseNum: '',
        assistName: '',
        identity: '',
        name: '',
        verifyId: '',
        email: '',
        telphone: '',
        cellphone: '',
        beginDate: '',
        beginTime: '',
        endDate: '',
        endTime: '',
        breakTime: '00:00',
        breakHour: '0',
        breakMinute: '0',
        caseType: '',
        applyNote: '',
        location: '',
        city: '',
        dist: '',
        address: '',
        liveUrl: '',
        usualComm: [],
        usualCommNote: '',
        langOther: '',
        totlePerson: '',
        damagePerson: '',
        participantsNote: '',
        participantsContact: '',
        contactName: '',
        contactRelation: '',
        contactNumber: '',
        applierPrice: '',
        loptop: [],
        projector: [],
        projectorScreen: [],
        projectorScreenNote: '',
        files: '',
        remark: '',
        caseStatus: '',
        applyType: '',
        applyName: ''
      },
      leastHours: 0,
      totalHours: 0,
      useHours: 0,
      applyTime: 0,
      fileList: [],
      caseTypeList: [],
      assistList: [],
      eContactName: '',
      checkEContactName: [],
      participantsContact: [],
      pickerOptions: {
        disabledDate (v) {
          return v.getTime() < new Date().getTime() - 86400000
        }
      },
      rules: {
        beginDate: [{ validator: beginDate, trigger: 'blur' }],
        beginTime: [{ validator: beginTime, trigger: 'blue' }],
        endDate: [{ validator: endDate, trigger: 'blur' }],
        endTime: [{ validator: endTime, trigger: 'blue' }],
        contactNumber: [{ pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }]
        // beginDate: [{ required: true, message: '請選擇申請服務時間', trigger: 'change' }]
      }
    }
  },
  mounted () {
    this.title = this.$route.query.lang === 'tsl' ? '手語翻譯' : '同步聽打'
    this.langtsl = this.$route.query.lang === 'tsl'
    this.getByCaseType()
    this.getForm()
  },
  methods: {
    async applyCaseSelectUseHours (verifyId) {
      const vm = this
      const obj = {
        verifyId
      }
      const res = await frontendApi.applyCaseSelectUseHours(obj)
      if (res.isSuccess === true) {
        vm.leastHours = res.data.leastHours
        vm.totalHours = res.data.totalHours
        vm.useHours = res.data.useHours
      }
    },
    getForm () {
      const vm = this
      const data = JSON.parse(sessionStorage.getItem('caseInquiry'))
      vm.form.assistName = data.assistName
      vm.form.gid = data.gid
      vm.form.caseNum = data.caseNum
      vm.eContactName = data.personal.eContactName
      vm.form.verifyId = data.verifyId
      this.applyCaseSelectUseHours(vm.form.verifyId)
      vm.form.name = data.personal.name
      vm.form.email = data.personal.email
      vm.form.telphone = data.personal.telphone
      vm.form.cellphone = data.personal.cellphone
      vm.form.beginDate = vm.$moment(data.beginDate).format('yyyy/MM/DD')
      vm.form.endDate = vm.$moment(data.endDate).format('yyyy/MM/DD')
      vm.form.beginTime = new Date(data.beginDate)
      vm.form.endTime = new Date(data.endDate)

      if (data.breakTime.includes(':')) {
        vm.form.breakTime = new Date('2023-01-01 ' + data.breakTime)
        vm.form.breakHour = data.breakTime.split(':')[0]
        vm.form.breakMinute = data.breakTime.split(':')[1]
      } else {
        vm.form.breakTime = new Date('2023-01-01 ' + data.breakTime === '' ? '00' : data.breakTime + ':00')
      }

      vm.form.caseType = vm.closeDiv(data.caseType) !== false ? data.caseType : ''
      vm.form.applyNote = vm.closeDiv(data.applyNote) !== false ? data.applyNote : ''
      vm.form.location = vm.closeDiv(data.location) !== false ? data.location : ''
      vm.form.city = vm.closeDiv(data.city) !== false ? data.city : ''
      vm.form.dist = vm.closeDiv(data.dist) !== false ? data.dist : ''
      vm.form.address = vm.closeDiv(data.address) !== false ? data.address : ''
      vm.form.liveUrl = vm.closeDiv(data.liveUrl) !== false ? data.liveUrl : ''
      vm.form.usualComm = vm.strToArr(data.usualComm)
      vm.form.usualCommNote = vm.closeDiv(data.usualCommNote) !== false ? data.usualCommNote : ''
      vm.form.totlePerson = vm.closeDiv(data.totlePerson) !== false ? data.totlePerson : ''
      vm.form.damagePerson = vm.closeDiv(data.damagePerson) !== false ? data.damagePerson : ''
      vm.form.participantsNote = vm.closeDiv(data.participantsNote) !== false ? data.participantsNote : ''
      vm.participantsContact = vm.closeDiv(data.participantsContact) !== false ? data.participantsContact.split() : ''
      vm.form.contactName = vm.closeDiv(data.contactName) !== false ? data.contactName : ''
      vm.form.contactNumber = vm.closeDiv(data.contactNumber) !== false ? data.contactNumber : ''
      vm.form.contactRelation = vm.closeDiv(data.contactRelation) !== false ? data.contactRelation : ''
      vm.form.loptop = vm.closeDiv(data.loptop) !== false ? data.loptop.split().map(Number) : []
      vm.form.projector = vm.closeDiv(data.projector) !== false ? data.projector.split().map(Number) : []
      if (vm.closeDiv(data.projectorScreen) !== false) {
        vm.form.projectorScreen = data.projectorScreen.split().map(Number)
      }
      if (data.projectorScreen === '5') {
        vm.form.projectorScreenNote = data.projectorScreenNote
      }
      this.fileList = []
      if (data.files.length !== 0) {
        for (let i = 0; i < data.files.length; i++) {
          const item = data.files[i]
          vm.$set(item, 'name', item.oriFileName)
          this.fileList.push(item)
        }
      }
      vm.form.contactNumber = vm.closeDiv(data.contactNumber) !== false ? data.contactNumber : ''
      vm.form.applierPrice = vm.closeDiv(data.applierPrice) !== false ? data.applierPrice : ''
      vm.form.remark = vm.closeDiv(data.remark) !== false ? data.remark : ''
      vm.form.caseStatus = data.caseStatus
      vm.form.applyType = data.applyType
      vm.form.applyName = data.applyName
      const type = Number(data.personal.acctType)
      switch (type) {
        case 1:
          vm.form.identity = '個人申請'
          break
        case 2:
          vm.form.identity = '單位申請'
          break
        case 3:
          vm.form.identity = '服務人員'
          break
        case 4:
          vm.form.identity = '委外單位'
          break
        case 5:
          vm.form.identity = '管理機關'
          break
      }
      vm.convertTime()
    },
    strToArr (val) {
      const vm = this
      if (vm.closeDiv(val) !== false) {
        const arr = val.split(',').map(Number)
        return arr
      } else {
        return []
      }
    },
    submitedit (formName) {
      const vm = this
      const serveTime = Number(vm.applyTime)
      // const serveTime = Number(vm.applyTime) + Number(vm.form.breakTime)
      if (vm.leastHours < serveTime) {
        vm.defaultText = '您好，申請案件屬於社會參與，每人(單位)每年最高補助使用60小時(手語翻譯及同步聽打服務併計)。'
        vm.defaultId = 0
        this.defaultPopUps = true
        return
      }
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
        gid: form.gid,
        caseNum: form.caseNum,
        assistName: form.assistName,
        verifyId: form.verifyId,
        beginDate: form.beginDate + ' ' + vm.chgTimeToString(vm.form.beginTime) + ':00',
        endDate: form.endDate + ' ' + vm.chgTimeToString(vm.form.endTime) + ':00',
        breakTime: vm.chgTimeToString(vm.form.breakTime),
        caseType: form.caseType,
        applyNote: form.applyNote,
        location: form.location,
        city: form.city,
        dist: form.dist,
        address: form.address,
        liveUrl: form.liveUrl,
        usualComm: form.usualComm.length !== 0 ? form.usualComm.join() : '',
        usualCommNote: form.usualCommNote,
        totlePerson: form.totlePerson,
        damagePerson: form.damagePerson,
        participantsNote: form.participantsNote,
        participantsContact: vm.participantsContact.length !== 0 ? vm.participantsContact.join() : '',
        contactName: form.contactName,
        contactRelation: form.contactRelation,
        contactNumber: form.contactNumber,
        applierPrice: form.applierPrice,
        files: form.files,
        loptop: form.loptop.length !== 0 ? form.loptop.join() : '',
        projector: form.projector.length !== 0 ? form.projector.join() : '',
        projectorScreen: form.projectorScreen.length !== 0 ? form.projectorScreen.join() : '',
        projectorScreenNote: form.projectorScreenNote,
        remark: form.remark,
        caseStatus: form.caseStatus,
        applyType: form.applyType,
        applyName: form.applyName
      }
      const res = await frontendApi.applyCaseEdit(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          vm.defaultText = '服務申請修改成功'
          this.UpdateForeignKey()
        } else {
          vm.defaultText = res.data
          vm.defaultId = 1
          this.defaultPopUps = true
          this.loading = false
          this.getForm()
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
        foreignKey: vm.form.caseNum
      }
      const res = await frontendApi.UpdateForeignKey(obj)
      this.loading = false
      if (res.isSuccess === true) {
        this.defaultPopUps = true
        vm.defaultId = 1
        this.getForm()
      } else {
        vm.defaultText = res.message
        this.defaultPopUps = true
      }
    },
    changeEName (val) { // 同緊急聯絡人
      const vm = this
      const value = val[0]
      if (value === true && vm.closeDiv(vm.eContactName) !== false) {
        vm.form.contactName = vm.eContactName
        vm.form.contactNumber = vm.closeDiv(vm.eContactNum) !== false ? vm.eContactNum : ''
      } else if (value === true && vm.closeDiv(vm.eContactName) === false) {
        vm.defaultText = '用戶未於個人帳戶填寫緊急連絡人資料，請手動填寫。'
        vm.defaultId = 0
        vm.defaultPopUps = true
        vm.checkEContactName = []
      } else {
        vm.checkEContactName = []
        vm.form.contactName = ''
        vm.form.contactNumber = ''
      }
    },
    convertTime () {
      const vm = this
      const bts = (vm.form.breakTime.getHours() * 60 + vm.form.breakTime.getMinutes()) * 60 * 1000

      if (vm.closeDiv(vm.form.beginDate) !== false && vm.closeDiv(vm.form.endDate) !== false && this.chgTimeToString(vm.form.beginTime) !== '' && this.chgTimeToString(vm.form.endTime) !== '') {
        let bd = vm.$moment(vm.$moment(vm.form.beginDate).format('yyyy/MM/DD') + ' ' + vm.chgTimeToString(vm.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        let ed = vm.$moment(vm.$moment(vm.form.endDate).format('yyyy/MM/DD') + ' ' + vm.chgTimeToString(vm.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        bd = Date.parse(bd)
        ed = Date.parse(ed)
        if (ed > bd) {
          const ms = (ed - bd) - bts
          const calTime = ms / 1000 / 60 / 60
          if (calTime % 1 === 0) {
            vm.applyTime = calTime
          } else {
            const arrStr = calTime.toString().split('.')
            if (parseInt(arrStr[1][0]) >= 5) {
              if (arrStr[1] === '5') {
                vm.applyTime = calTime
              } else {
                vm.applyTime = Math.round(calTime)
              }
            } else {
              vm.applyTime = parseFloat(arrStr[0]) + 0.5
            }
          }

          // const time = ms / 1000 / 60 / 60
          // if (time % 1 === 0 || calTime % 1 === 0.5) {
          //   vm.applyTime = time
          // } else {
          //   const timeLine = time % 1
          //   if (timeLine < 0.5) {
          //     vm.applyTime = Math.floor(time) + 0.5
          //   } else {
          //     vm.applyTime = Math.floor(time + 0.5)
          //   }
          // }
        } else {
          vm.applyTime = 0
        }

        vm.convertBreakTime()
      }
    },
    convertBreakTime () {
      // if (time === undefined) {
      //   return false
      // }
      const vm = this

      vm.form.breakTime = new Date('2023-01-01 ' + vm.form.breakHour + ':' + vm.form.breakMinute)
      const time = vm.form.breakTime

      // 休息時間轉成時戳
      const bts = (time.getHours() * 60 + time.getMinutes()) * 60 * 1000

      if (vm.closeDiv(time) !== false) {
        let bd = vm.$moment(vm.$moment(vm.form.beginDate).format('yyyy/MM/DD') + ' ' + this.chgTimeToString(vm.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        let ed = vm.$moment(vm.$moment(vm.form.endDate).format('yyyy/MM/DD') + ' ' + this.chgTimeToString(vm.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        bd = Date.parse(bd)
        ed = Date.parse(ed)
        let applyTime = 0
        if (ed > bd) {
          let ms = (ed - bd)

          if (bts > ms) {
            vm.applyTime = '時數時長不足'
          } else {
            ms = ms - bts
            const calTime = ms / 1000 / 60 / 60
            if (calTime % 1 === 0) {
              applyTime = calTime
            } else {
              const arrStr = calTime.toString().split('.')
              if (parseInt(arrStr[1][0]) >= 5) {
                if (arrStr[1] === '5') {
                  applyTime = calTime
                } else {
                  applyTime = Math.round(calTime)
                }
              } else {
                applyTime = parseFloat(arrStr[0]) + 0.5
              }
              // applyTime = Math.floor(calTime) + 0.5
            }

            vm.applyTime = applyTime
          }
        }
        // if (applyTime > time) {
        //   vm.applyTime = (applyTime - time)
        // } else {
        //   vm.applyTime = '時數時長不足'
        // }
      } else {
        const breakTime = Number(vm.form.breakTime)
        const applyTime = Number(vm.applyTime)
        if (applyTime > breakTime) {
          vm.applyTime = (applyTime - breakTime)
        }
      }
    },
    chgTimeToString (time) {
      if (typeof time === 'string') {
        return time
      } else if (time === null) {
        return ''
      }
      let str = ''
      if (time !== undefined && time !== '') {
        if (time.getHours() >= 10) {
          str = time.getHours().toString()
        } else {
          str = '0' + time.getHours().toString()
        }

        str = str + ':'

        if (time.getMinutes() >= 10) {
          str += time.getMinutes().toString()
        } else {
          str += '0' + time.getMinutes().toString()
        }
      }
      return str
    },
    bindCheckBox (val, id) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
      switch (id) {
        case 1:
          if (val !== 5) {
            this.form.projectorScreenNote = ''
          }
          break
      }
    },
    async getByCaseType () {
      const obj = {
        codeType: 'CCIS'
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        this.caseTypeList = res.data
      }
    },
    async UploadFile (File) {
      const vm = this
      const obj = {
        File,
        Type: '2',
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
    onSuccess () {
      document.querySelector('.file-uploader input').click()
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
  .el-time-panel__content{
    font-size: 100%;
  }
  .el-time-panel__btn{
    font-size: 90%;
  }
  .el-time-spinner__item{
    font-size: 90%;
  }
}
.editCaseInquiryForm{
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
      min-width: 109px;
    }
    @include phSize{
      justify-content: center;
    }
  }
  .form{
    .timeItme{
      display: flex;
      align-items: center;
      p{
        flex-shrink: 0;
        margin: 0 10px;
      }
      .el-input__suffix{
        display: none;
      }
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
        p{
          margin: 10px 0;
        }
      }
    }
    .timeName{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      label{
        margin-right: 10px;
        margin-bottom: 0;
        p{
          font-size: 100%;
        }
      }
      P{
        color: $red;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
      }
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .hrTime{
      max-width: 216px;
      &_hr{
        display: flex;
        align-items: center;
        p{
          margin-left: 10px;
        }
      }
    }
    .uploadfile{
      margin-top: 10px;
    }
  }

  .form_item{
    .havecheckbox{
      label{
        margin-bottom: 0;
      }
      .title{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        @include phSize{
          align-items: flex-start;
          flex-direction: column;
        }
      }
      .el-checkbox-group{
        display: flex;
        align-items: center;
        font-size: 100%;
        @include phSize{
          margin-top: 10px;
        }
      }
      .el-checkbox{
        margin-bottom: 0;
        &__label{
          display: flex;
          font-size: 100%;
          line-height: 25px;
          color: $default;
        }
        &__inner{
          width: 25px;
          height: 25px;
          border-radius: 5px;
          border: 1px solid #545454;
          &::after{
            top: 4px;
            height: 10px;
            left: 8px;
            width: 5px;
            border: 2px solid $default;
            border-left: 0;
            border-top: 0;
          }
        }
        &__input.is-focus{
          .el-checkbox__inner{
            background: #EFD1C9;
            outline: 3px dashed #990094;
          }
        }
        &__input.is-checked{
          .el-checkbox__inner{
            background: #EFD1C9;
          }
        }
      }
    }
  }

  .loptop{
    &_text{
      margin-bottom: clamp(min(10px), pc(20), max(20px));
    }
    .el-form-item.form_radio{
      margin-top: 10px;
      .el-form-item__content{
        display: flex;
        align-items: center;

        @include phSize{
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }
  }

  &_ex{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    color: $default;
    font-size: clamp(min(1.125em), pc(20), max(1.250em));
    span{
      color: $red;
      margin: 0 2px;
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
