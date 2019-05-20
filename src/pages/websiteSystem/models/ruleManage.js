import { getWebsiteRuleManage, getWebsiteRuleInfo } from '@/services/api';

export default {
  namespace: 'websiteRuleManage',

  state: {
    websiteRuleManageData: {
      list: [],
      pagination: {},
    },
    websiteRuleInfoData: {},
  },

  effects: {
    *fetchWebsiteRuleManage({ payload }, { call, put }) {
      const response = yield call(getWebsiteRuleManage, payload);
      response.list.map(val => (val.status1 = val.status));
      yield put({
        type: 'saveWebsiteRuleManage',
        payload: response,
      });
    },
    *fetchWebsiteRuleInfo({ payload }, { call, put }) {
      const response = yield call(getWebsiteRuleInfo, payload);
      yield put({
        type: 'saveWebsiteRuleInfo',
        payload: response,
      });
    },
  },

  reducers: {
    saveWebsiteRuleManage(state, action) {
      return {
        ...state,
        websiteRuleManageData: action.payload,
      };
    },
    saveWebsiteRuleInfo(state, action) {
      return {
        ...state,
        websiteRuleInfoData: action.payload,
      };
    },
  },
};
