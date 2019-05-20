import { getGoldCoinLog } from '@/services/api';

export default {
  namespace: 'goldCoinLog',

  state: {
    goldCoinLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchGoldCoinLog({ payload }, { call, put }) {
      const response = yield call(getGoldCoinLog, payload);
      yield put({
        type: 'saveGoldCoinLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveGoldCoinLog(state, action) {
      return {
        ...state,
        goldCoinLogData: action.payload,
      };
    },
  },
};
