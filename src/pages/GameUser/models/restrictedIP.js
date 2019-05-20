import {
  getRestrictedIP,
  removeRestrictedIP,
  addRestrictedIP,
  getIPList,
  postRestrictIP,
} from '@/services/api';

export default {
  namespace: 'restrictedIP',

  state: {
    restrictedIPData: {
      list: [],
      pagination: {},
    },
    IPListData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRestrictedIP({ payload }, { call, put }) {
      const response = yield call(getRestrictedIP, payload);
      yield put({
        type: 'saveRestrictedIP',
        payload: response,
      });
    },
    *fetchIPList({ payload }, { call, put }) {
      const response = yield call(getIPList, payload);
      yield put({
        type: 'saveIPList',
        payload: response,
      });
    },
    *restrictIP({ payload }, { call, put }) {
      const response = yield call(postRestrictIP, payload);
      yield put({
        type: 'saveIPList',
        payload: response,
      });
    },
    *addRestrictedIP({ payload, callback }, { call, put }) {
      const response = yield call(addRestrictedIP, payload);
      yield put({
        type: 'saveRestrictedIP',
        payload: response,
      });
      if (callback) callback(response);
    },
    *removeRestrictedIP({ payload, callback }, { call, put }) {
      const response = yield call(removeRestrictedIP, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveRestrictedIP(state, action) {
      return {
        ...state,
        restrictedIPData: action.payload,
      };
    },
    saveIPList(state, action) {
      return {
        ...state,
        IPListData: action.payload,
      };
    },
  },
};
