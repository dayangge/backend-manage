import { getAgentRecharge } from '@/services/api';

export default {
  namespace: 'agentRecharge',

  state: {
    agentRechargeData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchAgentRecharge({ payload }, { call, put }) {
      const response = yield call(getAgentRecharge, payload);
      yield put({
        type: 'saveAgentRecharge',
        payload: response,
      });
    },
  },

  reducers: {
    saveAgentRecharge(state, action) {
      return {
        ...state,
        agentRechargeData: action.payload,
      };
    },
  },
};
