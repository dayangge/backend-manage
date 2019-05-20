import { getWebsiteNewsManage } from '@/services/api';

export default {
  namespace: 'websiteNewsManage',

  state: {
    websiteNewsManageData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchWebsiteNewsManage({ payload }, { call, put }) {
      const response = yield call(getWebsiteNewsManage, payload);
      response.list.map(val => (val.status1 = val.status));
      yield put({
        type: 'saveWebsiteNewsManage',
        payload: response,
      });
    },
  },

  reducers: {
    saveWebsiteNewsManage(state, action) {
      return {
        ...state,
        websiteNewsManageData: action.payload,
      };
    },
  },
};
