<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="appealdetails">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/appeal">申訴管理</a> / <a href="/appeal/details?id=123">申訴明細</a>
    </span>

    <div id="content" class="appealdetails--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>申訴明細</h2>
    </div>

    <div class="appealdetails_element">
      <div v-if="acctType != '4' && acctType != '5'" class="appealstate">
        <p>
          處理狀態：
          <template v-if="form.reportStatus == '1'">
            待處理
          </template>
          <template v-if="form.reportStatus == '2'">
            處理中
          </template>
          <template v-if="form.reportStatus == '3'">
            已處理
          </template>
          <template v-if="form.reportStatus == '0'">
            取消申訴
          </template>
        </p>
        <el-button v-if="form.reportStatus == '1'" class="TSLbutton red" @click="cancelappeal">
          <p>取消申訴</p>
        </el-button>
      </div>
      <div v-else class="appealstate">
        <label for="reportStatus"><p>處理狀態：</p></label>
        <el-select v-model="form.reportStatus" placeholder="處理狀態" popper-class="defaultSelect">
          <el-option label="待處理" value="1" />
          <el-option label="處理中" value="2" />
          <el-option label="已處理" value="3" />
          <el-option label="取消申訴" value="0" />
        </el-select>
      </div>
      <div v-if="acctType == '4' || acctType == '5'" class="handlingContent">
        <label for="reportComment">
          <p>案件處理內容：</p>
        </label>
        <div class="handlingContent_content">
          <el-input
            id="reportComment"
            v-model="form.reportComment"
            type="textarea"
            :rows="4"
            placeholder="請輸入案件處理內容"
            resize="none"
            text="請輸入案件處理內容"
            name="reportComment"
          />
        </div>
      </div>
      <div class="appealContent">
        <p>明細內容：</p>
        <div class="appealContent_table">
          <div class="item">
            <div class="item_left">
              <p>案件編號</p>
            </div>
            <div class="item_right">
              <p>A-112-0701-01</p>
            </div>
          </div>
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
              <p>手機號碼</p>
            </div>
            <div class="item_right">
              <p>{{ form.phone }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>E-mail</p>
            </div>
            <div class="item_right">
              <p>{{ form.email }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>申訴種類</p>
            </div>
            <div class="item_right">
              <p v-if="form.reportType == '1'">
                行政窗口
              </p>
              <p v-if="form.reportType == '2'">
                服務人員
              </p>
              <p v-if="form.reportType == '3'">
                性騷申訴
              </p>
              <p v-if="form.reportType == '4'">
                系統功能
              </p>
              <p v-if="form.reportType == '5'">
                個人/單位申請者
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>回覆方式</p>
            </div>
            <div class="item_right">
              <p v-if="form.replyType == '1'">
                手機號碼
              </p>
              <p v-if="form.replyType == '2'">
                Email
              </p>
              <p v-if="form.replyType == '3'">
                Line
              </p>
              <p v-if="form.replyType == '0'">
                其他: {{ form.replyTypeNote }}
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>申訴內容</p>
            </div>
            <div class="item_right">
              <p>{{ form.reportContact }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>備註</p>
            </div>
            <div class="item_right">
              <p>{{ form.remark }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="appealdetails_element--btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/appeal' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="acctType == '4' || acctType == '5'" class="TSLbutton red" @click="submitForm()">
          <p>送出</p>
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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/appeal' })">
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
  data () {
    return {
      acctType: '',
      form: {
        reportgid: '',
        reportStatus: '',
        name: '',
        phone: '',
        verifyId: '',
        email: '',
        reportType: '',
        replyType: [],
        replyTypeNote: '',
        reportContact: '',
        reportComment: '',
        remark: ''
      },
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  mounted () {
    this.getForm()
    this.acctType = this.TSLform.acctType
  },
  methods: {
    getForm () {
      const vm = this
      const form = JSON.parse(sessionStorage.getItem('appealForm'))
      if (vm.closeDiv(form) !== false) {
        vm.form.reportgid = form.reportgid
        vm.form.name = form.personalInfo.name
        vm.form.phone = form.personalInfo.cellphone
        vm.form.email = form.personalInfo.email
        vm.form.verifyId = form.verifyId
        vm.form.reportType = form.reportType
        vm.form.reportStatus = form.reportStatus
        vm.form.replyType = form.replyType
        vm.form.replyTypeNote = form.replyTypeNote
        vm.form.reportContact = form.reportContact
        vm.form.reportComment = form.reportComment
        vm.form.remark = form.remark
      } else {
        this.$router.push({ path: '/appeal' })
      }
    },
    async cancelappeal () {
      const vm = this
      const form = Object.assign({}, vm.form)
      const obj = {
        reportgid: form.reportgid,
        reportType: form.reportType,
        reportStatus: '0',
        replyType: form.replyType,
        replyTypeNote: form.replyTypeNote,
        reportContact: form.reportContact,
        reportComment: form.reportComment,
        remark: form.remark
      }
      const res = await frontendApi.reportLogs_edit(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '取消申訴成功'
        vm.defaultId = 1
        vm.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    },
    async submitForm () {
      const vm = this
      const form = Object.assign({}, vm.form)
      const obj = {
        reportgid: form.reportgid,
        reportType: form.reportType,
        reportStatus: form.reportStatus,
        replyType: form.replyType,
        replyTypeNote: form.replyTypeNote,
        reportContact: form.reportContact,
        reportComment: form.reportComment,
        remark: form.remark
      }
      const res = await frontendApi.reportLogs_edit(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '處理狀態修改成功'
        vm.defaultId = 1
        vm.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    }
  }
}
</script>

<style lang="scss">
.appealdetails{
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
            font-size: clamp(min(1.125em), pc(20), max(1.250em));
          }
        }
        .el-select__caret{
          color: #ffffff;
          font-size: clamp(min(1.125em), pc(20), max(1.250em));
        }
      }
    }
    .handlingContent{
      margin-top: clamp(min(20px), pc(30), max(30px));
      &_content{
        margin-top: 10px;
      }
      .el-textarea__inner{
        border-radius: 10px;
        font-size: 1.111em;
        padding: 10px;
        border: 1px solid #545454;
        &::placeholder{
          font-size: 1.111em;
          color: $default;
          display: flex;
          align-items: center;
        }
        &:focus{
          outline: 3px dashed #990094;
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
        padding: 10px 10px;
        align-items: center;
        background: #ffffff;
        &:nth-child(even){
          background: #EFD1C9;
        }
        p{
          letter-spacing: 3px;
        }
        &_left{
          height: 100%;
          width: 100%;
          max-width: 420px;
          box-sizing: border-box;
          text-align: center;
        }
        &_right{
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
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
