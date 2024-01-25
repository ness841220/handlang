<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="appeal">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/appeal">申訴管理</a>
    </span>

    <div id="content" class="appeal--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>申訴管理</h2>
    </div>

    <div class="appeal_search">
      <div class="date">
        <label for="createdDateTimeBegin" class="title">
          <p>申訴時間</p>
        </label>
        <div class="date_input">
          <el-date-picker
            id="createdDateTimeBegin"
            v-model="createdDateTimeBegin"
            type="date"
            :clearable="false"
            text="起始日期"
            name="createdDateTimeBegin"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
          <span>至</span>
          <el-date-picker
            id="createdDateTimeEnd"
            v-model="createdDateTimeEnd"
            type="date"
            :clearable="false"
            text="最後日期"
            name="createdDateTimeEnd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </div>
      </div>

      <div class="appeal_search--btn">
        <el-button class="TSLbutton red" @click="reportLogs_select">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div v-if="acctType!=4&&acctType!=5" class="appeal_addBtn">
      <el-button class="TSLbutton red" @click="getNotifyItem('add')">
        <p>我要申訴</p>
      </el-button>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="width: 180px;">
              <p>申訴編號</p>
            </th>
            <th scope="col" style="width: 150px;">
              <p>姓名</p>
            </th>
            <th scope="col" style="width: 180px;">
              <p>申訴種類</p>
            </th>
            <th scope="col" style="min-width: 220px">
              <p>申訴時間</p>
            </th>
            <th scope="col" style="width: 150px;">
              <p>處理狀態</p>
            </th>
            <th scope="col" style="width: 150px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
            <th scope="col" style="width: 180px;">
              <p>{{ item.reportNo }}</p>
            </th>
            <th scope="col" style="width: 150px;">
              <p>{{ item.personalInfo.name }}</p>
            </th>
            <th scope="col" style="width: 180px;">
              <p v-if="item.reportType == '1'">
                行政窗口
              </p>
              <p v-if="item.reportType == '2'">
                服務人員
              </p>
              <p v-if="item.reportType == '3'">
                性騷申訴
              </p>
              <p v-if="item.reportType == '4'">
                系統功能
              </p>
              <p v-if="item.reportType == '5'">
                個人/單位申請者
              </p>
            </th>
            <th scope="col" style="min-width: 220px">
              <p>{{ $moment(item.createdDatetime).format('yyyy/MM/DD HH:mm') }}</p>
            </th>
            <th scope="col" style="width: 150px;">
              <p v-if="item.reportStatus == '1'">
                待處理
              </p>
              <p v-if="item.reportStatus == '2'">
                處理中
              </p>
              <p v-if="item.reportStatus == '3'">
                已處理
              </p>
              <p v-if="item.reportStatus == '0'">
                取消申訴
              </p>
            </th>
            <th scope="col" style="width: 150px;">
              <div class="operate">
                <div v-if="acctType != 4 && acctType != 5 && item.reportStatus == '1'" class="icon" @click="getNotifyItem(item, 'edit')">
                  <img src="~/static/img/icon/edit.svg" alt="編輯案件查詢">
                </div>
                <div v-if="acctType == 4 || acctType == 5" class="icon" @click="getNotifyItem(item, 'edit')">
                  <img src="~/static/img/icon/edit.svg" alt="編輯案件查詢">
                </div>
                <div class="icon" @click="getNotifyItem(item, 'article')">
                  <img src="~/static/img/icon/download_file.svg" alt="">
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="appealPhTable">
      <div v-for="item in tableData" :key="item.id" class="appealPhTable_element">
        <div class="appealPhTable_number">
          <p>申訴編號：{{ item.reportNo }}</p>
        </div>
        <div class="appealPhTable_content">
          <div class="item">
            <p class="itemWod">
              姓名： {{ item.personalInfo.name }}
            </p>
            <p class="itemWod">
              申訴種類：
              <span v-if="item.reportType == '1'">行政窗口</span>
              <span v-if="item.reportType == '2'">服務人員</span>
              <span v-if="item.reportType == '3'">性騷申訴</span>
              <span v-if="item.reportType == '4'">系統功能</span>
              <span v-if="item.reportType == '5'">個人/單位申請者</span>
            </p>
            <p class="itemWod">
              申訴時間： {{ $moment(item.createdDatetime).format('yyyy/MM/DD HH:mm') }}
            </p>
            <p class="itemWod">
              處理狀態：
              <span v-if="item.reportStatus == '1'">待處理</span>
              <span v-if="item.reportStatus == '2'">處理中</span>
              <span v-if="item.reportStatus == '3'">已處理</span>
              <span v-if="item.reportStatus == '0'">取消申訴</span>
            </p>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a v-if="acctType != 4 && acctType != 5 && item.reportStatus == '1'" href="javascript:void(0);" class="download_file" @click="getNotifyItem(item, 'edit')">
                  <img src="~/static/img/icon/edit.svg" alt="編輯">
                </a>
                <a v-if="acctType == 4 || acctType == 5" href="javascript:void(0);" class="download_file" @click="getNotifyItem(item, 'edit')">
                  <img src="~/static/img/icon/edit.svg" alt="編輯">
                </a>
                <a href="javascript:void(0);" class="download_file" @click="getNotifyItem(item, 'article')">
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
      acctType: '',
      createdDateTimeBegin: '',
      createdDateTimeEnd: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-申訴管理'
  },
  mounted () {
    this.reportLogs_select()
    this.acctType = this.TSLform.acctType
  },
  methods: {
    async reportLogs_select () {
      const vm = this
      const obj = {
        createdDateTimeBegin: vm.createdDateTimeBegin,
        createdDateTimeEnd: vm.createdDateTimeEnd,
        token: vm.TSLtoken
      }
      const res = await frontendApi.reportLogs_select(obj)
      if (res.isSuccess === true) {
        if (res.data !== null) {
          vm.tableData = res.data
          vm.total = vm.tableData.length
        }
      } else {
        vm.tableData = []
        vm.total = 0
      }
    },
    getNotifyItem (form, type) {
      sessionStorage.clear()
      if (form === 'add') {
        this.$router.push({ path: '/appeal/form' })
      } else if (type === 'edit') {
        this.$router.push({ path: '/appeal/form' })
        sessionStorage.setItem('appealForm', JSON.stringify(form))
      } else {
        this.$router.push({ path: '/appeal/details' })
        sessionStorage.setItem('appealForm', JSON.stringify(form))
      }
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.reportLogs_select()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.reportLogs_select()
    },
    clearselect () {
      const vm = this
      vm.createdDateTimeBegin = ''
      vm.createdDateTimeEnd = ''
      this.reportLogs_select()
    }
  }
}
</script>

<style lang="scss">
.appeal{
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

  &_addBtn{
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
  }

  &_search{
    @include searchForm;
    .appeal_search--btn{
      margin-top: clamp(min(20px), pc(30), max(30px));
    }
  }

  .appealPhTable{
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
