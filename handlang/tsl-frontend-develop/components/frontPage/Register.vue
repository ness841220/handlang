<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register">
    <div class="title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>會員註冊</h2>
    </div>
    <div class="register_content">
      <div class="item">
        <p>| 聯絡我們</p>
        <p>承辦單位：中華民國聾人協會</p>
        <p>免付費電話：0800-365-324</p>
        <p>手機/簡訊：0963-047-746</p>
        <p>LINE官方帳號：@ntpc0963047746</p>
      </div>
      <div class="item">
        <p>| 申請方式</p>
        <p>註冊後方能提出手語翻譯及同步聽打服務，並於需求日5個工作天前，於本系統提出並檢具相關附件，即可申請服務。</p>
      </div>
    </div>

    <div class="register_btn">
      <el-button class="TSLbutton" @click="$router.push({ path: '/prsonalRegister' })">
        <p>個人註冊</p>
      </el-button>
      <el-button class="TSLbutton red" @click="$router.push({ path: '/unitRegister' })">
        <p>單位註冊</p>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
/* 會員註冊 */
.register{
  &_content{
    min-height: 300px;
    max-width: 553px;
    margin: clamp(min(10px), pc(104), max(104px)) auto;
    margin-bottom: 80px;
  }
  .item{
    &:first-child{
      margin-bottom: clamp(min(44px), pc(54), max(54px));
    }
    p{
      text-align: justify;
      line-height: 150%;
      letter-spacing: 3px;
    }
    @include phSize{
      p{
        font-size: 112.5%;
      }
    }
  }
  &_btn{
    display: flex;
    justify-content: center;
    .TSLbutton{
      width: 100%;
      max-width: 180px;
    }
  }
}
</style>
