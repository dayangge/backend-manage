import { getRechargeInterface } from '@/services/api';

export default {
  namespace: 'rechargeInterface',

  state: {
    rechargeInterfaceData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRechargeInterface({ payload }, { call, put }) {
      const response = yield call(getRechargeInterface, payload);
      response.list.map(item => (item.status1 = item.status));
      yield put({
        type: 'saveRechargeInterface',
        payload: response,
      });
    },
  },

  reducers: {
    saveRechargeInterface(state, action) {
      return {
        ...state,
        rechargeInterfaceData: action.payload,
      };
    },
  },
};
