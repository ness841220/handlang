<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-loading.fullscreen.lock="loading" class="newsform">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/news">最新消息</a> / <a href="/news/form">新增最新消息</a>
    </span>

    <div id="content" class="newsform--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>新增最新消息</h2>
    </div>

    <el-form ref="form" :model="form" class="form">
      <el-form-item prop="title" :rules="[{ required: true, message: '請輸入標題', trigger: 'blur' }]" style="max-width: 600px;">
        <label for="title">標題<p>(必填)</p></label>
        <el-input id="title" v-model="form.title" name="title" />
      </el-form-item>
      <div class="form_item">
        <el-form-item prop="beginDateTime" :rules="[{ required: true, message: '請輸入發佈日期', trigger: 'blur' }]">
          <label for="beginDateTime">發佈日期<p>(必填)</p></label>
          <el-date-picker
            id="beginDateTime"
            v-model="form.beginDateTime"
            type="date"
            name="beginDateTime"
            placeholder="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </el-form-item>
        <el-form-item prop="endDateTime" :rules="[{ required: true, message: '請輸入截止日期', trigger: 'blur' }]">
          <label for="endDateTime">截止日期<p>(必填)</p></label>
          <el-date-picker
            id="endDateTime"
            v-model="form.endDateTime"
            type="date"
            name="endDateTime"
            placeholder="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
          />
        </el-form-item>
      </div>
      <el-form-item prop="contant" :rules="[{ required: true, message: '請輸入公告內容', trigger: 'blur' }]">
        <label for="contant">公告內容<p>(必填)</p></label>
        <el-input
          id="contant"
          v-model="form.contant"
          type="textarea"
          placeholder="公告內容"
          name="contant"
          rows="7"
        />
      </el-form-item>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <div class="uploadfile_top">
            <el-button @click="onSuccess">
              <img src="~/static/img/uploadImg.png" alt="上傳附件，檔案大小限制為10MB">
            </el-button>
          </div>
          <p>(上傳附件，檔案大小限制為10MB、上限五個檔案)</p>
        </div>
        <div class="uploadfile_file">
          <el-upload
            class="file-uploader"
            action=""
            :limit="5"
            :auto-upload="false"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-change="FileToList"
          />
        </div>
      </div>
      <div class="referLink">
        <p>參考連結 (上限五個超連結)</p>
        <div v-for="item in form.newsReferenceLinks" :key="item.id" class="referLink_link">
          <div class="referLink_item">
            <el-form-item>
              <label>連結名稱{{ item.id }}</label>
              <el-input v-model="item.referenceName" />
            </el-form-item>
            <el-form-item>
              <label>連結網址{{ item.id }}</label>
              <el-input v-model="item.referenceLink" />
            </el-form-item>
          </div>
          <div class="referLink_icon">
            <a v-if="item.id != 1" href="javascript:void(0);" class="referLink_delete" @click="removeArr(form.newsReferenceLinks,item)">
              <img src="~/static/img/icon/delete.svg" alt="刪除參考連結">
            </a>
            <a v-if="form.newsReferenceLinks.length == item.id && form.newsReferenceLinks.length < 5" href="javascript:void(0);" class="referLink_add" @click="addreferLink">
              <img src="~/static/img/icon/add.svg" alt="新增參考連結">
            </a>
          </div>
        </div>
      </div>
      <div class="form_item">
        <el-form-item>
          <label for="contactName">聯絡人</label>
          <el-input id="contactName" v-model="form.contactName" name="contactName" />
        </el-form-item>
        <el-form-item>
          <label for="contactGroup">聯絡單位</label>
          <el-input id="contactGroup" v-model="form.contactGroup" name="contactGroup" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item :rules="[{ pattern: /\d{2}\d{7}/, message: '電話號碼格式錯誤', trigger: ['blur', 'change'] }]" prop="contactPhoneNum">
          <label for="contactPhoneNum">連絡電話</label>
          <el-input id="contactPhoneNum" v-model="form.contactPhoneNum" name="contactPhoneNum" inputmode="numeric" />
        </el-form-item>
        <el-form-item :rules="[{ type: 'email', message: '請輸入正確的電子信箱', trigger: ['blur', 'change'] }]" prop="email">
          <label for="email">電子信箱</label>
          <el-input id="email" v-model="form.email" name="email" />
        </el-form-item>
      </div>

      <div class="newsform_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/news' })">
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
          <el-button class="TSLbutton red" @click="defaultId==0?defaultPopUps = false:$router.push({ path: '/news' })">
            <p>確定</p>
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import acctinformation from '~/mixin/acctinformation'
import frontendApi from '@/assets/api/frontendApi'
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
    return {
      verifyId: '',
      form: {
        title: '',
        beginDateTime: '',
        endDateTime: '2099/01/01',
        contant: '',
        contactName: '',
        contactGroup: '',
        contactPhoneNum: '',
        email: '',
        newsReferenceLinks: [
          {
            id: 1,
            referenceName: '',
            referenceLink: ''
          }
        ]
      },
      fileList: [],
      fileIdList: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      loading: false
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-最新消息-新增最新消息'
  },
  mounted () {
    this.form.beginDateTime = this.getToday()
    this.getacctform()
  },
  methods: {
    getacctform () {
      const vm = this
      const form = vm.handlang_acctInfo()
      form.then((result) => {
        vm.verifyId = result.verifyId
      })
    },
    submit (formName) {
      const vm = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.fileIdList = []
          if (vm.fileList.length !== 0) {
            this.loading = true
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
          this.$nextTick(() => {
            this.elFormErrorScrollIntoView()
          })
        }
      })
    },
    async submitForm (vForm, fileToList) {
      const vm = this
      const form = Object.assign({}, vForm)
      const dt = new Date()
      const time = String(dt.getFullYear()) + String((dt.getMonth() + 1)) + String(dt.getDate()) + String(dt.getHours()) + String(dt.getMinutes()) + String(dt.getSeconds())
      const obj = {
        status: '1',
        seqNum: time,
        title: form.title,
        beginDateTime: form.beginDateTime,
        endDateTime: form.endDateTime,
        contant: form.contant,
        files: '',
        filesUrl: '',
        newsReferenceLinks: form.newsReferenceLinks.length === 0 ? [] : form.newsReferenceLinks,
        createdById: vm.verifyId,
        updatedById: '',
        contactName: form.contactName,
        contactPhoneNum: form.contactPhoneNum,
        contactGroup: form.contactGroup,
        email: form.email
      }
      const res = await frontendApi.create_news(obj)
      if (res.isSuccess === true) {
        if (fileToList === true) {
          this.UpdateForeignKey(res.data.gid)
        } else {
          vm.defaultText = '新增消息成功'
          vm.defaultId = 1
          this.defaultPopUps = true
          this.loading = false
          this.$refs.form.resetFields()
        }
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
    },
    async UpdateForeignKey (gid) {
      const vm = this
      const list = []
      for (let i = 0; i < vm.fileIdList.length; i++) {
        const item = vm.fileIdList[i]
        list.push(item)
      }
      const obj = {
        ids: list,
        foreignKey: gid
      }
      const res = await frontendApi.UpdateForeignKey(obj)
      if (res.isSuccess === true) {
        vm.defaultText = '新增消息成功'
        vm.defaultId = 1
        this.defaultPopUps = true
        this.$refs.form.resetFields()
      } else {
        vm.defaultText = res.message
        vm.defaultId = 0
        this.defaultPopUps = true
      }
      this.loading = false
    },
    async UploadFile (File) {
      const vm = this
      const obj = {
        File,
        Type: '3',
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
    addreferLink () {
      const id = this.form.newsReferenceLinks.length
      this.form.newsReferenceLinks.push({
        referenceName: '',
        referenceLink: '',
        id: id + 1
      })
    },
    beforeUpload (file) {
      const vm = this
      const fileName = file.name.split('.')[1]
      const fileList = ['pdf', 'zip', 'xlsx', 'odt', 'ods', 'odp',
        'jpg', 'jpeg', 'bmp', 'gif', 'png', '7z', 'docx', 'doc'
      ]
      if (!fileList.includes(fileName)) {
        vm.defaultText = '檔案格式僅支援: doc、docx、xls、xlsx、pdf、odt、ods、odp、jpg、jpeg、bmp、gif、png、zip、7z，若系統上傳文件失敗，請將檔案直接mail至ntcst@nad.org.tw。'
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
    onSuccess () {
      document.querySelector('.file-uploader input').click()
    }
  }
}
</script>

<style lang="scss">
.newsform{
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
  .el-input__suffix{
    display: none;
  }
  .el-form .el-form-item .el-date-editor.el-input{
    @include phSize{
      max-width: 100%;
    }
  }
  .form .uploadfile_text{
    @include phSize{
      flex-direction: row;
    }
  }

  .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-textarea__inner{
    border-color: #F56C6C;
  }
}
</style>
