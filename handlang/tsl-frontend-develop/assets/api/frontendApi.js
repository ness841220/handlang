import Api from './api'

class FrontendApi extends Api {
  /* 登入接口  */
  static async handlang_login (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/login', json, undefined, false)
    return res
  }

  /* 登出接口  */
  static async logout (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/logout', json, undefined, false)
    return res
  }

  /* 驗證碼_取得驗證碼  */
  static async getVerifyCode () {
    const formData = new FormData()
    const res = await this.callAxios('POST', '/api/handlang/getVerifyCode', formData, undefined, false)
    return res
  }

  /* 驗證碼_驗證接口  */
  static async chkVerifyCode (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/chkVerifyCode', json, undefined, false)
    return res
  }

  /* 個人註冊接口  */
  static async personal_register (json) {
    const res = await this.callAxiosJson('POST', '/api/SignLanguage/register', json, undefined, false)
    return res
  }

  /* 帳號驗證  */
  static async acct_verify (json) {
    const res = await this.callAxiosJson('POST', '/api/SignLanguage/acctverify', json, undefined, false)
    return res
  }

  /* 個人(單位)帳號資訊  */
  static async handlang_acctInfo (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctInfo', json, undefined, true)
    return res
  }

  /* 修改個人(單位)帳號資訊  */
  static async acctInfo_register_edit (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctEdit', json, undefined, true)
    return res
  }

  /* 忘記密碼_驗證身分  */
  static async forgotPass_verifyAcct (json) {
    const res = await this.callAxiosJson('POST', '/api/forgotPass/verifyaccount', json, undefined, false)
    return res
  }

  /* 忘記密碼_驗證身分  */
  static async forgotPass_resetPassword (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctSetPassWord', json, undefined, false)
    return res
  }

  /* 申請案件API  */
  static async applycase_apply (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/apply', json, undefined, true)
    return res
  }

  /* 申請案件API-改  */
  static async applycase_edit (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/edit', json, undefined, true)
    return res
  }

  /* 機關API  */
  static async getCodeAsGroup (json) {
    const res = await this.callAxiosJson('POST', '/api/getCodeAsGroup', json, undefined, false)
    return res
  }

  /* 取得城市  */
  static async getByCity () {
    const formData = new FormData()
    const res = await this.callAxios('POST', '/api/getByCity', formData, undefined, false)
    return res
  }

  /* 取得地區  */
  static async getByType (json) {
    const res = await this.callAxiosJson('POST', '/api/getByType', json, undefined, false)
    return res
  }

  /* 上傳檔案 */
  static async UploadFile ({
    File, Type, Category
  }) {
    const formData = new FormData()
    formData.append('File', File)
    formData.append('Type', Type)
    formData.append('Category', Category)
    const res = await this.callAxios('POST', '/api/filemanager/UploadFile', formData, undefined, false)
    return res
  }

  /* 上傳檔案 更新KEY  */
  static async UpdateForeignKey (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/UpdateForeignKey', json, undefined, false)
    return res
  }

  /* 刪除檔案  */
  static async DeleteByRangeKey (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/DeleteByRangeKey', json, undefined, false)
    return res
  }

  /* 刪除檔案  */
  static async filemanagerDeleteFile (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/DeleteFile', json, undefined, false)
    return res
  }

  // ======== 最新消息 ======== //
  /* 查詢_最新消息  */
  static async select_news (json) {
    const res = await this.callAxiosJson('POST', '/api/news/select', json, undefined, false)
    return res
  }

  /* 新增_最新消息  */
  static async create_news (json) {
    const res = await this.callAxiosJson('POST', '/api/news/create', json, undefined, true)
    return res
  }

  /* 編輯_最新消息  */
  static async edit_news (json) {
    const res = await this.callAxiosJson('POST', '/api/news/edit', json, undefined, true)
    return res
  }

  /* 瀏覽人次更新  */
  static async updateCounts_news (json) {
    const res = await this.callAxiosJson('POST', '/api/news/updateCounts', json, undefined, true)
    return res
  }

  // ======== 訊息通知 ======== //
  /* 查詢_訊息通知  */
  static async messageLogs_select (json) {
    const res = await this.callAxiosJson('POST', '/api/messageLogs/select', json, undefined, true)
    return res
  }

  // ======== 案件查詢 ======== //
  /* 查詢案件API  */
  static async applyCaseSelect (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseSelect', json, undefined, true)
    return res
  }

  /* 查詢案件(GID)API  */
  static async applyCaseSelectByGid (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseSelectByGid', json, undefined, true)
    return res
  }

  /* 查詢案件(GID)API2  */
  static async applyCaseSelectByCondition (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseSelectByCondition', json, undefined, true)
    return res
  }

  /* 編輯案件API  */
  static async applyCaseEdit (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseEdit', json, undefined, true)
    return res
  }

  /* 編輯案件API(派案用)  */
  static async applyCaseEditService (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseEditService', json, undefined, true)
    return res
  }

  /* 查詢_帳號資訊(服務人員選單)  */
  static async acctServiceList (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctServiceList', json, undefined, true)
    return res
  }

  /* 滿意度調查_查詢  */
  static async clientsRespons_select (json) {
    const res = await this.callAxiosJson('POST', '/api/clientsRespons/select', json, undefined, true)
    return res
  }

  /* 滿意度調查_新增  */
  static async clientsRespons_Add (json) {
    const res = await this.callAxiosJson('POST', '/api/clientsRespons/Add', json, undefined, true)
    return res
  }

  /* 滿意度調查_修改  */
  static async clientsRespons_Edit (json) {
    const res = await this.callAxiosJson('POST', '/api/clientsRespons/Edit', json, undefined, true)
    return res
  }

  /* 服務紀錄表_查詢  */
  static async serviceDetialLogs_select (json) {
    const res = await this.callAxiosJson('POST', '/api/serviceDetialLogs/select', json, undefined, true)
    return res
  }

  /* 服務紀錄表_新增  */
  static async serviceDetialLogs_Add (json) {
    const res = await this.callAxiosJson('POST', '/api/serviceDetialLogs/Add', json, undefined, true)
    return res
  }

  /* 服務紀錄表_修改  */
  static async serviceDetialLogs_Edit (json) {
    const res = await this.callAxiosJson('POST', '/api/serviceDetialLogs/Edit', json, undefined, true)
    return res
  }

  /* 服務紀錄表_偏遠地區列表  */
  static async farLocationList (json) {
    const res = await this.callAxiosJson('POST', '/api/serviceDetialLogs/farLocationList', json, undefined, true)
    return res
  }

  /* 服務紀錄表_計算金額  */
  static async serviceDetialLogs_selectB4Add (json) {
    const res = await this.callAxiosJson('POST', '/api/serviceDetialLogs/selectB4Add', json, undefined, true)
    return res
  }

  /* 查詢案件(使用時數)API  */
  static async applyCaseSelectUseHours (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/applyCaseSelectUseHours', json, undefined, true)
    return res
  }

  /* 案件查詢 匯出 excel  */
  static async export_case (type, json) {
    const res = await this.callAxiosJson('POST', '/api/export/case/' + type, json, undefined, true, true)
    return res
  }

  /* 案件 一件鍵送郵件簡訊發送  */
  static async applyCase_sendNotice (json) {
    const res = await this.callAxiosJson('POST', '/api/applycase/sendNotice/1', json, undefined, true)
    return res
  }

  // ======== 帳號管理 ======== //

  /* 查詢_帳號資訊(條件查詢)  */
  static async acctSelect (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctSelect', json, undefined, true)
    return res
  }

  /* 查詢_帳號資訊(acctType多選專用)  */
  static async acctSelect45 (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctSelect45', json, undefined, true)
    return res
  }

  /* 編輯_帳號資訊  */
  static async handlang_acctEdit (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctEdit', json, undefined, true)
    return res
  }

  /* 密碼重置_帳號資訊  */
  static async handlang_acctRestPassWord (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctRestPassWord', json, undefined, true)
    return res
  }

  /* 刪除_帳號資訊  */
  static async handlang_acctDelete (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctDelete', json, undefined, true)
    return res
  }

  /* 凍結_帳號資訊  */
  static async handlang_acctLockCtrl (json) {
    const res = await this.callAxiosJson('POST', '/api/handlang/acctLockCtrl', json, undefined, true)
    return res
  }

  /* 帳號管理 匯出  */
  static async account_export (type, json) {
    const res = await this.callAxiosJson('POST', '/api/export/account/' + type, json, undefined, true, true)
    return res
  }

  // ======== 申訴管理 ======== //

  /* 查詢_申訴管理  */
  static async reportLogs_select (json) {
    const res = await this.callAxiosJson('POST', '/api/reportLogs/select', json, undefined, true)
    return res
  }

  /* 新增_申訴管理  */
  static async reportLogs_create (json) {
    const res = await this.callAxiosJson('POST', '/api/reportLogs/create', json, undefined, true)
    return res
  }

  /* 編輯_申訴管理  */
  static async reportLogs_edit (json) {
    const res = await this.callAxiosJson('POST', '/api/reportLogs/edit', json, undefined, true)
    return res
  }

  // ======== 外部連結管理 ======== //

  /* 外部連結_查詢  */
  static async linksSetting_select (json) {
    const res = await this.callAxiosJson('POST', '/api/linksSetting/select', json, undefined, true)
    return res
  }

  /* 外部連結_新增  */
  static async linksSetting_create (json) {
    const res = await this.callAxiosJson('POST', '/api/linksSetting/create', json, undefined, true)
    return res
  }

  /* 外部連結_修改  */
  static async linksSetting_edit (json) {
    const res = await this.callAxiosJson('POST', '/api/linksSetting/edit', json, undefined, true)
    return res
  }

  /* 外部連結_刪除  */
  static async linksSetting_delete (json) {
    const res = await this.callAxiosJson('POST', '/api/linksSetting/delete', json, undefined, true)
    return res
  }

  // ======== 取得參數 ======== //
  static async getsetupParamete (json) {
    const res = await this.callAxiosJson('POST', '/api/getByType', json, undefined, true)
    return res
  }

  /* 取得參數 分頁 */
  static async getsetupPage (json) {
    const res = await this.callAxiosJson('POST', '/api/selectByPage', json, undefined, true)
    return res
  }

  /* 新增參數值 */
  static async createCode (json) {
    const res = await this.callAxiosJson('POST', '/api/createCode', json, undefined, true)
    return res
  }

  /* 更新參數值 */
  static async updateCode (json) {
    const res = await this.callAxiosJson('POST', '/api/updateCode', json, undefined, true)
    return res
  }

  /* 刪除參數值 */
  static async deleteCode (json) {
    const res = await this.callAxiosJson('POST', '/api/deleteCode', json, undefined, true)
    return res
  }

  // ======== 實體檔管理 ======== //
  static async filemanager_load (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/filesList', json, undefined, true)
    return res
  }

  /* 使用比例條 */
  static async filemanager_proportion (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/proportion', json, undefined, true)
    return res
  }

  /* 下載 */
  static async filemanager_download ({
    key, type
  }) {
    const res = await this.callAxios('GET', '/api/filemanager/Download?key=' + key + '&type=' + type, undefined, undefined, true, true)
    return res
  }

  /* 刪除檔案 */
  static async filemanager_delete (json) {
    const res = await this.callAxiosJson('POST', '/api/filemanager/DeleteByRangeKey', json, undefined, true)
    return res
  }

  // ======== 系統日誌 ======== //
  static async sysLog_load (json) {
    const res = await this.callAxiosJson('POST', '/api/sysLog/select', json, undefined, true)
    return res
  }

  /* 查詢日誌_刪除半年資料 */
  static async sysLog_delete (json) {
    const res = await this.callAxiosJson('POST', '/api/sysLog/deletesixmonth', json, undefined, true)
    return res
  }

  /* 系統日誌 匯出 */
  static async sysLog_export () {
    const res = await this.callAxios('POST', '/api/export/SysLog/2', undefined, undefined, true, true)
    return res
  }

  // ======== 報表 ======== //

  /* 下載檔案列表 */
  static async lSeviceAmontMonth (json) {
    const res = await this.callAxiosJson('POST', '/api/export/finalList', json, undefined, true)
    return res
  }

  /* 下載檔案列表 */
  static async statisticsExport_download ({
    key, yymm
  }) {
    const res = await this.callAxios('GET', '/api/export/download?key=' + key + '&yymm=' + yymm, undefined, undefined, true, true)
    return res
  }

  /* 下載檔案_單一檔  */
  static async filemanager_downloadOne ({
    key
  }) {
    const res = await this.callAxios('GET', '/api/filemanager/downloadby1?key=' + key, undefined, undefined, true, true)
    return res
  }

  /* 報表_發送郵件 */
  static async statistics_sendEmail (json) {
    const res = await this.callAxiosJson('POST', '/api/export/sendEmail', json, undefined, true)
    return res
  }
}
export default FrontendApi
