import { getTaskManage } from '@/services/api';

export default {
  namespace: 'taskLog',

  state: {
    taskLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchTaskLog({ payload }, { call, put }) {
      const response = yield call(getTaskManage, payload);
      yield put({
        type: 'saveTaskLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveTaskLog(state, action) {
      return {
        ...state,
        taskLogData: action.payload,
      };
    },
  },
};
