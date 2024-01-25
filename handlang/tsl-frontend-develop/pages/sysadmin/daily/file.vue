<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dailyFile">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sysadmin/daily">系統管理-系統日誌</a> / <a href="javascript:void(0);">系統日誌內容</a>
    </span>

    <div id="content" class="dailyFile--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>系統日誌內容</h2>
    </div>

    <div class="dailyFile_content">
      <div class="dailyFileContent">
        <p>明細內容：</p>
        <div class="dailyFileContent_table">
          <div class="item">
            <div class="item_left">
              <p>記錄時間</p>
            </div>
            <div class="item_right">
              <p>{{ form.logTime }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>角色</p>
            </div>
            <div class="item_right">
              <p v-if="form.acctType == '1'">
                個人
              </p>
              <p v-if="form.acctType == '2'">
                單位
              </p>
              <p v-if="form.acctType == '3'">
                服務人員
              </p>
              <p v-if="form.acctType == '4'">
                委外單位
              </p>
              <p v-if="form.acctType == '5'">
                管理機關
              </p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>帳號</p>
            </div>
            <div class="item_right">
              <p>{{ form.verifyId }}</p>
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
              <p>發生位置</p>
            </div>
            <div class="item_right">
              <p>{{ form.location }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>事件類型</p>
            </div>
            <div class="item_right">
              <p>{{ form.logType }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>記錄說明</p>
            </div>
            <div class="item_right">
              <p>{{ form.message }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item_left">
              <p>IP</p>
            </div>
            <div class="item_right">
              <p>{{ form.ip }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dailyFile--btn">
      <el-button class="TSLbutton" @click="$router.push({ path: '/sysadmin/daily' })">
        <p>返回</p>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navMenu',
  data () {
    return {
      form: {
        logTime: '',
        verifyId: '',
        acctType: '',
        name: '',
        location: '',
        logType: '',
        message: '',
        ip: ''
      }
    }
  },
  mounted () {
    const form = JSON.parse(sessionStorage.getItem('dailyForm'))
    if (this.closeDiv(form) !== false) {
      this.getForm(form)
    } else {
      this.$router.push({ path: '/sysadmin/daily' })
    }
  },
  methods: {
    getForm (form) {
      const vm = this
      vm.form.logTime = vm.$moment(form.logTime).format('yyyy/MM/DD HH:mm:ss')
      vm.form.acctType = form.logsDTO.acctType
      vm.form.verifyId = form.logsDTO.verifyId
      vm.form.name = form.logsDTO.name
      vm.form.location = form.logsDTO.location
      vm.form.logType = form.logsDTO.logType
      vm.form.message = form.logsDTO.message
      vm.form.ip = form.logsDTO.ip
    }
  }
}
</script>

<style lang="scss">
.dailyFile{
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

  &--btn{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    margin-top: 40px;
    .TSLbutton{
      width: 100%;
      max-width: 109px;
    }
  }

  &_content{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;

    .dailyFileContent{
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
      .dailyFileContent{
        .item{
          flex-direction: column;
          align-items: flex-start;
          &_left,&_right{
            width: 100%;
            text-align: justify;
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
