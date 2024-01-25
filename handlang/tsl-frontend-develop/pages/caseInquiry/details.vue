<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="caseInquiryDetail">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/caseInquiry">案件查詢</a> / <a href="/caseInquiry/details?id=123">服務申請</a>
    </span>

    <div id="content" class="caseInquiryDetail--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>案件明細</h2>
    </div>

    <div class="caseInquiryDetail_element">
      <div v-if="TSLform.acctType==4||TSLform.acctType==5" class="appealstate" style="margin-bottom: 30px;">
        <label for="caseStatus">
          <p>處理狀態：</p>
        </label>
        <el-select id="caseStatus" v-model="caseStatus" name="caseStatus" placeholder="處理狀態" popper-class="defaultSelect">
          <el-option v-for="item,index in caseStatusList" :key="index" :label="item.strVal" :value="item.codeId" />
        </el-select>
      </div>
      <div v-else class="state">
        <p>處理狀態：{{ statusList(form.caseStatus) }}</p>
        <el-button v-if="form.caseStatus == 'WIT'" class="TSLbutton red" @click="revisecaseStatus()">
          <p>取消案件</p>
        </el-button>
      </div>
      <div v-if="TSLform.acctType==4||TSLform.acctType==5" class="appealstate" style="margin-bottom: 30px;">
        <label for="statelevel">
          <p>案件等級：</p>
        </label>
        <el-select
          id="statelevel"
          v-model="statelevel"
          name="statelevel"
          placeholder="案件等級"
          popper-class="defaultSelect"
          @change="acctServiceList(statelevel)"
        >
          <el-option v-for="item,index in caseLevelList" :key="index" :label="item.name" :value="item.caseId" />
        </el-select>
      </div>
      <template v-else>
        <div v-if="statelevelName != '-'" class="detailsItem">
          <p>案件等級：{{ statelevelName }}</p>
        </div>
      </template>
      <div v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="dispatch">
        <label for="statelevel" style="flex-shrink: 0;">
          <p>派案人員：</p>
        </label>
        <div class="dispatch_body">
          <div v-for="item,index in dispatchList" :key="index" class="dispatch_item">
            <el-select
              v-model="item.verifyId"
              name="dispatchList"
              placeholder="未派員"
              popper-class="defaultSelect"
              @change="statelevelId(item, index)"
            >
              <el-option v-for="item2,index2 in serviceList" :key="index2" :label="item2.name" :value="item2.verifyId" />
            </el-select>
            <div class="date">
              <label for="dateinput" class="title">
                <p>派案時間：</p>
              </label>
              <div class="date_input">
                <el-date-picker
                  id="dateinput"
                  v-model="item.beginDateTime"
                  type="datetime"
                  :clearable="false"
                  text="起始日期"
                  name="dateinput"
                  placeholder="yyyy/MM/dd HH:mm"
                  value-format="yyyy/MM/dd HH:mm"
                  format="yyyy/MM/dd HH:mm"
                />
                <span>至</span>
                <el-date-picker
                  id="dateinput"
                  v-model="item.endDateTime"
                  type="datetime"
                  :clearable="false"
                  text="最後日期"
                  name="dateinput"
                  placeholder="yyyy/MM/dd HH:mm"
                  value-format="yyyy/MM/dd HH:mm"
                  format="yyyy/MM/dd HH:mm"
                />
              </div>
            </div>

            <div class="addBtn" @click="adddispatch">
              <img src="~/static/img/addBtn.png" alt="新增派案員">
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div v-if="dispatchListShow.length != 0 && dispatchListShow[0].name != ''" class="detailsItem">
          <p style="flex-shrink: 0; line-height: 50px;">
            派案人員：
          </p>
          <div class="detailsItem_content">
            <div v-for="item,index in dispatchListShow" :key="index" class="detailsItem_item">
              <p style="line-height: 50px;">
                {{ item.name }}  派案時間：<span v-if="closeDiv(item.beginDateTime)!==false">{{ $moment(item.beginDateTime).format('yyyy/MM/DD HH:mm') }} ~ {{ $moment(item.endDateTime).format('yyyy/MM/DD HH:mm') }}</span><span v-else>未選擇</span>
              </p>
              <div v-if="TSLform.acctType == 3" class="detailsItem_btn">
                <a :href="'http://www.google.com/calendar/event?action=TEMPLATE&text=新北市社會局服務申請&dates=' + $moment(item.beginDateTime).format('yyyyMMDDTHHmmSSZ') + '/' + $moment(item.endDateTime).format('yyyyMMDDTHHmmSSZ') + '&details=Event+Details'" class="button" target="_blank"><p>加入行事曆</p></a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="handlingContent">
        <label for="exceptionRemark">
          <p>狀態異動備註：</p>
        </label>
        <div class="handlingContent_content">
          <el-input
            id="exceptionRemark"
            v-model="exceptionRemark"
            type="textarea"
            :rows="2"
            placeholder=""
            resize="none"
            text="請輸入狀態異動備註"
            name="exceptionRemark"
          />
        </div>
      </div>

      <div class="detailscontent">
        <p>明細內容：</p>
        <div class="detailscontent_table">
          <div class="item">
            <div class="item_left">
              <p>案件編號</p>
            </div>
            <div class="item_right">
              <p>{{ form.caseNum }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>申請角色</p>
            </div>
            <div class="item_right">
              <p>{{ form.identity }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>姓名</p>
            </div>
            <div class="item_right">
              <p>{{ form.name }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>E-mail</p>
            </div>
            <div class="item_right">
              <p>{{ form.email }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>電話號碼</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.telphone)!==false?form.telphone: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>手機號碼</p>
            </div>
            <div class="item_right">
              <p>{{ form.cellphone }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>申請服務時間</p>
            </div>
            <div class="item_right">
              <p>{{ $moment(form.beginDate).format('yyyy/MM/DD HH:mm') }} ~ {{ $moment(form.endDate).format('yyyy/MM/DD HH:mm') }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>休息時間</p>
            </div>
            <div class="item_right">
              <p>{{ form.breakTimeShow }} (扣除休息時間，本次申請時數共計 {{ (form.serviceHrsReal) }} 小時)</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>案件類別</p>
            </div>
            <div class="item_right">
              <p>{{ form.caseType }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>服務事由</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.applyNote)!==false?form.applyNote: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>慣用溝通方式</p>
            </div>
            <div class="item_right">
              <p>{{ form.usualComm.toString() }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>服務地點</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.location)!==false?form.location: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>服務地址</p>
            </div>
            <div v-if="closeDiv(form.city)!=false" class="item_right" style="display: flex;flex-wrap: wrap;align-items: center;justify-content: center;">
              <p>{{ form.city + form.dist + form.address }}</p>
              <el-button v-if="TSLform.acctType == 3 || TSLform.acctType == 4 || TSLform.acctType == 5" class="TSLbutton red" style="margin-left: 5px;" @click="openMap(form.city + form.dist + form.address)">
                <p>查看地圖</p>
                <!-- <a :href="'https://www.google.com/maps/place/' + form.city + form.dist + form.address" target="_blank"><p>查看地圖</p></a> -->
              </el-button>
            </div>
            <div v-else class="item_right">
              <p>-</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>視訊網址</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.liveUrl)!==false?form.liveUrl: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>現場總人數</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.totlePerson)!==false?form.totlePerson: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>聽語障者人數</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.damagePerson)!==false?form.damagePerson: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>人數說明</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.participantsNote)!==false?form.participantsNote: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>現場聯絡方式</p>
            </div>
            <div class="item_right">
              <p v-if="form.participantsContact == '1'">
                同申請人
              </p>
              <p v-if="form.participantsContact == '2'">
                同現場聯絡人
              </p>
            </div>
          </div>
          <div v-if="form.participantsContact == '2'" class="item">
            <div class="item_left">
              <p>現場聯絡人姓名</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.contactName)!==false?form.contactName: '-' }}</p>
            </div>
          </div>
          <div v-if="form.participantsContact == '2'" class="item">
            <div class="item_left">
              <p>現場聯絡人關係/職稱</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.contactRelation)!==false?form.contactRelation: '-' }}</p>
            </div>
          </div>
          <div v-if="form.participantsContact == '2'" class="item">
            <div class="item_left">
              <p>現場聯絡人手機</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.contactNumber)!==false?form.contactNumber: '-' }}</p>
            </div>
          </div>
          <div v-if="applyType == 2" class="item">
            <div class="item_left">
              <p>自備電腦</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.loptop)===false">
                -
              </p>
              <p v-if="form.loptop == '1'">
                場地自備
              </p>
              <p v-if="form.loptop == '2'">
                請聽打員自備
              </p>
            </div>
          </div>
          <div v-if="applyType == 2" class="item">
            <div class="item_left">
              <p>自備投影機</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.projector)===false">
                -
              </p>
              <p v-if="form.projector == '1'">
                可移動
              </p>
              <p v-if="form.projector == '2'">
                固定式
              </p>
            </div>
          </div>
          <div v-if="applyType == 2" class="item">
            <div class="item_left">
              <p>自備投影幕</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.projectorScreen)===false">
                -
              </p>
              <p v-if="form.projectorScreen == '1'">
                投影/電子布幕
              </p>
              <p v-if="form.projectorScreen == '2'">
                液晶電視/螢幕
              </p>
              <p v-if="form.projectorScreen == '3'">
                牆面
              </p>
              <p v-if="form.projectorScreen == '4'">
                白板
              </p>
              <p v-if="form.projectorScreen == '5'">
                {{ form.projectorScreenNote }}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>附件</p>
            </div>
            <div v-if="fileList.length!=0" class="item_right">
              <a v-for="item,index in fileList" :key="index" href="javascript:void(0);" @click="filemanager_downloadOne(item.id, item.oriFileName)">
                <p>
                  {{ item.oriFileName }}
                </p>
              </a>
            </div>
            <div v-else class="item_right">
              <p>-</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>備註</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.remark)!==false?form.remark: '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="caseInquiryDetail_element--btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/caseInquiry' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="TSLbutton red" @click="submitForm">
          <p>送出</p>
        </el-button>
      </div>
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
import { ListData } from '@/assets/js/base'
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
    return {
      gid: '',
      applyType: 1,
      caseStatus: '',
      statelevel: '',
      statelevelName: '',
      exceptionRemark: '',
      form: {
        name: '',
        email: '',
        cellphone: '',
        telphone: '',
        identity: '',
        usualComm: [],
        usualCommNote: '',
        beginDate: '',
        endDate: ''
      },
      dispatchList: [
        {
          verifyId: '',
          name: '',
          beginDateTime: '',
          endDateTime: ''
        }
      ],
      dispatchListShow: [
      ],
      applyTime: 0,
      fileList: [],
      caseStatusList: [],
      caseLevelList: [],
      serviceList: [],
      cityData: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  mounted () {
    this.gid = this.$route.query.gid
    this.getByType()
    this.getByCity()
  },
  methods: {
    applyCaseSelectByGid () {
      const vm = this
      const data = JSON.parse(sessionStorage.getItem('caseInquiry'))
      vm.form = data
      vm.form.name = data.personal.name
      vm.form.email = data.personal.email
      vm.form.cellphone = data.personal.cellphone
      vm.form.telphone = data.personal.telphone
      vm.exceptionRemark = data.exceptionRemark
      vm.caseStatus = data.caseStatus
      if (data.files.length !== 0) {
        for (let i = 0; i < data.files.length; i++) {
          const item = data.files[i]
          this.fileList.push(item)
        }
      }
      vm.form.breakTimeShow = ''
      vm.form.breakTime = vm.closeDiv(data.breakTime) !== false ? data.breakTime : '0'
      vm.form.serviceHrs = vm.closeDiv(data.serviceHrs) !== false ? data.serviceHrs : 0
      vm.form.serviceHrsReal = vm.form.serviceHrs
      if (vm.form.breakTime.includes(':')) {
        const tmp = vm.form.breakTime.split(':')
        vm.form.breakTimeShow = tmp[0] + '時'
        vm.form.breakTimeShow += tmp[1] + '分'
      } else {
        vm.form.breakTimeShow = vm.form.breakTime + '時'
      }

      // vm.form.breakTime = vm.closeDiv(data.breakTime) !== false ? data.breakTime : 0
      const caseType = vm.closeDiv(data.caseType) !== false ? vm.getCCIS(data.caseType) : '-'
      if (caseType !== '-') {
        caseType.then((result) => {
          vm.form.caseType = result
        })
      } else {
        vm.form.caseType = '-'
      }
      vm.form.beginDate = data.beginDate
      vm.form.endDate = data.endDate
      vm.caseLevelList = ListData.caseLevelList
      if (vm.closeDiv(data.caseLevel) !== false) {
        for (let i = 0; i < vm.caseLevelList.length; i++) {
          const item = vm.caseLevelList[i]
          if (item.caseId === data.caseLevel) {
            vm.statelevelName = item.name
          }
        }
      } else {
        vm.statelevelName = '-'
      }
      vm.statelevel = data.caseLevel
      if (vm.closeDiv(vm.statelevel) !== false) {
        vm.acctServiceList(vm.statelevel)
      }
      if (data.serviceLogs.length !== 0) {
        const userData = JSON.parse(localStorage.getItem('TSLform'))
        for (let i = 0; i < data.serviceLogs.length; i++) {
          const item = data.serviceLogs[i]

          if (userData.acctType === 3 && userData.verifyId !== item.verifyId) {
            continue
          }

          // 將有被指派的加到顯示的arr中
          vm.dispatchListShow.push(item)
          if (vm.closeDiv(item.beginDateTime) !== false) {
            item.beginDateTime = vm.$moment(item.beginDateTime).format('yyyy/MM/DD HH:mm')
          }
          if (vm.closeDiv(item.endDateTime) !== false) {
            item.endDateTime = vm.$moment(item.endDateTime).format('yyyy/MM/DD HH:mm')
          }
        }
        vm.dispatchList = data.serviceLogs
      } else if (vm.TSLform.acctType !== 4 && vm.TSLform.acctType !== 5) {
        vm.dispatchList = []
      }
      const arr1 = vm.form.usualComm.split(',').map(Number)
      const list = ListData.usualCommList.filter((value) => {
        return arr1.includes(value.id)
      })
      vm.applyType = Number(data.applyType)
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
      vm.form.usualComm = []
      list.forEach(function (item) {
        if (item.id === 0) {
          vm.form.usualComm.push(vm.form.usualCommNote)
        } else {
          vm.form.usualComm.push(item.name)
        }
      })
      vm.cityData.forEach(function (item) {
        if (item.codeName === vm.form.city) {
          vm.form.city = item.strVal
        }
      })
    },
    async revisecaseStatus () {
      const vm = this
      const obj = {
        gid: vm.form.gid,
        caseStatus: 'CANL',
        caseLevel: vm.statelevel,
        exceptionRemark: vm.exceptionRemark,
        serviceLogs: vm.dispatchList
      }
      const res = await frontendApi.applyCaseEditService(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '修改案件狀態成功'
        vm.defaultId = 1
        vm.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    },
    async submitForm () {
      const vm = this
      const obj = {
        gid: vm.form.gid,
        caseStatus: vm.caseStatus,
        caseLevel: vm.statelevel,
        exceptionRemark: vm.exceptionRemark,
        serviceLogs: vm.dispatchList
      }
      const res = await frontendApi.applyCaseEditService(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '案件明細修改成功'
        vm.defaultId = 1
        vm.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    },
    statelevelId (tmp, idx) {
      for (let i = 0; i < this.dispatchList.length; i++) {
        const item = this.dispatchList[i]
        for (let j = 0; j < this.serviceList.length; j++) {
          const itemj = this.serviceList[j]
          if (item.verifyId === itemj.verifyId) {
            item.name = itemj.name
            break
          }
        }
      }
    },
    async getByCity () {
      const res = await frontendApi.getByCity()
      if (res.isSuccess === true) {
        this.cityData = res.data
        this.applyCaseSelectByGid()
      }
    },
    async getByType () {
      const vm = this
      const type = this.TSLform.acctType
      let codeType = ''
      switch (type) {
        case 3:
          codeType = 'SDIS'
          break
        case 4:
          codeType = 'GDIS'
          break
        case 5:
          codeType = 'GDIS'
          break
        default:
          codeType = 'PDIS'
      }
      const obj = {
        codeType
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        vm.caseStatusList = res.data
      }
    },
    async getCCIS (caseType) {
      const obj = {
        codeType: 'CCIS'
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        let CCIS = ''
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          if (item.codeId === caseType) {
            CCIS = item.strVal
          }
        }
        return CCIS
      }
    },
    async acctServiceList (caseLevel) {
      const vm = this
      const obj = {
        caseLevel,
        gid: vm.form.gid,
        applyBeginDate: vm.form.beginDate
      }
      const res = await frontendApi.acctServiceList(obj)
      if (res.isSuccess === true) {
        vm.serviceList = res.data
      }
    },
    adddispatch () {
      this.dispatchList.push({
        verifyId: '',
        name: '',
        beginDateTime: '',
        endDateTime: ''
      })
    },
    openMap (address) {
      const src = 'https://www.google.com/maps/place/' + address
      window.open(src, '_blank')
    },
    statusList (val) {
      const vm = this
      for (let i = 0; i < vm.caseStatusList.length; i++) {
        const item = vm.caseStatusList[i]
        if (item.codeId.trim() === val) {
          return item.strVal.trim()
        }
      }

      // eslint-disable-next-line eqeqeq
      if (this.TSLform.acctType == 5 || this.TSLform.acctType == 4 || this.TSLform.acctType == 3) {
        // eslint-disable-next-line eqeqeq
        if (val == 'SEND') { return '待回報' }
      }

      // eslint-disable-next-line eqeqeq
      if (this.TSLform.acctType == 1 || this.TSLform.acctType == 2) {
        // eslint-disable-next-line eqeqeq
        if (val == 'WIR') { return '已派案' }
      }

      // eslint-disable-next-line eqeqeq
      if (this.TSLform.acctType == 1 || this.TSLform.acctType == 2) {
        // eslint-disable-next-line eqeqeq
        if (val == 'SEAB') { return '取消申請' }
      }

      // eslint-disable-next-line eqeqeq
      if (this.TSLform.acctType == 1 || this.TSLform.acctType == 2) {
        // eslint-disable-next-line eqeqeq
        if (val == 'APAB') { return '取消申請' }
      }
    }
  }
}
</script>

<style lang="scss">
.caseInquiryDetail{
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

  &_element{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    &--btn{
      margin-top: clamp(min(20px), pc(30), max(30px));
      .el-button.TSLbutton{
        padding: 11px 35px;
      }
    }
    .handlingContent{
      display: flex;
      align-items: flex-start;
      margin-top: 10px;
      label{
        flex-shrink: 0;
        margin-right: 6px;
        margin-top: 10px;
      }
      &_content{
        width: 100%;
        margin-top: 10px;
      }
      .el-textarea__inner{
        border-radius: 10px;
        font-size: 1.111em;
        padding: 10px;
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
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
    }
    .appealstate{
      display: flex;
      align-items: center;
      .TSLbutton{
        margin-left: 20px;
      }

      .el-select{
        width: 100%;
        max-width: 258px;
        flex-shrink: 1;
        .el-input__inner{
          height: 48px;
          line-height: 48px;
          border-radius: 10px;
          border: none;
          color: #ffffff;
          background: #C04729;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          &::placeholder{
            color: #ffffff;
            font-size: 100%;
          }
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
      }
    }
    .dispatch{
      display: flex;
      align-items: flex-start;
      box-sizing: border-box;
      @include phSize{
        flex-direction: column;
      }
      label{
        height: 48px;
        display: flex;
        align-items: center;
      }
      &_body{
        width: 100%;
        box-sizing: border-box;
      }
      &_item{
        width: 100%;
        max-width: 980px;
        display: flex;
        align-items: center;
        margin-left: 20px;
        border-radius: 10px;
        padding: 5px;
        box-sizing: border-box;
        border: 1px dashed #000;
        margin-top: 10px;
        @include phSize{
          margin-left: 0px;
          align-items: flex-start;
          flex-direction: column;
        }
        .addBtn{
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: none;
          cursor: pointer;
          margin-left: 15px;
          img{
            max-width: 100%;
            max-height: 100%;
          }
          @include phSize{
            margin-left: 0px;
            margin-top: 10px;
          }
        }
        &:first-child{
          margin-top: 0;
        }
        &:last-child{
          max-width: 1048px;
          .addBtn{
            display: block;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .el-select{
        width: 100%;
        max-width: 258px;
        .el-input__inner{
          height: 48px;
          line-height: 48px;
          border-radius: 10px;
          border: none;
          color: #ffffff;
          background: #C04729;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          &::placeholder{
            color: #ffffff;
            font-size: 100%;
          }
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
      }
      .date{
        width: 100%;
        max-width: 780px;
        display: flex;
        align-items: center;
        margin-left: 15px;
        @include phSize{
          margin-left: 0px;
          margin: 10px 0;
          align-items: flex-start;
          flex-direction: column;
        }
        span{
          flex-shrink: 0;
          margin: 0 10px;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          @include phSize{
            margin: 10px 0;
          }
        }
        .title{
          flex-shrink: 0;
        }
        .el-input__inner {
          height: 50px;
          line-height: 50px;
          border-radius: 10px;
          border: 1px solid #545454;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          &:focus{
            outline: 3px dashed #990094;
          }
          &::placeholder{
            color: $default;
          }
        }
        &_input{
          width: 100%;
          display: flex;
          align-items: center;
          @include phSize{
            align-items: flex-start;
            flex-direction: column;
          }
        }
        .el-date-editor.el-input, .el-date-editor.el-input__inner{
          width: 100%;
        }
        .el-input__prefix{
          margin: 0;
          left: auto;
          right: 5px;
          i{
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $default;
          }
        }
      }
    }
    .state{
      display: flex;
      align-items: center;
      .TSLbutton{
        margin-left: 20px;
      }

      .el-select{
        width: 100%;
        max-width: 258px;
        .el-input__inner{
          height: 48px;
          line-height: 48px;
          border-radius: 10px;
          border: none;
          color: #ffffff;
          background: #C04729;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          &::placeholder{
            color: #ffffff;
            font-size: clamp(min(1.125em), pc(20), max(1.250em));
          }
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
      }
    }
    .detailsItem{
      margin: 20px 0;
      display: flex;
      align-items: flex-start;
      @include phSize{
        flex-direction: column;
      }
      &_content{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 8px;
        @include phSize{
          margin-left: 0px;
        }
      }
      &_item{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        &:last-child{
          margin-bottom: 10px;
        }
        @include phSize{
          align-items: flex-start;
          flex-direction: column;
        }
      }
      &_btn{
        width: 100%;
        max-width: 167px;
        margin-left: 10px;
        .button{
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #C04729;
          p{
            color: #ffffff;
          }
        }
        @include phSize{
          margin-left: 0;
          margin-top: 10px;
        }
      }
    }

    .detailscontent{
      margin-top: clamp(min(20px), pc(30), max(30px));
      &_table{
        margin-top: 10px;
        border: 1px solid $default;
      }
      .item{
        min-height: 30px;
        display: flex;
        background: #ffffff;
        &:nth-child(even){
          background: #EFD1C9;
        }
        p{
          letter-spacing: 3px;
        }
        &_left{
          width: 100%;
          max-width: 420px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 10px;
          border-right: 1px solid #545454;
        }
        &_right{
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          word-break: break-all;
          justify-content: center;
        }
      }
    }

    @include phSize(){
      .detailscontent{
        .item{
          flex-direction: column;
          align-items: flex-start;
          &_left,&_right{
            width: 100%;
            text-align: justify;
          }
          &_left{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
