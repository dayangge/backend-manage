import { getGameLog } from '@/services/api';

export default {
  namespace: 'financePlayerPumping',

  state: {
    playerPumpingData: {
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
        playerPumpingData: action.payload,
      };
    },
  },
};
