import { getOperationLogList } from '@/services/api';

export default {
  namespace: 'managerOperationLog',

  state: {
    operationLogListData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchOperationLogList({ payload }, { call, put }) {
      const response = yield call(getOperationLogList, payload);
      yield put({
        type: 'saveOperationLogList',
        payload: response,
      });
    },
  },

  reducers: {
    saveOperationLogList(state, action) {
      return {
        ...state,
        operationLogListData: action.payload,
      };
    },
  },
};
