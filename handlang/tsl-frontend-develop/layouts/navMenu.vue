<template>
  <div class="navMenu">
    <Header />
    <div class="navMenu_menu">
      <a id="a_l" href="#a_l" accesskey="L">
        :::
      </a>
      <el-menu
        ref="menuNavMenu"
        class="el-menu-navMenu"
        menu-trigger="click"
        :default-active="menuopens"
      >
        <el-menu-item v-if="acctType != 3" index="application">
          <nuxt-link to="/application" title="服務申請">
            <img src="~/static/img/icon/severForm.png" alt="">
            <p>服務申請</p>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="isLogin" index="caseInquiry">
          <nuxt-link to="/caseInquiry" title="案件查詢">
            <img src="~/static/img/icon/Analyze.png" alt="">
            <p>案件查詢</p>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="news">
          <nuxt-link to="/news" title="最新消息">
            <img src="~/static/img/icon/news.png" alt="">
            <p>最新消息</p>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="isLogin" index="notify">
          <nuxt-link to="/notify" title="訊息通知">
            <img src="~/static/img/icon/email.png" alt="">
            <p>訊息通知</p>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="acctType == 4 || acctType == 5" index="statistics">
          <nuxt-link to="/statistics" title="統計報表">
            <img src="~/static/img/icon/statistics.png" alt="">
            <p>統計報表</p>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="isLogin" index="appeal">
          <nuxt-link to="/appeal" title="申訴管理">
            <img src="~/static/img/icon/Typing.png" alt="">
            <p>申訴管理</p>
          </nuxt-link>
        </el-menu-item>
        <el-submenu v-if="acctType == 4 || acctType == 5" index="sysadmin">
          <template slot="title">
            <a href="javascript:void(0);" title="系統管理">
              <img src="~/static/img/icon/sysadminIcon.png" alt="">
              <p>系統管理</p>
            </a>
          </template>
          <el-menu-item index="sysadmin-acctmanage">
            <nuxt-link to="/sysadmin/acctmanage" title="帳號管理">
              <p>帳號管理</p>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="sysadmin-externalLink">
            <nuxt-link to="/sysadmin/externalLink" title="外部連結管理">
              <p>外部連結管理</p>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="sysadmin-setupParamete">
            <nuxt-link to="/sysadmin/setupParamete" title="參數設定">
              <p>參數設定</p>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="sysadmin-daily">
            <nuxt-link to="/sysadmin/daily" title="系統日誌">
              <p>系統日誌</p>
            </nuxt-link>
          </el-menu-item>
          <el-menu-item index="sysadmin-entityfiles">
            <nuxt-link to="/sysadmin/entityfiles" title="實體檔管理">
              <p>實體檔管理</p>
            </nuxt-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="isLogin" index="individualAcct">
          <nuxt-link to="/individualAcct" title="個人帳戶">
            <img src="~/static/img/icon/user.png" alt="">
            <p>個人帳戶</p>
          </nuxt-link>
        </el-menu-item>
      </el-menu>
      <div class="navMenu_in">
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuopens: '',
      acctType: '',
      isLogin: true
    }
  },
  watch: {
    $route (to) {
      this.getroute(to)
    }
  },
  mounted () {
    this.getroute(this.$route)
  },
  methods: {
    getroute (route) {
      let name = ''
      this.acctType = this.TSLform.acctType
      this.isLogin = this.TSLform.isLogin
      if (route.name.split('-')[0] === 'sysadmin') {
        name = 'sysadmin-' + route.name.split('-')[1]
      } else {
        name = route.name.split('-')[0]
      }
      this.menuopens = name
    }
  }
}
</script>

<style lang="scss">
.navMenu{
  &_menu{
    padding: 21px 0;
    display: flex;
    align-items: flex-start;
    position: relative;
    #a_l{
      color: transparent;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 2;
      &:focus{
        color: $default;
      }
    }
  }
  &_in{
    flex: 1;
    width: 100%;
    max-width: 1284px;
    margin: 0 10px;
    padding: 3px 11px;
    overflow: hidden;
    @include pcSize{
      margin: 0;
    }
  }
  .el-menu-navMenu{
    width: 255px;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-right: 25px;
    border-right: none;
    a{
      height: 100%;
      display: flex;
      font-size: 100%;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      border-radius: 10px;
      p{
        font-size: 100%;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
      }
      img{
        height: 35px;
        margin-right: 10px;
      }
      &:focus{
        background-color: #EFD1C9;
      }
    }
    .el-menu-item{
      width: 190px;
      height: 50px;
      line-height: 50px;
      padding: 0;
      margin-bottom: 20px;
      border-radius: 10px;
      padding-left: 0 !important;
      &:hover{
        background-color: #EFD1C9;
      }
      p{
        margin-right: 10px;
      }
    }
    .el-menu-item.is-active{
      a{
        background-color: #EFD1C9;
      }
    }
    .el-submenu{
      max-width: 190px;
      .el-menu-item{
        min-width: 155px;
      }
    }
    .el-submenu__title{
      width: 190px;
      height: 50px;
      line-height: 50px;
      padding: 0;
      margin-bottom: 20px;
      border-radius: 10px;
      padding-left: 0 !important;
      position: relative;
      &:hover{
        background-color: #EFD1C9;
      }
      a{
        font-size: 100%;
      }
      p{
        margin-right: 10px;
        font-size: clamp(min(1.286em), pc(20), max(1.429em));
      }
    }
    .el-submenu__icon-arrow{
      font-size: 100%;
      margin-top: 0;
      top: 0;
      bottom: 0;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $default;
    }
    .el-menu.el-menu--inline{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 4px;
      box-sizing: border-box;
      .el-menu-item{
        max-width: 155px;
        box-sizing: border-box;
        p{
          margin-right: 0;
        }
      }
    }
    .el-submenu.is-active.is-opened{
      .el-submenu__title{
        background-color: #EFD1C9;
      }
    }
    @include pcSize{
      display: none;
    }
  }
}
</style>
