<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="severform">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/caseInquiry">案件查詢</a> / <a href="/caseInquiry/severform">{{ title }}服務紀錄表</a>
    </span>

    <div id="content" class="severform--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>{{ title }}服務紀錄表</h2>
    </div>

    <el-form ref="form" :model="form" :rules="rules" class="form">
      <el-form-item style="max-width: 600px;">
        <label for="caseNum">案件號碼<p>(必填)</p></label>
        <el-input id="caseNum" v-model="form.caseNum" name="caseNum" disabled />
      </el-form-item>
      <div class="form_item">
        <el-form-item>
          <label for="applyName">申請者/單位名稱<p>(必填)</p></label>
          <el-input id="applyName" v-model="form.applyName" name="applyName" disabled />
        </el-form-item>
        <el-form-item>
          <label for="serveName">服務人員姓名<p>(必填)</p></label>
          <el-input id="serveName" v-model="form.serveName" name="serveName" disabled />
        </el-form-item>
      </div>
      <div class="form_item time">
        <el-form-item class="severTime">
          <label for="beginDate">申請服務時間(必填)</label>
          <div class="timeItme">
            <el-input id="beginDate" v-model="form.beginDate" name="beginDate" disabled />
            <p>至</p>
            <el-input id="endDate" v-model="form.endDate" name="endDate" disabled />
          </div>
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="seats">宣導人次</label>
          <el-input id="seats" v-model="form.seats" name="seats" :maxlength="10" />
        </el-form-item>
        <el-form-item prop="location" :rules="[{ required: true, message: '此欄位必填', trigger: 'blur' }]">
          <label for="location">服務地點<p>(必填)</p></label>
          <el-input id="location" v-model="form.location" name="location" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="serviseCounts">服務人次</label>
          <el-input id="serviseCounts" v-model="form.serviseCounts" name="serviseCounts" :maxlength="10" />
        </el-form-item>
        <el-form-item class="pnumber">
          <label for="hearingimpaired">現場受服務之聽障者人次<p>(必填)</p></label>
          <div class="pnumber_in">
            <el-form-item prop="hearingimpairedM" :rules="[{ required: true, message: '此欄位必填', trigger: 'blur' }]">
              <el-input id="hearingimpairedM" v-model="form.hearingimpairedM" name="hearingimpairedM" :maxlength="10">
                <template slot="prepend">
                  男
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="hearingimpairedF" :rules="[{ required: true, message: '此欄位必填', trigger: 'blur' }]">
              <el-input id="hearingimpairedF" v-model="form.hearingimpairedF" name="hearingimpairedF" :maxlength="10">
                <template slot="prepend">
                  女
                </template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <el-form-item class="form_radio" prop="contactType" :rules="[{ required: true, message: '此欄位必填', trigger: 'change' }]">
        <label for="contactType">現場聯絡方式<p>(必填)</p></label>
        <el-checkbox-group v-model="form.contactType" @change="bindCheckBox(form.contactType, 'contactType')">
          <el-checkbox label="1">
            同申請人手機/簡訊
          </el-checkbox>
          <el-checkbox label="2">
            同聯絡人手機
          </el-checkbox>
          <el-checkbox label="0">
            <label for="contactNote">其他</label>
            <el-input id="contactNote" v-model="form.contactNote" name="contactNote" :disabled="form.contactType[0]!='0'?true:false" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="form_radio" prop="handlangType" :rules="[{ required: true, message: '此欄位必填', trigger: 'change' }]">
        <label for="hCategory">聽障者所使用的手語<p>(必填)</p></label>
        <el-checkbox-group v-model="form.handlangType" @change="bindCheckBox(form.handlangType, 'handlangType')">
          <el-checkbox label="1">
            自然手語
          </el-checkbox>
          <el-checkbox label="2">
            手勢中文（文字手語）
          </el-checkbox>
          <el-checkbox label="3">
            口手語並用
          </el-checkbox>
          <el-checkbox label="4">
            筆談
          </el-checkbox>
          <el-checkbox label="5">
            口語
          </el-checkbox>
          <el-checkbox label="0">
            <label for="handlangNote">其他</label>
            <el-input id="handlangNote" v-model="form.handlangNote" name="handlangNote" :disabled="form.handlangType.indexOf('0')==-1?true:false" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="attend">
        <label for="hCategory">出席情形<p>(必填)</p></label>
        <el-form-item class="form_radio" prop="cassStatusQ1" :rules="[{ required: true, message: '此欄位必填', trigger: 'change' }]">
          <label for="hCategory">(1)聽障者：</label>
          <el-checkbox-group v-model="form.cassStatusQ1" @change="bindCheckBox(form.cassStatusQ1, 'cassStatusQ1')">
            <el-checkbox label="1">
              準時
            </el-checkbox>
            <el-checkbox label="2">
              <label for="cassStatusQ1Mins">遲到，約</label>
              <el-input id="cassStatusQ1Mins" v-model="form.cassStatusQ1Mins" name="cassStatusQ1Mins" :disabled="form.cassStatusQ1.indexOf('2')==-1?true:false" />
              <label for="cassStatusQ1Mins"> 分鐘</label>
            </el-checkbox>
            <el-checkbox label="3">
              早退
            </el-checkbox>
            <el-checkbox label="4">
              未到
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio" prop="cassStatusQ2" :rules="[{ required: true, message: '此欄位必填', trigger: 'change' }]">
          <label for="cassStatusQ2">(2)主講者：</label>
          <el-checkbox-group v-model="form.cassStatusQ2" @change="bindCheckBox(form.cassStatusQ2, 'cassStatusQ2')">
            <el-checkbox label="1">
              準時
            </el-checkbox>
            <el-checkbox label="2">
              <label for="cassStatusQ2Mins">遲到，約</label>
              <el-input id="cassStatusQ2Mins" v-model="form.cassStatusQ2Mins" name="cassStatusQ2Mins" :disabled="form.cassStatusQ2.indexOf('2')==-1?true:false" />
              <label for="cassStatusQ2Mins"> 分鐘</label>
            </el-checkbox>
            <el-checkbox label="3">
              早退
            </el-checkbox>
            <el-checkbox label="4">
              未到
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio" prop="cassStatusQ3" :rules="[{ required: true, message: '此欄位必填', trigger: 'change' }]">
          <label for="cassStatusQ3">(3)聽打員：</label>
          <el-checkbox-group v-model="form.cassStatusQ3" @change="bindCheckBox(form.cassStatusQ3, 'cassStatusQ3')">
            <el-checkbox label="1">
              準時
            </el-checkbox>
            <el-checkbox label="2">
              <label for="cassStatusQ3Mins">遲到，約</label>
              <el-input id="cassStatusQ3Mins" v-model="form.cassStatusQ3Mins" name="cassStatusQ3Mins" :disabled="form.cassStatusQ3.indexOf('2')==-1?true:false" />
              <label for="cassStatusQ3Mins"> 分鐘</label>
            </el-checkbox>
            <el-checkbox label="3">
              早退
            </el-checkbox>
            <el-checkbox label="4">
              未到
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form-item>
      <el-form-item prop="locationRemark" :rules="[{ required: true, message: '此欄位必填', trigger: 'blur' }]">
        <label for="locationRemark">現場狀況描述<p>(必填)</p></label>
        <el-input
          id="locationRemark"
          v-model="form.locationRemark"
          type="textarea"
          :rows="3"
          placeholder="現場狀況描述"
          resize="none"
          name="locationRemark"
        />
      </el-form-item>
      <el-form-item>
        <label for="advaceRemark">建議事項</label>
        <el-input
          id="advaceRemark"
          v-model="form.advaceRemark"
          type="textarea"
          :rows="3"
          placeholder="建議事項"
          resize="none"
          name="advaceRemark"
        />
      </el-form-item>
      <div class="form_item time">
        <el-form-item class="severTime">
          <label for="ServiceDatetimeS1B">第1段服務時間</label>
          <div class="timeItme">
            <el-form-item prop="ServiceDatetimeS1B" style="margin:0px;">
              <el-date-picker
                v-model="form.ServiceDatetimeS1B"
                type="datetime"
                :clearable="false"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
              />
            </el-form-item>
            <p>至</p>
            <el-form-item prop="ServiceDatetimeS1E" style="margin:0px;">
              <el-date-picker
                v-model="form.ServiceDatetimeS1E"
                type="datetime"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
                :clearable="false"
                @change="selectB4Add"
              />
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <div class="form_item time">
        <el-form-item class="severTime">
          <label for="ServiceDatetimeS2B">第2段服務時間</label>
          <div class="timeItme">
            <el-form-item style="margin:0px;">
              <el-date-picker
                v-model="form.ServiceDatetimeS2B"
                type="datetime"
                :clearable="false"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
              />
            </el-form-item>
            <p>至</p>
            <el-form-item prop="ServiceDatetimeS2E" style="margin:0px;">
              <el-date-picker
                v-model="form.ServiceDatetimeS2E"
                type="datetime"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
                :clearable="false"
                @change="selectB4Add"
              />
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <el-form-item class="hrTime" prop="cancalrHours">
        <label for="cancalrHours">申請人取消案件時間離申請時間</label>
        <div class="hrTime_hr">
          <el-select
            id="cancalrHours"
            v-model="form.cancalrHours"
            name="cancalrHours"
            placeholder=""
            popper-class="defaultSelect"
            @change="selectB4Add"
          >
            <el-option label="0" value="0" />
            <el-option label="0.5" value="0.5" />
            <el-option label="1" value="1" />
            <el-option label="1.5" value="1.5" />
            <el-option label="2" value="2" />
            <el-option label="2.5" value="2.5" />
            <el-option label="3" value="3" />
          </el-select>
          <p>HR</p>
        </div>
      </el-form-item>
      <el-form-item style="max-width: 600px;">
        <label for="paymentsByhr">每小時鐘點費</label>
        <el-input id="paymentsByhr" v-model="form.paymentsByhr" name="paymentsByhr" disabled />
      </el-form-item>
      <div class="form_item">
        <el-form-item>
          <label for="realServiceHrs">實際服務時數</label>
          <el-input id="realServiceHrs" v-model="form.realServiceHrs" name="realServiceHrs" disabled />
        </el-form-item>
        <el-form-item>
          <label for="hrsSalary">服務費鐘點費小計</label>
          <el-input id="hrsSalary" v-model="form.hrsSalary" name="hrsSalary" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="payPrice">申請者已付金額</label>
          <el-input
            id="payPrice"
            v-model="form.payPrice"
            name="payPrice"
            oninput="value=value.replace(/[^\d]/g,'')"
            :maxlength="10"
            @change="selectB4Add"
          />
        </el-form-item>
        <el-form-item>
          <label for="payPriceForApplyer">申請者預計負擔費用</label>
          <el-input id="payPriceForApplyer" v-model="form.payPriceForApplyer" name="payPriceForApplyer" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="isFarlocation">偏遠地區地點</label>
          <el-select v-model="form.isFarlocation" placeholder="" popper-class="defaultSelect" clearable @change="selectB4Add">
            <el-option v-for="item,index in locationList" :key="index" :label="item.strVal" :value="item.strVal" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <label for="farlocationFee">偏遠地區交通費</label>
          <el-input id="farlocationFee" v-model="form.farlocationFee" name="farlocationFee" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="emergencyFee">緊急交通費</label>
          <el-input
            id="emergencyFee"
            v-model="form.emergencyFee"
            name="emergencyFee"
            :maxlength="10"
            oninput="value=value.replace(/[^\d]/g,'')"
            @change="selectB4Add"
          />
        </el-form-item>
        <el-form-item>
          <label for="overNightFee">夜間出勤加給費</label>
          <el-input id="overNightFee" v-model="form.overNightFee" name="overNightFee" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="regFee">出勤費</label>
          <el-input id="regFee" v-model="form.regFee" name="regFee" disabled />
        </el-form-item>
        <el-form-item>
          <label for="finalPrice">核銷金額</label>
          <el-input id="finalPrice" v-model="form.finalPrice" name="finalPrice" disabled />
        </el-form-item>
      </div>
      <el-form-item>
        <label for="remark">備註</label>
        <el-input
          id="remark"
          v-model="form.remark"
          type="textarea"
          :rows="4"
          placeholder="備註"
          resize="none"
          name="remark"
        />
      </el-form-item>

      <div class="severform_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/caseInquiry' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="!editForm" class="TSLbutton red" @click="submitForm('form',form)">
          <p>送出</p>
        </el-button>
        <el-button v-else class="TSLbutton red" @click="submitEditForm('form',form)">
          <p>修改</p>
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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/caseInquiry' })">
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
  // eslint-disable-next-line require-await
  async asyncData ({ app, redirect }) {
    const TSLtoken = app.$cookies.get('TSLtoken')
    if (TSLtoken === undefined || TSLtoken === null) {
      redirect('/')
    }
  },
  data () {
    const ServiceDatetimeS1E = (rule, value, callback) => {
      let bd = this.$moment(this.form.ServiceDatetimeS1B).format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value).format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value !== '') {
        if (ed < bd) {
          callback(new Error('結束時間勿小於起始時間'))
        }
        callback()
      } else {
        callback()
      }
    }
    const ServiceDatetimeS2E = (rule, value, callback) => {
      let bd = this.$moment(this.form.ServiceDatetimeS2B).format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value).format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value !== '') {
        if (ed < bd) {
          callback(new Error('結束時間勿小於起始時間'))
        }
        callback()
      } else {
        callback()
      }
    }
    return {
      title: '',
      editForm: false,
      form: {
        gid: '',
        applyGid: '',
        servicegid: '',
        applyType: '',
        caseNum: '',
        applyName: '',
        serveName: '',
        beginDate: '',
        endDate: '',
        seats: '',
        location: '',
        serviseCounts: '',
        hearingimpairedM: '',
        hearingimpairedF: '',
        contactType: [],
        contactNote: '',
        handlangType: [],
        handlangNote: '',
        cassStatusQ1: [],
        cassStatusQ1Mins: '',
        cassStatusQ2: [],
        cassStatusQ2Mins: '',
        cassStatusQ3: [],
        cassStatusQ3Mins: '',
        locationRemark: '',
        advaceRemark: '',
        ServiceDatetimeS1B: '',
        ServiceDatetimeS1E: '',
        ServiceDatetimeS2B: '',
        ServiceDatetimeS2E: '',
        cancalrHours: '',
        paymentsByhr: '',
        realServiceHrs: '',
        hrsSalary: '',
        payPrice: '',
        payPriceForApplyer: '',
        isFarlocation: '',
        farlocationFee: '',
        emergencyFee: '',
        overNightFee: '',
        regFee: '',
        finalPrice: '',
        remark: ''
      },
      locationList: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      rules: {
        ServiceDatetimeS1E: [{ validator: ServiceDatetimeS1E, trigger: 'blur' }],
        ServiceDatetimeS2E: [{ validator: ServiceDatetimeS2E, trigger: 'blur' }]
      }
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-案件查詢-服務紀錄表'
  },
  mounted () {
    this.getForm()
    this.farLocationList()
  },
  methods: {
    getForm () {
      const vm = this
      const form = JSON.parse(sessionStorage.getItem('satisfaction'))
      vm.serviceDetialLogs_select(form)
    },
    async serviceDetialLogs_select (form) {
      const vm = this
      const obj = {
        gid: form.serviceDetialLogs
      }
      const res = await frontendApi.serviceDetialLogs_select(obj)
      if (res.isSuccess === true) {
        // console.log(form)
        vm.form.gid = form.gid
        vm.title = form.applyType === '1' ? '手語翻譯' : '同步聽打'
        vm.form.servicegid = form.serviceDetialLogs
        vm.form.applyGid = form.applyGid
        vm.form.caseNum = form.caseNum
        vm.form.applyName = form.applyName
        vm.form.serveName = form.serveName
        vm.form.beginDate = form.beginDate
        vm.form.endDate = form.endDate
        vm.form.applyType = form.applyType
        if (vm.closeDiv(res.data) !== false) {
          const data = res.data
          vm.editForm = true
          vm.form.servicegid = data.gid
          vm.form.seats = data.seats
          vm.form.location = data.location
          vm.form.serviseCounts = data.serviseCounts
          vm.form.locationRemark = data.locationRemark
          vm.form.hearingimpairedM = data.hearingimpairedM
          vm.form.hearingimpairedF = data.hearingimpairedF
          vm.form.contactType = vm.closeDiv(data.contactType) !== false ? data.contactType.split() : []
          vm.form.contactNote = data.contactNote
          vm.form.handlangType = vm.closeDiv(data.handlangType) !== false ? data.handlangType.split() : []
          vm.form.handlangNote = data.handlangNote
          vm.form.cassStatusQ1 = vm.closeDiv(data.cassStatusQ1) !== false ? data.cassStatusQ1.split() : []
          vm.form.cassStatusQ1Mins = data.cassStatusQ1Mins
          vm.form.cassStatusQ2 = vm.closeDiv(data.cassStatusQ2) !== false ? data.cassStatusQ2.split() : []
          vm.form.cassStatusQ2Mins = data.cassStatusQ2Mins
          vm.form.cassStatusQ3 = vm.closeDiv(data.cassStatusQ3) !== false ? data.cassStatusQ3.split() : []
          vm.form.cassStatusQ3Mins = data.cassStatusQ3Mins
          vm.form.serviseCounts = data.serviseCounts
          vm.form.advaceRemark = data.advaceRemark
          vm.form.ServiceDatetimeS1B = vm.closeDiv(data.serviceDatetimeS1B) !== false ? this.$moment(data.serviceDatetimeS1B).format('yyyy/MM/DD HH:mm') : ''
          vm.form.ServiceDatetimeS1E = vm.closeDiv(data.serviceDatetimeS1E) !== false ? this.$moment(data.serviceDatetimeS1E).format('yyyy/MM/DD HH:mm') : ''
          vm.form.ServiceDatetimeS2B = vm.closeDiv(data.serviceDatetimeS2B) !== false ? this.$moment(data.serviceDatetimeS2B).format('yyyy/MM/DD HH:mm') : ''
          vm.form.ServiceDatetimeS2E = vm.closeDiv(data.serviceDatetimeS2E) !== false ? this.$moment(data.serviceDatetimeS2E).format('yyyy/MM/DD HH:mm') : ''
          vm.form.cancalrHours = data.cancalrHours
          vm.form.paymentsByhr = data.paymentsByhr
          vm.form.realServiceHrs = data.realServiceHrs
          vm.form.hrsSalary = data.hrsSalary
          vm.form.payPrice = data.payPrice
          vm.form.payPriceForApplyer = data.payPriceForApplyer
          vm.form.isFarlocation = data.isFarlocation
          vm.form.farlocationFee = data.farlocationFee
          vm.form.emergencyFee = data.emergencyFee
          vm.form.overNightFee = data.overNightFee
          vm.form.regFee = data.regFee
          vm.form.finalPrice = data.finalPrice
          vm.form.remark = data.remark
        } else {
          vm.editForm = false
          vm.form.gid = form.gid
        }
      } else { return false }
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            gid: '',
            servicegid: form.gid,
            applyType: form.applyType,
            seats: form.seats,
            location: form.location,
            serviseCounts: form.serviseCounts,
            hearingimpairedM: form.hearingimpairedM,
            hearingimpairedF: form.hearingimpairedF,
            contactType: form.contactType.length !== 0 ? form.contactType.join() : '',
            contactNote: form.contactNote,
            handlangType: form.handlangType.length !== 0 ? form.handlangType.join() : '',
            handlangNote: form.handlangNote,
            cassStatusQ1: form.cassStatusQ1.length !== 0 ? form.cassStatusQ1.join() : '',
            cassStatusQ1Mins: form.cassStatusQ1Mins,
            cassStatusQ2: form.cassStatusQ2.length !== 0 ? form.cassStatusQ2.join() : '',
            cassStatusQ2Mins: form.cassStatusQ2Mins,
            cassStatusQ3: form.cassStatusQ3.length !== 0 ? form.cassStatusQ3.join() : '',
            cassStatusQ3Mins: form.cassStatusQ3Mins,
            locationRemark: form.locationRemark,
            advaceRemark: form.advaceRemark,
            ServiceDatetimeS1B: form.ServiceDatetimeS1B,
            ServiceDatetimeS1E: form.ServiceDatetimeS1E,
            ServiceDatetimeS2B: form.ServiceDatetimeS2B,
            ServiceDatetimeS2E: form.ServiceDatetimeS2E,
            cancalrHours: form.cancalrHours,
            paymentsByhr: form.paymentsByhr,
            realServiceHrs: form.realServiceHrs,
            hrsSalary: form.hrsSalary,
            payPrice: form.payPrice,
            payPriceForApplyer: form.payPriceForApplyer,
            isFarlocation: form.isFarlocation,
            farlocationFee: form.farlocationFee,
            emergencyFee: form.emergencyFee,
            overNightFee: form.overNightFee,
            regFee: form.regFee,
            finalPrice: form.finalPrice,
            remark: form.remark
          }
          const res = await frontendApi.serviceDetialLogs_Add(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '服務紀錄表送出成功'
            vm.defaultId = 1
            vm.defaultPopUps = true
          }
        } else {
          vm.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    submitEditForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            gid: form.servicegid,
            applyType: form.applyType,
            seats: form.seats,
            location: form.location,
            serviseCounts: form.serviseCounts,
            hearingimpairedM: form.hearingimpairedM,
            hearingimpairedF: form.hearingimpairedF,
            contactType: form.contactType.length !== 0 ? form.contactType.join() : '',
            contactNote: form.contactNote,
            handlangType: form.handlangType.length !== 0 ? form.handlangType.join() : '',
            handlangNote: form.handlangNote,
            cassStatusQ1: form.cassStatusQ1.length !== 0 ? form.cassStatusQ1.join() : '',
            cassStatusQ1Mins: form.cassStatusQ1Mins,
            cassStatusQ2: form.cassStatusQ2.length !== 0 ? form.cassStatusQ2.join() : '',
            cassStatusQ2Mins: form.cassStatusQ2Mins,
            cassStatusQ3: form.cassStatusQ3.length !== 0 ? form.cassStatusQ3.join() : '',
            cassStatusQ3Mins: form.cassStatusQ3Mins,
            locationRemark: form.locationRemark,
            advaceRemark: form.advaceRemark,
            ServiceDatetimeS1B: form.ServiceDatetimeS1B,
            ServiceDatetimeS1E: form.ServiceDatetimeS1E,
            ServiceDatetimeS2B: form.ServiceDatetimeS2B,
            ServiceDatetimeS2E: form.ServiceDatetimeS2E,
            cancalrHours: form.cancalrHours,
            paymentsByhr: form.paymentsByhr,
            realServiceHrs: form.realServiceHrs,
            hrsSalary: form.hrsSalary,
            payPrice: form.payPrice,
            payPriceForApplyer: form.payPriceForApplyer,
            isFarlocation: form.isFarlocation,
            farlocationFee: form.farlocationFee,
            emergencyFee: form.emergencyFee,
            overNightFee: form.overNightFee,
            regFee: form.regFee,
            finalPrice: form.finalPrice,
            remark: form.remark
          }
          const res = await frontendApi.serviceDetialLogs_Edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '服務紀錄表編輯成功'
            vm.defaultId = 1
            vm.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            vm.defaultPopUps = true
          }
        } else {
          vm.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    async farLocationList () {
      const vm = this
      const res = await frontendApi.farLocationList()
      if (res.isSuccess === true) {
        vm.locationList = res.data
      }
    },
    async selectB4Add () {
      const vm = this
      const obj = {
        gid: vm.form.gid,
        applyGid: vm.form.applyGid,
        beginDateTime1: vm.form.ServiceDatetimeS1B,
        endDateTime1: vm.form.ServiceDatetimeS1E,
        beginDateTime2: vm.form.ServiceDatetimeS2B,
        endDateTime2: vm.form.ServiceDatetimeS2E,
        emergencyFee: vm.closeDiv(vm.form.emergencyFee) !== false ? Number(vm.form.emergencyFee) : 0,
        alreadyPay: vm.closeDiv(vm.form.payPrice) !== false ? Number(vm.form.payPrice) : 0,
        locationStrVal: vm.form.isFarlocation,
        cancalrHours: vm.form.cancalrHours,
        hrsSalary: vm.form.paymentsByhr
      }
      const res = await frontendApi.serviceDetialLogs_selectB4Add(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.form.realServiceHrs = data.realServiceHrs
        vm.form.paymentsByhr = data.hrsSalary
        vm.form.hrsSalary = data.salary
        vm.form.payPriceForApplyer = data.applierPrice
        vm.form.isFarlocation = data.locationStrVal
        vm.form.farlocationFee = data.farlocationFee
        vm.form.overNightFee = data.overNightFee
        vm.form.regFee = data.regFee
        vm.form.finalPrice = data.finalPrice
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    },
    bindCheckBox (val, name) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
      switch (name) {
        case 'contactType':
          if (val.includes('0') === false) {
            this.form.contactNote = ''
          }
          break
        case 'handlangType':
          if (val.includes('0') === false) {
            this.form.handlangNote = ''
          }
          break
        case 'cassStatusQ1':
          if (val.includes('2') === false) {
            this.form.cassStatusQ1Mins = ''
          }
          break
        case 'cassStatusQ2':
          if (val.includes('2') === false) {
            this.form.cassStatusQ2Mins = ''
          }
          break
        case 'cassStatusQ3':
          if (val.includes('2') === false) {
            this.form.cassStatusQ3Mins = ''
          }
          break
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
.severform{
  &--title{
    height: 50px;
    display: flex;
    align-items: center;
    color: $red;
    background: #FFF9F9;
    padding: 0 clamp(min(22px), pc(36), max(36px));
    margin-top: clamp(min(20px), pc(40), max(40px));
    margin-bottom: clamp(min(20px), pc(68), max(68px));
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
      max-width: 113px;
    }
    @include phSize{
      justify-content: center;
    }
  }

  .form{
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner{
      border-color: #F56C6C;
    }
    .timeItme{
      display: flex;
      align-items: center;
      p{
        flex-shrink: 0;
        margin: 0 10px;
      }
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
        p{
          margin: 10px 0;
        }
      }
    }
    .hrTime{
      width: 100%;
      max-width: 760px;
      .el-form-item__content{
        display: flex;
        align-items: center;
        label{
          margin-bottom: 0;
        }
        @include phSize{
          flex-direction: column;
          align-items: flex-start;
          label{
            margin-bottom: 10px;
          }
        }
      }
      &_hr{
        width: 100%;
        display: flex;
        align-items: center;
        p{
          margin-left: 10px;
        }
      }
    }
    .el-form-item.severTime{
      margin-right: 0;
      .el-input__suffix{
        display: none;
      }
    }
    .el-form-item.pnumber{
      .pnumber_in{
        display: flex;
        align-items: center;
      }
      .el-form-item{
        margin-top: 0;
        &:first-child{
          margin-right: 0;
          .el-input__inner{
            border-radius: 0;
          }
        }
        &:last-child{
          .el-input-group__prepend{
            border-radius: 0;
          }
        }
      }
      .el-input__inner{
        border-radius: 0px 10px 10px 0px;
      }
      .el-input-group__prepend{
        color: #ffffff;
        font-size: 100%;
        background-color: $default;
        border-radius:10px 0px 0px 10px;
        border: 1px solid #545454;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
      }
    }

    .el-form-item.attend{
      .el-form-item.form_radio{
        margin-top: 10px;
        .el-form-item__content{
          display: flex;
          align-items: center;
          label{
            margin-bottom: 0;
          }
          @include phSize{
            label{
              margin-bottom: 10px;
            }
            flex-direction: column;
            align-items: flex-start;
          }
        }
        .el-checkbox-group{
          label{
            margin: 0 5px;
          }
          @include phSize{
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
