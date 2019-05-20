import { getRestrictedIP } from '@/services/api';

export default {
  namespace: 'unbindAgent',

  state: {
    unbindAgentData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchUnbindAgent({ payload }, { call, put }) {
      const response = yield call(getRestrictedIP, payload);
      yield put({
        type: 'saveUnbindAgent',
        payload: response,
      });
    },
  },

  reducers: {
    saveUnbindAgent(state, action) {
      return {
        ...state,
        unbindAgentData: action.payload,
      };
    },
  },
};
