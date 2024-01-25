<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="satisfactionForm">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/caseInquiry">案件查詢</a> / <a href="/caseInquiry/satisfactionForm">{{ titleName }}服務滿意度調查表</a>
    </span>

    <div id="content" class="satisfactionForm--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>{{ titleName }}服務滿意度調查表</h2>
    </div>

    <el-form ref="form" :model="form" :rules="rules" class="form">
      <el-form-item style="width: 49%;">
        <label id="caseNum">案件號碼 <p>(必填)</p></label>
        <el-input id="caseNum" v-model="form.caseNum" name="caseNum" disabled />
      </el-form-item>
      <div class="form_item">
        <el-form-item>
          <label for="name">申請者/單位名稱<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name disabled />
        </el-form-item>
        <el-form-item>
          <label for="serviceLogs">服務人員姓名<p>(必填)</p></label>
          <el-input id="serviceLogs" v-model="serviceLogs" name="serviceLogs" disabled />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label>申請服務時間<p>(必填)</p></label>
          <el-form-item class="severTime">
            <el-input v-model="form.beginDate" disabled />
            <p>至</p>
            <el-input v-model="form.endDate" disabled />
          </el-form-item>
        </el-form-item>
      </div>
      <div class="form_item time">
        <el-form-item>
          <div class="timeName">
            <label id="realBeginDatetime">實際服務時間<p>(必填)</p></label>
            <el-checkbox v-model="realTime" @change="realSameTime(realTime)">
              同申請服務時間
            </el-checkbox>
          </div>
          <div class="realSeverTime">
            <el-form-item prop="realBeginDatetime" :rules="[{ required: true, message: '請輸入日期', trigger: 'blur' }]">
              <el-date-picker
                id="realBeginDatetime"
                v-model="form.realBeginDatetime"
                type="datetime"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
                name="realBeginDatetime"
                :clearable="false"
              />
            </el-form-item>
            <p>至</p>
            <el-form-item prop="realEndDatetime" :rules="[{ required: true, message: '請輸入日期', trigger: 'blur' }]">
              <el-date-picker
                id="realBeginDatetime"
                v-model="form.realEndDatetime"
                type="datetime"
                placeholder="yyyy/MM/dd HH:mm"
                value-format="yyyy/MM/dd HH:mm"
                format="yyyy/MM/dd HH:mm"
                :clearable="false"
                name="realBeginDatetime"
              />
            </el-form-item>
          </div>
        </el-form-item>
      </div>
      <el-form-item class="play" style="max-width: 590px;">
        <label for="isPaySelf">本次服務有自行支付任何費用嗎（金額）<p>(必填)</p></label>
        <div class="play_input">
          <el-form-item class="select" prop="isPaySelf">
            <el-select id="isPaySelf" v-model="form.isPaySelf" placeholder="" name="isPaySelf">
              <el-option label="是" value="Y" />
              <el-option label="否" value="N" />
            </el-select>
          </el-form-item>
          <el-form-item prop="amount">
            <el-input id="isPaySelf" v-model="form.amount" name="isPaySelf" :maxlength="10" />
          </el-form-item>
        </div>
      </el-form-item>
      <div class="form_item radio">
        <label for="Step1Q1">是否清楚本申請需於服務前五日(不含例假日)提出</label>
        <el-form-item>
          <el-radio-group id="Step1Q1" v-model="form.Step1Q1" name="Step1Q1">
            <el-radio label="Y">
              是
            </el-radio>
            <el-radio label="N">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="form_item radio">
        <label id="Step1Q2">同步聽打員到場時間是否準時？</label>
        <el-form-item>
          <el-radio-group v-model="form.Step1Q2">
            <el-radio label="Y">
              是
            </el-radio>
            <el-radio label="N">
              否
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item class="form_checkbox">
        <label for="Step1Q3_1">從何處得知本會提供新北市手語翻譯申請服務?</label>
        <el-checkbox-group v-model="form.Step1Q3_1" @change="bindCheckBox(form.Step1Q3_1)">
          <div class="top">
            <el-checkbox :label="1">
              社會局公文
            </el-checkbox>
            <el-checkbox :label="2">
              朋友、同事
            </el-checkbox>
            <el-checkbox :label="3" style="flex-grow: 2; margin-right: 0;" class="societies">
              <label>聽障相關社團</label>
              <el-input v-model="form.Step1Q3_1group" :disabled="form.Step1Q3_1[0]!=3?true:false" />
            </el-checkbox>
          </div>
          <el-checkbox :label="4" class="ph">
            <label>網站</label>
            <el-input v-model="form.Step1Q3_1WebUrl" :disabled="form.Step1Q3_1[0]!=4?true:false" />
          </el-checkbox>
          <el-checkbox :label="0" class="ph">
            <label>其他</label>
            <el-input v-model="form.Step1Q3_1Note" :disabled="form.Step1Q3_1[0]!=0?true:false" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <p class="mark">
        滿意度調查
      </p>
      <p class="mark">
        【行政滿意度】
      </p>
      <el-form-item class="form_rate">
        <p>1.申請流程簡單方便?</p>
        <el-rate v-model="form.Step2Q1" />
      </el-form-item>
      <el-form-item class="form_rate">
        <p>2.行政人員服務態度?</p>
        <el-rate v-model="form.Step2Q2" />
      </el-form-item>
      <p class="mark">
        【同步聽打員滿意度】
      </p>
      <el-form-item class="form_rate">
        <p v-if="form.applyType == '2'">
          1.本次聽打員的聽打內容是否清楚流暢?
        </p>
        <p v-else>
          1.本次翻譯員的手語看得懂嗎?
        </p>
        <el-rate v-model="form.Step3Q1" />
      </el-form-item>
      <el-form-item class="form_rate">
        <p v-if="form.applyType == '2'">
          2.本次聽打的投影幕(或筆電)相對位置，看得清楚嗎?
        </p>
        <p v-else>
          2.本次翻譯員的翻譯位置(站或坐)，手語看得清楚嗎?
        </p>
        <el-rate v-model="form.Step3Q2" />
      </el-form-item>
      <el-form-item class="form_rate">
        <p v-if="form.applyType == '2'">
          3.本次聽打字幕的對比色彩及字體大小，看得清楚嗎?
        </p>
        <p v-else>
          3.本次翻譯員的衣著，手語看得清楚嗎?
        </p>
        <el-rate v-model="form.Step3Q3" />
      </el-form-item>
      <el-form-item class="form_rate">
        <p v-if="form.applyType == '2'">
          4.本次聽打員的服務態度，您滿意嗎?
        </p>
        <p v-else>
          4.本次翻譯員的服務態度，您滿意嗎?
        </p>
        <el-rate v-model="form.Step3Q4" />
      </el-form-item>
      <el-form-item>
        <label for="remark">【其他意見-鼓勵或建議】</label>
        <el-input
          id="remark"
          v-model="form.remark"
          type="textarea"
          :rows="4"
          placeholder="我是備註"
          resize="none"
          name="remark"
        />
      </el-form-item>

      <div class="satisfactionForm_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/caseInquiry' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="!editForm" class="TSLbutton red" @click="submitForm('form',form)">
          <p>送出</p>
        </el-button>
        <el-button v-else class="TSLbutton red" @click="submitEditForm('form',form)">
          <p>修改</p>
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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/caseInquiry' })">
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
    const isPaySelf = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此欄位為必填'))
      } else {
        callback()
      }
    }
    const amount = (rule, value, callback) => {
      if (value === '' && this.form.isPaySelf === 'Y') {
        callback(new Error('需填寫金額'))
      } else {
        callback()
      }
    }
    return {
      editForm: false,
      realTime: false,
      titleName: '同步聽打',
      serviceLogs: '',
      form: {
        gid: '',
        applygid: '',
        name: '',
        caseNum: '',
        beginDate: '',
        endDate: '',
        applyType: '',
        realBeginDatetime: '',
        realEndDatetime: '',
        isPaySelf: '',
        amount: '',
        Step1Q1: '',
        Step1Q2: '',
        Step1Q3_1: [],
        Step1Q3_1group: '',
        Step1Q3_1WebUrl: '',
        Step1Q3_1Note: '',
        Step2Q1: 5,
        Step2Q2: 5,
        Step3Q1: 5,
        Step3Q2: 5,
        Step3Q3: 5,
        Step3Q4: 5,
        remark: ''
      },
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      rules: {
        isPaySelf: [{ validator: isPaySelf, trigger: ['blur', 'change'] }],
        amount: [{ validator: amount, trigger: ['blur', 'change'] }]
      }
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-案件查詢-滿意度調查表'
  },
  mounted () {
    this.getForm()
  },
  methods: {
    getForm () {
      const vm = this
      const form = JSON.parse(sessionStorage.getItem('clientsRespons'))
      vm.clientsRespons_select(form)
    },
    async clientsRespons_select (form) {
      const vm = this
      const obj = {
        gid: form.applygid
      }
      const res = await frontendApi.clientsRespons_select(obj)
      // eslint-disable-next-line no-mixed-operators
      if (res.isSuccess === true) {
        vm.form.gid = form.gid
        vm.form.caseNum = form.caseNum
        vm.form.name = form.applyName
        vm.form.beginDate = form.beginDate
        vm.form.endDate = form.endDate
        vm.form.applyType = form.applyType
        vm.titleName = (form.applyType) === '1' ? '手語翻譯' : '同步聽打'
        const arr = []
        for (let i = 0; i < form.serviceLogs.length; i++) {
          const item = form.serviceLogs[i]
          arr.push(item.name)
        }
        vm.serviceLogs = arr.join(',')
        if (vm.closeDiv(res.data) !== false) {
          const data = res.data
          vm.editForm = true
          vm.form.gid = data.gid
          vm.form.applygid = data.applygid
          vm.form.realBeginDatetime = vm.$moment(data.realBeginDatetime).format('yyyy/MM/DD HH:mm')
          vm.form.realEndDatetime = vm.$moment(data.realEndDatetime).format('yyyy/MM/DD HH:mm')
          vm.form.isPaySelf = data.isPaySelf
          vm.form.amount = data.amount
          vm.form.Step1Q1 = data.step1Q1
          vm.form.Step1Q2 = data.step1Q2
          vm.form.Step1Q3_1 = vm.closeDiv(data.step1Q3_1) !== false ? data.step1Q3_1.split().map(Number) : []
          vm.form.Step1Q3_1group = data.step1Q3_1group
          vm.form.Step1Q3_1WebUrl = data.step1Q3_1WebUrl
          vm.form.Step1Q3_1Note = data.step1Q3_1Note
          vm.form.Step2Q1 = vm.closeDiv(data.step2Q1) !== false ? Number(data.step2Q1) : null
          vm.form.Step2Q2 = vm.closeDiv(data.step2Q2) !== false ? Number(data.step2Q2) : null
          vm.form.Step3Q1 = vm.closeDiv(data.step3Q1) !== false ? Number(data.step3Q1) : null
          vm.form.Step3Q2 = vm.closeDiv(data.step3Q2) !== false ? Number(data.step3Q2) : null
          vm.form.Step3Q3 = vm.closeDiv(data.step3Q3) !== false ? Number(data.step3Q3) : null
          vm.form.Step3Q4 = vm.closeDiv(data.step3Q4) !== false ? Number(data.step3Q4) : null
          vm.form.remark = data.remark
        } else {
          vm.editForm = false
          vm.form.applygid = form.applygid
        }
      } else { return false }
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      vm.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            gid: '',
            applygid: form.gid,
            applyType: form.applyType,
            realBeginDatetime: form.realBeginDatetime,
            realEndDatetime: form.realEndDatetime,
            isPaySelf: form.isPaySelf,
            amount: form.amount,
            Step1Q1: form.Step1Q1,
            Step1Q2: form.Step1Q2,
            Step1Q3_1: form.Step1Q3_1.length !== 0 ? form.Step1Q3_1.join() : '',
            Step1Q3_1group: form.Step1Q3_1group,
            Step1Q3_1WebUrl: form.Step1Q3_1WebUrl,
            Step1Q3_1Note: form.Step1Q3_1Note,
            Step2Q1: vm.closeDiv(form.Step2Q1) !== false ? form.Step2Q1.toString() : '',
            Step2Q2: vm.closeDiv(form.Step2Q2) !== false ? form.Step2Q2.toString() : '',
            Step3Q1: vm.closeDiv(form.Step3Q1) !== false ? form.Step3Q1.toString() : '',
            Step3Q2: vm.closeDiv(form.Step3Q2) !== false ? form.Step3Q2.toString() : '',
            Step3Q3: vm.closeDiv(form.Step3Q3) !== false ? form.Step3Q3.toString() : '',
            Step3Q4: vm.closeDiv(form.Step3Q4) !== false ? form.Step3Q4.toString() : '',
            remark: form.remark
          }
          const res = await frontendApi.clientsRespons_Add(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '滿意度調查表送出成功'
            vm.defaultId = 1
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
            gid: form.gid,
            applygid: form.applygid,
            applyType: form.applyType,
            realBeginDatetime: form.realBeginDatetime,
            realEndDatetime: form.realEndDatetime,
            isPaySelf: form.isPaySelf,
            amount: form.amount,
            Step1Q1: form.Step1Q1,
            Step1Q2: form.Step1Q2,
            Step1Q3_1: form.Step1Q3_1.length !== 0 ? form.Step1Q3_1.join() : '',
            Step1Q3_1group: form.Step1Q3_1group,
            Step1Q3_1WebUrl: form.Step1Q3_1WebUrl,
            Step1Q3_1Note: form.Step1Q3_1Note,
            Step2Q1: vm.closeDiv(form.Step2Q1) !== false ? form.Step2Q1.toString() : '',
            Step2Q2: vm.closeDiv(form.Step2Q2) !== false ? form.Step2Q2.toString() : '',
            Step3Q1: vm.closeDiv(form.Step3Q1) !== false ? form.Step3Q1.toString() : '',
            Step3Q2: vm.closeDiv(form.Step3Q2) !== false ? form.Step3Q2.toString() : '',
            Step3Q3: vm.closeDiv(form.Step3Q3) !== false ? form.Step3Q3.toString() : '',
            Step3Q4: vm.closeDiv(form.Step3Q4) !== false ? form.Step3Q4.toString() : '',
            remark: form.remark
          }
          const res = await frontendApi.clientsRespons_Edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '滿意度調查表編輯成功'
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
    realSameTime (realTime) {
      const vm = this
      if (realTime === true) {
        vm.form.realBeginDatetime = vm.form.beginDate
        vm.form.realEndDatetime = vm.form.endDate
      } else {
        vm.form.realBeginDatetime = ''
        vm.form.realEndDatetime = ''
      }
    },
    bindCheckBox (val) {
      const vm = this
      if (val.length > 1) {
        val.splice(0, 1)
      }
      if (val[0] === 3) {
        vm.form.Step1Q3_1WebUrl = ''
        vm.form.Step1Q3_1Note = ''
      } else if (val[0] === 4) {
        vm.form.Step1Q3_1group = ''
        vm.form.Step1Q3_1Note = ''
      } else if (val[0] === 0) {
        vm.form.Step1Q3_1group = ''
        vm.form.Step1Q3_1WebUrl = ''
      } else {
        vm.form.Step1Q3_1group = ''
        vm.form.Step1Q3_1WebUrl = ''
        vm.form.Step1Q3_1Note = ''
      }
    }
  }
}
</script>

<style lang="scss">
.el-picker-panel{
  &__content{
    font-size: 100%;
  }
  &__footer{
    font-size: 100%;
  }
  .el-button--mini{
    font-size: 100%;
  }
  .el-time-panel__btn{
    font-size: 90%;
  }
  .el-time-spinner__item{
    font-size: 90%;
  }
  .el-time-panel__content{
    font-size: 100%;
  }
}
.satisfactionForm{
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

  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }

  .form_item.time{
    .el-checkbox{
      margin: 0;
      margin-left: 10px;
      margin-bottom: 10px;
      &__label{
        display: flex;
        color: $default;
        line-height: 25px;
        font-size: 100%;
      }
      &__input{
        width: 25px;
        height: 25px;
      }
      &__inner{
        width: 25px;
        height: 25px;
        border-radius: 5px;
        border: 1px solid #545454;
        &::after{
          top: 4px;
          height: 10px;
          left: 8px;
          width: 5px;
          border: 2px solid $default;
          border-left: 0;
          border-top: 0;
        }
      }
      &__input.is-focus{
        .el-checkbox__inner{
          background: #EFD1C9;
          outline: 3px dashed #990094;
        }
      }
      &__input.is-checked{
        .el-checkbox__inner{
          background: #EFD1C9;
        }
      }
    }
    .timeName{
      display: flex;
      align-items: center;
    }
    @include phSize{
      .timeName{
        align-items: flex-start;
        flex-direction: column;
      }
      .el-form-item__content{
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
  .el-form-item.severTime{
    margin-top: 0;
    .el-form-item__content{
      display: flex;
      align-items: center;
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
      p{
        margin: 0 10px;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
        @include phSize{
          margin: 10px 0;
        }
      }
    }
  }
  .form_item{
    .realSeverTime{
      display: flex;
      align-items: center;
      .el-form-item{
        margin: 0;
      }
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
      .el-form-item__content{
        display: flex;
        align-items: center;
        @include phSize{
          align-items: flex-start;
        }
      }
      p{
        margin: 0 10px;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
        @include phSize{
          margin: 10px 0;
        }
      }
      .el-input__suffix{
        display: none;
      }
    }
  }

  .el-form-item.play{
    .play_input{
      display: flex;
      align-items: center;
      @include phSize{
        align-items: flex-start;
        flex-direction: column;
      }
      .el-form-item{
        margin-top: 0;
      }
      .select{
        max-width: 230px;
        margin-right: 20px;
        @include phSize{
          margin-bottom: 20px;
          margin-right: 0;
        }
      }
    }
  }

  .form_rate{
    .el-rate{
      height: auto;
      margin-left: 10px;
      @include phSize{
        margin-left: 0;
        margin-top: 10px;
      }
    }
    p{
      font-size: 100%;
      letter-spacing: 3px;
      font-size: clamp(min(1.286em), pc(20), max(1.429em));
    }
    .el-rate__item{
      font-size: 100%;
    }
    .el-rate__icon{
      font-size: 2.143em;
    }
    .el-form-item__content{
      display: flex;
      align-items: center;
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
