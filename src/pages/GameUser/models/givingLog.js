import { getGivingLog } from '@/services/api';

export default {
  namespace: 'givingLog',

  state: {
    givingLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchGivingLog({ payload }, { call, put }) {
      const response = yield call(getGivingLog, payload);
      yield put({
        type: 'saveGivingLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveGivingLog(state, action) {
      return {
        ...state,
        givingLogData: action.payload,
      };
    },
  },
};
