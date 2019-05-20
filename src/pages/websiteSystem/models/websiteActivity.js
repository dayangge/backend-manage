import { getWebsiteActivity, getWebsiteActivityList } from '@/services/api';

export default {
  namespace: 'websiteActivity',

  state: {
    websiteActivityListData: {
      list: [],
      pagination: {},
    },
    websiteActivityData: {},
  },

  effects: {
    *fetchWebsiteActivity({ payload, callback }, { call, put }) {
      const response = yield call(getWebsiteActivity, payload);
      yield put({
        type: 'saveWebsiteActivity',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchWebsiteActivityList({ payload }, { call, put }) {
      const response = yield call(getWebsiteActivityList, payload);
      yield put({
        type: 'saveWebsiteActivityList',
        payload: response,
      });
    },
  },

  reducers: {
    saveWebsiteActivity(state, action) {
      return {
        ...state,
        websiteActivityData: action.payload,
      };
    },
    saveWebsiteActivityList(state, action) {
      return {
        ...state,
        websiteActivityListData: action.payload,
      };
    },
  },
};
