import { getOrderLog } from '@/services/api';

export default {
  namespace: 'order',

  state: {
    orderLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchOrderLog({ payload }, { call, put }) {
      const response = yield call(getOrderLog, payload);
      yield put({
        type: 'saveOrderLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveOrderLog(state, action) {
      return {
        ...state,
        orderLogData: action.payload,
      };
    },
  },
};
