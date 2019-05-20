import { getOnlineNumber, getGameEdit } from '@/services/api';

export default {
  namespace: 'onlineNumber',

  state: {
    onlineNumberData: {
      list: [],
      pagination: {},
    },
    gameEditData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchOnlineNumber({ payload }, { call, put }) {
      const response = yield call(getOnlineNumber, payload);
      yield put({
        type: 'saveOnlineNumber',
        payload: response,
      });
    },
    *fetchGameEdit({ payload }, { call, put }) {
      const response = yield call(getGameEdit, payload);
      yield put({
        type: ' gameEdit',
        payload: response,
      });
    },
  },

  reducers: {
    saveOnlineNumber(state, action) {
      return {
        ...state,
        onlineNumberData: action.payload,
      };
    },
    gameEdit(state, action) {
      return {
        ...state,
        gameEditData: action.payload,
      };
    },
  },
};
