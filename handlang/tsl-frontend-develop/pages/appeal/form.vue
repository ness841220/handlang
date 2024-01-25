<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="appealform">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/appeal">申訴管理</a> / <a href="/appeal/form">服務申訴</a>
    </span>

    <div id="content" class="appealform--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>服務申訴</h2>
    </div>

    <el-form ref="form" :model="form" class="form">
      <div class="form_item">
        <el-form-item>
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" disabled />
        </el-form-item>
        <el-form-item>
          <label for="phone">手機號碼</label>
          <el-input id="phone" v-model="form.phone" name="phone" disabled />
        </el-form-item>
      </div>
      <el-form-item>
        <label for="email">電子信箱</label>
        <el-input id="email" v-model="form.email" name="email" disabled />
      </el-form-item>
      <el-form-item style="max-width: 600px;" :rules="[{ required: true, message: '請選擇申訴種類', trigger: 'change' }]">
        <label for="reportType">申訴種類<p>(必填)</p></label>
        <el-select v-model="form.reportType" placeholder="" popper-class="defaultSelect">
          <el-option v-if="acctType!= '3'" label="行政窗口" value="1" />
          <el-option v-if="acctType!= '3'" label="服務人員" value="2" />
          <el-option v-if="acctType!= '3'" label="性騷申訴" value="3" />
          <!-- <el-option v-if="acctType!= '3'" label="系統功能" value="4" /> -->
          <el-option v-if="acctType!= '1' && acctType!= '2'" label="個人/單位申請者" value="5" />
        </el-select>
      </el-form-item>
      <el-form-item class="form_radio" :rules="[{ type: 'array', required: true, message: '請選擇回覆方式', trigger: 'change' }]">
        <label>回覆方式<p>(必填)</p></label>
        <el-checkbox-group v-model="form.replyType" @change="bindCheckBox(form.replyType)">
          <el-checkbox label="1">
            手機號碼
          </el-checkbox>
          <el-checkbox label="2">
            Email
          </el-checkbox>
          <el-checkbox label="3">
            Line
          </el-checkbox>
          <el-checkbox label="0">
            <label>其他</label>
            <el-input v-model="form.replyTypeNote" :disabled="form.replyType[0]!='0'?true:false" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <label for="reportContact">申訴內容</label>
        <el-input
          id="reportContact"
          v-model="form.reportContact"
          name="reportContact"
          type="textarea"
          :rows="3"
          placeholder="請輸入申訴內容"
          resize="none"
        />
      </el-form-item>
      <el-form-item>
        <label for="remark">備註</label>
        <el-input
          id="remark"
          v-model="form.remark"
          name="remark"
          type="textarea"
          :rows="3"
          placeholder="我是備註"
          resize="none"
        />
      </el-form-item>

      <div class="appealform_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/appeal' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="!editAcct" class="TSLbutton red" @click="submitForm('form',form)">
          <p>送出</p>
        </el-button>
        <el-button v-else class="TSLbutton red" @click="submitEditForm('form',form)">
          <p>儲存</p>
        </el-button>
      </div>
    </el-form>

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
      editAcct: false,
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
        vm.editAcct = true
        vm.form.reportgid = form.reportgid
        vm.form.name = form.personalInfo.name
        vm.form.phone = form.personalInfo.cellphone
        vm.form.email = form.personalInfo.email
        vm.form.verifyId = form.verifyId
        vm.form.reportType = form.reportType
        vm.form.reportStatus = form.reportStatus
        vm.form.replyType = vm.closeDiv(form.replyType) !== false ? form.replyType.split() : []
        vm.form.replyTypeNote = form.replyTypeNote
        vm.form.reportContact = form.reportContact
        vm.form.reportComment = form.reportComment
        vm.form.remark = form.remark
      } else {
        vm.editAcct = false
        this.handlang_acctInfo()
      }
    },
    async handlang_acctInfo () {
      const vm = this
      let token = null
      token = localStorage.getItem('TSLtoken')
      const obj = {
        token
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.form.name = data.name
        vm.form.phone = data.cellphone
        vm.form.verifyId = data.verifyId
        vm.form.email = data.email
      }
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            verifyId: form.verifyId,
            reportType: form.reportType,
            replyType: form.replyType.length !== 0 ? form.replyType.join() : '',
            replyTypeNote: form.replyTypeNote,
            reportContact: form.reportContact,
            reportComment: form.reportComment,
            remark: form.remark
          }
          const res = await frontendApi.reportLogs_create(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '申訴已成立，待行政人員處理。'
            vm.defaultId = 1
            vm.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            vm.defaultPopUps = true
          }
        } else {
          vm.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    submitEditForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            reportgid: form.reportgid,
            reportType: form.reportType,
            reportStatus: form.reportStatus,
            replyType: form.replyType.length !== 0 ? form.replyType.join() : '',
            replyTypeNote: form.replyTypeNote,
            reportContact: form.reportContact,
            reportComment: form.reportComment,
            remark: form.remark
          }
          const res = await frontendApi.reportLogs_edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '申訴修改成功。'
            vm.defaultId = 1
            vm.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            vm.defaultPopUps = true
          }
        } else {
          vm.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    bindCheckBox (val) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
      if (val.includes('0') !== true) {
        this.form.replyTypeNote = ''
      }
    }
  }
}
</script>

<style lang="scss">
.appealform{
  &--title{
    height: 50px;
    display: flex;
    align-items: center;
    color: $red;
    background: #FFF9F9;
    padding: 0 clamp(min(22px), pc(36), max(36px));
    margin-top: clamp(min(20px), pc(40), max(40px));
    margin-bottom: clamp(min(20px), pc(48), max(48px));
    box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
    img{
      width: 20px;
      height: 33px;
      margin-right: 10px;
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
}
</style>
