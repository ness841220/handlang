<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header">
    <a id="mainItem" class="mainblock" href="#content" title="跳到主要內容">
      <p>跳到主要內容</p>
    </a>
    <div class="header_element">
      <a href="/" class="logo" title="新北市社會局">
        <img src="~/static/logo2.0.jpg" alt="新北市社會局">
      </a>
      <!-- <a href="/" class="title" title="新北市手語翻譯暨同步聽打服務線上申辦系統">
        <h1>新北市手語翻譯暨同步聽打服務線上申辦系統</h1>
      </a> -->
      <div class="header_tool">
        <a id="a_U" href="#a_U" accesskey="U" class="guided" title="網站導覽">:::</a>
        <a href="/sitemap" class="tool" title="網站導覽">
          <p>網站導覽</p>
        </a>
        <a href="/application" class="tool" title="服務申請須知">
          <p>服務申請須知</p>
        </a>
        <a v-if="closeDiv(TSLtoken)!=false" href="/caseInquiry" class="tool" title="回首頁">
          <p>回首頁</p>
        </a>
        <a v-if="closeDiv(TSLtoken)==false" href="/" class="tool" title="登入">
          <p>登入</p>
        </a>
        <a v-if="closeDiv(TSLtoken)!=false" href="javascript:void(0);" class="tool" title="登出" @click="logout">
          <p>登出</p>
        </a>
      </div>
      <el-button class="header_burger" @click="headerPhMenu = !headerPhMenu">
        <p class="header_burger--icon">
          選單
        </p>
      </el-button>
    </div>

    <el-dialog
      top="0"
      :visible.sync="headerPhMenu"
      :show-close="false"
      class="headerPhMenu"
    >
      <div slot="title" class="header-title">
        <el-button circle @click="headerPhMenu = !headerPhMenu">
          <img src="~/static/img/icon/Close.png" alt="關閉" tabindex="0">
        </el-button>
      </div>
      <div class="headerPhMenu_item">
        <a href="/sitemap" class="btn">
          <p>網站導覽</p>
        </a>
        <a href="/application" class="btn">
          <p>服務申請須知</p>
        </a>
        <a v-if="closeDiv(TSLtoken)!=false" href="/" class="btn" title="回首頁">
          <p>回首頁</p>
        </a>
        <a v-if="closeDiv(TSLtoken)==false" href="/" class="btn" title="登入">
          <p>登入</p>
        </a>
        <a v-if="closeDiv(TSLtoken)!=false" href="javascript:void(0);" class="btn" title="登出" @click="logout">
          <p>登出</p>
        </a>
      </div>
      <div class="headerPhMenu_bar">
        <a v-if="acctType != 3" href="/application" class="item">
          <img src="~/static/img/icon/severForm.png" alt="">
          <p>服務申請</p>
        </a>
        <a v-if="isLogin==true" href="/caseInquiry" class="item">
          <img src="~/static/img/icon/Analyze.png" alt="">
          <p>案件查詢</p>
        </a>
        <a href="/news" class="item">
          <img src="~/static/img/icon/news.png" alt="">
          <p>最新消息</p>
        </a>
        <a v-if="isLogin==true" href="/notify" class="item">
          <img src="~/static/img/icon/email.png" alt="">
          <p>訊息通知</p>
        </a>
        <a v-if="acctType == 4 || acctType == 5" href="/statistics" class="item">
          <img src="~/static/img/icon/statistics.png" alt="">
          <p>統計報表</p>
        </a>
        <a v-if="isLogin==true" href="/appeal" class="item">
          <img src="~/static/img/icon/Typing.png" alt="">
          <p>申訴管理</p>
        </a>
        <el-collapse v-if="acctType == 4 || acctType == 5" v-model="sysadmin">
          <el-collapse-item name="1">
            <template slot="title">
              <a href="javascript:void(0);" class="item">
                <img src="~/static/img/icon/sysadminIcon.png" alt="">
                <p>系統管理</p>
              </a>
            </template>
            <a href="/sysadmin/acctmanage" class="item">
              <p>帳號管理</p>
            </a>
            <a href="/sysadmin/externalLink" class="item">
              <p>外部連結管理</p>
            </a>
            <a href="/sysadmin/setupParamete" class="item">
              <p>參數設定</p>
            </a>
            <a href="/sysadmin/daily" class="item">
              <p>系統日誌</p>
            </a>
            <a href="/sysadmin/entityfiles" class="item">
              <p>實體檔管理</p>
            </a>
          </el-collapse-item>
        </el-collapse>
        <a v-if="isLogin==true" href="/individualAcct" class="item">
          <img src="~/static/img/icon/user.png" alt="">
          <p>個人帳戶</p>
        </a>
      </div>
    </el-dialog>

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
export default {
  data () {
    return {
      headerPhMenu: false,
      acctType: '',
      sysadmin: '',
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false,
      isLogin: true
    }
  },
  mounted () {
    this.acctType = this.TSLform.acctType
    this.isLogin = this.TSLform.isLogin
  },
  methods: {
    async logout () {
      const token = localStorage.getItem('TSLtoken')
      if (this.closeDiv(token) !== false) {
        const obj = {
          token
        }
        await frontendApi.logout(obj)
        this.$cookies.remove('TSLtoken')
        localStorage.removeItem('TSLtoken')
        localStorage.removeItem('TSLform')
        window.dispatchEvent(new CustomEvent('locate-localstorage-changed', {
          detail: {
            TSLtoken: localStorage.getItem('TSLtoken'),
            TSLform: localStorage.getItem('TSLform')
          }
        }))
        this.$router.replace({ path: '/' })
      }
      this.$cookies.remove('TSLtoken')
      localStorage.removeItem('TSLtoken')
      localStorage.removeItem('TSLform')
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style lang="scss">
.header{
  .mainblock{
    width: 0;
    height: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2000;
    p{
      width: 171px;
      height: 69px;
      display: none;
      color: #000;
      background: #EFD1C9;
      border: 3px dashed transparent;
      box-sizing: border-box;
    }
    &:focus{
      width: auto;
      height: auto;
      outline: none;
      p{
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px dashed #990094;
      }
    }
  }
  border-bottom: 2px solid $red;
  &_element{
    width: 100%;
    max-width: 1652px;
    height: 185px;
    padding: 20px;
    padding-left: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .logo{
    max-width: 600px;
    flex-shrink: 0;
    img{
      width: 100%;
    }
    @include pcSize{
      max-width: 285px;
      display: flex;
      align-items: center;
      height: 90px;
      margin-right: 17px;
      img{
        width: auto;
        max-height: 100%;
        max-height: 85%;
      }
    }
  }
  .title{
    width: 100%;
    h1{
      color: $red;
      font-size: clamp(min(1.125em), pc(30), max(1.875em));
      letter-spacing: 3px;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
  &_tool{
    // width: 100%;
    height: 100%;
    // max-width: 460px;
    display: flex;
    flex-shrink: 0;
    align-items: flex-start;
    justify-content: flex-end;
    box-sizing: border-box;
    .guided{
      height: 27px;
      display: flex;
      align-items: center;
      margin-right: 4px;
    }
    .tool{
      display: flex;
      align-items: center;
      padding-right: 20px;
      margin-right: 20px;
      color: $default;
      border-right: 1px solid $default;
      img{
        width: 23px;
        margin-right: 4px;
      }
      &:last-child{
        padding-right: 0;
        margin-right: 0;
        border-right: 0;
      }
    }
  }
  &_burger{
    display: none;
  }

  @include pcSize{
    &_element{
      height: 100px;
      padding: 0;
    }
    &_tool{
      display: none;
    }
    &_burger{
      display: block;
      width: 50px;
      height: 50px;
      flex-shrink: 0;
      margin: 0 10px;
      border-radius: 50%;
      background-color: $red;
      display: flex;
      align-items: center;
      justify-content: center;
      &:focus{
        border: 0;
        background-color: $red;
        outline: 3px dashed #990094;
      }
      &--icon{
        width: 25px;
        height: 4px;
        transition: all .5s;
        background-color: #ffffff;
        position: relative;
        font-size: 0;
        &::after,&::before{
          content: '';
          width: 25px;
          height: 4px;
          transition: all .5s;
          background-color: #ffffff;
          position: absolute;
        }
        &::before{
          left: 0;
          bottom: 10px;
        }
        &::after{
          left: 0;
          top: 10px;
        }
      }
    }
  }
}

.headerPhMenu{
  .el-dialog{
    width: 100%;
    height: 100%;
    margin: 0;
    &__header{
      height: 45px;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .el-button{
        margin: 0 20px;
        padding: 0;
        border: 0;
        img{
          width: 25px;
          height: 25px;
          &:focus{
            outline: 3px dashed #990094;
          }
        }
      }
      .el-button.el-button--default.is-circle{
        color: $default;
        background: transparent;
      }
    }
    &__body{
      height: calc(100% - 45px);
      overflow: hidden;
      padding: 0;
      overflow: overlay;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background: transparent;
      }
    }
  }
  &_item{
    max-width: 190px;
    margin: 0 auto;
    display: flex;
    padding: 0 15px;
    flex-direction: column;
    align-items: flex-start;
    .btn{
      height: 30px;
      display: flex;
      align-items: center;
      padding: 0 5px;
      justify-content: center;
      border-radius: 10px;
      margin: 10px 0;
      border: 1px solid #545454;
      p{
        font-size: 1.286em;
        color: $default;
      }
      &:focus{
        outline: 3px dashed #990094;
      }
    }
  }
  &_bar{
    max-width: 247px;
    margin: 0 auto;
    margin-top: 10px;
    padding-bottom: 30px;
    .item{
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px dashed #545454;
      img{
        width: 38px;
        height: 38px;
        margin-right: 10px;
      }
      p{
        color: $default;
        font-size: 1.286em;
      }
    }
  }

  .el-collapse-item{
    &__header{
      height: auto;
      position: relative;
      font-size: 1.286em;
      border-bottom: 1px dashed #545454;
      a{
        width: 100%;
        border: 0;
        p{
          font-size: 100%;
        }
        &:focus{
          outline: none;
        }
      }
      &:focus{
        outline: 3px dashed #990094;
      }
    }
    &__arrow{
      color: $default;
      font-size: 100%;
      transform: rotate(90deg);
      position: absolute;
      right: 30px;
    }
    &__arrow.is-active{
      transform: rotate(-90deg);
    }
    &__content{
      .item p{
        font-size: 1.583em;
      }
      a{
        &:focus{
          outline: none;
        }
      }
      padding-bottom: 0;
    }
  }
}
</style>
