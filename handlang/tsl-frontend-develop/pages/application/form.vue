<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="applicationform">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/application" title="服務申請">服務申請</a> / <nuxt-link :to="'/application/form?lang=' + $route.query.lang" :title="title + '服務申請'">{{ title }}服務申請</nuxt-link>
    </span>

    <div id="content" class="applicationform--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>{{ title }}服務申請</h2>
    </div>

    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div class="form_item sone">
        <el-form-item v-if="TSLform.acctType == 4 || TSLform.acctType == 5">
          <label for="assistName">協助申請者身分<p>(必填)</p></label>
          <el-input id="assistName" v-model="form.assistName" name="assistName" disabled placeholder="系統帶入" />
        </el-form-item>
      </div>
      <div v-if="TSLform.acctType == 4 || TSLform.acctType == 5" class="form_item">
        <el-form-item prop="acctType" :rules="[{ required: true, message: '請選擇協助申請人名稱', trigger: 'change' }]">
          <label for="acctType">申請者身分<p>(必填)</p></label>
          <el-select
            id="acctType"
            v-model="form.acctType"
            name="acctType"
            placeholder=""
            popper-class="defaultSelect"
            @change="acctSelect"
          >
            <el-option label="個人" value="1" />
            <el-option label="單位" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item prop="acctName" :rules="[{ required: true, message: '請選擇協助申請人名稱', trigger: 'change' }]">
          <label for="acctName">申請者姓名<p>(必填)</p></label>
          <el-select
            id="acctName"
            v-model="form.acctName"
            name="acctName"
            placeholder=""
            popper-class="defaultSelect"
            filterable
            no-data-text="請先選擇申請者身分"
            @change="getacctItem"
          >
            <el-option v-for="item,index in assistList" :key="index" :label="item.name" :value="item.name" />
          </el-select>
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="identity">申請者身分<p>(必填)</p></label>
          <el-input id="identity" v-model="form.identity" name="identity" disabled placeholder="系統帶入" />
        </el-form-item>
        <el-form-item>
          <label for="name">姓名<p>(必填)</p></label>
          <el-input id="name" v-model="form.name" name="name" disabled placeholder="系統帶入" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label v-if="userAcctType !== '2'" id="verifyId">身分證字號/居留證號<p>(必填)</p></label>
          <label v-else id="verifyId">個人帳號<p>(必填)</p></label>
          <el-input id="verifyId" v-model="form.verifyId" name="verifyId" disabled placeholder="系統帶入" />
        </el-form-item>
        <el-form-item>
          <label for="email">E-mail</label>
          <el-input id="email" v-model="form.email" name="email" disabled placeholder="系統帶入" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="telphone">電話號碼</label>
          <el-input id="telphone" v-model="form.telphone" name="telphone" disabled placeholder="系統帶入" />
        </el-form-item>
        <el-form-item>
          <label for="cellphone">手機號碼</label>
          <el-input id="cellphone" v-model="form.cellphone" name="cellphone" disabled placeholder="系統帶入" />
        </el-form-item>
      </div>
      <p class="mark">
        本服務請於服務時間5天前提出申請(警政、醫療等緊急案件，不受5天前提出規定限制，請電聯本中心或加LINE ID：0963047746)
      </p>

      <div class="form_item time">
        <el-form-item prop="beginDate" class="severTime">
          <div class="timeName">
            <label for="beginDate">申請服務時間<p>(必填)</p></label>
            <p v-if="TSLform.acctType != 2 || TSLform.acctType == 2 && form.caseType === 'CC01'">
              扣除休息時間，本次申請時數共計 {{ applyTime }} 小時
            </p>
          </div>
          <div class="timeItme">
            <el-form-item prop="beginDate" style="margin-top: 0;margin-right: 5px;">
              <el-date-picker
                v-model="form.beginDate"
                type="date"
                :clearable="false"
                placeholder="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                @change="convertTime"
              />
            </el-form-item>
            <el-form-item prop="beginTime" style="margin-top: 0;margin-right: 5px;">
              <el-time-picker
                v-model="form.beginTime"
                arrow-control
                size="large"
                format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="開始時間"
                @change="convertTime"
              />
            </el-form-item>
            <p>至</p>
            <el-form-item prop="endDate" style="margin-top: 0;margin-right: 5px;">
              <el-date-picker
                v-model="form.endDate"
                type="date"
                :clearable="false"
                placeholder="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                format="yyyy/MM/dd"
                @change="convertTime"
              />
            </el-form-item>
            <el-form-item prop="endTime" style="margin-top: 0;margin-right: 5px;">
              <el-time-picker
                v-model="form.endTime"
                arrow-control
                size="large"
                format="HH:mm"
                :picker-options="{
                  selectableRange: '00:00:00 - 23:59:59'
                }"
                placeholder="結束時間"
                @change="convertTime"
              />
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item class="hrTime" prop="breakTime">
          <label for="breakTime">休息時間</label>
          <div class="hrTime_hr">
            <el-select id="breakTime" v-model="form.breakHour" name="breakHour" placeholder="" @change="convertBreakTime">
              <el-option v-for="(item,index) in 24" :key="index" :label="index" :value="index" />
            </el-select>
            <p style="margin-right: 5px;">
              時
            </p>
            <el-select id="breakTime" v-model="form.breakMinute" name="breakMinute" placeholder="" @change="convertBreakTime">
              <el-option v-for="(item,index) in 60" :key="index" :label="index" :value="index" />
            </el-select>
            <p>分</p>
          </div>
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="caseType">案件類別</label>
          <el-select
            id="caseType"
            v-model="form.caseType"
            name="caseType"
            placeholder="請選擇"
            popper-class="defaultSelect"
            @change="totalHoursPopUps(form.caseType)"
          >
            <el-option v-for="item,index in caseTypeList" :key="index" :label="item.strVal" :value="item.codeId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <label for="applyNote">服務事由</label>
          <el-input id="applyNote" v-model="form.applyNote" name="applyNote" placeholder="範例：胃腸肝膽科(2診，王小明醫生，3號)" />
        </el-form-item>
      </div>
      <div v-if="form.caseType === 'CC01'" class="applicationform_ex">
        每年最高補助使用 <span>{{ totalHours }}</span> 小時，已使用時數 <span>{{ useHours }}</span> 小時，剩餘可補助時數為 <span>{{ leastHours }}</span> 小時，若剩餘時數不足時需請您自行付費。
      </div>
      <el-form-item>
        <label for="location"><div>服務地點<span style="color: #0048C2;">（如：台大醫院腸胃科、教室A102）</span></div></label>
        <el-input id="location" v-model="form.location" name="location" placeholder="範例：台北長庚醫院 4樓後棟" />
      </el-form-item>
      <p class="mark">
        服務地址
      </p>
      <div class="form_item address">
        <div class="address_top">
          <el-form-item>
            <label for="city">縣市</label>
            <el-select
              id="city"
              v-model="form.city"
              name="city"
              placeholder="請選擇"
              popper-class="defaultSelect"
              @change="getByType(form.city);form.dist = ''"
            >
              <el-option v-for="item,index in cityData" :key="index" :label="item.strVal" :value="item.strVal" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <label for="dist">區</label>
            <el-select id="dist" v-model="form.dist" name="dist" placeholder="請先選擇縣市" popper-class="defaultSelect">
              <el-option v-for="item,index in genderData" :key="index" :label="item.strVal" :value="item.strVal" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <label for="address">地址</label>
          <el-input id="address" v-model="form.address" name="address" />
        </el-form-item>
      </div>
      <el-form-item>
        <label for="liveUrl">視訊網址</label>
        <el-input id="liveUrl" v-model="form.liveUrl" name="liveUrl" />
      </el-form-item>
      <el-form-item class="form_radio">
        <label for="usualComm">聽語障者慣用語言(可複選)</label>
        <el-checkbox-group id="usualComm" v-model="form.usualComm" name="usualComm">
          <el-checkbox :label="1">
            自然手語
          </el-checkbox>
          <el-checkbox :label="2">
            手勢中文（文字手語）
          </el-checkbox>
          <el-checkbox :label="3">
            口手語並用
          </el-checkbox>
          <el-checkbox :label="4">
            筆談
          </el-checkbox>
          <el-checkbox :label="5">
            口語
          </el-checkbox>
          <el-checkbox :label="0">
            <label>其他</label>
            <el-input v-model="form.usualCommNote" :disabled="form.usualComm.indexOf(0)==-1?true:false" placeholder="選擇即可填寫" />
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div class="form_item">
        <el-form-item>
          <label for="totlePerson">現場總人數</label>
          <el-input id="totlePerson" v-model="form.totlePerson" name="totlePerson" :maxlength="10" />
        </el-form-item>
        <el-form-item>
          <label for="damagePerson">聽語障者人數</label>
          <el-input id="damagePerson" v-model="form.damagePerson" name="damagePerson" :maxlength="10" />
        </el-form-item>
      </div>
      <el-form-item style="max-width:600px;">
        <label for="participantsNote">人數說明</label>
        <el-input id="participantsNote" v-model="form.participantsNote" name="participantsNote" :maxlength="10" />
      </el-form-item>
      <el-form-item class="form_radio contact ">
        <label for="participantsContact">現場聯絡方式</label>
        <el-checkbox-group v-model="participantsContact" @change="bindCheckBox(participantsContact, 0)">
          <el-checkbox label="1">
            同申請人
          </el-checkbox>
          <el-checkbox label="2">
            同現場聯絡人
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <div v-if="participantsContact == '2'" class="form_item">
        <el-form-item class="havecheckbox">
          <div class="title">
            <label for="contactName">現場聯絡人姓名</label>
            <el-checkbox-group v-model="checkEContactName" @change="changeEName(checkEContactName)">
              <el-checkbox :label="true">
                同緊急聯絡人
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <el-input id="contactName" v-model="form.contactName" name="contactName" />
        </el-form-item>
        <el-form-item>
          <label for="contactRelation">現場聯絡人關係/職稱</label>
          <el-input id="contactRelation" v-model="form.contactRelation" name="contactRelation" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item v-if="participantsContact == '2'" prop="contactNumber">
          <label for="contactNumber">現場聯絡人手機</label>
          <el-input id="contactNumber" v-model="form.contactNumber" name="contactNumber" />
        </el-form-item>
        <el-form-item style="max-width: 600px;">
          <label for="applierPrice">申請者預計負擔費用</label>
          <el-input id="applierPrice" v-model="form.applierPrice" name="applierPrice" :maxlength="10" />
        </el-form-item>
      </div>
      <p v-if="!langtsl" class="mark">
        空間設備
      </p>
      <div v-if="!langtsl" class="loptop">
        <el-form-item class="form_radio">
          <label for="loptop">1.筆記型電腦</label>
          <el-checkbox-group v-model="form.loptop" @change="bindCheckBox(form.loptop,0)">
            <el-checkbox :label="1">
              場地自備
            </el-checkbox>
            <el-checkbox :label="2">
              請聽打員自備
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <p v-if="!langtsl" class="loptop_text">
        2. 3位聽障者（含）以上活動，場地須自備
      </p>
      <div v-if="!langtsl" class="loptop">
        <el-form-item class="form_radio">
          <label for="projector">(1) 投影機</label>
          <el-checkbox-group v-model="form.projector" @change="bindCheckBox(form.projector,0)">
            <el-checkbox :label="1">
              可移動式
            </el-checkbox>
            <el-checkbox :label="2">
              固定式
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="form_radio">
          <label for="projectorScreen">(2) 投影幕</label>
          <el-checkbox-group v-model="form.projectorScreen" @change="bindCheckBox(form.projectorScreen,1)">
            <el-checkbox :label="1">
              投影/電子布幕
            </el-checkbox>
            <el-checkbox :label="2">
              液晶電視/螢幕
            </el-checkbox>
            <el-checkbox :label="3">
              牆面
            </el-checkbox>
            <el-checkbox :label="4">
              白板
            </el-checkbox>
            <el-checkbox :label="5">
              <label>其他</label>
              <el-input v-model="form.projectorScreenNote" :disabled="form.projectorScreen.indexOf(5)==-1?true:false" placeholder="選擇即可填寫" />
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <p class="passtext">
        (檔案大小限制為{{ fileMB }}MB，檔案格式僅支援doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw 或加LINE官方帳號：@ntpc0963047746傳送檔案。)
      </p>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <p>相關資料 <span style="color: #0048C2;">（如：門診掛號單、會議通知單、活動簡介/流程表、法院傳票…等）</span></p>
          <div class="uploadfile_top">
            <el-button @click="onSuccess">
              <img src="~/static/img/uploadImg.png" alt="上傳證明文件">
            </el-button>
          </div>
        </div>
        <div class="uploadfile_file">
          <el-upload
            class="file-uploader"
            action=""
            :auto-upload="false"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-change="FileToList"
          />
        </div>
      </div>
      <el-form-item>
        <label for="remark">
          <div>
            <span>備註</span>
            <span style="color: #0048C2; letter-spacing: 3px;">（如為錄影或公開直播、自費、是否自備聽打設備(如:桌椅、外接螢幕、延長線等)或有其他告知事項請於備註說明）</span>
          </div>
        </label>
        <el-input
          id="remark"
          v-model="form.remark"
          type="textarea"
          :rows="6"
          placeholder="我是備註"
          resize="none"
          name="remark"
        />
      </el-form-item>

      <div class="read">
        <input id="checkboxName" v-model="read" type="checkbox" class="checkboxInput">
        <label for="checkboxName"><p>*本申請表所蒐集之個人資訊僅做相關服務之聯繫與資源連結之用，並遵守個人資料保護法相關規定。</p></label>
      </div>

      <!-- <el-checkbox-group v-model="read" class="read">
        <el-checkbox label="*本申請表所蒐集之個人資訊僅做相關服務之聯繫與資源連結之用，並遵守個人資料保護法相關規定。"></el-checkbox>
      </el-checkbox-group> -->

      <div class="applicationform_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/application' })">
          <p>返回</p>
        </el-button>
        <el-button class="TSLbutton red" @click="submit('form')">
          <p>送出</p>
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
import acctinformation from '~/mixin/acctinformation'
export default {
  mixins: [acctinformation],
  layout: 'navMenu',
  // eslint-disable-next-line require-await
  async asyncData ({ app, redirect }) {
    const TSLtoken = app.$cookies.get('TSLtoken')
    if (TSLtoken === undefined || TSLtoken === null) {
      redirect('/')
    }
  },
  data () {
    const beginDate = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請選擇起始申請服務日期'))
      } else {
        callback()
      }
    }
    const beginTime = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請選擇起始申請服務時間'))
      } else {
        callback()
      }
    }
    const endDate = (rule, value, callback) => {
      let bd = this.$moment(this.form.beginDate + ' ' + this.chgTimeToString(this.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value + ' ' + this.chgTimeToString(this.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value === '') {
        callback(new Error('請選擇結束申請服務日期'))
      } else if (ed < bd) {
        callback(new Error('結束時間勿小於起始時間'))
      } else {
        callback()
      }
    }
    const endTime = (rule, value, callback) => {
      let bd = this.$moment(this.form.beginDate + ' ' + this.chgTimeToString(this.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      let ed = this.$moment(value + ' ' + this.chgTimeToString(this.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
      bd = Date.parse(bd)
      ed = Date.parse(ed)
      if (value === '') {
        callback(new Error('請選擇結束申請服務時間'))
      } else if (ed < bd) {
        callback(new Error('結束時間勿小於起始時間'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      read: false,
      langtsl: true,
      participantsContact: ['1'],
      checkEContactName: [], // 同緊急聯絡人
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      form: {
        acctType: '',
        acctName: '',
        assistName: '',
        identity: '',
        name: '',
        verifyId: '',
        email: '',
        telphone: '',
        cellphone: '',
        beginDate: '',
        beginTime: '',
        endDate: '',
        endTime: '',
        breakTime: new Date('2023/01/01 00:00:00'),
        breakHour: '0',
        breakMinute: '0',
        caseType: '',
        applyNote: '',
        location: '',
        city: '',
        dist: '',
        address: '',
        liveUrl: '',
        usualComm: [],
        usualCommNote: '',
        langOther: '',
        totlePerson: '',
        damagePerson: '',
        participantsNote: '',
        participantsContact: '',
        contactName: '',
        contactRelation: '',
        contactNumber: '',
        applierPrice: '',
        loptop: [],
        projector: [],
        projectorScreen: [],
        projectorScreenNote: '',
        files: '',
        remark: ''
      },
      userAcctType: '',
      leastHours: 0,
      totalHours: 0,
      useHours: 0,
      applyTime: 0,
      eContactName: '', // 緊急聯絡人
      eContactNum: '',
      fileList: [],
      fileIdList: [],
      fileMB: 0, // 檔案大小
      loading: false,
      assistList: [],
      caseTypeList: [],
      pickerOptions: {
        disabledDate (v) {
          return v.getTime() < new Date().getTime() - 86400000
        }
      },
      rules: {
        beginDate: [{ validator: beginDate, trigger: 'blur' }],
        beginTime: [{ validator: beginTime, trigger: 'blue' }],
        endDate: [{ validator: endDate, trigger: 'blur' }],
        endTime: [{ validator: endTime, trigger: 'blue' }],
        contactNumber: [{ pattern: /^[0][9]\d{8}$/, message: '手機號碼格式錯誤', trigger: 'blur' }]
      }
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-服務申請'
  },
  mounted () {
    this.title = this.$route.query.lang === 'tsl' ? '手語翻譯' : '同步聽打'
    this.langtsl = this.$route.query.lang === 'tsl'
    this.getacctform()
    // this.acctSelect()
    this.getByCaseType()
    this.getFILST()
  },
  methods: {
    getacctform (token) {
      const vm = this
      const form = vm.handlang_acctInfo(token)
      form.then((result) => {
        if (vm.closeDiv(result) !== false) {
          if (result.acctType === '5' || result.acctType === '4') {
            vm.form.assistName = result.name
          } else {
            vm.form.name = result.name
            vm.form.verifyId = result.verifyId
            vm.form.email = result.email
            vm.form.telphone = result.telphone
            vm.form.cellphone = result.cellphone
            vm.eContactName = result.eContactName
            vm.eContactNum = result.eContactNum
            vm.userAcctType = result.acctType
            const type = Number(result.acctType)
            switch (type) {
              case 1:
                vm.form.identity = '個人申請'
                break
              case 2:
                vm.form.identity = '單位申請'
                break
              case 3:
                vm.form.identity = '服務人員'
                break
              case 4:
                vm.form.identity = '委外單位'
                break
              case 5:
                vm.form.identity = '管理機關'
                break
            }
          }
        }
        this.applyCaseSelectUseHours()
      })
    },
    totalHoursPopUps (val) {
      const vm = this
      if (val === 'CC01' && this.leastHours <= 6) {
        vm.defaultText = '提醒您，您的社會參與時數已剩餘' + this.useHours + '小時，後續新增申請如時數不足需請您自行付費。'
        vm.defaultId = 0
        vm.defaultPopUps = true
      } else if (val === 'CC01') {
        vm.defaultText = '您好，申請案件屬於社會參與，每人(單位)每年最高補助使用' + this.totalHours + '小時(手語翻譯及同步聽打服務併計)。'
        vm.defaultId = 0
        vm.defaultPopUps = true
      }
    },
    async applyCaseSelectUseHours () {
      const vm = this
      const obj = {
        verifyId: vm.form.verifyId
      }
      const res = await frontendApi.applyCaseSelectUseHours(obj)
      if (res.isSuccess === true) {
        vm.leastHours = res.data.leastHours
        vm.totalHours = res.data.totalHours
        vm.useHours = res.data.useHours
      }
    },
    async acctSelect (acctType) {
      const vm = this
      const obj = {
        verifyId: '',
        createdDateTimeBegin: '',
        createdDateTimeEnd: '',
        name: '',
        acctType
      }
      const res = await frontendApi.acctSelect45(obj)
      if (res.isSuccess === true) {
        const data = res.data
        vm.assistList = data
      }
    },
    async getacctItem (name) {
      const vm = this
      let verifyId = ''
      vm.assistList.forEach(function (item) {
        if (item.name === name) {
          verifyId = item.verifyId
        }
      })
      const obj = {
        verifyId,
        createdDateTimeBegin: '',
        createdDateTimeEnd: '',
        name: '',
        acctType: ''
      }
      const res = await frontendApi.acctSelect(obj)
      if (res.isSuccess === true) {
        const result = res.data[0]
        vm.userAcctType = result.acctType
        vm.form.name = result.name
        vm.form.verifyId = result.verifyId
        vm.form.email = result.email
        vm.form.telphone = result.telphone
        vm.form.cellphone = result.cellphone
        vm.eContactName = result.eContactName
        const type = Number(result.acctType)
        switch (type) {
          case 1:
            vm.form.identity = '個人申請'
            break
          case 2:
            vm.form.identity = '單位申請'
            break
          case 3:
            vm.form.identity = '服務人員'
            break
          case 4:
            vm.form.identity = '委外單位'
            break
          case 5:
            vm.form.identity = '管理機關'
            break
        }
        this.applyCaseSelectUseHours()
      }
    },
    async handlang_acctInfo (id) {
      let token = null
      if (this.closeDiv(id) !== false) {
        if (this.TSLform.acctType === 4 || this.TSLform.acctType === 5) {
          token = id
        }
      } else {
        token = localStorage.getItem('TSLtoken')
      }
      const obj = {
        token
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        return res.data
      }
    },
    async submitForm (vForm, fileToList) {
      const vm = this
      const form = Object.assign({}, vForm)
      const obj = {
        assistName: form.assistName,
        verifyId: form.verifyId,
        beginDate: form.beginDate + ' ' + vm.chgTimeToString(vm.form.beginTime) + ':00',
        endDate: form.endDate + ' ' + vm.chgTimeToString(vm.form.endTime) + ':00',
        breakTime: vm.chgTimeToString(vm.form.breakTime),
        caseType: form.caseType,
        applyNote: form.applyNote,
        location: form.location,
        city: form.city,
        dist: form.dist,
        address: form.address,
        liveUrl: form.liveUrl,
        usualComm: form.usualComm.length !== 0 ? form.usualComm.join() : '',
        usualCommNote: form.usualCommNote,
        totlePerson: form.totlePerson,
        damagePerson: form.damagePerson,
        participantsNote: form.participantsNote,
        participantsContact: vm.participantsContact.length !== 0 ? vm.participantsContact.join() : '',
        contactName: form.contactName,
        contactRelation: form.contactRelation,
        contactNumber: form.contactNumber,
        applierPrice: form.applierPrice,
        files: form.files,
        loptop: form.loptop.length !== 0 ? form.loptop.join() : '',
        projector: form.projector.length !== 0 ? form.projector.join() : '',
        projectorScreen: form.projectorScreen.length !== 0 ? form.projectorScreen.join() : '',
        projectorScreenNote: '',
        remark: form.remark,
        applyType: vm.langtsl === true ? '1' : '2',
        caseStatus: 'WIT',
        applyName: form.name,
        applycategory: vm.TSLform.acctType.toString(),
        caseNum: ''
      }
      const res = await frontendApi.applycase_apply(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          this.UpdateForeignKey(res.data.caseNum)
          vm.defaultText = res.message
        } else {
          this.loading = false
          vm.defaultText = res.message
          vm.defaultId = 1
          this.defaultPopUps = true
        }
      } else {
        this.loading = false
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async UpdateForeignKey (caseNum) {
      const vm = this
      const list = []
      for (let i = 0; i < vm.fileIdList.length; i++) {
        const item = vm.fileIdList[i]
        list.push(item)
      }
      const obj = {
        ids: list,
        foreignKey: caseNum
      }
      const res = await frontendApi.UpdateForeignKey(obj)
      this.loading = false
      if (res.isSuccess === true) {
        vm.defaultId = 1
        this.defaultPopUps = true
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    changeEName (val) { // 同緊急聯絡人
      const vm = this
      const value = val[0]
      if (value === true) {
        if (vm.closeDiv(vm.eContactName) !== false) {
          vm.form.contactName = vm.eContactName
          vm.form.contactNumber = vm.closeDiv(vm.eContactNum) !== false ? vm.eContactNum : ''
        } else {
          vm.defaultText = '您未於個人帳戶填寫緊急連絡人資料，請手動填寫。'
          vm.defaultId = 0
          vm.defaultPopUps = true
          vm.form.contactName = ''
          vm.checkEContactName = []
        }
      } else {
        vm.checkEContactName = []
        vm.form.contactName = ''
        vm.form.contactNumber = ''
      }
    },
    bindCheckBox (val, id) {
      if (val.length > 1) {
        val.splice(0, 1)
      }
      switch (id) {
        case 1:
          if (val !== 5) {
            this.form.projectorScreenNote = ''
          }
          break
      }
    },
    async getByCaseType () {
      const obj = {
        codeType: 'CCIS'
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        this.caseTypeList = res.data
      }
    },
    convertTime () {
      const vm = this

      if (vm.closeDiv(vm.form.beginDate) !== false && vm.closeDiv(vm.form.endDate) !== false && this.chgTimeToString(vm.form.beginTime) !== '' && this.chgTimeToString(vm.form.endTime) !== '' && this.chgTimeToString(vm.form.breakTime) !== '') {
        let bd = vm.$moment(vm.form.beginDate + ' ' + this.chgTimeToString(vm.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        let ed = vm.$moment(vm.form.endDate + ' ' + this.chgTimeToString(vm.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        const bts = (vm.form.breakTime.getHours() * 60 + vm.form.breakTime.getMinutes()) * 60 * 1000

        bd = Date.parse(bd)
        ed = Date.parse(ed)
        if (ed > bd) {
          const ms = (ed - bd) - bts
          const calTime = ms / 1000 / 60 / 60
          if (calTime % 1 === 0) {
            vm.applyTime = calTime
          } else {
            const arrStr = calTime.toString().split('.')
            if (parseInt(arrStr[1][0]) >= 5) {
              if (arrStr[1] === '5') {
                vm.applyTime = calTime
              } else {
                vm.applyTime = Math.round(calTime)
              }
            } else {
              vm.applyTime = parseFloat(arrStr[0]) + 0.5
            }
          }
          // const ms = (ed - bd)
          // const time = ms / 1000 / 60 / 60
          // if (time % 1 === 0 || time % 1 === 0.5) {
          //   vm.applyTime = time
          // } else {
          //   const timeLine = time % 1
          //   if (timeLine < 0.5) {
          //     vm.applyTime = Math.floor(time) + 0.5
          //   } else {
          //     vm.applyTime = Math.floor(time + 0.5)
          //   }
          // }
        } else {
          vm.applyTime = 0
        }

        vm.convertBreakTime()
      }
    },
    convertBreakTime () {
      // if (time === undefined) {
      //   return false
      // }
      const vm = this
      vm.form.breakTime = new Date('2023-01-01 ' + String(vm.form.breakHour).padStart(2, '0') + ':' + String(vm.form.breakMinute).padStart(2, '0'))

      const time = vm.form.breakTime

      // 休息時間轉成時戳
      const bts = (time.getHours() * 60 + time.getMinutes()) * 60 * 1000

      if (vm.closeDiv(time) !== false) {
        let bd = vm.$moment(vm.form.beginDate + ' ' + this.chgTimeToString(vm.form.beginTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        let ed = vm.$moment(vm.form.endDate + ' ' + this.chgTimeToString(vm.form.endTime) + ':00').format('yyyy/MM/DD HH:mm:ss')
        bd = Date.parse(bd)
        ed = Date.parse(ed)
        let applyTime = 0
        if (ed > bd) {
          let ms = (ed - bd)

          if (bts > ms) {
            vm.applyTime = '時數時長不足'
          } else {
            ms = ms - bts
            const calTime = ms / 1000 / 60 / 60
            if (calTime % 1 === 0) {
              applyTime = calTime
            } else {
              const arrStr = calTime.toString().split('.')
              if (parseInt(arrStr[1][0]) >= 5) {
                if (arrStr[1] === '5') {
                  applyTime = calTime
                } else {
                  applyTime = Math.round(calTime)
                }
              } else {
                applyTime = parseFloat(arrStr[0]) + 0.5
              }
              // applyTime = Math.floor(calTime) + 0.5
            }

            vm.applyTime = applyTime
          }
          // const ms = (ed - bd)
          // const time = ms / 1000 / 60 / 60
          // if (time % 1 === 0) {
          //   applyTime = time
          // } else {
          //   applyTime = Math.floor(time) + 0.5
          // }
        }
        // if (applyTime > time) {
        //   vm.applyTime = (applyTime - time)
        // } else {
        //   vm.applyTime = '時數時長不足'
        // }
      } else {
        const breakTime = Number(vm.form.breakTime)
        const applyTime = Number(vm.applyTime)
        if (applyTime > breakTime) {
          vm.applyTime = (applyTime - breakTime)
        }
      }
    },
    chgTimeToString (time) {
      if (typeof time === 'string') {
        return time
      }
      let str = ''
      if (time !== undefined && time !== '') {
        if (time.getHours() >= 10) {
          str = time.getHours().toString()
        } else {
          str = '0' + time.getHours().toString()
        }

        str = str + ':'

        if (time.getMinutes() >= 10) {
          str += time.getMinutes().toString()
        } else {
          str += '0' + time.getMinutes().toString()
        }
      }
      return str
    },
    submit (formName) {
      const vm = this
      const Time = (vm.leastHours - vm.applyTime)
      if (vm.form.caseType === 'CC01' && Time < 0) {
        this.defaultPopUps = true
        vm.defaultText = '「您好，申請案件屬於社會參與，每人(單位)每年最高補助使用60小時(手語翻譯及同步聽打服務併計)。」，您已超過需進行阻擋。隔年1月1號時數重新計算。'
        return
      }
      if (vm.read !== true) {
        this.defaultPopUps = true
        vm.defaultText = '請先確認本申請表所蒐集之個人資訊僅做相關服務之聯繫與資源連結之用，並遵守個人資料保護法相關規定'
        return
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          this.loading = true
          if (vm.fileList.length !== 0) {
            for (let i = 0; i < vm.fileList.length; i++) {
              const item = vm.fileList[i]
              const fileItem = this.UploadFile(item.raw)
              fileItem.then((result) => {
                vm.fileIdList.push(result)
                if (vm.fileIdList.length === vm.fileList.length) {
                  this.submitForm(vm.form, true)
                }
              })
            }
          } else {
            this.submitForm(vm.form, false)
          }
        } else {
          this.loading = true
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
            this.loading = false
          })
        }
      })
    },
    async UploadFile (File) {
      const vm = this
      const obj = {
        File,
        Type: '2',
        Category: ''
      }
      const res = await frontendApi.UploadFile(obj)
      if (res.isSuccess === true) {
        return res.data
      } else {
        this.loading = false
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    beforeUpload (file) {
      const vm = this
      const fileName = file.name.split('.')[1]
      const fileList = ['pdf', 'zip', 'xlsx', 'odt', 'ods', 'odp',
        'jpg', 'jpeg', 'bmp', 'gif', 'png', '7z', 'docx', 'doc'
      ]
      if (!fileList.includes(fileName)) {
        vm.defaultText = '檔案格式僅支援: doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，如無法成功上傳檔案，請將檔案寄至新北市手語翻譯暨同步聽打中心 ntcst@nad.org.tw 或加LINE官方帳號：@ntpc0963047746傳送檔案。'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
      const isMB = file.size / 1024 / 1024 < Number(vm.fileMB)
      if (!isMB) {
        vm.defaultText = '上傳檔案大小限制為' + vm.fileMB + 'MB'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
    },
    FileToList (fileList) {
      const vm = this
      vm.fileList.push(fileList)
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
          if (item.codeId === 'SERUPD') {
            vm.fileMB = item.intVal
          }
        }
      }
    },
    onSuccess () {
      document.querySelector('.file-uploader input').click()
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
  .el-time-panel__content {
    font-size: 100%;
  }
}
.applicationform{
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
      min-width: 109px;
    }
    @include phSize{
      justify-content: center;
    }
  }
  .form{
    .timeItme{
      display: flex;
      align-items: center;
      p{
        flex-shrink: 0;
        margin: 0 10px;
      }
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
        p{
          margin: 10px 0;
        }
      }
      .el-input__suffix{
        display: none;
      }
    }
    .timeName{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      label{
        margin-right: 10px;
        margin-bottom: 0;
        p{
          font-size: 100%;
        }
      }
      P{
        color: $red;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
      }
      @include phSize{
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .hrTime{
      max-width: 216px;
      &_hr{
        display: flex;
        align-items: center;
        p{
          margin-left: 10px;
        }
      }
    }
    .uploadfile{
      margin-top: 10px;
    }
  }

  .form_item{
    .havecheckbox{
      label{
        margin-bottom: 0;
      }
      .title{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        @include phSize{
          align-items: flex-start;
          flex-direction: column;
        }
      }
      .el-checkbox-group{
        display: flex;
        align-items: center;
        font-size: 100%;
        @include phSize{
          margin-top: 10px;
        }
      }
      .el-checkbox{
        margin-bottom: 0;
        &__label{
          display: flex;
          font-size: 100%;
          line-height: 25px;
          color: $default;
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
    }
  }

  .loptop{
    &_text{
      margin-bottom: clamp(min(10px), pc(20), max(20px));
    }
    .el-form-item.form_radio{
      margin-top: 10px;
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

  &_ex{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    color: $red;
    font-size: clamp(min(1.125em), pc(20), max(1.250em));
    margin-top: 20px;
    span{
      color: $red;
      margin: 0 2px;
    }
  }

  .read{
    max-width: 100%;
    min-height: 54px;
    display: flex;
    align-items: center;
    margin: 30px 0;
    p{
      margin-bottom: 0;
      margin-left: 10px;
    }
    .el-checkbox{
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
    .checkboxInput{
      width: 25px;
      height: 25px;
      &:focus{
        outline: 3px dashed #990094;
      }
    }
  }
  .el-form-item.is-error .el-input__inner{
    border-color: #F56C6C;
  }
}
</style>
