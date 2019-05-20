import { getGameLog } from '@/services/api';

export default {
  namespace: 'agentSystemManage',

  state: {
    agentManageListData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getGameLog, payload);
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
        agentManageListData: action.payload,
      };
    },
  },
};
