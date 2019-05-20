import { getSystemMachineManage } from '@/services/api';

export default {
  namespace: 'systemMachineManage',

  state: {
    systemMachineManageData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchSystemMachineManage({ payload }, { call, put }) {
      const response = yield call(getSystemMachineManage, payload);
      yield put({
        type: 'saveSystemMachineManage',
        payload: response,
      });
    },
  },

  reducers: {
    saveSystemMachineManage(state, action) {
      return {
        ...state,
        systemMachineManageData: action.payload,
      };
    },
  },
};
