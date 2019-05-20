import { getGoldCoinTrade } from '@/services/api';

export default {
  namespace: 'financeGoldCoinTradeSetting',

  state: {
    goldCoinTradeData: {},
  },

  effects: {
    *fetchGoldCoinTrade({ payload, callback }, { call, put }) {
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
        goldCoinTradeData: action.payload,
      };
    },
  },
};
