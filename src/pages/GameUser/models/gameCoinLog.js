import { getGameCoinLog } from '@/services/api';

export default {
  namespace: 'gameCoinLog',

  state: {
    gameCoinLog: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchGameCoinLog({ payload, callback }, { call, put }) {
      const response = yield call(getGameCoinLog, payload);
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
        gameCoinLog: action.payload,
      };
    },
  },
};
