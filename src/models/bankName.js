import { getBankName } from '@/services/api';

export default {
  namespace: 'bankName',

  state: {
    bankNameData: [],
  },

  effects: {
    *fetchBankName({ payload }, { call, put }) {
      const response = yield call(getBankName, payload);
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
        bankNameData: action.payload,
      };
    },
  },
};
