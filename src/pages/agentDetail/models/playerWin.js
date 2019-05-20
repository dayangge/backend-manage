import { getAllList } from '@/services/api';

export default {
  namespace: 'agentDetailWin',

  state: {
    winData: {},
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
        winData: action.payload,
      };
    },
  },
};
