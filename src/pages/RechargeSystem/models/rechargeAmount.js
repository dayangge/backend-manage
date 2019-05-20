import { getSystemRechargeAmount } from '@/services/api';

export default {
  namespace: 'rechargeAmount',

  state: {
    rechargeAmountData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRechargeAmount({ payload }, { call, put }) {
      const response = yield call(getSystemRechargeAmount, payload);
      yield put({
        type: 'saveRechargeAmount',
        payload: response,
      });
    },
  },

  reducers: {
    saveRechargeAmount(state, action) {
      return {
        ...state,
        rechargeAmountData: action.payload,
      };
    },
  },
};
