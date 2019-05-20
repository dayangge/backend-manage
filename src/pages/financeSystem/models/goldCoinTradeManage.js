import { getGameLog } from '@/services/api';

export default {
  namespace: 'financeGoldCoinTradeManage',

  state: {
    logData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchLog({ payload }, { call, put }) {
      const response = yield call(getGameLog, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        logData: action.payload,
      };
    },
  },
};
