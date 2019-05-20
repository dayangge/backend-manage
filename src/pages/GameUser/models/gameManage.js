import { getHoldLineManage, getWinData, getMemberWinDetail } from '@/services/api';

export default {
  namespace: 'gameManage',

  state: {
    holdLineManageData: {
      list: [],
      pagination: {},
    },
    winData: {
      list: [],
      pagination: {},
    },
    memberWinDetail: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchHoldLineManage({ payload }, { call, put }) {
      const response = yield call(getHoldLineManage, payload);
      yield put({
        type: 'saveGameManage',
        payload: response,
      });
    },
    *fetchWin({ payload }, { call, put }) {
      const response = yield call(getWinData, payload);
      yield put({
        type: 'saveWinData',
        payload: response,
      });
    },
    *fetchWinDetail({ payload }, { call, put }) {
      const response = yield call(getMemberWinDetail, payload);
      yield put({
        type: 'saveMemberWinDetail',
        payload: response,
      });
    },
  },

  reducers: {
    saveGameManage(state, action) {
      return {
        ...state,
        holdLineManageData: action.payload,
      };
    },
    saveWinData(state, action) {
      return {
        ...state,
        winData: action.payload,
      };
    },
    saveMemberWinDetail(state, action) {
      return {
        ...state,
        memberWinDetail: action.payload,
      };
    },
  },
};
