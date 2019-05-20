import { getUserControl } from '@/services/api';

export default {
  namespace: 'robotSetting',

  state: {
    robotInfoData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRobotInfo({ payload }, { call, put }) {
      const response = yield call(getUserControl, payload);
      yield put({
        type: 'saveRobotInfo',
        payload: response,
      });
    },
  },

  reducers: {
    saveRobotInfo(state, action) {
      return {
        ...state,
        robotInfoData: action.payload,
      };
    },
  },
};
