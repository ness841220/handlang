<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="caseInquiry">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/caseInquiry">案件查詢</a>
    </span>

    <div id="content" class="caseInquiry--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>案件查詢</h2>
    </div>

    <div v-if="acctType==1||acctType==2" class="hotkey">
      提醒！尚有案件 待處理<el-button @click="hotkeyword('WIT')">
        {{ pending }}
      </el-button>件，處理中<el-button @click="hotkeyword('PED')">
        {{ processing }}
      </el-button>件，已派案<el-button @click="hotkeyword('SEND')">
        {{ assignCass }}
      </el-button>件
    </div>
    <div v-else-if="acctType==3" class="hotkey">
      提醒！尚有案件 待回報<el-button @click="hotkeyword('WIR')">
        {{ returnCass }}
      </el-button>件
    </div>
    <div v-else class="hotkey">
      提醒！尚有案件 待處理<el-button @click="hotkeyword('WIT')">
        {{ pending }}
      </el-button>件，處理中<el-button @click="hotkeyword('PED')">
        {{ processing }}
      </el-button>件，待回報<el-button @click="hotkeyword('WIR')">
        {{ returnCass }}
      </el-button>件
    </div>

    <div v-if="acctType==4||acctType==5" class="caseInquiry_search">
      <div class="gdis">
        <div class="keyword">
          <label for="caseNum" class="title">
            <p>案件編號</p>
          </label>
          <el-input id="caseNum" v-model="caseNum" text="案件編號搜尋" name="caseNum" />
        </div>
        <div class="keyword">
          <label for="applyName" class="title">
            <p>申請者</p>
          </label>
          <el-input id="applyName" v-model="applyName" text="申請者搜尋" name="applyName" />
        </div>
        <div class="keyword">
          <label for="caseStatus" class="title">
            <p>案件狀態</p>
          </label>
          <el-select id="caseStatus" v-model="caseStatus" name="caseStatus" placeholder="處理狀態" popper-class="defaultSelect">
            <el-option v-for="item,index in caseStatusList" :key="index" :label="item.strVal" :value="item.codeId" />
          </el-select>
        </div>
      </div>

      <div class="caseInquiry_search--btn">
        <el-button class="TSLbutton red" @click="applyCaseSelectByCondition()">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>
    <div v-else class="caseInquiry_search">
      <div class="keyword">
        <label for="caseStatus" class="title">
          <p>案件狀態</p>
        </label>
        <el-select id="caseStatus" v-model="caseStatus" name="caseStatus" placeholder="處理狀態" popper-class="defaultSelect">
          <el-option v-for="item,index in caseStatusList" :key="index" :label="item.strVal" :value="item.codeId" />
        </el-select>
      </div>
      <div class="date">
        <label for="dateinput" class="title">
          <p>服務日期</p>
        </label>
        <div class="date_input">
          <el-date-picker
            id="beginDate"
            v-model="beginDate"
            type="date"
            :clearable="false"
            text="起始日期"
            name="beginDate"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
          <span>至</span>
          <el-date-picker
            id="endDate"
            v-model="endDate"
            type="date"
            :clearable="false"
            text="最後日期"
            name="endDate"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </div>
      </div>

      <div class="caseInquiry_search--btn">
        <el-button class="TSLbutton red" @click="applyCaseSelectByCondition()">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div class="caseInquiry_btn">
      <div class="caseInquiry_btn--btn">
        <el-button v-if="acctType!=3" class="TSLbutton" @click="$router.push({ path: '/application' })">
          <p>服務申請</p>
        </el-button>
        <el-button v-if="acctType==4||acctType==5" class="TSLbutton email" @click="applyCase_sendNotice">
          <img src="~/static/img/icon/emailIcon.png" alt="一鍵發送email">
        </el-button>
        <el-dropdown v-if="acctType==4||acctType==5" trigger="click" @command="exportCommand">
          <span class="remitbutton">
            匯出<i>∨</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="EXCEL">
              EXCEL
            </el-dropdown-item>
            <el-dropdown-item command="PDF">
              PDF
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="allTable">
      <div class="allTable">
        <table>
          <thead>
            <tr>
              <th v-if="acctType==4 || acctType==5" scope="col">
                <input
                  id="allitem"
                  v-model="allitem"
                  type="checkbox"
                  class="checkboxInput"
                  aria-label="選擇全部"
                  title="選擇全部"
                  @change="allexport(allitem)"
                >
              </th>
              <th scope="col" style="min-width: 180px;max-width: 180px;">
                <p>案件編號</p>
              </th>
              <th scope="col" style="min-width: 200px;">
                <p>服務日期</p>
              </th>
              <th scope="col" style="width: 120px;">
                <p v-if="acctType==1 || acctType==2">
                  服務人員
                </p>
                <p v-else>
                  申請者
                </p>
              </th>
              <th scope="col" style="width: 120px;">
                <p>案件類別</p>
              </th>
              <th scope="col" style="width: 100px;">
                <p>服務時數</p>
              </th>
              <th scope="col" style="width: 120px;">
                <p>案件狀態</p>
              </th>
              <th scope="col" style="min-width: 200px;max-width: 200px;">
                <p>表單填寫</p>
              </th>
              <th scope="col" style="min-width: 140px;max-width: 140px;">
                <p>操作</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
              <th v-if="acctType==4 || acctType==5" scope="col" style="max-width: 40px;min-width: 40px;">
                <input
                  id="allitem"
                  v-model="item.checkbox"
                  type="checkbox"
                  class="checkboxInput"
                  aria-label="選擇全部"
                  title="選擇全部"
                  @change="itemExport(item)"
                >
              </th>
              <th scope="col" style="min-width: 180px;max-width: 180px;">
                <p>{{ item.caseNum }}</p>
              </th>
              <th scope="col" style="min-width: 200px;">
                <p>{{ $moment(item.beginDate).format('yyyy/MM/DD HH:mm') }}</p>
              </th>
              <th scope="col" style="width: 120px;">
                <p v-if="acctType==1 || acctType==2">
                  <template v-if="item.serviceLogs.length!= 0">
                    <span v-for="Log,index in item.serviceLogs" :key="index">
                      <template v-if="index == 0">
                        {{ Log.name }}
                      </template>
                      <template v-else>
                        {{ '/' + Log.name }}
                      </template>
                    </span>
                  </template>
                  <span v-else>-</span>
                </p>
                <p v-else>
                  {{ closeDiv(item.personal.name)!==false?item.personal.name: '-' }}
                </p>
              </th>
              <th scope="col" style="width: 120px;">
                <p>{{ closeDiv(item.caseType)!==false?caseTypeItem(item.caseType): '-' }}</p>
              </th>
              <th scope="col" style="width: 100px;">
                <p>{{ closeDiv(item.serviceHrs)!==false?item.serviceHrs: '-' }}</p>
              </th>
              <th scope="col" style="width: 120px;">
                <p>{{ statusList(item.caseStatus) }}</p>
              </th>
              <th scope="col" style="min-width: 200px;max-width: 200px;">
                <div v-if="gettoday(item.beginDate)!==false && item.caseStatus == 'WIR' || item.caseStatus == 'DONE'" class="formBtn">
                  <el-button v-if="acctType != 3 && gettoday(item.beginDate)!==false" :class="item.clientsRespons=='00000000-0000-0000-0000-000000000000'?'TSLbutton':'TSLbutton default'" @click="clientsRespons(item)">
                    <p>滿意度</p>
                  </el-button>
                  <template v-if="acctType != 1 && acctType != 2">
                    <template v-if="item.serviceLogs.length == 1">
                      <el-button :class="item.serviceLogs[0].serviceDetialLogs=='00000000-0000-0000-0000-000000000000'?'TSLbutton':'TSLbutton default'" @click="handleCommand(item)">
                        <p>紀錄表</p>
                      </el-button>
                    </template>
                    <el-dropdown v-else trigger="click" @command="handleCommand">
                      <span v-if="isGray(item.serviceLogs)" style="background-color: #545454 !important; color: white !important" class="remitbutton">
                        紀錄表 <div class="wnumber">{{ item.serviceLogs.length }}</div>
                      </span>
                      <span v-else class="remitbutton">
                        紀錄表 <div v-if="userData.acctType === 3" class="number">{{ item.serviceLogs.filter(x => x.verifyId === userData.verifyId).length }}</div>
                        <div v-else class="number">{{ item.serviceLogs.length }}</div>
                      </span>
                      <el-dropdown-menu v-if="item.serviceLogs.length !== 0" slot="dropdown">
                        <el-dropdown-item v-for="logs,index in item.serviceLogs" v-show="logs.verifyId === userData.verifyId && userData.acctType === 3" :key="index" :command="beforeHandleCommand(item, logs)">
                          {{ logs.name }}
                          <div :class="logs.serviceDetialLogs=='00000000-0000-0000-0000-000000000000'?'severBtn':'severBtn default'">
                            <p>紀錄表</p>
                          </div>
                        </el-dropdown-item>
                        <el-dropdown-item v-for="logs,index in item.serviceLogs" v-show="userData.acctType !== 3" :key="index" :command="beforeHandleCommand(item, logs)">
                          {{ logs.name }}
                          <div :class="logs.serviceDetialLogs=='00000000-0000-0000-0000-000000000000'?'severBtn':'severBtn default'">
                            <p>紀錄表</p>
                          </div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </div>
                <p v-else>
                  -
                </p>
              </th>
              <th scope="col" style="min-width: 140px;max-width: 140px;">
                <div class="operate">
                  <div v-if="acctType != 4 && acctType != 5 && item.caseStatus == 'WIT'" class="icon" @click="getItem(item)">
                    <img src="~/static/img/icon/edit.svg" alt="編輯案件查詢">
                  </div>
                  <div v-if="acctType == 4 || acctType == 5" class="icon" @click="getItem(item)">
                    <img src="~/static/img/icon/edit.svg" alt="編輯案件查詢">
                  </div>
                  <div class="icon" @click="detailsForm(item)">
                    <img src="~/static/img/icon/download_file.svg" alt="查看案件查詢">
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="caseInquiryPhTable">
      <div v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id" class="caseInquiryPhTable_element">
        <div class="caseInquiryPhTable_number">
          <input
            v-if="acctType==4 || acctType==5"
            :id="item.number"
            v-model="item.checkbox"
            type="checkbox"
            class="checkboxInput"
            aria-label="選擇案件編號"
            title="選擇案件編號"
            @change="itemExport(item)"
          >
          <p>案件編號：{{ item.caseNum }}</p>
        </div>
        <div class="caseInquiryPhTable_content">
          <div class="item">
            <p class="itemWod">
              服務日期： {{ $moment(item.beginDate).format('yyyy/MM/DD HH:mm') }}
            </p>
            <p v-if="acctType==1 || acctType==2" class="itemWod">
              服務人員：
              <template v-if="item.serviceLogs.length!= 0">
                <span v-for="Log,index in item.serviceLogs" :key="index">
                  <template v-if="index == 0">
                    {{ Log.name }}
                  </template>
                  <template v-else>
                    {{ '/' + Log.name }}
                  </template>
                </span>
              </template>
            </p>
            <p v-else class="itemWod">
              申請者: {{ closeDiv(item.personal.name)!==false?item.personal.name: '-' }}
            </p>
            <p class="itemWod">
              案件類別： {{ closeDiv(item.caseType)!==false?caseTypeItem(item.caseType): '-' }}
            </p>
            <p class="itemWod">
              案件狀態：{{ statusList(item.caseStatus) }}
            </p>
            <p class="itemWod">
              服務時數：{{ closeDiv(item.serviceHrs)!==false?item.serviceHrs: '-' }}
            </p>
            <div class="operate">
              <p>表單填寫：</p>
              <template v-if="item.caseStatus == 'WIR' || item.caseStatus == 'DONE'">
                <el-button v-if="acctType != 3" :class="item.clientsRespons=='00000000-0000-0000-0000-000000000000'?'TSLbutton':'TSLbutton default'" @click="clientsRespons(item)">
                  <p>滿意度</p>
                </el-button>
                <template v-if="acctType != 1 && acctType != 2">
                  <el-button v-if="item.serviceLogs.length == 1" :class="item.serviceLogs[0].serviceDetialLogs=='00000000-0000-0000-0000-000000000000'?'TSLbutton':'TSLbutton default'" @click="handleCommand(item)">
                    <p>紀錄表</p>
                  </el-button>
                  <el-dropdown v-else trigger="click" @command="handleCommand">
                    <span class="remitbutton">
                      紀錄表 <div class="number">{{ item.serviceLogs.length }}</div>
                    </span>
                    <el-dropdown-menu v-if="item.serviceLogs.length !== 0" slot="dropdown">
                      <el-dropdown-item v-for="logs,index in item.serviceLogs" :key="index" :command="beforeHandleCommand(item, logs)">
                        {{ logs.name }}
                        <div :class="logs.serviceDetialLogs=='00000000-0000-0000-0000-000000000000'?'severBtn':'severBtn default'">
                          <p>紀錄表</p>
                        </div>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </template>
              <p v-else>
                -
              </p>
            </div>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a v-if="acctType != 4 && acctType != 5 && item.caseStatus == 'WIT'" href="javascript:void(0);" class="download_file" @click="getItem(item)">
                  <img src="~/static/img/icon/edit.svg" alt="編輯">
                </a>
                <a v-if="acctType == 4 || acctType == 5" href="javascript:void(0);" class="download_file" @click="getItem(item)">
                  <img src="~/static/img/icon/edit.svg" alt="編輯">
                </a>
                <a href="javascript:void(0);" class="download_file" @click="detailsForm(item)">
                  <img src="~/static/img/icon/download_file.svg" alt="查看">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <p>共 {{ total }} 筆資料</p>
      <el-pagination
        background
        prev-text="<"
        next-text=">"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <p>共 {{ Math.ceil(total / 20) }} 頁 每頁顯示 20 筆資料</p>
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
          <el-button class="TSLbutton red" @click="defaultPopUps = false">
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
    return {
      pending: 0, // 待處理
      processing: 0, // 處理中
      assignCass: 0, // 已派案
      returnCass: 0, // 待回報
      caseNum: '',
      applyName: '',
      caseStatus: '',
      allitem: '',
      beginDate: '',
      endDate: '',
      type: 0,
      acctType: '',
      caseStatusList: [],
      caseTypeList: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      defaultText: '',
      defaultPopUps: false,
      loading: false,
      userData: {}
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-案件查詢'
  },
  mounted () {
    this.getByType()
    this.applyCaseSelectByCondition()
    this.getByCaseType()
    if (this.closeDiv(this.TSLform.acctType) !== false) {
      this.acctType = this.TSLform.acctType
    }

    this.userData = JSON.parse(localStorage.getItem('TSLform'))
  },
  methods: {
    isGray (serviceLogs) {
      let isG = true
      // eslint-disable-next-line no-unreachable-loop
      for (let i = 0; i < serviceLogs.length; i++) {
        // eslint-disable-next-line eqeqeq
        if (serviceLogs[i].serviceDetialLogs == '00000000-0000-0000-0000-000000000000') { isG = false }
      }
      return isG
    },
    gettoday (bdd) {
      const Today = new Date()
      let td = this.$moment(Today).format('yyyy/MM/DD HH:mm:00')
      let bd = this.$moment(bdd).format('yyyy/MM/DD HH:mm:00')
      bd = Date.parse(bd)
      td = Date.parse(td)
      return td > bd
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
    caseTypeItem (codeId) {
      const vm = this
      for (let i = 0; i < vm.caseTypeList.length; i++) {
        const item = vm.caseTypeList[i]
        if (codeId === item.codeId) {
          return item.strVal
        }
      }
    },
    statusList (val) {
      const vm = this
      for (let i = 0; i < vm.caseStatusList.length; i++) {
        const item = vm.caseStatusList[i]
        if (item.codeId.trim() === val) {
          return item.strVal
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
    },
    hotkeyword (val) {
      const vm = this
      vm.caseStatus = val
      vm.applyCaseSelectByCondition()
    },
    async applyCaseSelectByCondition () {
      const vm = this
      const obj = {
        gid: '',
        assistName: '',
        token: vm.TSLtoken,
        applyBeginDate: vm.beginDate,
        applyEndDate: vm.endDate,
        caseStatus: vm.caseStatus,
        caseNum: vm.caseNum,
        applyType: '',
        applycategory: vm.TSLform.acctType + '',
        applyName: vm.applyName
      }
      const res = await frontendApi.applyCaseSelectByCondition(obj)
      if (res.isSuccess === true) {
        if (vm.closeDiv(res.data.applyCases) === false) {
          vm.tableData = []
          vm.total = 0
          return
        }
        const exportList = JSON.parse(sessionStorage.getItem('allexport'))
        if (res.data.applyCases.length !== 0) {
          if (vm.closeDiv(exportList) !== false && exportList.length === res.data.applyCases.length) {
            res.data.applyCases.forEach((item) => {
              vm.$set(item, 'checkbox', true)
            })
            vm.allitem = true
          } else {
            vm.allitem = false
            res.data.applyCases.forEach((item) => {
              vm.$set(item, 'checkbox', false)
            })
            if (vm.closeDiv(exportList) !== false) {
              for (let i = 0; i < exportList.length; i++) {
                const item = exportList[i]
                for (let j = 0; j < res.data.applyCases.length; j++) {
                  const itemj = res.data.applyCases[j]
                  if (item.caseNum === itemj.caseNum) {
                    itemj.checkbox = item.checkbox
                  }
                }
              }
            }
          }
          vm.tableData = res.data.applyCases
        }
        vm.total = vm.tableData.length
        if (this.acctType === 1 || this.acctType === 2) {
          vm.pending = res.data.countWIT
          vm.processing = res.data.countPED
          vm.assignCass = res.data.countSEND
        } else if (this.acctType === 3) {
          vm.returnCass = res.data.countWIR
        } else {
          vm.pending = res.data.countWIT
          vm.processing = res.data.countPED
          vm.returnCass = res.data.countWIR
        }
      } else {
        vm.tableData = []
        vm.total = 0
      }
    },
    allexport (val) {
      const vm = this
      if (val) {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = true
        }
        sessionStorage.setItem('allexport', JSON.stringify(vm.tableData))
      } else {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = false
        }
        sessionStorage.removeItem('allexport')
      }
    },
    itemExport (val) {
      const vm = this
      const exportList = JSON.parse(sessionStorage.getItem('allexport'))
      if (vm.closeDiv(exportList) !== false) {
        if (val.checkbox) {
          exportList.push(val)
          sessionStorage.setItem('allexport', JSON.stringify(exportList))
        } else {
          for (let i = 0; i < exportList.length; i++) {
            const item = exportList[i]
            if (val.caseNum === item.caseNum) {
              vm.removeArr(exportList, item)
            }
          }
          vm.allitem = false
          sessionStorage.setItem('allexport', JSON.stringify(exportList))
        }
      } else {
        const list = []
        list.push(val)
        sessionStorage.setItem('allexport', JSON.stringify(list))
      }
    },
    clientsRespons (item) {
      sessionStorage.clear()
      const obj = {
        gid: item.gid,
        applygid: item.clientsRespons,
        caseNum: item.caseNum,
        applyName: item.personal.name,
        serviceLogs: item.serviceLogs,
        applyType: item.applyType,
        beginDate: this.$moment(item.beginDate).format('yyyy/MM/DD HH:mm'),
        endDate: this.$moment(item.endDate).format('yyyy/MM/DD HH:mm')
      }
      sessionStorage.setItem('clientsRespons', JSON.stringify(obj))
      this.$router.push({ path: '/caseInquiry/satisfactionForm' })
    },
    async exportCommand (command) {
      const vm = this
      vm.loading = true
      let type = 0
      if (command === 'EXCEL') {
        type = 2
      } else {
        type = 1
      }
      const arr = []
      const exportList = JSON.parse(sessionStorage.getItem('allexport'))
      if (vm.closeDiv(exportList) !== false) {
        for (let i = 0; i < exportList.length; i++) {
          const item = exportList[i]
          let FormFill = '-'
          if (item.caseStatus === 'WIR' || item.caseStatus === 'DONE') {
            FormFill = '滿意度'
            if (item.serviceLogs.length !== 0) {
              FormFill = '滿意度 | 服務表'
            }
            if (item.serviceLogs.length > 1) {
              FormFill = '滿意度 | 服務表' + item.serviceLogs.length
            }
          }
          const obj = {
            CaseNum: item.caseNum,
            ServiceDate: item.beginDate,
            ApplyName: item.personal.name,
            CaseType: vm.closeDiv(item.caseType) !== false ? vm.caseTypeItem(item.caseType) : '-',
            ServiceHr: item.serviceHrs,
            CaseStatus: vm.statusList(item.caseStatus),
            FormFill
          }
          arr.push(obj)
        }
        const res = await frontendApi.export_case(type, arr)
        const blobType = type === 2 ? 'application/vnd.ms-excel' : 'application/pdf'
        const blob = new Blob([res], { type: blobType })
        const filename = '案件匯出'
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
        sessionStorage.removeItem('allexport')
        this.applyCaseSelectByCondition()
      } else {
        vm.defaultText = '請先勾選匯出資料'
        vm.defaultPopUps = true
      }
      vm.loading = false
    },
    async applyCase_sendNotice () {
      const vm = this
      const res = await frontendApi.applyCase_sendNotice()
      if (res.isSuccess === true) {
        vm.defaultText = '一鍵發送email已寄出成功。'
        vm.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultPopUps = true
      }
    },
    beforeHandleCommand (item, command) {
      return {
        more: true,
        item,
        command
      }
    },
    handleCommand (command) {
      const obj = {
        gid: '',
        applyGid: '',
        serviceDetialLogs: '',
        caseNum: '',
        applyName: '',
        serveName: '',
        applyType: '',
        beginDate: '',
        endDate: ''
      }
      sessionStorage.clear()
      if (command.more !== true) {
        if (Array.isArray(command.serviceLogs) === true) {
          obj.gid = command.serviceLogs[0].gid
          obj.applyGid = command.serviceLogs[0].applyGid
          obj.serviceDetialLogs = command.serviceLogs[0].serviceDetialLogs
          obj.caseNum = command.caseNum
          obj.applyName = command.personal.name
          obj.serveName = command.serviceLogs[0].name
          obj.applyType = command.applyType
          // obj.beginDate = this.$moment(command.serviceLogs[0].beginDateTime).format('yyyy/MM/DD HH:mm')
          // obj.endDate = this.$moment(command.serviceLogs[0].endDateTime).format('yyyy/MM/DD HH:mm')
          obj.beginDate = this.$moment(command.beginDate).format('yyyy/MM/DD HH:mm')
          obj.endDate = this.$moment(command.endDate).format('yyyy/MM/DD HH:mm')
        }
      } else {
        obj.gid = command.command.gid
        obj.applyGid = command.command.applyGid
        obj.serviceDetialLogs = command.command.serviceDetialLogs
        obj.caseNum = command.item.caseNum
        obj.applyName = command.item.personal.name
        obj.serveName = command.command.name
        obj.applyType = command.item.applyType
        obj.beginDate = this.$moment(command.command.beginDateTime).format('yyyy/MM/DD HH:mm')
        obj.endDate = this.$moment(command.command.endDateTime).format('yyyy/MM/DD HH:mm')
      }
      sessionStorage.setItem('satisfaction', JSON.stringify(obj))
      this.$router.push({ path: '/caseInquiry/severform' })
    },
    getItem (val) {
      const number = Number(val.applyType)
      sessionStorage.setItem('caseInquiry', JSON.stringify(val))
      if (number === 2) {
        this.$router.push({ path: '/caseInquiry/form?lang=listen' })
      } else {
        this.$router.push({ path: '/caseInquiry/form?lang=tsl' })
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
    clearselect () {
      const vm = this
      vm.beginDate = ''
      vm.endDate = ''
      vm.caseStatus = ''
      vm.applyName = ''
      vm.caseNum = ''
      vm.applyCaseSelectByCondition()
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.applyCaseSelectByCondition()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.applyCaseSelectByCondition()
    },
    detailsForm (val) {
      sessionStorage.setItem('caseInquiry', JSON.stringify(val))
      this.$router.push({ path: '/caseInquiry/details' })
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

.caseInquiry{
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

  .hotkey{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    border-radius: 10px;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #EFD1C9;
    color: #545454;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    font-size: clamp(min(1.125em), pc(20), max(1.250em));
    .el-button{
      width: 30px;
      height: 30px;
      padding: 0;
      font-size: 100%;
      background-color: #EFD1C9;
      border-radius: 10px;
      border: 1px solid $red;
      margin: 0 3px;
      span{
        color: $red;
        font-size: 100%;
      }
      &:focus{
        outline: 3px dashed #990094;
      }
    }
  }

  &_search{
    @include searchForm;
    .gdis{
      display: flex;
      align-items: center;
      justify-content: center;
      .title{
        max-width: 100px;
      }
      .el-select{
        width: 100%;
      }
      .keyword{
        width: 100%;
        margin: clamp(20px, 1.81708vw, 30px) 0;
        &:last-child{
          max-width: 294px;
        }
      }
      @include ipadSize{
        flex-direction: column;
        .keyword{
          &:last-child{
            max-width: 780px;
          }
        }
      }
    }
  }

  .caseInquiryPhTable{
    display: none;
    @include ipadSize{
      display: block;
      .checkboxInput{
        width: 25px;
        height: 25px;
        &:focus{
          outline: 3px dashed #990094;
        }
      }
      &_number{
        height: 50px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        background-color: $red;
        p{
          color: #ffffff;
          margin-left: 10px;
        }
      }
      &_content{
        .itemWod{
          padding: 10px;
        }
        .operate{
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          &_icon{
            display: flex;
          }
          .TSLbutton{
            width: 80px;
            height: 30px;
            border-radius: 5px;
            box-sizing: border-box;
            p{
              font-size: clamp(min(1.125em), pc(20), max(1.250em));
            }
          }

          .TSLbutton.default{
            background-color: $default;
            p{
              color: #ffffff;
            }
          }
          .remitbutton{
            height: 30px;
            min-width: 80px;
            padding: 0 2px;
            border-radius: 5px;
            border: 1px solid #545454;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            cursor: pointer;
            font-size: clamp(min(1.125em), pc(20), max(1.250em));
            &:focus{
              outline: 3px dashed #990094;
            }
            .number{
              width: 21px;
              height: 21px;
              border-radius: 50%;
              display: flex;
              font-size: 90%;
              align-items: center;
              margin-left: 2px;
              justify-content: center;
              border: 1px solid #545454;
            }
          }
        }
        .download_file{
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 7px;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }

  &_btn{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    &--btn{
      width: 100%;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: flex-end;
      margin-left: 10px;
      .TSLbutton{
        width: 100%;
        max-width: 150px;
        span{
          p{
            font-size: clamp(min(128.6%), pc(20), max(142.9%));
          }
        }
      }
      .TSLbutton.email{
        width: 100%;
        max-width: 50px;
        span img{
          width: 18px;
          height: auto;
          margin-right: 0;
        }
      }
      .remitbutton{
        height: 50px;
        width: 90px;
        border-radius: 10px;
        padding: 0 10px;
        box-sizing: border-box;
        border: 1px solid $default;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        cursor: pointer;
        font-size: clamp(min(1.125em), pc(20), max(1.250em));
        &:focus{
          outline: 3px dashed #990094;
        }
        i{
          margin-left: 5px;
        }
      }
    }
  }

  &_search{
    @include searchForm;
    .caseInquiry_search--btn{
      margin-top: clamp(min(20px), pc(30), max(30px));
    }
    @include ipadSize{
      .el-select{
        width: 100%;
        max-width: 100%;
      }
    }
  }

  &_ex{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    color: $default;
    font-size: clamp(min(1.125em), pc(20), max(1.250em));
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    span{
      color: $red;
      margin: 0 2px;
    }
  }
}
</style>
