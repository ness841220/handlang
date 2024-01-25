<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="entityfiles">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/entityfiles">系統管理-實體檔管理</a>
    </span>

    <div id="content" class="entityfiles--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>實體檔管理</h2>
    </div>

    <div class="entityfiles_progress">
      <p class="progress_title">
        實體檔容量表：
      </p>
      <div class="progress">
        <p class="progressText">
          {{ (100 - proportion) }}%
        </p>
        <el-progress :text-inside="true" :stroke-width="50" :percentage="proportion" text-color="#ffffff" />
      </div>
    </div>

    <div class="entityfiles_btn">
      <el-radio-group v-model="type" class="pc" @change="filemanager_load">
        <el-radio-button label="1">
          註冊資料
        </el-radio-button>
        <el-radio-button label="2">
          案件資料
        </el-radio-button>
      </el-radio-group>
      <div class="radioPh">
        <el-select v-model="type" placeholder="" popper-class="defaultSelect" @change="filemanager_load">
          <el-option label="註冊資料" value="1" />
          <el-option label="案件資料" value="2" />
        </el-select>
      </div>

      <!-- <div class="entityfiles_btn--btn">
        <el-button class="TSLbutton">
          <p>刪除資料</p>
        </el-button>
      </div> -->
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="width: 200px;">
              <p>時間區間</p>
            </th>
            <th scope="col" style="width: 200px;">
              <p>檔案容量</p>
            </th>
            <th scope="col" style="width:140px">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id">
            <th scope="col" style="width: 200px;">
              <p>{{ item.title }}</p>
            </th>
            <th scope="col" style="width: 200px;">
              <p>{{ closeDiv(item.capacity)!==false?item.capacity:'-' }}</p>
            </th>
            <th scope="col" style="width:140px">
              <div class="operate">
                <el-button class="TSLbutton" @click="filemanager_download(item.key, item.type, item.title)">
                  <p>下載</p>
                </el-button>
                <el-button class="TSLbutton" @click="entityfilesDelete(item.key)">
                  <p>刪除</p>
                </el-button>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="entityfilesPhTable">
      <div v-for="item in tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" :key="item.id" class="entityfilesPhTable_element">
        <div class="entityfilesPhTable_number">
          <p>時間區間：{{ item.title }}</p>
        </div>
        <div class="entityfilesPhTable_content">
          <div class="item">
            <p class="itemWod">
              檔案容量：{{ item.capacity }}
            </p>
            <div class="operate">
              <p class="operate_title">
                操作：
              </p>
              <div class="operate_icon">
                <el-button class="TSLbutton" @click="filemanager_download(item.key, item.type, item.title)">
                  <p>下載</p>
                </el-button>
                <el-button class="TSLbutton" @click="entityfilesDelete(item.key)">
                  <p>刪除</p>
                </el-button>
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
          <el-button class="TSLbutton" @click="defaultPopUps = false">
            <p>取消</p>
          </el-button>
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:filemanager_delete(deleteID)">
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
      type: '1',
      proportion: 0,
      tableData: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      total: 0,
      currentPage: 1,
      pageSize: 20
    }
  },
  mounted () {
    this.filemanager_load()
    this.filemanager_proportion()
  },
  methods: {
    async filemanager_proportion () {
      const vm = this
      const obj = {
        token: ''
      }
      const res = await frontendApi.filemanager_proportion(obj)
      if (res.isSuccess === true) {
        vm.proportion = Number(res.data.proportion)
      }
    },
    async filemanager_load () {
      const vm = this
      const obj = {
        token: '',
        type: vm.type
      }
      const res = await frontendApi.filemanager_load(obj)
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
    entityfilesDelete (id) {
      this.deleteID = id
      this.defaultId = 1
      this.defaultText = '刪除資料後無法復原，是否確定刪除?'
      this.defaultPopUps = true
    },
    async filemanager_delete (key) {
      const vm = this
      const keyid = key
      this.defaultId = 0
      const res = await frontendApi.filemanager_delete(keyid)
      if (res.isSuccess === true) {
        vm.defaultPopUps = false
        vm.filemanager_load()
      } else {
        vm.defaultText = res.message
        vm.defaultPopUps = false
      }
    },
    async filemanager_download (key, type, title) {
      const obj = {
        key,
        type
      }
      const res = await frontendApi.filemanager_download(obj)
      const blob = new Blob([res], { type: 'application/zip' })
      const filename = '實體檔管理-' + title
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.filemanager_load()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.filemanager_load()
    }
  }
}
</script>

<style lang="scss">
.entityfiles{
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

  &_progress{
    max-width: 1220px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .progress_title{
      flex-shrink: 0;
      margin-right: 58px;
    }
    .progress{
      width: 100%;
      position: relative;
    }
    .progressText{
      position: absolute;
      top: 0;
      right: 30px;
      bottom: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
    }
    .el-progress-bar{
      &__outer{
        border-radius: 10px;
      }
      &__inner{
        border-radius: 0;
        background-color: #0048C2;
      }
      &__innerText{
        height: 100%;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        margin: 0 30px;
      }
    }

    @include phSize{
      align-items: flex-start;
      flex-direction: column;
      .progress_title{
        margin-right: 0;
        margin-bottom: 4px;
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
    margin: clamp(min(20px), pc(30), max(30px)) auto;
    .radioPh{
      display: none;
    }
    &--btn{
      display: flex;
      flex-shrink: 0;
      box-sizing: border-box;
      align-items: center;
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
    }
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
        background-color: transparent;
        font-size: 1.000em;
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
        max-width: 200px;
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
      }
    }
  }

  .entityfilesPhTable{
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
          padding: 10px;
          display: flex;
          align-items: center;
          &_title{
            margin-right: 10px;
          }
          .el-button{
            height: 40px;
            p{
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
