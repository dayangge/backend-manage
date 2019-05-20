import { getAllList } from '@/services/api';

export default {
  namespace: 'agentDetailOffRecharge',

  state: {
    rechargeData: {},
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
        rechargeData: action.payload,
      };
    },
  },
};
