import { getUserManage, queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'gameUser',

  state: {
    userManageData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchUserManage({ payload }, { call, put }) {
      const response = yield call(getUserManage, payload);
      yield put({
        type: 'saveUserManage',
        payload: response,
      });
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveUserManage(state, action) {
      return {
        ...state,
        userManageData: action.payload,
      };
    },
  },
};
