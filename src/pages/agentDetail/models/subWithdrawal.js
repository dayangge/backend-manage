import { getAllList } from '@/services/api';

export default {
  namespace: 'agentDetailSubWithdrawal',

  state: {
    subWithdrawalData: {},
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
        subWithdrawalData: action.payload,
      };
    },
  },
};
