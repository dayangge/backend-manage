import { getAllList } from '@/services/api';

export default {
  namespace: 'agentSystemAgentCheck',

  state: {
    checkData: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getAllList, payload);
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
        checkData: action.payload,
      };
    },
  },
};
