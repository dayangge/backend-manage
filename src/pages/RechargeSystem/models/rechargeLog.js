import { getOrderLog } from '@/services/api';

export default {
  namespace: 'rechargeLog',

  state: {
    rechargeLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchOrderLog({ payload }, { call, put }) {
      const response = yield call(getOrderLog, payload);
      yield put({
        type: 'saveRechargeLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveRechargeLog(state, action) {
      return {
        ...state,
        goldRechargeData: action.payload,
      };
    },
  },
};
