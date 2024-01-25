<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="newsArticle">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/news">最新消息</a> / <a href="/news/article?id=123">最新消息內容</a>
    </span>

    <div id="content" class="newsArticle--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>最新消息內容</h2>
    </div>

    <div class="newsArticle_content">
      <div class="title">
        <p>{{ form.title }}</p>
      </div>
      <div class="data">
        <p><span v-if="closeDiv(form.contactName)!=false">聯絡資訊：{{ form.contactName }}</span> <span v-if="closeDiv(form.contactPhoneNum)!=false">/ 聯絡電話：{{ form.contactPhoneNum }}</span></p>
      </div>
      <div class="dataph">
        <!-- <p>發佈日期：{{ $moment(form.beginDateTime).format('yyyy/MM/DD HH:mm') }}</p> -->
        <p v-if="closeDiv(form.contactName)!=false">
          聯絡資訊：{{ form.contactName }}
        </p>
        <p v-if="closeDiv(form.contactPhoneNum)!=false">
          聯絡電話：{{ form.contactPhoneNum }}
        </p>
      </div>
      <!-- <p class="word">
        系統流水號：{{ form.seqNum }}
      </p>
      <p class="word">
        公告日期：{{ $moment(form.beginDateTime).format('yyyy/MM/DD HH:mm') }}
      </p>
      <p class="word">
        截止日期：{{ $moment(form.endDateTime).format('yyyy/MM/DD HH:mm') }}
      </p> -->
      <div class="content">
        <p class="content_title">
          公告內容：
        </p>
        <!--eslint-disable-next-line vue/no-v-html-->
        <p v-html="ReplaceAll(form.contant, '\n', '<br>')" />
      </div>
      <div v-if="closeDiv(form.files)!==false" class="annex">
        <p>相關附件：</p>
        <div v-if="fileList.length!=0" class="annex_file">
          <a v-for="item,index in fileList" :key="index" href="javascript:void(0);" class="annex_file--content" @click="filemanager_downloadOne(item.id, item.oriFileName)">
            <p>{{ item.oriFileName }}</p>
          </a>
        </div>
        <div v-else class="annex_file">
          <p>-</p>
        </div>
      </div>
      <div v-if="closeDiv(form.newsReferenceLinks)!=false || form.newsReferenceLinks.length!=0" class="link">
        <p>參考連結：</p>
        <a v-for="item,index in form.newsReferenceLinks" :key="index" :href="item.referenceLink" target="_blank">{{ item.referenceName }} (另開新視窗)</a>
      </div>
      <div class="data">
        <p> 瀏覽人次：{{ form.viewTimes }}</p>
      </div>
      <div class="dataph">
        <p> 瀏覽人次：{{ form.viewTimes }}</p>
      </div>

      <el-button class="TSLbutton" @click="$router.push({ path: '/news' })">
        <p>返回</p>
      </el-button>
    </div>
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
        title: '',
        createdDateTime: '',
        contactName: '',
        contactPhoneNum: '',
        seqNum: '',
        beginDateTime: '',
        endDateTime: '',
        contant: '',
        newsReferenceLinks: [],
        updatedDateTime: '',
        viewTimes: ''
      },
      fileList: []
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-最新消息-最新消息內容'
  },
  mounted () {
    this.form = JSON.parse(sessionStorage.getItem('newsForm'))
    if (this.form.files.length !== 0) {
      for (let i = 0; i < this.form.files.length; i++) {
        const item = this.form.files[i]
        this.fileList.push(item)
      }
    }
    this.form.viewTimes = this.closeDiv(this.form.viewTimes) !== false ? this.form.viewTimes : 0
    this.updateCounts_news()
  },
  methods: {
    async updateCounts_news () {
      const obj = {
        gid: this.form.gid
      }
      await frontendApi.updateCounts_news(obj)
    },
    ReplaceAll (strOrg, strFind, strReplace) {
      return strOrg.replace(new RegExp(strFind, 'g'), strReplace)
    }
  }
}
</script>

<style lang="scss">
.newsArticle{
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
  .TSLbutton{
    width: 100%;
    max-width: 113px;
  }
  &_content{
    width: 100%;
    max-width: 1220px;
    margin: 0 auto;
    p,a{
      letter-spacing: 3px;
      font-size: clamp(min(1.125em), pc(20), max(1.250em));
    }
    .word{
      margin-bottom: 30px;
    }
    .title{
      P{
        color: $red;
      }
    }
    .content{
      margin-bottom: 30px;
      &_title{
        margin-bottom: 10px;
      }
    }
    .data{
      height: 50px;
      display: flex;
      align-items: center;
      margin: 30px 0;
      background: #F5F5F5;
      @include phSize{
        display: none;
      }
    }
    .dataph{
      display: none;
      @include phSize{
        display: block;
        margin: 30px 0;
        background: #F5F5F5;
      }
    }
    .annex{
      margin-bottom: 25px;
      &_file{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        a{
          margin: 5px 0;
        }
        img{
          width: 50px;
          height: 50px;
        }
        p{
          font-size: 100%;
        }
        &--content{
          display: flex;
          align-items: center;
        }
      }
    }
    .link{
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      p{
        margin-bottom: 10px;
      }
      a{
        display: flex;
      }
    }
  }
}
</style>
