import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getUserManage(params = {}) {
  return request(`/api/userManage?${stringify(params)}`);
}

export async function getOnlineManage(params = {}) {
  return request(`/api/onlineManage?${stringify(params)}`);
}

export async function getHoldLineManage(params = {}) {
  return request(`/api/holdLineManage?${stringify(params)}`);
}

export async function getWinData(params = {}) {
  return request(`/api/winData?${stringify(params)}`);
}

export async function getMemberWinDetail(params = {}) {
  return request(`/api/memberWinDetail?${stringify(params)}`);
}

export async function getOnlineNumber(params = {}) {
  return request(`/api/onlineNumber?${stringify(params)}`);
}

export async function getGameEdit(params = {}) {
  return request(`/api/gameEditList?${stringify(params)}`);
}

export async function getGameCoinLog(params = {}) {
  return request(`/api/gameCoinLog?${stringify(params)}`);
}

export async function getGoldCoinLog(params = {}) {
  return request(`/api/goldCoinLog?${stringify(params)}`);
}

export async function getGivingLog(params = {}) {
  return request(`/api/givingLog?${stringify(params)}`);
}

/* 限制字符 */
export async function getRestrictedCharacter(params = {}) {
  return request(`/api/restrictedCharacter?${stringify(params)}`);
}

export async function addRestrictedCharacter(params) {
  return request(`/api/restrictedCharacter`, {
    method: 'POST',
    data: params,
  });
}

export async function removeRestrictedCharacter(params) {
  return request(`/api/restrictedCharacter`, {
    method: 'DELETE',
    data: params,
  });
}

/* 限制ip */
export async function getRestrictedIP(params = {}) {
  return request(`/api/restrictedIP?${stringify(params)}`);
}

export async function addRestrictedIP(params) {
  return request(`/api/restrictedIP`, {
    method: 'POST',
    data: params,
  });
}

export async function removeRestrictedIP(params) {
  return request(`/api/restrictedIP`, {
    method: 'DELETE',
    data: params,
  });
}

export async function getIPList(params = {}) {
  return request(`/api/IPList?${stringify(params)}`);
}

export async function postRestrictIP(params) {
  return request(`/api/postRestrictIP`, {
    method: 'POST',
    data: params,
  });
}
/* 获取游戏记录 */
export async function getGameLog(params = {}) {
  return request(`/api/gameLog?${stringify(params)}`);
}

/* 获取用户个人信息 */
export async function getUserInfo(params = {}) {
  return request(`/api/userInfo?${stringify(params)}`);
}

/* 获取用户个人详细信息 */
export async function getDetailInfo(params = {}) {
  return request(`/api/detailInfo?${stringify(params)}`);
}

/* 获取用户个人列表卡线管理详细信息 */
export async function getUserTable(params = {}) {
  return request(`/api/table?${stringify(params)}`);
}

/* 获取用户个人列表卡线管理详细信息 */
export async function getUserControl(params = {}) {
  return request(`/api/userControl?${stringify(params)}`);
}

/* 获取充值记录详细信息 */
export async function getUserRechargeLog(params = {}) {
  return request(`/api/userRechargeLog?${stringify(params)}`);
}

/* 获取充值记录详细信息 */
export async function getOrderLog(params = {}) {
  return request(`/api/userRechargeLog?${stringify(params)}`);
}

/* 获取服务商信息 */
export async function getRechargeService(params = {}) {
  return request(`/api/rechargeService?${stringify(params)}`);
}

/* 获取系统充值额度 */
export async function getSystemRechargeAmount(params = {}) {
  return request(`/api/systemRechargeAmount?${stringify(params)}`);
}

/* 获取代理充值订单 */
export async function getAgentRecharge(params = {}) {
  return request(`/api/agentRecharge?${stringify(params)}`);
}

/* 获取代理充值接口 */
export async function getRechargeInterface(params = {}) {
  return request(`/api/agentRecharge?${stringify(params)}`);
}

/* 获取代理充值渠道列表 */
export async function getRechargeChannel(params = {}) {
  return request(`/api/agentRecharge?${stringify(params)}`);
}

export async function getSystemMachineManage(params = {}) {
  return request(`/api/systemManage?${stringify(params)}`);
}

export async function getSystemInfoPush(params = {}) {
  return request(`/api/systemInfoPush?${stringify(params)}`);
}
/* 获取任务管理列表 */
export async function getTaskManage(params = {}) {
  return request(`/api/taskManage?${stringify(params)}`);
}

/* 获取网站新闻管理列表 */
export async function getWebsiteNewsManage(params = {}) {
  return request(`/api/websiteNewsManage?${stringify(params)}`);
}

/* 获取网站规则管理列表 */
export async function getWebsiteRuleManage(params = {}) {
  return request(`/api/websiteRuleManage?${stringify(params)}`);
}

/* 获取网站规则管理列表 */
export async function getWebsiteRuleInfo(params = {}) {
  return request(`/api/websiteRuleInfo?${stringify(params)}`);
}

/* 获取网站联系方式配置 */
export async function getWebsiteContactConfig(params = {}) {
  return request(`/api/websiteRuleInfo1?${stringify(params)}`);
}

export async function getWebsiteSiteConfig(params = {}) {
  return request(`/api/websiteRuleInfo1?${stringify(params)}`);
}

export async function getWebsiteMobileConfig(params = {}) {
  return request(`/api/websiteRuleInfo1?${stringify(params)}`);
}

export async function getWebsiteServerConfig(params = {}) {
  return request(`/api/websiteRuleInfo1?${stringify(params)}`);
}

export async function getWebsiteShareConfig(params = {}) {
  return request(`/api/websiteRuleInfo1?${stringify(params)}`);
}

export async function getWebsiteIosConfig(params = {}) {
  return request(`/api/websiteIosConfig?${stringify(params)}`);
}

export async function getWebsiteActivity(params = {}) {
  return request(`/api/websiteActivity?${stringify(params)}`);
}

export async function getWebsiteActivityList(params = {}) {
  return request(`/api/websiteActivityList?${stringify(params)}`);
}
/* 管理员系统 */
export async function getRoleManageList(params = {}) {
  return request(`/api/roleManageList?${stringify(params)}`);
}

export async function getManageSettingList(params = {}) {
  return request(`/api/manageSettingList?${stringify(params)}`);
}
/* 管理员操作日志 */
export async function getOperationLogList(params = {}) {
  return request(`/api/manageSettingList?${stringify(params)}`);
}
/* 财务系统 */
/* 金币交易设置 */
export async function getGoldCoinTrade(params = {}) {
  return request(`/api/goldCoinTrade?${stringify(params)}`);
}

/* 提现银行列表 */
export async function getBankName(params = {}) {
  return request(`/api/getBankName?${stringify(params)}`);
}

/* 获取代理详细信息 */
export async function getAgentDetail(params = {}) {
  return request(`/api/agentDetail?${stringify(params)}`);
}

/* 临时mock */
export async function getAllList(params = {}) {
  return request(`/api/allList?${stringify(params)}`);
}
