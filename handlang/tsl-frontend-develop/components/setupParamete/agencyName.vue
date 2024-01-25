<template>
  <div v-loading="loading" class="agencyName">
    <div class="agencyName_search">
      <div class="keyword">
        <label for="keyword" class="title">
          <p>關鍵字</p>
        </label>
        <el-input id="keyword" v-model="keyword" name="keyword" />
      </div>

      <div class="news_search--btn">
        <el-button class="TSLbutton red" @click="getsetupPage">
          <p>搜尋</p>
        </el-button>
        <el-button class="TSLbutton" @click="clearselect">
          <p>清除</p>
        </el-button>
      </div>
    </div>

    <div class="agencyName_addBtn">
      <el-button class="TSLbutton red" @click="addPopUps = true">
        <p>新增機關</p>
      </el-button>
    </div>

    <div class="allTable">
      <table>
        <thead>
          <tr>
            <th scope="col" style="min-width: 84px;max-width: 84px;">
              <p>項次</p>
            </th>
            <th scope="col" style="min-width: 300px;max-width: 330px;">
              <p>機關代碼</p>
            </th>
            <th scope="col" style="min-width: 300px;">
              <p>機關名稱</p>
            </th>
            <th scope="col" style="min-width: 140px;max-width: 140px;">
              <p>操作</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in tableData" :key="item.id">
            <template v-if="item.isValid != false">
              <th scope="col" style="min-width: 84px;max-width: 84px;">
                <p>{{ (index+ 1) }}</p>
              </th>
              <th scope="col" style="min-width: 300px;max-width: 330px;">
                <p v-if="item.edit == false">
                  {{ item.codeId }}
                </p>
                <el-input v-else v-model="item.codeId" />
              </th>
              <th scope="col" style="min-width: 300px;">
                <p v-if="item.edit == false">
                  {{ item.strVal }}
                </p>
                <el-input v-else v-model="item.strVal" />
              </th>
              <th scope="col" style="min-width: 140px;max-width: 140px;">
                <div class="operate">
                  <div v-if="item.edit == false" class="icon" @click="editItem(item)">
                    <img src="~/static/img/icon/edit.svg" alt="">
                  </div>
                  <div v-else class="icon" @click="checkItem(item)">
                    <img src="~/static/img/icon/Check circle.png" alt="">
                  </div>
                  <div class="icon" @click="deleteItem(item)">
                    <img src="~/static/img/icon/delete.png" alt="">
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="statisticsPhTable">
      <div v-for="item,index in tableData" :key="index" class="statisticsPhTable_element">
        <div class="statisticsPhTable_number">
          <p>項次: {{ (index+ 1) }}</p>
        </div>
        <div class="statisticsPhTable_content">
          <div class="item">
            <p v-if="item.edit == false" class="itemWod">
              機關代碼: {{ item.codeId }}
            </p>
            <p v-else class="itemWod">
              機關代碼: <el-input v-model="item.codeId" />
            </p>
            <p v-if="item.edit == false" class="itemWod">
              機關名稱: {{ item.strVal }}
            </p>
            <p v-else class="itemWod">
              機關名稱: <el-input v-model="item.strVal" />
            </p>
            <div class="operate">
              <p>操作：</p>
              <div class="operate_icon">
                <a v-if="item.edit == false" href="javascript:void(0);" class="download_file" @click="editItem(item)">
                  <img src="~/static/img/icon/edit.svg" alt="">
                </a>
                <a v-else href="javascript:void(0);" class="download_file" @click="checkItem(item)">
                  <img src="~/static/img/icon/Check circle.png" alt="">
                </a>
                <a href="javascript:void(0);" class="download_file" @click="deleteItem(item)">
                  <img src="~/static/img/icon/delete.svg" alt="">
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
      :visible.sync="addPopUps"
      class="addPopUps"
      @close="closeForm"
    >
      <div class="addPopUps_body">
        <div class="addPopUps_title">
          <p>新增機關名稱與代碼</p>
        </div>
        <el-form ref="form" :model="form" :hide-required-asterisk="true">
          <el-form-item prop="codeId" label="機關代碼:" :rules="[{ required: true, message: '請輸入機關代碼', trigger: 'blur' }]">
            <el-input v-model="form.codeId" />
          </el-form-item>
          <el-form-item prop="strVal" label="機關名稱:" :rules="[{ required: true, message: '請輸入機關名稱', trigger: 'blur' }]">
            <el-input v-model="form.strVal" type="textarea" :rows="3" resize="none" />
          </el-form-item>
        </el-form>

        <div class="addPopUps_btn">
          <el-button class="TSLbutton" @click="addPopUps = false">
            <p>取消</p>
          </el-button>
          <el-button class="TSLbutton red" @click="addItem('form', form)">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="defaultPopUps"
      class="defaultPopUps"
      :close-on-click-modal="false"
      @close="defaultId = 0"
    >
      <div class="defaultPopUps_body">
        <div class="defaultPopUps_content">
          <p>{{ defaultText }}</p>
        </div>
        <div class="defaultPopUps_btn">
          <el-button v-if="defaultId == 1" class="TSLbutton" @click="defaultPopUps = false">
            <p>取消</p>
          </el-button>
          <el-button v-if="defaultId == 0" class="TSLbutton red" @click="defaultPopUps = false">
            <p>確定</p>
          </el-button>
          <el-button v-if="defaultId == 1" class="TSLbutton red" @click="deleteCode(deleteForm)">
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
  name: 'AgencyName',
  data () {
    return {
      loading: true,
      keyword: '',
      form: {
        codeType: 'GRO',
        codeId: '',
        codeName: null,
        codeDescL: null,
        seq: null,
        intVal: null,
        strVal: '',
        isValid: true,
        dtEffect: '',
        children: null
      },
      deleteForm: {},
      tableData: [],
      pageInfo: {
        total: 0,
        current: 1
      },
      defaultId: 0,
      defaultText: '',
      defaultPopUps: false,
      addPopUps: false
    }
  },
  mounted () {
    this.getsetupPage()
  },
  methods: {
    clearselect () {
      this.keyword = ''
      this.getsetupPage()
    },
    closeForm () {
      this.form.codeId = ''
      this.form.strVal = ''
    },
    async getsetupPage () {
      const vm = this
      const obj = {
        codeType: 'GRO',
        KeyWords: vm.keyword,
        pageNum: vm.pageInfo.current,
        pageSize: 20
      }
      const res = await frontendApi.getsetupPage(obj)
      if (res.isSuccess === true) {
        vm.tableData = res.data.codeDTOV1s
        for (let i = 0; i < vm.tableData.length; i++) {
          const item = vm.tableData[i]
          vm.$set(item, 'edit', false)
        }
        vm.pageInfo.total = res.data.totalCounts
      } else {
        vm.tableData = []
        vm.pageInfo.total = 0
      }
      this.loading = false
    },
    addItem (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const dataList = []
          dataList.push(form)
          const res = await frontendApi.createCode(dataList)
          this.addPopUps = false
          if (res.isSuccess === true) {
            vm.defaultText = '機關名稱與代碼新增成功'
            this.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            this.defaultPopUps = true
          }
          this.getsetupPage()
        }
      })
    },
    editItem (item) {
      item.edit = true
    },
    deleteItem (item) {
      const vm = this
      const deleteForm = Object.assign({}, item)
      vm.deleteForm = deleteForm
      vm.defaultText = '是否確認刪除此機關代碼與名稱？'
      this.defaultPopUps = true
      this.defaultId = 1
    },
    async deleteCode (deleteForm) {
      const obj = [{
        codeType: deleteForm.codeType,
        codeId: deleteForm.codeId
      }]
      const res = await frontendApi.deleteCode(obj)
      if (res.isSuccess === true) {
        this.defaultText = '刪除成功'
        this.defaultPopUps = true
        this.defaultId = 0
        this.getsetupPage()
      } else {
        this.defaultText = res.message
        this.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async checkItem (item) {
      const vm = this
      const dataList = []
      const obj = {
        codeType: item.codeType,
        codeId: item.codeId,
        codeName: item.codeName,
        codeDesc: item.codeDesc,
        seq: item.seq,
        intVal: item.intVal,
        strVal: item.strVal,
        isValid: item.isValid,
        dtEffect: item.dtEffect,
        children: item.children
      }
      dataList.push(obj)
      const res = await frontendApi.updateCode(dataList)
      if (res.isSuccess === true) {
        vm.defaultText = '系統參數修改成功'
        this.defaultId = 0
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        this.defaultId = 0
        this.defaultPopUps = true
      }
      const element = document.querySelectorAll('.navMenu_in')[0]
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      this.getsetupPage()
    },
    handleCurrentChange (val) {
      this.pageInfo.current = val
      this.getsetupPage()
      const element = document.querySelectorAll('.agencyName_search')[0]
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style lang="scss">
.agencyName{
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

  .allTable{
    th{
      padding: 0 20px;
    }
    tbody{
      .el-input__inner{
        font-size: clamp(min(1.125em), pc(20), max(1.250em));
        border-radius: 10px;
        border: 1px solid #848484;
      }
    }
  }

  .addPopUps{
    .el-dialog{
      width: 100%;
      max-width: 549px;
      border-radius: 5px;
      border: 1px solid #545454;
      background: #FFF;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
      &__header{
        display: none;
      }
      &__body{
        padding: 15px;
      }
    }

    &_title{
      margin: 10px 0;
      margin-bottom: 32px;
      p{
        font-size: 20px;
        text-align: center;
      }
    }

    &_btn{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .TSLbutton{
        width: 100%;
        max-width: 100px;
      }
    }

    .el-form-item{
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      &__label{
        font-size: 20px;
        flex-shrink: 0;
      }
      .el-textarea__inner{
        font-size: 20px;
      }
    }
    .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner{
      border-color: #F56C6C;
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
        .operate{
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          &_icon{
            display: flex;
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
