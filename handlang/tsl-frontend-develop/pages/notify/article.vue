<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="notifyArticle">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <nuxt-link to="/" title="首頁">首頁</nuxt-link> / <nuxt-link to="/notify">訊息通知</nuxt-link> / <nuxt-link to="/notify/article?id=123">訊息通知內容</nuxt-link>
    </span>

    <div id="content" class="notifyArticle--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>訊息通知內容</h2>
    </div>

    <div class="notifyArticle_content">
      <p class="word">
        訊息種類：{{ form.type===1?'email':'簡訊' }}
      </p>
      <p class="word">
        通知項目：{{ form.objectName }}
      </p>
      <p class="word">
        發送時間：{{ $moment(form.createdDateTime).format('yyyy/MM/DD HH:mm') }}
      </p>
      <div class="content">
        <p class="content_title">
          發送內容：
        </p>
        <!--eslint-disable-next-line vue/no-v-html-->
        <p v-html="form.contant" />
      </div>

      <el-button class="TSLbutton" @click="$router.push({ path: '/notify' })">
        <p>返回</p>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
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
      form: {},
      newsObj: [
        {
          id: '1',
          name: '註冊審核通知結果'
        },
        {
          id: '2',
          name: '服務申請通知'
        },
        {
          id: '3',
          name: '案件處理結果通知'
        },
        {
          id: '4',
          name: '服務異動通知'
        },
        {
          id: '5',
          name: '服務取消通知'
        },
        {
          id: '6',
          name: '服務提醒通知'
        },
        {
          id: '7',
          name: '服務未回報通知'
        },
        {
          id: '8',
          name: '權益申訴通知'
        },
        {
          id: '9',
          name: '權限申請通知'
        },
        {
          id: '10',
          name: '權限申請結果通知'
        },
        {
          id: '11',
          name: '滿意度回饋提醒通知'
        },
        {
          id: '12',
          name: '忘記密碼通知'
        }
      ]
    }
  },
  mounted () {
    this.form = JSON.parse(sessionStorage.getItem('notifyForm'))
  },
  methods: {
  }
}
</script>

<style lang="scss">
.notifyArticle{
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
      font-size: 20px;
      @include ipadSize{
        font-size: 18px;
      }
    }
    .word{
      margin-bottom: 30px;
    }
    .content{
      margin-bottom: 30px;
      &_title{
        margin-bottom: 10px;
      }
      p, span{
        font-size: 20px;
        @include ipadSize{
          font-size: 18px;
        }
      }
    }
  }
}
</style>
