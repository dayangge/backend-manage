import { getOnlineManage } from '@/services/api';

export default {
  namespace: 'onlineManage',

  state: {
    onlineManageData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchOnlineManage({ payload }, { call, put }) {
      const response = yield call(getOnlineManage, payload);
      yield put({
        type: 'saveUserManage',
        payload: response,
      });
    },
  },

  reducers: {
    saveUserManage(state, action) {
      return {
        ...state,
        onlineManageData: action.payload,
      };
    },
  },
};
