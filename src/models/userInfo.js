import { getUserInfo, getDetailInfo, getUserTable, getUserRechargeLog } from '@/services/api';

export default {
  namespace: 'userInfo',

  state: {
    userID: '1',
    userInfoData: {},
    detailInfoData: {},
    table: {
      list: [],
      pagination: {},
    },
    userRechargeLogData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchUserInfo({ payload }, { call, put, select }) {
      const response = yield call(getUserInfo, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      const userID = yield select(state => state.userInfoData.userID);
      yield put({
        type: 'saveUserID',
        payload: userID,
      });
    },
    *fetchDetailInfo({ payload }, { call, put }) {
      const response = yield call(getDetailInfo, payload);
      yield put({
        type: 'saveDetailInfo',
        payload: response,
      });
    },
    *fetchUserRechargeLog({ payload }, { call, put }) {
      const response = yield call(getUserRechargeLog, payload);
      yield put({
        type: 'saveUserRechargeLog',
        payload: response,
      });
    },
    *fetchTable({ payload }, { call, put }) {
      const response = yield call(getUserTable, payload);
      yield put({
        type: 'saveTable',
        payload: response,
      });
    },
    *saveID({ payload }, { put }) {
      yield put({
        type: 'saveUserID',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfoData: action.payload,
      };
    },
    saveUserID(state, action) {
      return {
        ...state,
        userID: action.payload,
      };
    },
    saveTable(state, action) {
      return {
        ...state,
        table: action.payload,
      };
    },
    saveDetailInfo(state, action) {
      return {
        ...state,
        detailInfoData: action.payload,
      };
    },
    saveUserRechargeLog(state, action) {
      return {
        ...state,
        userRechargeLogData: action.payload,
      };
    },
  },
};
