import { getAllList } from '@/services/api';

export default {
  namespace: 'agentSystemRechargeReport',

  state: {
    reportData: {
      list: [],
      pagination: {},
    },
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
        reportData: action.payload,
      };
    },
  },
};
