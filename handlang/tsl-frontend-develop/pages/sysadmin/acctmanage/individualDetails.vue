<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="individualDetails">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/acctmanage">系統管理-帳號管理</a> / <a href="/sysadmin/acctmanage/details?id=123">帳號明細</a>
    </span>

    <div id="content" class="individualDetails--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>帳號明細</h2>
    </div>

    <div class="individualDetails_element">
      <div class="appealstate">
        <label for="acctStatus">
          <p>處理狀態：</p>
        </label>
        <el-select id="acctStatus" v-model="acctStatus" name="acctStatus" placeholder="處理狀態" popper-class="defaultSelect">
          <el-option v-for="item,index in acctStatusList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="appealContent">
        <p>明細內容：</p>
        <div class="appealContent_table">
          <div class="item">
            <div class="item_left">
              <p>姓名</p>
            </div>
            <div class="item_right">
              <p>{{ form.name }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>性別</p>
            </div>
            <div class="item_right">
              <p v-if="form.feature == 'M'">
                男
              </p>
              <p v-if="form.feature == 'F'">
                女
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>身分證字號/居留證號</p>
            </div>
            <div class="item_right">
              <p>{{ form.verifyId }}</p>
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
              <p>LINE ID</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.lineId)!==false?form.lineId: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>電子信箱</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.Email)!==false?form.Email: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>戶籍地址</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.city)!==false?form.city + form.dist + form.address : '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>緊急聯絡人</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.eContactName)!==false?form.eContactName: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>緊急聯絡人電話</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.eContactNum)!==false?form.eContactNum: '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>障礙類別</p>
            </div>
            <div class="item_right">
              <p v-if="form.hCategory.includes('1')">
                第一類
              </p>
              <p v-if="form.hCategory.includes('2')">
                第二類
              </p>
              <p v-if="form.hCategory.includes('3')">
                第三類
              </p>
              <p v-if="form.hCategory.includes('4')">
                第四類
              </p>
              <p v-if="form.hCategory.includes('5')">
                第五類
              </p>
              <p v-if="form.hCategory.includes('6')">
                第六類
              </p>
              <p v-if="form.hCategory.includes('7')">
                第七類
              </p>
              <p v-if="form.hCategory.includes('8')">
                第八類
              </p>
              <p v-if="form.hCategory.includes('0')">
                其他：{{ form.hCategoryNote }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>障礙等級</p>
            </div>
            <div class="item_right">
              <p v-if="form.hLevel == '1'">
                極重度
              </p>
              <p v-else-if="form.hLevel == '2'">
                重度
              </p>
              <p v-else-if="form.hLevel == '3'">
                中度
              </p>
              <p v-else-if="form.hLevel == '0'">
                {{ form.hLevelNote }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>聽語障者慣用語言</p>
            </div>
            <div class="item_right">
              <p class="usualCommText">
                <span v-if="form.usualComm.indexOf('1')!==-1">自然手語 <b>/</b></span>
                <span v-if="form.usualComm.indexOf('2')!==-1">手勢中文（文字手語）<b>/</b></span>
                <span v-if="form.usualComm.indexOf('3')!==-1">口手語並用 <b>/</b></span>
                <span v-if="form.usualComm.indexOf('4')!==-1">筆談 <b>/</b></span>
                <span v-if="form.usualComm.indexOf('5')!==-1">口語 <b>/</b></span>
                <span v-if="form.usualComm.indexOf('0')!==-1">{{ form.usualCommNote }}</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>身障效期</p>
            </div>
            <div class="item_right">
              <p>{{ closeDiv(form.expirydate)!==false?form.expirydate === '9999-12-31T00:00:00' ? '永久有效' : form.expirydate.substring(0, 10): '-' }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left" style="">
              <p>證明文件</p>
            </div>
            <div v-if="fileList.length!=0" class="item_right">
              <a v-for="item,index in fileList" :key="index" href="javascript:void(0);" @click="filemanager_downloadOne(item.id, item.oriFileName)">
                <p>
                  {{ item.oriFileName }}
                </p>
              </a>
            </div>
            <div v-else class="item_right">
              <p>-</p>
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

      <div class="individualDetails_element--btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/sysadmin/acctmanage' })">
          <p>返回</p>
        </el-button>
        <el-button class="TSLbutton red" @click="submitForm(oldData)">
          <p>儲存</p>
        </el-button>
      </div>
    </div>

    <el-dialog
      :visible.sync="defaultPopUps"
      :show-close="false"
      class="defaultPopUps"
      @close="refToTop"
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
      form: {
        name: '',
        feature: '',
        verifyId: '',
        telphone: '',
        cellphone: '',
        lineId: '',
        Email: '',
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
        remark: ''
      },
      fileList: [],
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
        vm.form.name = data.name
        vm.form.verifyId = data.verifyId
        vm.form.cellphone = data.cellphone
        vm.form.feature = data.feature
        vm.form.telphone = data.telphone
        vm.form.lineId = data.lineId
        vm.form.Email = data.email
        vm.form.city = data.city
        vm.form.dist = data.dist
        vm.form.address = data.address
        vm.form.eContactName = data.eContactName
        vm.form.eContactNum = data.eContactNum
        vm.form.hCategory = data.hCategory
        vm.form.hCategoryNote = data.hCategoryNote
        vm.form.hLevel = data.hLevel
        vm.form.hLevelNote = data.hLevelNote
        vm.form.usualComm = data.usualComm
        vm.form.usualCommNote = data.usualCommNote
        vm.form.expirydate = data.expirydate
        vm.form.remark = data.remark
        vm.form.isReal = data.isReal
        this.fileList = []
        if (data.files.length !== 0) {
          this.fileList = data.files
        }
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
        feature: oldData.feature,
        telphone: vm.closeDiv(oldData.telphone) !== false ? oldData.telphone : '',
        cellphone: oldData.cellphone,
        lineId: vm.closeDiv(oldData.lineId) !== false ? oldData.lineId : '',
        Email: oldData.email,
        city: vm.closeDiv(oldData.city) !== false ? oldData.city : '',
        dist: vm.closeDiv(oldData.dist) !== false ? oldData.dist : '',
        address: vm.closeDiv(oldData.address) !== false ? oldData.address : '',
        eContactName: vm.closeDiv(oldData.eContactName) !== false ? oldData.eContactName : '',
        eContactNum: vm.closeDiv(oldData.eContactNum) !== false ? oldData.eContactNum : '',
        hCategory: vm.closeDiv(oldData.hCategory) !== false ? oldData.hCategory : '',
        hCategoryNote: vm.closeDiv(oldData.hCategoryNote) !== false ? oldData.hCategoryNote : '',
        hLevel: vm.closeDiv(oldData.hLevel) !== false ? oldData.hLevel : '',
        hLevelNote: vm.closeDiv(oldData.hLevelNote) !== false ? oldData.hLevelNote : '',
        usualComm: vm.closeDiv(oldData.usualComm) !== false ? oldData.usualComm : '',
        usualCommNote: vm.closeDiv(oldData.usualCommNote) !== false ? oldData.usualCommNote : '',
        expirydate: vm.closeDiv(oldData.expirydate) !== false ? oldData.expirydate : '',
        password: '',
        files: '',
        remark: vm.closeDiv(oldData.remark) !== false ? oldData.remark : '',
        acctType: oldData.acctType,
        positionTitle: '',
        department: '',
        acctStatus: vm.acctStatus,
        isReal: oldData.isReal
      }
      const res = await frontendApi.handlang_acctEdit(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '處理狀態已更新。'
        this.defaultPopUps = true
        this.acctSelect()
      }
    },
    refToTop () {
      const element = document.querySelectorAll('#a_c')[0]
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}
</script>

<style lang="scss">
.individualDetails{
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
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          word-break: break-all;
          justify-content: center;
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
