import { getAgentDetail } from '@/services/api';

export default {
  namespace: 'agentDetailDetail',

  state: {
    agentDetailData: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getAgentDetail, payload);
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
        agentDetailData: action.payload,
      };
    },
  },
};
