import frontendApi from '@/assets/api/frontendApi'
export default {
  data () {
    return {
      cityData: [],
      genderData: []
    }
  },
  mounted () {
    this.getByCity()
  },
  methods: {
    getToday () {
      const Today = new Date()
      return Today.getFullYear() + '/' + (Today.getMonth() + 1) + '/' + Today.getDate()
    },
    async handlang_acctInfo () {
      const token = localStorage.getItem('TSLtoken')
      const obj = {
        token
      }
      const res = await frontendApi.handlang_acctInfo(obj)
      if (res.isSuccess === true) {
        return res.data
      }
    },
    async getByCity () {
      const res = await frontendApi.getByCity()
      if (res.isSuccess === true) {
        this.cityData = res.data
      }
    },
    async getByType (type) {
      let codeId = ''
      for (let i = 0; i < this.cityData.length; i++) {
        const item = this.cityData[i]
        if (item.strVal === type) {
          codeId = item.codeId
        }
      }
      const obj = {
        codeType: codeId
      }
      const res = await frontendApi.getByType(obj)
      if (res.isSuccess === true) {
        this.genderData = res.data
      }
    }
  }
}
