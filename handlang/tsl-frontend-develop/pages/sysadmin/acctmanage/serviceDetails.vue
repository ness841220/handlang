<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="serviceDetails">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/acctmanage">系統管理-帳號管理</a> / <a href="/sysadmin/acctmanage/details?id=123">帳號明細</a>
    </span>

    <div id="content" class="serviceDetails--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>帳號明細</h2>
    </div>

    <div class="serviceDetails_element">
      <div class="appealstate">
        <label for="value">
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
              <p v-if="closeDiv(form.telphone)!=false">
                {{ form.telphone }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>手機號碼</p>
            </div>
            <div class="item_right">
              <p>{{ form.cellphone }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>電子信箱</p>
            </div>
            <div class="item_right">
              <p>{{ form.Email }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>戶籍地址</p>
            </div>
            <div class="item_right">
              <p>{{ form.city + form.dist +form.address }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>專業類別</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.pCategory)==false">
                -
              </p>
              <p v-else>
                <span v-if="form.pCategory.includes('1')==true">手語翻譯</span> <span v-if="form.pCategory.includes('2')==true">同步聽打</span>
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>遴聘等級</p>
            </div>
            <div class="item_right">
              <p v-if="form.pLevel.length <= 0">
                -
              </p>
              <template v-else>
                <p v-for="item,index in form.pLevel" :key="index">
                  <span v-if="item == 'HCLA'">手譯甲級</span>
                  <span v-if="item == 'HCLB'">手譯乙級</span>
                  <span v-if="item == 'HCLC'">手譯丙級</span>
                  <span v-if="item == 'LCLA'">聽打甲級</span>
                  <span v-if="item == 'LCLB'">聽打乙級</span>
                </p>
              </template>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>證照等級</p>
            </div>
            <div class="item_right">
              <p v-if="form.lisenceLevel.length <= 0">
                -
              </p>
              <template v-else>
                <p v-for="item,index in form.lisenceLevel" :key="index">
                  <span v-if="item == 'HCLB'">手譯乙證</span>
                  <span v-if="item == 'HCLC'">手譯丙證</span>
                  <span v-if="item == 'LC'">聽打</span>
                </p>
              </template>
            </div>
          </div>
          <div v-if="form.pCategory.includes('1')==true" class="item">
            <div class="item_left">
              <p>取得手譯證照日期</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.htcBeginDate)!=false">
                {{ form.htcBeginDate }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div v-if="form.pCategory.includes('2')==true" class="item">
            <div class="item_left">
              <p>取得聽打證照日期</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.ltcBeginDate)!=false">
                {{ form.ltcBeginDate }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>簽約到期日</p>
            </div>
            <div class="item_right">
              <p>{{ form.cantractExpaireDate }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>可提供服務時段</p>
            </div>
            <div class="item_right">
              <div class="itemTime">
                <p v-for="item in form.serviceDateTimes" :key="item.key">
                  {{ '星期' + item.title + ':' + item.timeName }}
                </p>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>匯款帳戶銀行</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.bankCode)!=false">
                {{ form.bankCode + form.bankName }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>匯款帳戶號碼</p>
            </div>
            <div class="item_right">
              <p v-if="closeDiv(form.accountNum)!=false">
                {{ form.accountNum }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>是否外部支援</p>
            </div>
            <div class="item_right">
              <p v-if="form.allowSupport == '是'">
                是
              </p>
              <p v-else-if="form.allowSupport == '否'">
                否
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>匯款帳戶封面</p>
            </div>
            <div v-if="bankfileList.length!=0" class="item_right">
              <a v-for="item,index in bankfileList" :key="index" href="javascript:void(0);" @click="filemanager_downloadOne(item.id, item.oriFileName)">
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
              <p>證照檔案</p>
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
              <p v-if="closeDiv(form.remark)!=false">
                {{ form.remark }}
              </p>
              <p v-else>
                -
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="serviceDetails_element--btn">
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
        verifyId: '',
        telphone: '',
        cellphone: '',
        Email: '',
        city: '',
        dist: '',
        address: '',
        pCategory: '',
        pLevel: '',
        lisenceLevel: '',
        hCategory: '',
        hCategoryNote: '',
        hLevel: '',
        hLevelNote: '',
        usualComm: '',
        usualCommNote: '',
        expirydate: '',
        remark: '',
        serviceDateTimes: []
      },
      bankfileList: [],
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
        vm.form.feature = data.feature
        vm.form.verifyId = data.verifyId
        vm.form.telphone = data.telphone
        vm.form.cellphone = data.cellphone
        vm.form.Email = data.email
        vm.form.city = data.city
        vm.form.dist = data.dist
        vm.form.address = data.address
        vm.form.pCategory = data.pCategory
        vm.form.cantractExpaireDate = vm.closeDiv(data.cantractExpaireDate) !== false ? vm.$moment(data.cantractExpaireDate).format('yyyy/MM/DD') : ''
        vm.form.htcBeginDate = vm.closeDiv(data.htcBeginDate) !== false ? vm.$moment(data.htcBeginDate).format('yyyy/MM/DD') : ''
        vm.form.ltcBeginDate = vm.closeDiv(data.ltcBeginDate) !== false ? vm.$moment(data.ltcBeginDate).format('yyyy/MM/DD') : ''
        vm.form.cantractExpaireDate = vm.closeDiv(data.cantractExpaireDate) !== false ? vm.$moment(data.cantractExpaireDate).format('yyyy/MM/DD') : ''
        if (vm.closeDiv(data.serviceTimePeriod) !== false) {
          vm.form.serviceDateTimes = JSON.parse(data.serviceTimePeriod)
          for (let i = 0; i < vm.form.serviceDateTimes.length; i++) {
            const item = vm.form.serviceDateTimes[i]
            item.timeName = item.time.join('/')
          }
        }
        vm.form.bankCode = data.bankCode
        vm.form.bankName = data.bankName
        vm.form.accountNum = data.accountNum
        vm.form.allowSupport = data.allowSupport
        vm.form.isReal = data.isReal
        vm.form.remark = data.remark
        this.bankfileList = []
        this.fileList = []
        if (data.files.length !== 0) {
          for (let i = 0; i < data.files.length; i++) {
            const item = data.files[i]
            if (item.category.trim() === '1') {
              this.bankfileList.push(item)
            } else if (item.category.trim() === '2') {
              this.fileList.push(item)
            }
          }
        }
        // vm.form.pLevel = data.pLevel
        vm.form.pLevel = vm.closeDiv(data.pLevel) !== false ? data.pLevel.split(',') : []
        vm.form.lisenceLevel = vm.closeDiv(data.lisenceLevel) !== false ? data.lisenceLevel.split(',') : []
        vm.acctStatusList.forEach((item) => {
          if (item.id === data.acctStatus) {
            vm.acctStatus = item.id
          }
        })
      }
    },
    async submitForm (oldData) {
      const vm = this
      const serviceDateTimes = JSON.stringify(oldData.serviceDateTimes)
      const obj = {
        verifyId: oldData.verifyId,
        feature: '',
        name: oldData.name,
        positionTitle: '',
        Email: oldData.email,
        telphone: oldData.telphone,
        cellphone: oldData.cellphone,
        password: '',
        department: '',
        acctType: oldData.acctType,
        lineId: '',
        city: oldData.city,
        dist: oldData.dist,
        address: oldData.address,
        eContactName: '',
        eContactNum: '',
        hCategory: '',
        hCategoryNote: '',
        hLevel: '',
        hLevelNote: '',
        usualComm: '',
        usualCommNote: '',
        expirydate: '',
        pCategory: oldData.pCategory,
        pLevel: oldData.pLevel,
        lisenceLevel: oldData.lisenceLevel,
        cantractExpaireDate: oldData.cantractExpaireDate,
        ltcBeginDate: oldData.ltcBeginDate,
        htcBeginDate: oldData.htcBeginDate,
        serviceTimePeriod: serviceDateTimes,
        bankCode: oldData.bankCode,
        bankName: oldData.bankName,
        accountNum: oldData.accountNum,
        allowSupport: oldData.allowSupport,
        acctStatus: vm.acctStatus,
        files: '',
        remark: oldData.remark,
        isReal: oldData.isReal
      }
      const res = await frontendApi.handlang_acctEdit(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '處理狀態已更新。'
        this.defaultPopUps = true
        this.acctSelect()
      }
    },
    async getByCity (city) {
      if (this.closeDiv(city) === false) {
        return
      }
      const res = await frontendApi.getByCity()
      if (res.isSuccess === true) {
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i]
          if (item.codeId === city) {
            return item.strVal
          }
        }
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
.serviceDetails{
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
        .itemTime{
          text-align: left;
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
