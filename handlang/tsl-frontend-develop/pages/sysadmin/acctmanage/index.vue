<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="acctmanage">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/acctmanage">系統管理-帳號管理</a>
    </span>

    <div id="content" class="acctmanage--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>帳號管理</h2>
    </div>

    <div class="acctmanage_search">
      <div class="date">
        <label for="dateinput" class="title">
          <p>申請日期</p>
        </label>
        <div class="date_input">
          <el-date-picker
            id="dateinput"
            v-model="search.createdDateTimeBegin"
            type="date"
            :clearable="false"
            text="起始日期"
            name="dateinput"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
          <span>至</span>
          <el-date-picker
            id="dateinput"
            v-model="search.createdDateTimeEnd"
            type="date"
            :clearable="false"
            text="最後日期"
            name="dateinput"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </div>
      </div>
      <div class="keyword">
        <label for="name" class="title">
          <p>關鍵字</p>
        </label>
        <el-input id="name" v-model="search.name" text="關鍵字搜尋" name="name" />
      </div>

      <div class="acctmanage_search--btn">
        <el-button class="TSLbutton red" @click="acctSelect('search')">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div class="acctmanage_btn">
      <el-radio-group v-model="search.acctType" class="pc" @change="acctSelect('search')">
        <el-radio-button label="1">
          個人
        </el-radio-button>
        <el-radio-button label="2">
          單位
        </el-radio-button>
        <el-radio-button label="3">
          服務人員
        </el-radio-button>
        <el-radio-button label="4">
          委外單位
        </el-radio-button>
        <el-radio-button v-if="TSLtype == 5" label="5">
          管理機關
        </el-radio-button>
      </el-radio-group>
      <div class="radioPh">
        <el-select v-model="search.acctType" placeholder="" popper-class="defaultSelect" @change="acctSelect('search')">
          <el-option label="個人" value="1" />
          <el-option label="單位" value="2" />
          <el-option label="服務人員" value="3" />
          <el-option label="委外單位" value="4" />
          <el-option v-if="TSLtype == 5" label="管理機關" value="5" />
        </el-select>
      </div>

      <div class="acctmanage_btn--btn">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="remitbutton">
            新增帳號<i>∨</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="individualAcct">
              個人
            </el-dropdown-item>
            <el-dropdown-item command="unitAcct">
              單位
            </el-dropdown-item>
            <el-dropdown-item command="serviceAcct">
              服務人員
            </el-dropdown-item>
            <el-dropdown-item command="admainAcct-4">
              委外機關
            </el-dropdown-item>
            <el-dropdown-item v-if="TSLtype == 5" command="admainAcct-5">
              管理機關
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" @command="exportCommand">
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
      <table>
        <thead>
          <tr>
            <th scope="col" style="width:30px">
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
            <th scope="col" style="width: 180px;">
              <p>申請日期</p>
            </th>
            <th scope="col" style="width: 140px;">
              <p>申請者</p>
            </th>
            <th scope="col" style="width: 140px;">
              <p>姓名</p>
            </th>
            <th v-if="search.acctType == '2'" scope="col" style="width: 140px;">
              <p>機關代碼與名稱</p>
            </th>
            <th scope="col" style="width: 140px;">
              <p>案件狀態</p>
            </th>
            <th scope="col" style="width: 140px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
            <th scope="col" style="width: 30px;">
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
            <th scope="col" style="width: 180px;">
              <p>{{ $moment(item.createdDateTime).format('yyyy/MM/DD HH:mm') }}</p>
            </th>
            <th scope="col" style="width: 140px;">
              <p v-if="item.acctType == '1'">
                個人
              </p>
              <p v-if="item.acctType == '2'">
                單位
              </p>
              <p v-if="item.acctType == '3'">
                服務人員
              </p>
              <p v-if="item.acctType == '4'">
                委外單位
              </p>
              <p v-if="item.acctType == '5'">
                管理機關
              </p>
            </th>
            <th scope="col" style="width: 140px;">
              <p>{{ item.name }}</p>
            </th>
            <th v-if="item.acctType == '2'" scope="col" style="width: 140px;">
              <p v-if="closeDiv(item.featureName)!==false">
                {{ item.feature + item.featureName }}
              </p>
              <p v-else>
                -
              </p>
            </th>
            <th scope="col" style="width: 140px;">
              <p v-if="item.acctStatus == '0'">
                停用
              </p>
              <p v-else-if="item.acctStatus == '1'">
                待審核
              </p>
              <p v-else-if="item.acctStatus == '2'">
                審核中
              </p>
              <p v-else-if="item.acctStatus == '3' && item.isLock == '0'">
                已通過
              </p>
              <p v-else-if="item.acctStatus == '3' && item.isLock != '0'">
                帳號鎖定
              </p>
              <p v-else>
                -
              </p>
            </th>
            <th scope="col" style="width: 140px;">
              <div class="operate">
                <div class="icon" @click="editAcct(item.acctType, item.verifyId)">
                  <img src="~/static/img/icon/edit.svg" alt="">
                </div>
                <div class="icon" @click="linkDetails(item.acctType, item.verifyId)">
                  <img src="~/static/img/icon/download_file.svg" alt="">
                </div>
                <div v-if="item.isLock != '0'" class="icon" @click="handlang_acctLockCtrl(item.verifyId)">
                  <img src="~/static/img/icon/Password.png" alt="">
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="acctmanagePhTable">
      <div v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id" class="acctmanagePhTable_element">
        <div class="acctmanagePhTable_number">
          <el-checkbox v-model="item.checkbox" @change="itemExport(item)" />
          <p>姓名：{{ item.name }}</p>
        </div>
        <div class="acctmanagePhTable_content">
          <div class="item">
            <p class="itemWod">
              申請者：
              <span v-if="item.acctType == '1'">個人</span>
              <span v-if="item.acctType == '2'">單位</span>
              <span v-if="item.acctType == '3'">服務人員</span>
              <span v-if="item.acctType == '4'">委外單位</span>
              <span v-if="item.acctType == '5'">管理機關</span>
            </p>
            <p v-if="item.acctType == '2'" class="itemWod">
              機關代碼與名稱: {{ item.feature + item.featureName }}
            </p>
            <p class="itemWod">
              申請日期： {{ $moment(item.createdDateTime).format('yyyy/MM/DD HH:mm') }}
            </p>
            <p class="itemWod">
              案件狀態：
              <span v-if="item.acctStatus == '0'">停用</span>
              <span v-if="item.acctStatus == '1'">待審核</span>
              <span v-if="item.acctStatus == '2'">審核中</span>
              <span v-if="item.acctStatus == '3'">已通過</span>
            </p>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a href="javascript:void(0);" class="download_file" @click="editAcct(item.acctType, item.verifyId)">
                  <img src="~/static/img/icon/edit.svg" alt="">
                </a>
                <a href="javascript:void(0);" class="download_file" @click="linkDetails(item.acctType, item.verifyId)">
                  <img src="~/static/img/icon/download_file.svg" alt="">
                </a>
                <a v-if="item.isLock != '0'" href="javascript:void(0);" class="download_file" @click="handlang_acctLockCtrl(item.verifyId)">
                  <img src="~/static/img/icon/Password.png" alt="">
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
      search: {
        createdDateTimeBegin: '',
        createdDateTimeEnd: '',
        name: '',
        acctType: '1'
      },
      allitem: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      loading: false,
      defaultText: '',
      defaultPopUps: false,
      caseStatusList: []
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-帳號管理'
  },
  mounted () {
    this.acctSelect()
  },
  methods: {
    async acctSelect (search) {
      const vm = this
      if (vm.closeDiv(search) !== false) {
        vm.currentPage = 1
      }
      const obj = {
        verifyId: '',
        createdDateTimeBegin: vm.search.createdDateTimeBegin,
        createdDateTimeEnd: vm.search.createdDateTimeEnd,
        name: vm.search.name,
        acctType: vm.search.acctType
      }
      const res = await frontendApi.acctSelect(obj)
      if (res.isSuccess === true) {
        const exportList = JSON.parse(sessionStorage.getItem('acctexport'))
        if (res.data.length !== 0) {
          if (vm.closeDiv(exportList) !== false && exportList.length === res.data.length) {
            res.data.forEach((item) => {
              vm.$set(item, 'checkbox', true)
            })
            vm.allitem = true
          } else {
            vm.allitem = false
            res.data.forEach((item) => {
              vm.$set(item, 'checkbox', false)
            })
            if (vm.closeDiv(exportList) !== false) {
              for (let i = 0; i < exportList.length; i++) {
                const item = exportList[i]
                for (let j = 0; j < res.data.length; j++) {
                  const itemj = res.data[j]
                  if (item.verifyId === itemj.verifyId) {
                    itemj.checkbox = item.checkbox
                  }
                }
              }
            }
          }
          vm.tableData = res.data
        }
        vm.tableData = res.data
        vm.total = vm.tableData.length
      }
    },
    allexport (val) {
      const vm = this
      if (val) {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = true
        }
        sessionStorage.setItem('acctexport', JSON.stringify(vm.tableData))
      } else {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = false
        }
        sessionStorage.removeItem('acctexport')
      }
    },
    itemExport (val) {
      const vm = this
      const exportList = JSON.parse(sessionStorage.getItem('acctexport'))
      if (vm.closeDiv(exportList) !== false) {
        if (val.checkbox) {
          exportList.push(val)
          sessionStorage.setItem('acctexport', JSON.stringify(exportList))
        } else {
          for (let i = 0; i < exportList.length; i++) {
            const item = exportList[i]
            if (val.verifyId === item.verifyId) {
              vm.removeArr(exportList, item)
            }
          }
          vm.allitem = false
          sessionStorage.setItem('acctexport', JSON.stringify(exportList))
        }
      } else {
        const list = []
        list.push(val)
        sessionStorage.setItem('acctexport', JSON.stringify(list))
      }
    },
    async exportCommand (command) {
      const vm = this
      let type = 0
      vm.loading = true
      if (command === 'EXCEL') {
        type = 2
      } else {
        type = 1
      }
      const arr = []
      const exportList = JSON.parse(sessionStorage.getItem('acctexport'))
      if (vm.closeDiv(exportList) !== false) {
        for (let i = 0; i < exportList.length; i++) {
          const item = exportList[i]
          let ApplyName = ''
          let CaseStatus = ''
          if (item.acctType === '1') { ApplyName = '個人' } else if (item.acctType === '2') { ApplyName = '單位' } else if (item.acctType === '3') { ApplyName = '服務人員' } else if (item.acctType === '4') { ApplyName = '委外單位' } else if (item.acctType === '5') { ApplyName = '管理機關' } else { ApplyName = '-' }
          if (item.acctStatus === '0') { CaseStatus = '停用' } else if (item.acctStatus === '1') { CaseStatus = '待審核' } else if (item.acctStatus === '2') { CaseStatus = '審核中' } else if (item.acctStatus === '3') { CaseStatus = '已通過' } else { CaseStatus = '-' }
          const obj = {
            ApplyDate: item.createdDateTime,
            Name: item.name,
            ApplyName,
            UnitName: item.feature + item.featureName,
            CaseStatus
          }
          arr.push(obj)
        }
        const res = await frontendApi.account_export(type, arr)
        const blobType = type === 2 ? 'application/vnd.ms-excel' : 'application/pdf'
        const blob = new Blob([res], { type: blobType })
        const filename = '帳號資訊匯出'
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
        sessionStorage.removeItem('acctexport')
        this.acctSelect()
      } else {
        vm.defaultText = '請先勾選匯出資料'
        vm.defaultPopUps = true
      }
      vm.loading = false
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.acctSelect()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.acctSelect()
    },
    handleCommand (command) {
      sessionStorage.clear()
      if (command.includes('admainAcct') !== false) {
        const valid = command.split('-')[1]
        this.$router.push({ path: '/sysadmin/acctmanage/admainAcct?acctType=' + valid })
      } else {
        this.$router.push({ path: '/sysadmin/acctmanage/' + command })
      }
    },
    linkDetails (acctType, verifyId) {
      let linkName = ''
      switch (acctType) {
        case '1':
          linkName = 'individualDetails'
          break
        case '2':
          linkName = 'unitDetails'
          break
        case '3':
          linkName = 'serviceDetails'
          break
        default:
          linkName = 'admainDetails'
          break
      }
      const link = '/sysadmin/acctmanage/' + linkName
      sessionStorage.clear()
      sessionStorage.setItem('acctmanageID', verifyId)
      this.$router.push({ path: link })
    },
    async handlang_acctLockCtrl (verifyId) {
      const obj = {
        verifyId,
        isLock: '0'
      }
      const res = await frontendApi.handlang_acctLockCtrl(obj)
      if (res.isSuccess === true) {
        this.defaultText = '已成功解鎖，請重新登入。'
        this.defaultPopUps = true
      } else {
        this.defaultText = res.message
        this.defaultPopUps = true
      }
      this.acctSelect()
    },
    clearselect () {
      const vm = this
      vm.search.createdDateTimeBegin = ''
      vm.search.createdDateTimeEnd = ''
      vm.search.name = ''
      this.acctSelect()
    },
    editAcct (acctType, verifyId) {
      let linkName = ''
      switch (acctType) {
        case '1':
          linkName = 'individualAcct'
          break
        case '2':
          linkName = 'unitAcct'
          break
        case '3':
          linkName = 'serviceAcct'
          break
        default:
          linkName = 'admainAcct'
          break
      }
      const link = '/sysadmin/acctmanage/' + linkName
      sessionStorage.clear()
      sessionStorage.setItem('editAcctID', verifyId)
      this.$router.push({ path: link })
    }
  }
}
</script>

<style lang="scss">
.acctmanage{
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

  &_search{
    @include searchForm;
  }

  .acctmanagePhTable{
    display: none;
    @include ipadSize{
      display: block;
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
    .el-checkbox__inner{
      width: 25px;
      height: 25px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $default;
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
    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before{
      top: 10px;
      background-color: $default;
    }
    .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #EFD1C9;
      border-color: #ffffff;
    }
    .el-checkbox__input.is-checked{
      .el-checkbox__inner{
        background-color: #EFD1C9;
        border-color: $default;
      }
    }

    .el-checkbox__input.is-focus{
      .el-checkbox__inner{
        background: #EFD1C9;
        border-color: $default;
        outline: 3px dashed #990094;
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
    justify-content: space-between;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    .radioPh{
      display: none;
    }
    &--btn{
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      align-items: center;
      margin-left: 10px;
      .remitbutton{
        height: 50px;
        min-width: 99px;
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
        font-size: 1.429em;
        @include ipadSize{
          font-size: 1.286em;
        }
        &:focus{
          outline: 3px dashed #990094;
        }
        i{
          margin-left: 5px;
        }
      }
      @include phSize{
        margin-left: 0;
        .remitbutton{
          margin-left: 5px;
        }
      }
    }
    .el-radio-group{
      width: 80%;
      display: flex;
      box-sizing: border-box;
      font-size: 100%;
    }
    .el-radio-button{
      width: 100%;
      height: 50px;
      max-width: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $default;
      border-left: 0;
      &__inner{
        padding: 0;
        box-shadow: none;
        border: none;
        background-color: transparent;
        font-size: 1.250em;
        &:hover{
          color: $default;
        }
      }
      &:first-child{
        border-radius: 10px 0 0 10px;
        border-left: 1px solid $default;
      }
      &:last-child{
        border-radius: 0 10px 10px 0;
      }
    }
    .el-radio-button:first-child .el-radio-button__inner{
      border-left: none;
    }
    .el-radio-button.is-active{
      background: $red;
      border: 1px solid $red;
      .el-radio-button__inner{
        &:hover{
          color: #ffffff;
        }
      }
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
      background-color: transparent;
      box-shadow: none;
      border: none;
    }
    .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled){
      box-shadow: none;
      outline: 3px dashed #990094;
    }

    @include ipadSize{
      .el-radio-group.pc{
        display: none;
      }
      .radioPh{
        display: block;
        .el-input__inner{
          height: 50px;
          line-height: 50px;
          border-radius: 10px;
          background: #C04729;
          border-color: #C04729;
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
        .el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner{
          border-color: #C04729;
        }
      }
    }
  }
}
</style>
