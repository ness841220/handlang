/* eslint-disable eqeqeq */
import axios from 'axios'

// 加入loading的動畫
axios.interceptors.request.use((request) => {
  window.$nuxt.$emit('loading', request.headers.Loading)
  return request
}, error => Promise.reject(error))

axios.interceptors.response.use((response) => {
  const res = response.data
  if (res.isSuccess == false && res.message === '請重新登入') {
    if (window.$nuxt.$route.name !== 'index') {
      let cookieVal = ''
      const name = 'TSLtoken'
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) {
        cookieVal = parts.pop().split(';').shift()
      }
      const exp = new Date()
      exp.setTime(exp.getTime() - 1)
      const cval = cookieVal
      if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
      }
      localStorage.removeItem('TSLtoken')
      localStorage.removeItem('TSLform')
      window.$nuxt.$router.push('/')
    }
  }
  //   if (res.code !== 200) {
  //     if (res.code == 411 ||
  //         res.code == 412 ||
  //         res.code == 413 ||
  //         res.code == 414 ||
  //         res.code == 415 ||
  //         res.code == 416 ||
  //         res.code == 417 ||
  //         res.code == 418 ||
  //         res.code == 419 ||
  //         res.code == 420 ||
  //         res.code == 421
  //     ) {
  //       window.$nuxt.$store.commit('user/CLEAR')
  //       if (window.$nuxt.$route.name !== 'login') {
  //         window.$nuxt.$router.push('/login')
  //       }
  //     }
  //   }

  window.$nuxt.$emit('loading', false)
  return response
})

class Api {
  static SERVER = process.env.API_BASE

  static TOKEN

  static async callAxios (method, url, params, contentType, auth, isDownload) {
    const headers = {}
    let responseTypeText = 'json'
    headers['Content-Type'] = contentType || 'form-data'

    if (auth) {
      headers['TSL-token'] = localStorage.getItem('TSLtoken')
    }

    /**
     * 如果要下載檔案
     * 設定 'responseType' 為 'arraybuffer
     */
    if (isDownload) {
      responseTypeText = 'blob'
    }
    try {
      const { status, data } = await axios({
        headers,
        method,
        url: this.SERVER + url,
        data: params,
        responseType: responseTypeText
      })
      return new Promise((resolve, reject) => {
        if (status === 200) {
          resolve(data)
        } else {
          reject(new Error(' '))
          this.$message.error(data.message)
        }
      })
    } catch (error) {
      return error
    }
  }

  static async callAxiosJson (method, url, params, contentType, auth, isDownload) {
    const headers = {}
    let responseTypeText = 'json'

    headers['Content-Type'] = contentType || 'application/json';

    if (auth) {
      headers['TSL-token'] = localStorage.getItem('TSLtoken')
      // const token = 'Bearer' + localStorage.getItem('TSLtoken')
      headers.Aauthorization = 'Bearereb42632606e9261f'
    }

    /**
     * 如果要下載檔案
     * 設定 'responseType' 為 'arraybuffer
     */
    if (isDownload) {
      responseTypeText = 'blob'
    }

    try {

      const { status, data } = await axios({
        headers,
        method,
        url: this.SERVER + url,
        data: params,
        responseType: responseTypeText
      })
      // console.log(process.env.API_BASE)
      return new Promise((resolve, reject) => {
        if (status === 200) {
          resolve(data)
        } else {
          reject(new Error(' '))
          this.$message.error(data.message)
        }
      })
    } catch (error) {
      if (error.toString().includes('400')) {
        window.$nuxt.$store.commit('user/CLEAR')
        if (window.$nuxt.$route.name !== '') {
          window.$nuxt.$router.push('/')
        }
      }
      return error
    }
  }
}

export default Api
