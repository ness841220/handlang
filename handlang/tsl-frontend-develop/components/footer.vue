<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="footer">
    <div class="footer_link">
      <hr>
      <div class="word">
        <img src="~/static/img/linkIcon.png" alt="連結專區">
        <p>連結專區</p>
      </div>
      <hr>
    </div>
    <div class="footer_swiper">
      <client-only>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="item,index in footerLink" :key="index">
            <a :href="item.linkUrl" :title="item.linkName" target="_blank"><img :src="'data:' + item.imgType + ';base64,' + item.image" :alt="item.linkName"></a>
          </swiper-slide>
          <div slot="button-prev" class="swiper-button-prev" />
          <div slot="button-next" class="swiper-button-next" />
        </swiper>
      </client-only>
    </div>
    <div class="footer_botton">
      <div class="content">
        <div class="left">
          <p>受理時間：週一至週五8:30~17:30（不含例假日）</p>
          <div class="severContent">
            <p>服務專線：0800-365-324</p>
            <p>電子信箱：ntcst@nad.org.tw</p>
            <p>傳真：0800-365-524</p>
            <p>手機/LINE帳號：0963047746</p>
            <p>委辦單位：中華民國聾人協會</p>
            <p>如有系統相關問題請寄信至signtext@ntpc.gov.tw</p>
          </div>
        </div>
        <div class="qrimg">
          <img src="~/static/img/LINE.png" alt="「新北市社會局手語翻譯暨同步聽打中心Line QRcode」">
        </div>
        <div class="right">
          <a id="a_z" href="#a_z" accesskey="Z" class="location">:::</a>
          <p>外部網站</p>
          <a href="https://www.sw.ntpc.gov.tw" title="新北市政府社會局" target="_blank">新北市政府社會局(另開視窗)</a>
          <a href="https://www.facebook.com/goodday.ntpc/?locale=zh_TW" title="新北市政府社會局FB" target="_blank">新北市政府社會局FB<img src="~/static/img/Facebook.png" alt="">(另開視窗)</a>
          <a href="https://service.ntpc.gov.tw/service/Index.action" title="新北市政府雲端櫃台" target="_blank">新北市政府雲端櫃台(另開視窗)</a>
        </div>
      </div>
      <div class="icon">
        <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20231013092936" title="無障礙網站" target="_blank">
          <img src="~/static/img/footerImg.jpg" alt="通過AA無障礙網頁檢測">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import frontendApi from '@/assets/api/frontendApi'
export default {
  data () {
    return {
      footerLink: [],
      swiperOption: {
        spaceBetween: 5,
        loop: true,
        loopedSlides: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        a11y: {
          prevSlideMessage: '上一個連結',
          nextSlideMessage: '下一個連結'
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 30
          }
        }
      }
    }
  },
  mounted () {
    this.linksSetting_select()
  },
  methods: {
    async linksSetting_select () {
      const vm = this
      const obj = {
        gid: '',
        pageNum: 1,
        pageSize: 999999
      }
      const res = await frontendApi.linksSetting_select(obj)
      if (res.isSuccess === true) {
        if (res.data !== null) {
          vm.footerLink = res.data.linksSettingDTOs
        }
      } else {
        vm.footerLink = []
      }
    }
  }
}
</script>

<style lang="scss">
.footer{
  margin-top: 40px;
  &_link{
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    hr{
      width: 100%;
      height: 2px;
      border: 0;
      background-color: $red;
    }
    .word{
      display: flex;
      flex-shrink: 0;
      img{
        height: 25px;
        flex-shrink: 0;
        margin-left: 5px;
      }
      p{
        margin-left: 13px;
        margin-right: 20px;
      }
    }
  }
  &_swiper{
    max-width: 1652px;
    margin: 0 auto;
    padding: 5px 57px;
    position: relative;
    .swiper-container{
      position: static;
    }
    .swiper-slide{
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      overflow: hidden;
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
      }
      img{
        max-width: 100%;
        max-height: 100%;
        display: block;
        // @include phSize{
        //   height: 100%;
        // }
      }
    }
    .swiper-button-prev,.swiper-button-next{
      width: 37px;
      height: 37px;
      border-radius: 50%;
      background-color: $red;
      &::after{
        width: 30px;
        height: 100%;
        content: '';
        background-image: url('~/static/img/left-icon.png');
        background-repeat: no-repeat;
        background-size: contain;
        color: transparent;
        background-position:center,center;
      }
    }
    .swiper-wrapper{
      position: static;
    }
    .swiper-button-next{
      &::after{
        background-image: url('~/static/img/right.png');
      }
    }
  }
  &_botton{
    min-height: 390px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: flex-end;
    background-color: $default;
    .content{
      width: 100%;
      height: 100%;
      max-width: 1325px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      justify-content: space-between;
    }
    .left{
      p{
        color: #ffffff;
        letter-spacing: 3px;
        margin: .5% 0;
        font-size: clamp(min(112.5%), pc(20), max(125%));
      }
    }
    .right{
      width: 100%;
      max-width: 370px;
      position: relative;
      #a_z{
        width: 0;
        position: absolute;
        top: -20px;
        left: 0;
        font-size: 0;
        &:focus{
          width: auto;
          font-size: clamp(min(112.5%), pc(20), max(125%));
        }
      }
      p{
        color: #ffffff;
        letter-spacing: 3px;
        margin: .5% 0;
        margin-bottom: 4px;
        font-size: clamp(min(112.5%), pc(20), max(125%));
      }
      a{
        display: flex;
        align-items: center;
        color: #ffffff;
        letter-spacing: 3px;
        margin: .5% 0;
        font-size: clamp(min(112.5%), pc(20), max(125%));
        img{
          width: 40px;
          height: 40px;
        }
      }
    }
    .qrimg{
      width: 193px;
      height: 227px;
      margin: 0 3%;
      flex-shrink: 0;
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .severContent{
      max-width: 700px;
      p{
        word-break:break-all;
        font-size: clamp(min(112.5%), pc(20), max(125%));
        &:nth-child(2n+1){
          margin-right: 2%;
        }
      }
    }
    .icon{
      min-height: 56px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      img{
        max-width: 100%;
        height: 56px;
      }
    }

    @include ipadSize{
      .content{
        flex-direction: column;
      }
      .left{
        width: 100%;
        max-width: 700px;
      }
      .right{
        width: 100%;
        max-width: 700px;
      }
      .severContent{
        flex-direction: column;
        align-items: flex-start;
        p{
          width: 100%;
        }
      }
      .qrimg{
        margin: 20px 0;
      }
      .icon{
        margin-top: 20px;
      }
    }
  }
}
</style>
