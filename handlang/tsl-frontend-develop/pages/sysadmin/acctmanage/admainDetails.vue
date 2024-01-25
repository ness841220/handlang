<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="admainDetails">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/acctmanage">系統管理-帳號管理</a> / <a href="/sysadmin/acctmanage/details?id=123">帳號明細</a>
    </span>

    <div id="content" class="admainDetails--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>帳號明細</h2>
    </div>

    <div class="admainDetails_element">
      <div class="appealstate">
        <label for="acctStatus">
          <p>處理狀態：</p>
        </label>
        <el-select
          v-if="thisAcctType == 5"
          id="acctStatus"
          v-model="acctStatus"
          name="acctStatus"
          placeholder="處理狀態"
          popper-class="defaultSelect"
        >
          <el-option v-for="item,index in acctStatusList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
        <el-select
          v-else
          id="acctStatus"
          v-model="acctStatus"
          disabled
          name="acctStatus"
          placeholder="處理狀態"
          popper-class="defaultSelect"
        >
          <el-option v-for="item,index in acctStatusList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="appealContent">
        <p>明細內容：</p>
        <!--管理機關-->
        <div class="appealContent_table">
          <div class="item">
            <div class="item_left">
              <p>個人帳號</p>
            </div>
            <div class="item_right">
              <p>{{ form.verifyId }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>單位名稱</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.department)!==false?form.department: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>電子信箱</p>
            </div>
            <div class="item_right">
              <p>{{ form.email }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>電話號碼</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.telphone)!==false?form.telphone: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>手機號碼</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.cellphone)!==false?form.cellphone: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>資料有效否</p>
            </div>
            <div class="item_right">
              <p v-if="form.isReal == '0'">
                無效
              </p>
              <p v-else-if="form.isReal == '1'">
                有效
              </p>
              <p v-else-if="form.isReal == '2'">
                身分失效
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>備註</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.remark)!==false?form.remark: '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="admainDetails_element--btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/sysadmin/acctmanage' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="thisAcctType == 5" class="TSLbutton red" @click="submitForm(oldData)">
          <p>儲存</p>
        </el-button>
      </div>
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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/' })">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import frontendApi from '@/assets/api/frontendApi'
import { ListData } from '@/assets/js/base'
export default {
  layout: 'navMenu',
  data () {
    return {
      acctStatus: '',
      thisAcctType: '',
      form: {
        verifyId: '',
        department: '',
        email: '',
        telphone: '',
        cellphone: '',
        remark: ''
      },
      oldData: {},
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      acctStatusList: ListData.acctStatusList
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-帳號管理-帳號明細'
  },
  mounted () {
    this.thisAcctType = localStorage.getItem('TSLtype')
    this.acctSelect()
  },
  methods: {
    async acctSelect () {
      const vm = this
      const id = sessionStorage.getItem('acctmanageID')
      const obj = {
        verifyId: id,
        createdDateTimeBegin: '',
        createdDateTimeEnd: '',
        name: '',
        acctType: ''
      }
      const res = await frontendApi.acctSelect(obj)
      if (res.isSuccess === true) {
        const data = res.data[0]
        vm.oldData = data
        vm.form.verifyId = data.verifyId
        vm.form.department = data.department
        vm.form.email = data.email
        vm.form.telphone = data.telphone
        vm.form.cellphone = data.cellphone
        vm.form.remark = data.remark
        vm.form.isReal = data.isReal
        vm.acctStatusList.forEach((item) => {
          if (item.id === data.acctStatus) {
            vm.acctStatus = item.id
          }
        })
      }
    },
    async submitForm (oldData) {
      const vm = this
      const obj = {
        verifyId: oldData.verifyId,
        name: oldData.name,
        feature: '',
        telphone: vm.closeDiv(oldData.telphone) !== false ? oldData.telphone : '',
        cellphone: oldData.cellphone,
        lineId: '',
        Email: oldData.email,
        city: '',
        dist: '',
        address: '',
        eContactName: '',
        eContactNum: '',
        hCategory: '',
        hCategoryNote: '',
        hLevel: '',
        hLevelNote: '',
        usualComm: '',
        usualCommNote: '',
        expirydate: '',
        password: '',
        files: '',
        remark: vm.closeDiv(oldData.remark) !== false ? oldData.remark : '',
        acctType: oldData.acctType,
        positionTitle: '',
        department: vm.closeDiv(oldData.department) !== false ? oldData.department : '',
        acctStatus: vm.acctStatus,
        isReal: oldData.isReal
      }
      const res = await frontendApi.handlang_acctEdit(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '處理狀態已更新。'
        this.defaultPopUps = true
        this.acctSelect()
      }
    }
  }
}
</script>

<style lang="scss">
.admainDetails{
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

  &_element{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    &--btn{
      margin-top: clamp(min(20px), pc(30), max(30px));
      .TSLbutton{
        width: 100%;
        max-width: 113px;
      }
    }
    .appealstate{
      display: flex;
      align-items: center;
      .TSLbutton{
        margin-left: 20px;
      }

      .el-select{
        width: 100%;
        max-width: 258px;
        .el-input__inner{
          height: 48px;
          line-height: 48px;
          border-radius: 10px;
          border: none;
          color: #ffffff;
          background: #C04729;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
          &::placeholder{
            color: #ffffff;
            font-size: 100%;
          }
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
      }
    }
    .appealContent{
      margin-top: clamp(min(20px), pc(30), max(30px));
      &_table{
        margin-top: 10px;
        border: 1px solid $default;
      }
      .item{
        min-height: 30px;
        display: flex;
        background: #ffffff;
        &:nth-child(even){
          background: #EFD1C9;
        }
        p{
          letter-spacing: 3px;
        }
        &_left{
          width: 100%;
          max-width: 420px;
          box-sizing: border-box;
          text-align: center;
          padding: 10px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #545454;
        }
        &_right{
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          padding: 10px 10px;
        }
        .usualCommText{
          span{
            &:last-child{
              b{
                display: none;
              }
            }
          }
        }
      }
    }

    @include phSize(){
      .appealContent{
        .item{
          flex-direction: column;
          align-items: flex-start;
          padding: 10px 10px;
          &_left,&_right{
            width: 100%;
            max-width: 100%;
            text-align: center;
            border-right: 0;
            padding: 0;
          }
          &_left{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
