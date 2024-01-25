<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sysadmindaily">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/daily">系統管理-系統日誌</a>
    </span>

    <div id="content" class="sysadmindaily--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>系統日誌</h2>
    </div>

    <div class="sysadmindaily_search">
      <div class="keyword">
        <label for="value" class="title">
          <p>事件類型</p>
        </label>
        <el-select
          id="code"
          v-model="code"
          placeholder=""
          text="事件類型"
          name="code"
          popper-class="defaultSelect"
        >
          <el-option label="全部" value="" />
          <el-option label="系統紀錄" value="system" />
          <el-option label="操作紀錄" value="operation" />
        </el-select>
      </div>
      <div class="date">
        <label for="LogTimeBegin" class="title">
          <p>服務日期</p>
        </label>
        <div class="date_input">
          <el-date-picker
            id="LogTimeBegin"
            v-model="LogTimeBegin"
            type="date"
            :clearable="false"
            text="起始日期"
            name="LogTimeBegin"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
          <span>至</span>
          <el-date-picker
            id="LogTimeEnd"
            v-model="LogTimeEnd"
            type="date"
            :clearable="false"
            text="最後日期"
            name="LogTimeEnd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </div>
      </div>
      <div class="keyword">
        <label for="keyword" class="title">
          <p>關鍵字</p>
        </label>
        <el-input id="keyword" v-model="keyword" text="關鍵字搜尋" name="keyword" />
      </div>

      <div class="sysadmindaily_search--btn">
        <el-button class="TSLbutton red" @click="searchItem()">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div class="sysadmindaily_addBtn">
      <el-button class="TSLbutton" @click="deleteItem()">
        <p>刪除資料</p>
      </el-button>
      <el-button class="TSLbutton" @click="sysLog_export()">
        <p>匯出</p>
      </el-button>
    </div>

    <div class="allTable">
      <div class="allTable">
        <table>
          <thead>
            <tr>
              <th scope="col" style="width: 200px;">
                <p>紀錄編號</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>帳號</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>姓名</p>
              </th>
              <th scope="col" style="min-width: 150px;">
                <p>發生位置</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>事件類型</p>
              </th>
              <th scope="col" style="width: 160px;">
                <p>紀錄時間</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>操作</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData" :key="item.id">
              <th scope="col" style="width: 200px;">
                <p>{{ item.referenceId }}</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>{{ item.logsDTO.verifyId }}</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>{{ item.logsDTO.name }}</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>{{ item.logsDTO.location }}</p>
              </th>
              <th scope="col" style="width: 150px;">
                <p>{{ item.logsDTO.logType }}</p>
              </th>
              <th scope="col" style="width: 160px;">
                <p>{{ $moment(item.logTime).format('yyyy/MM/DD HH:mm') }}</p>
              </th>
              <th scope="col" style="width: 150px;">
                <div class="operate">
                  <div class="icon" @click="getNotifyItem(item)">
                    <img src="~/static/img/icon/download_file.svg" alt="">
                  </div>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="sysadmindailyPhTable">
      <div v-for="item in tableData" :key="item.id" class="sysadmindailyPhTable_element">
        <div class="sysadmindailyPhTable_number">
          <p>紀錄編號：{{ item.referenceId }}</p>
        </div>
        <div class="sysadmindailyPhTable_content">
          <div class="item">
            <p class="itemWod">
              帳號：{{ item.logsDTO.verifyId }}
            </p>
            <p class="itemWod">
              姓名：{{ item.logsDTO.name }}
            </p>
            <p class="itemWod">
              發生位置： {{ item.logsDTO.location }}
            </p>
            <p class="itemWod">
              事件類型： {{ item.logsDTO.logType }}
            </p>
            <p class="itemWod">
              紀錄時間： {{ $moment(item.logTime).format('yyyy/MM/DD HH:mm') }}
            </p>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a href="javascript:void(0);" class="download_file" @click="getNotifyItem(item)">
                  <img src="~/static/img/icon/download_file.svg" alt="查看">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <p>共 {{ pageInfo.total }} 筆資料</p>
      <el-pagination
        background
        prev-text="<"
        next-text=">"
        :page-size="20"
        layout="prev, pager, next"
        :total="pageInfo.total"
        :current-page="pageInfo.current"
        @current-change="handleCurrentChange"
      />
      <p>共 {{ Math.ceil(pageInfo.total / 20) }} 頁 每頁顯示 20 筆資料</p>
    </div>

    <el-dialog
      :visible.sync="defaultPopUps"
      :show-close="false"
      class="defaultPopUps"
      @close="defaultId = 0"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:sysLog_delete()">
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
      code: '',
      LogTimeBegin: '',
      LogTimeEnd: '',
      keyword: '',
      tableData: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      pageInfo: {
        total: 0,
        current: 1
      }
    }
  },
  mounted () {
    this.sysLog_load()
  },
  methods: {
    async sysLog_load () {
      const vm = this
      const obj = {
        token: vm.TSLtoken,
        Code: vm.code,
        LogTimeBegin: vm.LogTimeBegin,
        LogTimeEnd: vm.LogTimeEnd,
        KeyWords: vm.keyword,
        pageNum: vm.pageInfo.current,
        pageSize: 20
      }
      const res = await frontendApi.sysLog_load(obj)
      if (res.isSuccess === true) {
        vm.tableData = res.data.logDataDTOs
        vm.pageInfo.total = res.data.totalCounts
      } else {
        vm.tableData = []
        vm.pageInfo.total = 0
      }
    },
    async sysLog_export () {
      const res = await frontendApi.sysLog_export()
      // if (res.isSuccess === true) {
      const blob = new Blob([res], { type: 'application/json' })
      const filename = '系統日誌'
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      this.defaultText = '系統日誌匯出成功'
      this.defaultId = 0
      this.defaultPopUps = true
      // }
    },
    deleteItem () {
      this.defaultText = '確定要保留最近半年，刪除剩餘資料'
      this.defaultId = 1
      this.defaultPopUps = true
    },
    async sysLog_delete () {
      const vm = this
      const obj = {
        token: vm.TSLtoken
      }
      this.defaultId = 0
      const res = await frontendApi.sysLog_delete(obj)
      if (res.isSuccess === true) {
        this.defaultPopUps = false
      } else {
        this.defaultText = res.message
        this.defaultPopUps = false
      }
    },
    searchItem () {
      this.pageInfo.current = 1
      this.sysLog_load()
    },
    clearselect () {
      const vm = this
      vm.code = ''
      vm.LogTimeBegin = ''
      vm.LogTimeEnd = ''
      vm.keyword = ''
      this.sysLog_load()
    },
    getNotifyItem (val) {
      sessionStorage.clear()
      sessionStorage.setItem('dailyForm', JSON.stringify(val))
      this.$router.push({ path: '/sysadmin/daily/file' })
    },
    handleSizeChange (val) {
      this.pageInfo.current = 1
      this.pageSize = val
      this.sysLog_load()
    },
    handleCurrentChange (val) {
      this.pageInfo.current = val
      this.sysLog_load()
    }
  }
}
</script>

<style lang="scss">
.sysadmindaily{
  &--title{
    height: 50px;
    display: flex;
    align-items: center;
    color: $red;
    background: #FFF9F9;
    padding: 0 clamp(min(22px), pc(36), max(36px));
    margin-top: clamp(min(20px), pc(40), max(40px));
    margin-bottom: clamp(min(41px), pc(91), max(91px));
    box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
    img{
      width: 20px;
      height: 33px;
      margin-right: 10px;
    }
  }

  &_addBtn{
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    .TSLbutton{
      width: 100%;
      max-width: 113px;
    }
  }

  &_search{
    @include searchForm;
    @include ipadSize{
      .el-select{
        max-width: 100%;
      }
    }
  }

  .sysadmindailyPhTable{
    display: none;
    @include ipadSize{
      display: block;
      &_number{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $red;
        p{
          color: #ffffff;
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
}
</style>
