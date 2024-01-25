<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="statistics">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/statistics">統計報表</a>
    </span>

    <div id="content" class="statistics--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>統計報表</h2>
    </div>

    <div class="statistics_search">
      <div class="select">
        <div class="select_item">
          <label for="Type" class="title">
            <p>報表種類</p>
          </label>
          <el-select id="Type" v-model="Type" placeholder="請選擇" name="Type" popper-class="defaultSelect">
            <el-option label="聽打服務概況統計表" value="聽打服務概況統計表" />
            <el-option label="聽打案件類型統計表" value="聽打案件類型統計表" />
            <el-option label="手譯服務概況統計表" value="手譯服務概況統計表" />
            <el-option label="手譯案件類型統計表" value="手譯案件類型統計表" />
            <el-option label="手譯員個人費用" value="手譯員個人費用" />
            <el-option label="手譯服務概況_印領清冊" value="手譯服務概況_印領清冊" />
            <el-option label="聽打費用核對表" value="聽打費用核對表" />
            <el-option label="聽打服務概況_印領清冊" value="聽打服務概況_印領清冊" />
            <el-option label="每月服務統計資料" value="每月服務統計資料" />
          </el-select>
        </div>
        <div class="select_item">
          <label for="YearMoth" class="title">
            <p>月份</p>
          </label>
          <el-select
            id="YearMoth"
            v-model="YearMoth"
            placeholder="月份"
            name="YearMoth"
            popper-class="defaultSelect"
          >
            <el-option label="112/08" value="11208" />
            <el-option label="112/09" value="11209" />
            <el-option label="112/10" value="11210" />
            <el-option label="112/11" value="11211" />
            <el-option label="112/12" value="11212" />
          </el-select>
        </div>
      </div>

      <div class="statistics_search--btn">
        <el-button class="TSLbutton red" @click="lSeviceAmontMonth">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div class="statistics_addBtn">
      <el-button class="TSLbutton" @click="exportCommand()">
        <p>匯出</p>
      </el-button>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="width: 50px;min-width: 50px;">
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
            <th scope="col" style="width: 100px;max-width: 100px;">
              <p>項次</p>
            </th>
            <th scope="col" style="width: 400px;max-width: 400px;">
              <p>報表名稱</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <p>系統發信時間</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <p>對象</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <p>檔案下載</p>
            </th>
            <th scope="col" style="max-width: 150px;min-width: 150px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in tableData" :key="item.id">
            <th scope="col" style="width: 50px;min-width: 50px;">
              <input
                id="allitem"
                v-model="item.checkbox"
                type="checkbox"
                class="checkboxInput"
                @change="itemExport(item)"
              >
            </th>
            <th scope="col" style="width: 100px;max-width: 100px;">
              <p>{{ (index+ 1) }}</p>
            </th>
            <th scope="col" style="width: 400px;max-width: 400px;">
              <p>{{ item.title }}</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <p>{{ item.systemSendSet }}</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <p>{{ item.reciver }}</p>
            </th>
            <th scope="col" style="width: 160px;max-width: 160px;">
              <div class="operate">
                <div class="icon" @click="Exceldownload(item)">
                  <img src="~/static/img/icon/Excel ICON.png" alt="">
                </div>
              </div>
            </th>
            <th scope="col" style="max-width: 150px;min-width: 150px;">
              <div class="operate">
                <el-button class="TSLbutton" @click="statistics_sendEmail(item)">
                  <img src="~/static/img/icon/emailIcon.png" alt="">
                  <p>手動發信</p>
                </el-button>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="statisticsPhTable">
      <div v-for="item,index in tableData" :key="index" class="statisticsPhTable_element">
        <div class="statisticsPhTable_number">
          <input
            v-model="item.checkbox"
            type="checkbox"
            class="checkboxInput"
          >
          <p>項次: {{ (index+ 1) }}</p>
        </div>
        <div class="statisticsPhTable_content">
          <div class="item">
            <p class="itemWod">
              報表名稱: {{ item.title }}
            </p>
            <p class="itemWod">
              系統發信時間: {{ item.systemSendSet }}
            </p>
            <p class="itemWod">
              對象: {{ item.reciver }}
            </p>
            <div class="ExcelBtn">
              <p>檔案下載：</p>
              <el-button @click="Exceldownload(item)">
                <img src="~/static/img/icon/Microsoft Excel.png" alt="下載Excel">
              </el-button>
            </div>
            <div class="formBtn">
              <p>操作：</p>
              <el-button style="width: 138px; display: flex; justify-content: center;" @click="statistics_sendEmail(item)">
                <img src="~/static/img/icon/emailIcon.png" alt="手動發信">
                <p>手動發信</p>
              </el-button>
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
      Type: '',
      YearMoth: '',
      allitem: false,
      tableData: [],
      defaultText: '',
      defaultPopUps: false,
      pageInfo: {
        total: 0,
        current: 1
      }
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-統計報表'
  },
  mounted () {
    this.lSeviceAmontMonth()
  },
  methods: {
    async lSeviceAmontMonth () {
      const vm = this
      const obj = {
        Type: vm.Type,
        YearMonth: vm.YearMoth,
        pageNum: vm.pageInfo.current,
        pageSize: 20
      }
      const res = await frontendApi.lSeviceAmontMonth(obj)
      if (res.isSuccess === true) {
        const exportList = JSON.parse(sessionStorage.getItem('statisticsexport'))
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
                  if (item.id === itemj.id) {
                    itemj.checkbox = item.checkbox
                  }
                }
              }
            }
          }
          vm.tableData = res.data
        } else {
          vm.tableData = []
        }
        vm.tableData.forEach((item) => {
          const m = item.yymm.slice(3)
          const t = item.yymm.slice(0, 3)
          vm.$set(item, 'data', t + '/' + m)
        })
        vm.pageInfo.total = vm.tableData.length
      } else {
        vm.tableData = []
        vm.pageInfo.total = 0
      }
    },
    allexport (val) {
      const vm = this
      if (val) {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = true
        }
        sessionStorage.setItem('statisticsexport', JSON.stringify(vm.tableData))
      } else {
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          item.checkbox = false
        }
        sessionStorage.removeItem('statisticsexport')
      }
    },
    itemExport (val) {
      const vm = this
      const exportList = JSON.parse(sessionStorage.getItem('statisticsexport'))
      if (vm.closeDiv(exportList) !== false) {
        if (val.checkbox) {
          exportList.push(val)
          sessionStorage.setItem('statisticsexport', JSON.stringify(exportList))
        } else {
          for (let i = 0; i < exportList.length; i++) {
            const item = exportList[i]
            if (val.verifyId === item.verifyId) {
              vm.removeArr(exportList, item)
            }
          }
          vm.allitem = false
          sessionStorage.setItem('statisticsexport', JSON.stringify(exportList))
        }
      } else {
        const list = []
        list.push(val)
        sessionStorage.setItem('statisticsexport', JSON.stringify(list))
      }
    },
    async exportCommand () {
      const arr = []
      const exportList = JSON.parse(sessionStorage.getItem('statisticsexport'))
      if (this.closeDiv(exportList) !== false) {
        for (let i = 0; i < exportList.length; i++) {
          const item = exportList[i]
          arr.push(item.downloadKey + item.yymm)
        }
        const obj = {
          key: arr.toString(),
          yymm: '11211'
        }
        const res = await frontendApi.statisticsExport_download(obj)
        const blob = new Blob([res], { type: 'application/zip' })
        const filename = '統計報表'
        const elink = document.createElement('a')
        elink.download = filename
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)

        sessionStorage.removeItem('statisticsexport')
        this.lSeviceAmontMonth()
      }
    },
    async Exceldownload (val) {
      const obj = {
        key: val.downloadKey + val.yymm,
        yymm: val.yymm
      }
      const res = await frontendApi.statisticsExport_download(obj)
      const blob = new Blob([res], { type: 'application/zip' })
      const filename = '統計報表'
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    },
    async statistics_sendEmail (val) {
      const obj = {
        key: val.downloadKey + val.yymm,
        yymm: val.yymm,
        title: val.title
      }
      const res = await frontendApi.statistics_sendEmail(obj)
      if (res.isSuccess === true) {
        this.defaultText = '手動發信成功'
        this.defaultPopUps = true
      } else {
        this.defaultText = res.message
        this.defaultPopUps = true
      }
    },
    clearselect () {
      this.Type = ''
      this.YearMoth = ''
      this.lSeviceAmontMonth()
    },
    handleCurrentChange (val) {
      this.pageInfo.current = val
      this.lSeviceAmontMonth()
    }
  }
}
</script>

<style lang="scss">
.statistics{
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
    .TSLbutton{
      width: 100%;
      max-width: 113px;
    }
  }

  .statisticsPhTable{
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
      }
      .ExcelBtn{
        display: flex;
        align-items: center;
        padding: 0 10px;
        .el-button{
          width: 50px;
          height: 50px;
          padding: 0;
          border: 0;
          img{
            width: 25px;
            height: 25px;
          }
          &:hover{
            background-color: transparent;
          }
          &:focus{
            background-color: transparent;
            outline: 3px dashed #990094;
          }
        }
      }
      .formBtn{
        display: flex;
        align-items: center;
        padding: 10px;
        .el-button{
          width: 138px;
          height: 30px;
          padding: 0;
          border-radius: 5px;
          border: 1px solid #545454;
          span{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
          }
          img{
            width: 21px;
            height: 18px;
            margin-right: 8px;
          }
          p{
            line-height: 18px;
          }
          &:hover{
            background-color: transparent;
          }
          &:focus{
            background-color: transparent;
            outline: 3px dashed #990094;
          }
        }
      }
    }
  }
}
</style>
