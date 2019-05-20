import { getGoldCoinTrade } from '@/services/api';

export default {
  namespace: 'financeLotteryLog',

  state: {
    lotteryLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(getGoldCoinTrade, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        agentData: action.payload,
      };
    },
  },
};
