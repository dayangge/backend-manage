import { getSystemInfoPush } from '@/services/api';

export default {
  namespace: 'systemInfoPush',

  state: {
    systemInfoPushData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchSystemInfoPush({ payload }, { call, put }) {
      const response = yield call(getSystemInfoPush, payload);
      yield put({
        type: 'saveSystemInfoPush',
        payload: response,
      });
    },
  },

  reducers: {
    saveSystemInfoPush(state, action) {
      return {
        ...state,
        systemInfoPushData: action.payload,
      };
    },
  },
};
