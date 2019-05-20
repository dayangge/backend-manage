import { getGameLog } from '@/services/api';

export default {
  namespace: 'gameLog',

  state: {
    gameLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchGameLog({ payload }, { call, put }) {
      const response = yield call(getGameLog, payload);
      yield put({
        type: 'saveGameLog',
        payload: response,
      });
    },
  },

  reducers: {
    saveGameLog(state, action) {
      return {
        ...state,
        gameLogData: action.payload,
      };
    },
  },
};
