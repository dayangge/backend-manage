import { getRechargeChannel } from '@/services/api';

export default {
  namespace: 'rechargeChannel',

  state: {
    rechargeChannelData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRechargeChannel({ payload }, { call, put }) {
      const response = yield call(getRechargeChannel, payload);
      response.list.map(item => (item.status1 = item.status));
      yield put({
        type: 'saveRechargeChannel',
        payload: response,
      });
    },
  },

  reducers: {
    saveRechargeChannel(state, action) {
      return {
        ...state,
        rechargeChannelData: action.payload,
      };
    },
  },
};
