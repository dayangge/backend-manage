import { getRechargeService } from '@/services/api';

export default {
  namespace: 'serviceLog',

  state: {
    rechargeServiceData: [],
  },

  effects: {
    *fetchRechargeService({ payload }, { call, put }) {
      const response = yield call(getRechargeService, payload);
      yield put({
        type: 'saveRechargeService',
        payload: response,
      });
    },
  },

  reducers: {
    saveRechargeService(state, action) {
      return {
        ...state,
        rechargeServiceData: action.payload,
      };
    },
  },
};
