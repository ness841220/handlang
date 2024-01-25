<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="notify">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/notify">訊息通知</a>
    </span>

    <div id="content" class="notify--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>訊息通知</h2>
    </div>

    <div class="notify_search">
      <div class="date">
        <label for="beginDateTime" class="title">
          <p class="title">發送時間</p>
        </label>
        <div class="date_input">
          <el-date-picker
            id="beginDateTime"
            v-model="beginDateTime"
            type="date"
            :clearable="false"
            text="起始日期"
            name="beginDateTime"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
          <span>至</span>
          <el-date-picker
            id="endDateTime"
            v-model="endDateTime"
            type="date"
            :clearable="false"
            text="最後日期"
            name="endDateTime"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </div>
      </div>

      <div class="notify_search--btn">
        <el-button class="TSLbutton red" @click="messageLogs_select">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="notify_btn">
      <el-radio-group v-model="type" class="pc" @change="messageLogs_select">
        <el-radio-button label="1">
          Email
        </el-radio-button>
        <el-radio-button label="2">
          簡訊
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="min-width: 84px;max-width: 84px;">
              <p>項次</p>
            </th>
            <th scope="col" style="min-width: 300px;">
              <p>發送時間</p>
            </th>
            <th scope="col" style="min-width: 300px;max-width: 400px;">
              <p>通知項目</p>
            </th>
            <th scope="col" style="min-width: 140px;max-width: 140px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
            <th scope="col" style="min-width: 84px;max-width: 84px;">
              <p>{{ index + 1 }}</p>
            </th>
            <th scope="col" style="min-width: 300px;">
              <p>{{ $moment(item.createdDateTime).format('yyyy/MM/DD HH:mm') }}</p>
            </th>
            <th scope="col" style="min-width: 300px;max-width: 400px;">
              <p>{{ item.objectName }}</p>
            </th>
            <th scope="col" style="min-width: 140px;max-width: 140px;">
              <div class="operate">
                <div class="icon" @click="getNotifyItem(item)">
                  <img src="~/static/img/icon/download_file.svg" alt="查看訊息通知">
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="allTable_ph">
      <div v-for="item,index in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="index" class="tabItem">
        <div class="data">
          <p>{{ item.data }}</p>
          <div class="icon">
            <a href="javascript:void(0);" class="download_file">
              <img src="~/static/img/icon/download_file.svg" alt="查看">
            </a>
          </div>
        </div>
        <p class="title">
          {{ item.title }}
        </p>
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
      beginDateTime: '',
      endDateTime: '',
      type: '1',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20,
      newsObj: [
        {
          id: '1',
          name: '註冊審核通知結果'
        },
        {
          id: '2',
          name: '服務申請通知'
        },
        {
          id: '3',
          name: '案件處理結果通知'
        },
        {
          id: '4',
          name: '服務異動通知'
        },
        {
          id: '5',
          name: '服務取消通知'
        },
        {
          id: '6',
          name: '服務提醒通知'
        },
        {
          id: '7',
          name: '服務未回報通知'
        },
        {
          id: '8',
          name: '權益申訴通知'
        },
        {
          id: '9',
          name: '權限申請通知'
        },
        {
          id: '10',
          name: '權限申請結果通知'
        },
        {
          id: '11',
          name: '滿意度回饋提醒通知'
        },
        {
          id: '12',
          name: '忘記密碼通知'
        }
      ]
    }
  },
  mounted () {
    this.messageLogs_select()
  },
  methods: {
    async messageLogs_select () {
      const vm = this
      const obj = {
        token: vm.TSLtoken,
        type: vm.type,
        createdDateTimeBegin: vm.beginDateTime,
        createdDateTimeEnd: vm.endDateTime
      }
      const res = await frontendApi.messageLogs_select(obj)
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
    getNotifyItem (form) {
      sessionStorage.setItem('notifyForm', JSON.stringify(form))
      this.$router.push({ path: '/notify/article' })
    },
    clearselect () {
      const vm = this
      vm.beginDateTime = ''
      vm.endDateTime = ''
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.select_news()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.select_news()
    }
  }
}
</script>

<style lang="scss">
.notify{
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
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
    .el-radio-group{
      width: 80%;
      display: flex;
      box-sizing: border-box;
      font-size: clamp(min(1.125em), pc(20), max(1.250em));
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
        font-size: 100%;
        background-color: transparent;
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
    }
  }

  &_search{
    @include searchForm;
    .notify_search--btn{
      margin-top: clamp(min(20px), pc(30), max(30px));
    }
  }
}
</style>
