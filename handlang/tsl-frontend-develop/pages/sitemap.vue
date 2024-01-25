<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sitemap">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/sitemap">網站導覽</a>
    </span>

    <div id="content" class="sitemap--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>網站導覽</h2>
    </div>
    <div class="sitemap_content">
      <p>本網站依無障礙網頁設計原則建置，網站的主要內容分為三大區塊：</p>
      <p>1. 上方功能區塊、2. 中央內容區塊、3.左側功能區塊、4.下方功能區塊。</p>
      <br>
      <br>
      <p>本網站的快速鍵﹝Accesskey﹞設定如下：</p>
      <br>
      <br>
      <p>• Alt+U：右上方功能區塊，包括回首頁、網站導覽、網站搜尋、字體選擇等。</p>
      <p>• Alt+C：中央內容區塊，為本頁主要內容區。</p>
      <p>• Alt+L：左側功能區塊。</p>
      <p>• Alt+Z：下方功能區塊。</p>
      <p>如果您的瀏覽器是Firefox，快速鍵的使用方法是 Shift+Alt+(快速鍵字母)，例如 Shift+Alt+C會跳至網頁中央區塊，以此類推。</p>
      <br>
      <br>
      <p>※當本網站項目頁籤無法以滑鼠點選時，您可利用以下鍵盤操作方式瀏覽資料</p>
      <p>← → or ↑↓：按左右鍵或上下鍵移動標籤順序。</p>
      <p>Home or End→：可直接跳至標籤第一項或者最後一項。</p>
      <p>Tab：停留於該標籤後,可利用Tab鍵跳至內容瀏覽該筆資料，遇到radio按鈕時請配合使← → or↑↓鍵移動項目順序。</p>
      <p>Tab + Shift：按Tab + Shift可往回跳至上一筆資料；當跳回至標籤項目時您可繼續利用← → or↑↓鍵移動標籤順序。</p>
      <br>
      <br>
      <p><a href="/application">1.服務申請</a></p>
      <p><a href="/caseInquiry">2.案件查詢</a></p>
      <p><a href="/news">3.最新消息</a></p>
      <p><a href="/notify">4.訊息通知</a></p>
      <p><a href="/statistics">5.統計報表</a></p>
      <p><a href="/appeal">6.申訴管理</a></p>
      <p>7.系統管理</p>
      <p style="padding-left: 20px;">
        -<a href="/sysadmin/acctmanage">帳號管理</a>
      </p>
      <p style="padding-left: 20px;">
        -<a href="/sysadmin/externalLink">外部連結管理</a>
      </p>
      <p style="padding-left: 20px;">
        -<a href="/sysadmin/setupParamete">參數設定</a>
      </p>
      <p style="padding-left: 20px;">
        -<a href="/sysadmin/daily">系統日誌紀錄</a>
      </p>
      <p style="padding-left: 20px;">
        -<a href="/sysadmin/entityfiles">實體檔管理</a>
      </p>
      <p><a href="/individualAcct">8.個人帳戶</a></p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'navMenu',
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-網站導覽'
  }
}
</script>

<style lang="scss">
.sitemap{
  padding-bottom: 200px;
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
  &_content{
    max-width: 1230px;
    margin: 0 auto;
    p{
      letter-spacing: 3px;
      margin-bottom: 4px;
    }
  }
}
</style>
