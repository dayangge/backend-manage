import { getTaskManage } from '@/services/api';

export default {
  namespace: 'taskManage',

  state: {
    taskManageData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchTaskManage({ payload }, { call, put }) {
      const response = yield call(getTaskManage, payload);
      yield put({
        type: 'saveTaskManage',
        payload: response,
      });
    },
  },

  reducers: {
    saveTaskManage(state, action) {
      return {
        ...state,
        taskManageData: action.payload,
      };
    },
  },
};
