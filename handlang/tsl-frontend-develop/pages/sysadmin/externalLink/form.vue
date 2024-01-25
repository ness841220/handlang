<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="externalLinkForm">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/externalLink">系統管理-外部連結管理</a> / <a href="">新增&編輯</a>
    </span>

    <div id="content" class="externalLinkForm--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>外部連結管理</h2>
    </div>

    <el-form ref="form" :model="form" class="form">
      <div class="form_item">
        <el-form-item prop="seqNo" :rules="[{ required: true, message: '請輸入排序編號', trigger: 'blur' }]">
          <label for="seqNo">
            <div class="formTitle">
              排序編號<span>(必填/此為連結順序編號，由小到大排序)</span>
            </div>
          </label>
          <el-input id="seqNo" v-model.number="form.seqNo" name="seqNo" />
        </el-form-item>
        <el-form-item prop="linkName" :rules="[{ required: true, message: '請輸入連結名稱', trigger: 'blur' }]">
          <label for="linkName">連結名稱</label>
          <el-input id="linkName" v-model="form.linkName" name="linkName" />
        </el-form-item>
      </div>
      <div class="form_item">
        <el-form-item prop="linkUrl" :rules="[{ required: true, message: '請輸入連結網址', trigger: 'blur' }]">
          <label for="linkUrl">連結網址</label>
          <el-input id="linkUrl" v-model="form.linkUrl" name="linkUrl" />
        </el-form-item>
        <el-form-item prop="opneModel" :rules="[{ required: true, message: '請選擇開啟方式', trigger: 'change' }]">
          <label for="opneModel">開啟方式(原視窗/另開)</label>
          <el-select id="opneModel" v-model="form.opneModel" name="opneModel" placeholder="" popper-class="defaultSelect">
            <el-option label="原視窗" value="1" />
            <el-option label="另開分頁" value="2" />
          </el-select>
        </el-form-item>
      </div>
      <div class="uploadfile">
        <div class="uploadfile_text">
          <div class="uploadfile_top">
            <p>圖片上傳</p>
            <el-button @click="uploadImg()">
              <img src="~/static/img/uploadImg.png" alt="上傳證明文件">
            </el-button>
          </div>
          <p>(上傳附件，檔案大小限制為10MB)</p>
        </div>
        <div class="uploadfile_file">
          <el-upload
            class="file-uploader"
            action=""
            :limit="1"
            :file-list="fileList"
            :auto-upload="false"
            :before-upload="beforeUpload"
            :on-change="getFile"
          />
        </div>
      </div>

      <div class="externalLinkForm_btn">
        <el-button class="TSLbutton" @click="$router.push({ path: '/sysadmin/externalLink' })">
          <p>返回</p>
        </el-button>
        <el-button v-if="!editItem" class="TSLbutton red" @click="submitForm('form',form)">
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
          <el-button class="TSLbutton red" @click="defaultId==0 ? defaultPopUps = false : goToPrePage()">
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
      form: {
        gid: '',
        seqNo: 0,
        linkName: '',
        linkUrl: '',
        opneModel: '',
        imgFileName: '',
        imgType: '',
        imgBase64: ''
      },
      deleteID: '',
      editItem: false,
      fileList: [],
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  mounted () {
    this.getForm()
  },
  methods: {
    getForm () {
      const vm = this
      const form = JSON.parse(sessionStorage.getItem('externalLink'))
      if (vm.closeDiv(form) !== false) {
        vm.editItem = true
        vm.form.gid = form.gid
        vm.form.seqNo = form.seqNo
        vm.form.linkName = form.linkName
        vm.form.linkUrl = form.linkUrl
        vm.form.opneModel = form.opneModel
        vm.form.imgBase64 = form.imgBase64
        vm.form.imgFileName = form.imgFileName
        vm.form.imgType = form.imgType
        const imgPbj = {
          name: form.imgFileName,
          imgType: form.imgType,
          image: form.image
        }
        vm.fileList.push(imgPbj)
      } else {
        vm.editItem = false
      }
    },
    submitForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            seqNo: form.seqNo,
            linkName: form.linkName,
            linkUrl: form.linkUrl,
            opneModel: form.opneModel,
            imgBase64: form.imgBase64,
            imgFileName: form.imgFileName,
            imgType: form.imgType
          }
          const res = await frontendApi.linksSetting_create(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '外部連結新增成功'
            vm.defaultId = 1
            this.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            this.defaultPopUps = true
          }
        } else {
          this.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    submitEditForm (formName, vForm) {
      const vm = this
      const form = Object.assign({}, vForm)
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const obj = {
            gid: form.gid,
            seqNo: form.seqNo,
            linkName: form.linkName,
            linkUrl: form.linkUrl,
            opneModel: form.opneModel,
            imgBase64: form.imgBase64,
            imgFileName: form.imgFileName,
            imgType: form.imgType
          }
          const res = await frontendApi.linksSetting_edit(obj)
          if (res.isSuccess === true) {
            this.$refs[formName].resetFields()
            vm.defaultText = '外部連結修改成功'
            vm.defaultId = 1
            this.defaultPopUps = true
          } else {
            vm.defaultText = res.message
            vm.defaultId = 0
            this.defaultPopUps = true
          }
        } else {
          this.$nextTick(() => {
            vm.elFormErrorScrollIntoView()
          })
        }
      })
    },
    beforeUpload (file) {
      const vm = this
      const isJPG = file.type === 'image/jpg'
      const isPng = file.type === 'image/png'
      const isJpeg = file.type === 'image/jpeg'
      const is10M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isPng && !isJpeg) {
        vm.defaultText = '上傳圖片格式限制: jpg/png/svg'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
      if (!is10M) {
        vm.defaultText = '上傳圖片大小不能超過10MB'
        vm.defaultId = 0
        this.defaultPopUps = true
        return false
      }
    },
    goToPrePage () {
      window.location.href = ('/sysadmin/externalLink')
    },
    getFile (file, fileList) {
      this.form.imgType = file.raw.type
      this.form.imgFileName = file.raw.name
      this.getBase64(file.raw).then((res) => {
        const sliceNumber = (res.indexOf('base64,') + 7)
        this.form.imgBase64 = res.substr(sliceNumber)
      })
    },
    uploadImg () {
      document.querySelector('.file-uploader input').click()
    },
    getBase64 (file) {
      return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.externalLinkForm{
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
  }

  .form{
    .formTitle{
      font-size: 100%;
      span{
        color: $red;
      }
    }
    .el-form-item.is-error .el-input__inner{
      border-color: #F56C6C;
    }
  }
}
</style>
