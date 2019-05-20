import { getAllList } from '@/services/api';

export default {
  namespace: 'pushSystemPushWithdrawal',

  state: {
    pushWithdrawalData: {},
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
        pushWithdrawalData: action.payload,
      };
    },
  },
};
