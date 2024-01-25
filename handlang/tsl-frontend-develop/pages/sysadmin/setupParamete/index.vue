<template>
  <div class="setupParamete">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/setupParamete">系統管理-參數設定</a>
    </span>

    <div id="content" class="setupParamete--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>參數設定</h2>
    </div>

    <div class="setupParamete_radio">
      <el-radio-group v-model="type">
        <el-radio-button label="系統參數" />
        <el-radio-button label="機關名稱" />
      </el-radio-group>
    </div>

    <el-form v-if="type== '系統參數'" ref="form" :model="form" class="setupParamete_element">
      <div class="inputItem">
        <p class="inputItem_title">
          檔案容量
        </p>
        <div class="inputItem_content">
          <div class="inputItem_item">
            <div class="content">
              <label for="intVal">● 註冊頁檔案上傳總容量限制為</label>
              <el-form-item class="middle">
                <el-input v-model.number="regupd.intVal" />
              </el-form-item>
              MB
            </div>
          </div>
          <div class="inputItem_item">
            <div class="content">
              <label for="intVal">● 服務申請頁檔案上傳總容量限制為</label>
              <el-form-item class="middle">
                <el-input v-model.number="serupd.intVal" />
              </el-form-item>
              MB
            </div>
          </div>
        </div>
      </div>
      <div class="inputItem">
        <p class="inputItem_title">
          帳號安全
        </p>
        <div class="inputItem_content">
          <div class="inputItem_item">
            <div class="content">
              <label for="strVal">● 預設密碼為</label>
              <el-form-item class="small">
                <el-input v-model="depass.strVal" />
              </el-form-item>
            </div>
          </div>
          <div class="inputItem_item">
            <div class="content">
              <label for="chageText">● 預設密碼登入後，立即要求變更。</label>
              <el-form-item class="small">
                <el-input id="chageText" v-model="chageText" name="chageText" />
              </el-form-item>
              (是/否)
            </div>
          </div>
          <div class="inputItem_item">
            <div class="content">
              <label for="intVal">● 帳號登入失敗</label>
              <el-form-item class="small">
                <el-input v-model.number="loginf.intVal" />
              </el-form-item>
              次後，至少
              <el-form-item class="small">
                <el-input v-model.number="loginm.intVal" />
              </el-form-item>
              分鐘不允許該帳戶登入。
            </div>
          </div>
          <div class="inputItem_item">
            <div class="content">
              <label for="intVal">● 密碼必需包含</label>
              <el-form-item class="small">
                <el-input v-model.number="passco.intVal" />
              </el-form-item>
              碼，最多
              <el-form-item class="small">
                <el-input v-model.number="pasmax.intVal" />
              </el-form-item>
              並且須包含
              <el-form-item class="small">
                <el-input v-model.number="passen.intVal" />
              </el-form-item>
              英文跟
              <el-form-item class="small">
                <el-input v-model.number="passtf.intVal" />
              </el-form-item>
              位數字，可使用特殊符號。
              (委外單位管理機關適用)
            </div>
          </div>
          <div class="inputItem_item">
            <div class="content">
              <label for="intVal">● 使用者變更密碼時，不可與前</label>
              <el-form-item class="small">
                <el-input v-model.number="passre.intVal" />
              </el-form-item>
              次相同
            </div>
          </div>
        </div>
      </div>
      <div class="inputItem">
        <p class="inputItem_title">
          案件明細
        </p>
        <div class="details">
          <p class="details_title">
            案件類別
          </p>
          <div class="details_content">
            <div v-for="item,index in form.details" :key="index">
              <el-form-item v-if="item.isValid != false" class="detailsinput">
                <el-input v-model="item.strVal" />
                <el-button v-if="item.codeId !== 'CC01'" @click="removeCCIS(item)">
                  <img src="~/static/img/icon/delete.svg" alt="">
                </el-button>
              </el-form-item>
            </div>
            <a href="javascript:void(0);" class="addBtn" @click="addDetails">
              <img src="~/static/img/icon/add.svg" alt="">
            </a>
          </div>
        </div>
      </div>

      <div class="setupParamete_btn">
        <el-button class="TSLbutton red" @click="updateCode">
          <p>修改</p>
        </el-button>
      </div>
    </el-form>

    <SetupParameteAgencyName v-if="type== '機關名稱'" />

    <el-dialog
      :visible.sync="defaultPopUps"
      class="defaultPopUps"
      :close-on-click-modal="false"
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
  name: 'SetupParamete',
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
      type: '系統參數',
      regupd: {},
      serupd: {},
      depass: {}, // 預設密碼
      chage: {}, // 預設密碼登入後，立即要求變更
      chageText: '',
      loginf: {}, // 帳號登入失敗次數
      loginm: {}, // 至少X分鐘不允許該帳戶登入
      pasmin: {}, // 密碼強度最少X碼
      pasmax: {}, // 密碼強度最多X碼
      passco: {}, // 密碼必需包含X碼以上
      passen: {}, // 密碼必需包含X碼英文
      passtf: {}, // 密碼必需包含X碼數字
      passre: {}, // 使用者變更密碼時，不可與前X相同
      form: {
        details: []
      },
      deleteForm: {},
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  mounted () {
    this.getCCIS()
    this.getFILST()
    this.getACTST()
  },
  methods: {
    addDetails () {
      this.form.details.push({
        codeType: 'CCIS',
        strVal: '',
        dtEffect: 'A',
        isValid: true
      })
    },
    async updateCode () {
      const vm = this
      const dataList = []
      vm.chage.strVal = vm.chageText === '是' ? '1' : '2'
      dataList.push(vm.regupd, vm.serupd, vm.depass, vm.chage, vm.loginf, vm.loginm,
        vm.pasmin, vm.pasmax, vm.passco, vm.passen, vm.passtf, vm.passre
      )
      for (let i = 0; i < vm.form.details.length; i++) {
        const item = vm.form.details[i]
        dataList.push(item)
      }
      const res = await frontendApi.updateCode(dataList)
      if (res.isSuccess === true) {
        vm.defaultText = '系統參數修改成功'
        vm.defaultId = 0
        this.defaultPopUps = true
        this.getCCIS()
        this.getFILST()
        this.getACTST()
        const element = document.querySelectorAll('.setupParamete--title')[0]
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async getCCIS () {
      const vm = this
      const obj = {
        codeType: 'CCIS'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        vm.form.details = res.data
      } else {
        vm.form.details = []
      }
    },
    async getFILST () {
      const vm = this
      const obj = {
        codeType: 'FILST'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          if (item.codeId === 'REGUPD') {
            vm.regupd = item
          } else if (item.codeId === 'SERUPD') {
            vm.serupd = item
          }
        }
      }
    },
    async getACTST () {
      const vm = this
      const obj = {
        codeType: 'ACTST'
      }
      const res = await frontendApi.getsetupParamete(obj)
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          switch (item.codeId) {
            case 'DEPASS':
              vm.depass = item
              break
            case 'CHAGE':
              vm.chage = item
              vm.chageText = item.strVal === '1' ? '是' : '否'
              break
            case 'LOGINF':
              vm.loginf = item
              break
            case 'LOGINM':
              vm.loginm = item
              break
            case 'PASMIN':
              vm.pasmin = item
              break
            case 'PASMAX':
              vm.pasmax = item
              break
            case 'PASSCO':
              vm.passco = item
              break
            case 'PASSEN':
              vm.passen = item
              break
            case 'PASSTF':
              vm.passtf = item
              break
            case 'PASSRE':
              vm.passre = item
              break
            default:
              break
          }
        }
      }
    },
    removeCCIS (item) {
      const vm = this
      if (this.closeDiv(item.codeId) === false) {
        this.removeArr(vm.form.details, item)
        return
      }
      const deleteForm = Object.assign({}, item)
      vm.deleteForm = deleteForm
      vm.defaultText = '是否確認刪除此案件類別？'
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
        this.getCCIS()
      } else {
        this.defaultText = res.message
        this.defaultId = 0
        this.defaultPopUps = true
      }
    }
  }
}
</script>

<style lang="scss">
.setupParamete{
  &--title{
    height: 50px;
    display: flex;
    align-items: center;
    color: $red;
    background: #FFF9F9;
    padding: 0 clamp(min(22px), pc(36), max(36px));
    margin-top: clamp(min(20px), pc(40), max(40px));
    margin-bottom: 26px;
    box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
    img{
      width: 20px;
      height: 33px;
      margin-right: 10px;
    }
  }

  &_radio{
    max-width: 1220px;
    margin: 0 auto;
    margin-bottom: 40px;
    .el-radio-group{
      width: 100%;
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
  }

  &_btn{
    display: flex;
    align-items: center;
    margin-top: clamp(min(20px), pc(30), max(30px));
    .TSLbutton{
      width: 100%;
      max-width: 113px;
    }
    @include phSize{
      justify-content: center;
    }
  }

  .el-form.setupParamete_element{
    max-width: 1220px;
    margin: 0 auto;
    .inputItem{
      padding: 30px 20px;
      box-sizing: border-box;
      border: 1px solid $default;
      border-radius: 10px;
      position: relative;
      margin-bottom: clamp(min(50px), pc(65), max(65px));
      &_title{
        min-width: 150px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 26px;
        background-color: #ffffff;
        position: absolute;
        top: -13px;
        left: 60px;
      }
      &_item{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        label{
          font-size: 100%;
          line-height: 180%;
        }
        .content{
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          line-height: 180%;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
        .el-form-item{
          max-width: 127px;
          margin: 5px 10px;
        }
        .el-form-item.small{
          max-width: 86px;
        }
      }
    }

    .detailsinput{
      max-width: 248px;
      margin: 20px 0;
      margin-right: 10px;
      .el-form-item__content{
        display: flex;
        align-items: center;
        position: relative;
        .el-input__inner{
          padding-right: 50px;
        }
        .el-button{
          width: 50px;
          height: 50px;
          padding: 0;
          border: 0;
          border-radius: 10px;
          position: absolute;
          right: 1px;
          img{
            max-width: 100%;
            height: 22px;
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
      @include phSize{
        max-width: 100%;
        margin: 10px 0;
        margin-right: 0;
      }
    }

    .details{
      max-width: 1032px;
      margin: 0 auto;
      &_title{
        height: 54px;
        display: flex;
        align-items: center;
      }
      &_content{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        @include phSize{
          flex-direction: column;
        }
      }
      .addBtn{
        width: 30px;
        height: 30px;
        display: flex;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
