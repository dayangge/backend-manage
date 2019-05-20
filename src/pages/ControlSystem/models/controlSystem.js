import { getUserControl } from '@/services/api';

export default {
  namespace: 'controlSystem',

  state: {
    userControlData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchUserControl({ payload }, { call, put }) {
      const response = yield call(getUserControl, payload);
      yield put({
        type: 'saveGameControl',
        payload: response,
      });
    },
  },

  reducers: {
    saveGameControl(state, action) {
      return {
        ...state,
        userControlData: action.payload,
      };
    },
  },
};
