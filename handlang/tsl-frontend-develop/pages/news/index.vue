<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="news">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/news" title="最新消息">最新消息</a>
    </span>

    <div id="content" class="news--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>最新消息</h2>
    </div>
    <div class="news_search">
      <div class="date">
        <label for="beginDateTime" class="title">
          <p>發佈日期</p>
        </label>
        <label style="display: none;" for="endDateTime" class="title">
          <p>發佈日期</p>
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
      <div class="keyword">
        <label for="keyword" class="title">
          <p>關鍵字</p>
        </label>
        <el-input id="keyword" v-model="keyword" text="關鍵字搜尋" name="keyword" />
      </div>

      <div class="news_search--btn">
        <el-button class="TSLbutton red" @click="select_news">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div v-if="TSLform.isLogin && TSLform.acctType == 4 || TSLform.acctType == 5" class="news_addBtn">
      <el-button class="TSLbutton red" @click="$router.push({ path: '/news/form' })">
        <p>新增消息</p>
      </el-button>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="min-width: 84px;max-width: 84px;">
              <p>項次</p>
            </th>
            <th scope="col" style="min-width: 300px;">
              <p>標題</p>
            </th>
            <th scope="col" style="min-width: 300px;max-width: 330px;">
              <p>發佈日期</p>
            </th>
            <th scope="col" style="min-width: 140px;max-width: 140px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
            <th scope="col" style="min-width: 84px;max-width: 84px;">
              <p>{{ (index+ 1) }}</p>
            </th>
            <th scope="col" style="width: 300px;">
              <p>{{ item.title }}</p>
            </th>
            <th scope="col" style="min-width: 300px;max-width: 330px;">
              <p>{{ $moment(item.beginDateTime).format('yyyy/MM/DD') }}</p>
            </th>
            <th scope="col" style="min-width: 140px;max-width: 140px;">
              <div class="operate">
                <div v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="icon" @click="getNotifyItem(item, 'edit')">
                  <img src="~/static/img/icon/edit.svg" alt="編輯最新消息">
                </div>
                <div class="icon" @click="getNotifyItem(item, 'article')">
                  <img src="~/static/img/icon/download_file.svg" alt="查看最新消息">
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
          <p>{{ $moment(item.beginDateTime).format('yyyy/MM/DD HH:mm') }}</p>
          <div class="icon">
            <a v-if="TSLform.acctType == 4 || TSLform.acctType == 5" href="javascript:void(0);" class="download_file" @click="getNotifyItem(item, 'edit')">
              <img src="~/static/img/icon/edit.svg" alt="編輯">
            </a>
            <a href="javascript:void(0);" class="download_file" @click="getNotifyItem(item, 'article')">
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
  data () {
    return {
      keyword: '',
      beginDateTime: '',
      endDateTime: '',
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-最新消息'
  },
  mounted () {
    this.select_news()
  },
  methods: {
    async select_news () {
      const vm = this
      const obj = {
        beginDateTime: vm.beginDateTime,
        endDateTime: vm.endDateTime,
        title: vm.keyword
      }
      const res = await frontendApi.select_news(obj)
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
      sessionStorage.setItem('newsForm', JSON.stringify(form))
      if (type === 'edit') {
        this.$router.push({ path: '/news/editForm' })
      } else {
        this.$router.push({ path: '/news/article' })
      }
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.select_news()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.select_news()
    },
    clearselect () {
      const vm = this
      vm.beginDateTime = ''
      vm.endDateTime = ''
      vm.keyword = ''
      this.select_news()
    }
  }
}
</script>

<style lang="scss">
.news{
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

  &_addBtn{
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: clamp(min(20px), pc(30), max(30px));
  }

  .el-table__empty-block{
    min-height: auto;
  }
}
</style>
