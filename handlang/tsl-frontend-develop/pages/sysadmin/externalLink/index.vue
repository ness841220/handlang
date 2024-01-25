<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="externalLink">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/externalLink">系統管理-外部連結管理</a>
    </span>

    <div id="content" class="externalLink--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>外部連結管理</h2>
    </div>

    <div class="externalLink_addBtn">
      <el-button class="TSLbutton" @click="addLink()">
        <p>新增</p>
      </el-button>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="width: 100px;">
              <p>排序編號</p>
            </th>
            <th scope="col" style="width: 250px;">
              <p>連結名稱</p>
            </th>
            <th scope="col" style="width: 120px;">
              <p>圖片</p>
            </th>
            <th scope="col" style="width: 400px;">
              <p>連結網址</p>
            </th>
            <th scope="col" style="width: 130px;">
              <p>開啟方式</p>
            </th>
            <th scope="col" style="width:140px">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in tableData" :key="index">
            <th scope="col" style="width: 100px;">
              <p>{{ item.seqNo }}</p>
            </th>
            <th scope="col" style="width: 250px;">
              <p>{{ closeDiv(item.linkName)!==false?item.linkName:'-' }}</p>
            </th>
            <th scope="col" style="width: 120px;">
              <div class="linkImgBanner">
                <img v-if="closeDiv(item.image)!==false" :src="'data:' + item.imgType + ';base64,' + item.image" alt="">
                <p v-else>
                  -
                </p>
              </div>
            </th>
            <th scope="col" style="width: 400px;">
              <p>{{ closeDiv(item.linkUrl)!==false?item.linkUrl:'-' }}</p>
            </th>
            <th scope="col" style="width: 130px;">
              <p v-if="item.opneModel == '1'">
                原視窗開啟
              </p>
              <p v-else-if="item.opneModel == '2'">
                另開新視窗
              </p>
              <p v-else>
                -
              </p>
            </th>
            <th scope="col" style="width:140px">
              <div class="operate">
                <div class="icon" @click="geteditItem(item)">
                  <img src="~/static/img/icon/edit.svg" alt="">
                </div>
                <div class="icon" @click="deleteItem(item)">
                  <img src="~/static/img/icon/delete.png" alt="">
                </div>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="externalLinkPhTable">
      <div v-for="item in tableData" :key="item.id" class="externalLinkPhTable_element">
        <div class="externalLinkPhTable_number">
          <p>排序編號：{{ item.seqNo }}</p>
        </div>
        <div class="externalLinkPhTable_content">
          <div class="item">
            <p class="itemWod">
              連結名稱 {{ item.linkName }}
            </p>
            <div class="imgBtn">
              <p>圖片：</p>
              <div class="img">
                <img v-if="closeDiv(item.image)!==false" :src="'data:' + item.imgType + ';base64,' + item.image" alt="">
                <img v-else src="~/static/img/icon/imgIcon.png" alt="圖片">
              </div>
            </div>
            <p class="itemWod">
              連結網址：{{ item.linkUrl }}
            </p>
            <p class="itemWod">
              開啟方式：<template v-if="item.opneModel == '1'">
                原視窗開啟
              </template>
              <template v-else-if="item.opneModel == '2'">
                另開新視窗
              </template>
              <template v-else>
                -
              </template>
            </p>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a href="javascript:void(0);" class="download_file" @click="geteditItem(item)">
                  <img src="~/static/img/icon/edit.svg" alt="編輯">
                </a>
                <a href="javascript:void(0);" class="download_file" @click="deleteItem(item)">
                  <img src="~/static/img/icon/delete.svg" alt="刪除">
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
          <el-button class="TSLbutton red" @click="defaultId==0?reloadPage() :linksSetting_delete()">
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
      gid: '',
      tableData: [],
      pageInfo: {
        total: 0,
        current: 1
      },
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-外部連結管理'
  },
  mounted () {
    this.linksSetting_select()
  },
  methods: {
    reloadPage () {
      this.defaultPopUps = false
      location.reload()
    },
    async linksSetting_select () {
      const vm = this
      const obj = {
        gid: '',
        pageNum: vm.pageInfo.current,
        pageSize: 20
      }
      const res = await frontendApi.linksSetting_select(obj)
      if (res.isSuccess === true) {
        if (res.data !== null) {
          vm.tableData = res.data.linksSettingDTOs
          vm.pageInfo.total = res.data.totalCounts
        }
      } else {
        vm.tableData = []
        vm.pageInfo.total = 0
      }
    },
    geteditItem (val) {
      sessionStorage.removeItem('externalLink')
      sessionStorage.setItem('externalLink', JSON.stringify(val))
      this.$router.push({ path: '/sysadmin/externalLink/form' })
    },
    addLink () {
      sessionStorage.removeItem('externalLink')
      this.$router.push({ path: '/sysadmin/externalLink/form' })
    },
    async linksSetting_delete () {
      const vm = this
      const obj = {
        gid: vm.gid,
        pageNum: '',
        pageSize: ''
      }
      const res = await frontendApi.linksSetting_delete(obj)
      if (res.isSuccess === true) {
        this.defaultText = '刪除成功'
        this.defaultId = 0
        this.defaultPopUps = true
      } else {
        this.defaultText = res.message
        this.defaultId = 0
        this.defaultPopUps = true
      }
      this.linksSetting_select()
    },
    deleteItem (val) {
      const vm = this
      vm.gid = val.gid
      this.defaultText = '確定刪除' + val.linkName + '連結?'
      this.defaultId = 1
      this.defaultPopUps = true
    },
    handleSizeChange (val) {
      this.pageInfo.current = 1
      this.pageSize = val
      this.linksSetting_select()
    },
    handleCurrentChange (val) {
      this.pageInfo.current = val
      this.linksSetting_select()
    }
  }
}
</script>

<style lang="scss">
.externalLink{
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
    .TSLbutton{
      width: 100%;
      max-width: 113px;
    }
  }

  .allTable{
    .imgBtn{
      .img{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        img{
          width: 25px;
          height: 25px;
        }
      }
    }
  }

  .externalLinkPhTable{
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
          word-wrap: break-word;
          word-break: break-all;
        }
      }
      .imgBtn{
        display: flex;
        align-items: center;
        padding: 10px;
        .img{
          width: 100px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
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
</style>
