// import frontendApi from '@/assets/api/frontendApi'
export const mixinBase = {
  data () {
    return {
      TSLtoken: '',
      TSLtype: 0,
      TSLform: {},
      tabtype: true
    }
  },
  mounted () {
    this.getlocalitme()
  },
  methods: {
    nullreturn (val) {
      const vm = this
      if (vm.closeDiv(val) !== false) {
        return val
      } else {
        return ''
      }
    },
    cancalReadOnly (onOff) {
      this.$nextTick(() => {
        if (!onOff) {
          const featureInput = document.querySelector('.featureInput .el-input__inner')
          featureInput.removeAttribute('readonly')
        }
      })
    },
    getlocalitme () {
      const vm = this
      if (vm.closeDiv(localStorage.getItem('TSLtoken')) !== false) {
        vm.TSLtoken = localStorage.getItem('TSLtoken')
        vm.TSLtype = Number(localStorage.getItem('TSLtype'))
        vm.TSLform = JSON.parse(localStorage.getItem('TSLform'))
        window.addEventListener('locate-localstorage-changed', (event) => {
          vm.TSLtoken = event.detail.TSLtoken
          vm.TSLform = JSON.parse(event.detail.TSLform)
        })
      }
    },
    closeDiv (value) {
      // eslint-disable-next-line eqeqeq
      if (value == null || value == 'null' || value == undefined || value == 'undefined' || value == '') {
        return false
      }
    },
    removeArr (item) {
      let what; const a = arguments; let L = a.length; let ax
      while (L > 1 && item.length) {
        what = a[--L]
        while ((ax = item.indexOf(what)) !== -1) {
          item.splice(ax, 1)
        }
      }
    },
    filemanager_downloadOne (key) {
      // console.log(key)
      // console.log(process.env.API_BASE + '/api/filemanager/downloadby1?key=' + key)
      // alert(key)
      // alert(process.env.API_BASE + '/api/filemanager/downloadby1?key=' + key)
      window.open(process.env.API_BASE + '/api/filemanager/downloadby1?key=' + key)
      // const obj = {
      //   key
      // }
      // const res = await frontendApi.filemanager_downloadOne(obj)
      // const blob = new Blob([res], { type: 'application/zip' })
      // const filename = name
      // const elink = document.createElement('a')
      // elink.download = filename
      // elink.style.display = 'none'
      // elink.href = URL.createObjectURL(blob)
      // document.body.appendChild(elink)
      // elink.click()
      // URL.revokeObjectURL(elink.href)
      // document.body.removeChild(elink)
    },
    elFormErrorScrollIntoView () {
      const element = document.querySelectorAll('.el-form-item__error')[0]
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }
}
