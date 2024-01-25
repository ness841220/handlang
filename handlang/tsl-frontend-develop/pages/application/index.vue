<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="application">
    <span class="breadcrumb">
      <a id="a_c" href="#a_c" accesskey="C" class="breadcrumb_title" title="目前位置">
        :::目前位置：
      </a>
      <a href="/" title="首頁">首頁</a> / <a href="/application" title="服務申請">服務申請</a>
    </span>

    <div id="content" class="application--title">
      <img src="~/static/img/doubleRight.png" alt="">
      <h2>服務申請</h2>
    </div>

    <div class="application_element">
      <div class="item">
        <p>主辦單位</p>
        <div class="item_in">
          <p>新北市政府社會局</p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>承辦單位</p>
        <div class="item_in">
          <p>中華民國聾人協會</p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>服務對象</p>
        <div class="item_in">
          <p>1. 機關或單位：公務機關、本市各區公所、警政司法機關、各級學校、醫療院所、非營利組織等公共服務單位。</p>
          <p>2. 個人：持身心障礙證明，屬聽、語障者或合併聽、語障之多重障礙者。</p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>服務地點</p>
        <div class="item_in">
          <p>1. 新北市</p>
          <p>2. 台北市、基隆市、桃園市則視人力調配狀況提供服務。</p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>受理申請時間</p>
        <div class="item_in">
          <p>1. 一般申請：週一至週五 8:30〜17:30，不含例假日</p>
          <p>2. 夜間緊急或臨時性需要：得隨時透過服務專線0800-365-324電話/簡訊提出申請，本中心視人力調配狀況提供服務。</p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>服務項目</p>
        <div class="item_in">
          <p>1. 政府機關相關業務事項之手語翻譯服務/同步聽打服務。</p>
          <p>2. 民間立案非營利團體辦理各項對外公開未收費之活動、研習、會議。</p>
          <p>3. 受理警政或法務偵查、交通事故處理、獄所等或其他夜間緊急、臨時性事務需求提供服務。</p>
          <p>4. 醫療院所之門診、健檢、復健及療育。(包含於安養機構、心理諮商所等處所接受與身心健康相關之服務)。</p>
          <p>5. 學校辦理之親師座談會、返校日等就學會議活動。</p>
          <p>6. 其他必要性服務。</p>
          <p class="red">
            ★以下類型非屬本計畫之服務範圍，如有自費服務需求敬請聯繫洽詢：
          </p>
          <p class="red">
            (1) 一般在校求學課程、就業相關之在職訓練及職業訓練等課程。
          </p>
          <p class="red">
            (2) 連續週期達1個月之長期活動。
          </p>
          <p class="red">
            (3) 非營利組織、私人商業利益及團體之理監事會議、會員大會、內部會議及訓練等。
          </p>
        </div>
      </div>
      <br>
      <br>
      <div class="item">
        <p>申請單位注意事項</p>
        <div class="item_in">
          <p>1. 申請手語翻譯/同步聽打應未涉及私人商業利益，且不得指定手語翻譯員/同步聽打員。</p>
          <p>
            2. 請於服務時間5天前提出申請，並檢附相關資料（如：門診掛號單、研習課程表、開會通知單…等），並詳述申請
            事由且預估服務時間俾利審核及派遣(警政、司法、醫療急診等緊急案件，不受5天前提出規定限制)。
          </p>
          <p>3. 聽打服務員非筆記抄寫或會議記錄人員，僅服務於現場。</p>
          <p>4. 申請手語翻譯服務/同步聽打服務後，請準時出席，若臨時取消或變更服務時間，應於2天前提出(如遇緊急臨時不可抗之因素不在此限)。</p>
          <p>
            5. 服務當天，聽障者未出席或欲取消但未及時告知手譯中心，缺席之聽障者記點一次並發文提醒，年度計點達三次
            者，由第三次記點日起停權一個月(機構申請部分不適用該條停權處分)。
          </p>
          <p>6. 同一申請案（同一活動、會議場合）已有主辦單位申請服務，將以主辦單位申請為主，不再重複派員。</p>
          <p>
            7. 同一申請案（同一活動、會議場合）原則上以手語翻譯與同步聽打擇一提供服務；惟2名以上聽語障者分別有手語
            翻譯及聽打服務之不同需求，始可個別派遣服務人員。
          </p>
          <p>8. 申請者（單位）請務必於服務結束後3日內填寫「服務滿意度調查表」回傳</p>
          <p>9. 為了解同步聽打服務執行情形，本協會人員將不定期至服務案件現場進行訪視。</p>
        </div>
      </div>

      <label for="checkboxNmae" class="read">
        <input id="checkboxNmae" v-model="read" type="checkbox" class="checkboxInput">
        <!-- <el-checkbox id="checkboxNmae" v-model="read" title="申請須知" /> -->
        <p>*本人已詳讀〔申請須知〕且保證本申請表所填寫內容及檢附文件均屬實，如有違反願負一切責任。</p>
      </label>
    </div>

    <div class="application_btn">
      <el-button class="TSLbutton red" @click="readapplication(0)">
        <p>手語翻譯服務申請</p>
      </el-button>
      <el-button class="TSLbutton red" @click="readapplication(1)">
        <p>同步聽打服務申請</p>
      </el-button>
    </div>

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
export default {
  layout: 'navMenu',
  data () {
    return {
      read: false,
      defaultText: '',
      defaultId: 0,
      defaultPopUps: false
    }
  },
  head: {
    title: '新北市手語翻譯暨同步聽打服務線上申辦系統-服務申請'
  },
  methods: {
    readapplication (val) {
      const vm = this
      if (vm.closeDiv(localStorage.getItem('TSLtoken')) === false) {
        vm.defaultText = '請先登入'
        vm.defaultPopUps = true
        vm.defaultId = 1
        return
      } else if (this.TSLform.isReal === '2' || this.TSLform.isReal === '0') {
        vm.defaultText = '您好，經系統資料驗證後，未符合身障福利資格，無法申請服務，請聯繫行政窗口。'
        vm.defaultPopUps = true
        vm.defaultId = 0
        return
      }
      if (vm.read === true) {
        switch (val) {
          case 0:
            this.$router.push({ path: '/application/form?lang=tsl' })
            break
          case 1:
            this.$router.push({ path: '/application/form?lang=listen' })
            break
        }
      } else {
        vm.defaultText = '請先詳讀〔申請須知〕且保證本申請表所填寫內容及檢附文件均屬實'
        vm.defaultPopUps = true
      }
    }
  }
}
</script>

<style lang="scss">
.application{
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
    justify-content: center;
    @include phSize{
      flex-direction: column;
      .TSLbutton.red{
        margin: 0;
        margin-bottom: 10px;
      }
    }
  }

  &_element{
    max-width: 1230px;
    margin: 0 auto;
    p{
      letter-spacing: 3px;
      margin-bottom: 5px;
      line-height: 150%;
      text-align: justify;
    }
    .item{
      &_in{
        p{
          padding-left: 50px;
        }
      }
    }
    .red{
      color: red;
    }

    .read{
      max-width: 100%;
      min-height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 30px 0;
      p{
        margin-bottom: 0;
        margin-left: 10px;
      }
      .checkboxInput{
        width: 25px;
        height: 25px;
        &:focus{
          outline: 3px dashed #990094;
        }
      }
    }
  }
}
</style>
