<template>
  <div id="content" class="frontPage">
    <div class="frontPage_pc">
      <div class="frontPage_item">
        <!-- <FrontPageResetPass v-if="resetPass" /> -->
        <FrontPageLogin
          v-if="!forgetPass"
          :forget-pass.sync="forgetPass"
          :input1="finput1"
          :input2="finput2"
          :input3="finput3"
          @rtnUpdateInput="rtnUpdateInput"
        />
        <FrontPageForgetpass v-else :forget-pass.sync="forgetPass" />
      </div>
      <div class="frontPage_item">
        <FrontPageRegister />
      </div>
    </div>
    <div class="frontPage_ph">
      <el-radio-group v-model="frontPagePh">
        <el-radio-button :label="0" tabindex="0">
          <p>會員登入</p>
        </el-radio-button>
        <el-radio-button :label="1" tabindex="0">
          <p>會員註冊</p>
        </el-radio-button>
      </el-radio-group>
      <div class="frontPage_item">
        <!-- <FrontPageResetPass v-if="resetPass && frontPagePh==0" /> -->
        <FrontPageRegister v-if="frontPagePh==1" />
        <FrontPageLogin
          v-if="frontPagePh==0 && !forgetPass"
          :forget-pass.sync="forgetPass"
          :input1="finput1"
          :input2="finput2"
          :input3="finput3"
          @rtnUpdateInput="rtnUpdateInput"
        />
        <FrontPageForgetpass v-if="frontPagePh==0 && forgetPass" :forget-pass.sync="forgetPass" />
      </div>
    </div>
  </div>
</template>

<script>
// import frontendApi from '@/assets/api/frontendApi'
export default {
  name: 'FrontPage',
  // eslint-disable-next-line require-await
  async asyncData ({ app, redirect }) {
    const TSLtoken = app.$cookies.get('TSLtoken')
    if (TSLtoken !== undefined && TSLtoken !== null) {
      redirect('/caseInquiry')
    }
  },
  data () {
    return {
      forgetPass: false,
      frontPagePh: 0,
      finput1: '',
      finput2: '',
      finput3: ''
    }
  },
  mounted () {
  },
  methods: {
    rtnUpdateInput (type, val) {
      switch (type) {
        case '1':
          this.finput1 = val
          break
        case '2':
          this.finput2 = val
          break
        case '3':
          this.finput3 = val
          break
      }
    }
  }
}
</script>

<style lang="scss">
.frontPage{
  padding-top: clamp(min(26px), pc(70), max(70px));
  &_pc{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &_ph{
    display: none;
  }
  &_item{
    width: 100%;
    max-width: 750px;
    min-height: 750px;
    padding: 0 20px;
    background: #FFF9F9;
    margin: 0 11px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px 0px rgba(192, 71, 41, 0.25) inset;
    .title{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: clamp(min(30px), pc(50), max(50px));
      img{
        margin-right: 10px;
      }
      h2{
        color: $red;
        letter-spacing: 3px;
      }
    }
  }

  @include ipadSize{
    &_pc{
      display: none;
    }
    &_ph{
      display: block;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 11px;
      .el-radio-group{
        display: flex;
        font-size: 1.286em;
        margin-bottom: 26px;
        p{
          font-size: 100%;
          color: #ffffff;
        }
      }
      .el-radio-button{
        margin: 0 10px;
      }
      .el-radio-button.is-active{
        p{
          color: $default;
        }
        .el-radio-button__inner{
          background-color: #ffffff;
          border: 1px solid #545454;
        }
      }
      .el-radio-button__inner{
        width: 130px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 10px;
        background: $red;
      }
      .el-radio-button:first-child .el-radio-button__inner,
      .el-radio-button:last-child .el-radio-button__inner{
        border-radius: 10px;
        box-shadow:none;
      }
      .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        outline: 3px dashed #990094;
      }
    }

    &_item{
      margin: 0;
      min-height: auto;
      padding-bottom: 30px;
    }
  }
}
</style>
