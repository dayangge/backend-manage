import { getAllList } from '@/services/api';

export default {
  namespace: 'agentDetailGoldChange',

  state: {
    goldChangeData: {},
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
        goldChangeData: action.payload,
      };
    },
  },
};
