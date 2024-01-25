<template>
  <div v-loading="loading" class="individualAcct">
    <individualAcctPersonalAcct v-if="acctType==1" />
    <individualAcctUnitAcct v-if="acctType==2" />
    <individualAcctServiceAcct v-if="acctType==3" />
    <individualAcctAdmainAcct v-if="acctType==4 || acctType==5" />
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
      acctType: null,
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.acctType = this.TSLform.acctType
      this.loading = false
    }, '1000')
  }
}
</script>

<style lang="scss">
.individualAcct{
  min-height: 100vh;
  .el-loading-mask{
    transition: none;
    background-color: rgb(255, 255, 255);
    .el-loading-spinner .path{
      stroke: $red;
    }
  }
}
</style>
