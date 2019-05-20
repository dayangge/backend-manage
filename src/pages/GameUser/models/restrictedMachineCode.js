import {
  getRestrictedIP,
  removeRestrictedIP,
  addRestrictedIP,
  getIPList,
  postRestrictIP,
} from '@/services/api';

export default {
  namespace: 'restrictedMachineCode',

  state: {
    restrictedMachineCodeData: {
      list: [],
      pagination: {},
    },
    machineCodeListData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRestrictedMachineCode({ payload }, { call, put }) {
      const response = yield call(getRestrictedIP, payload);
      yield put({
        type: 'saveRestrictedMachineCode',
        payload: response,
      });
    },
    *fetchMachineCodeList({ payload }, { call, put }) {
      const response = yield call(getIPList, payload);
      yield put({
        type: 'saveMachineCodeList',
        payload: response,
      });
    },
    *restrictedMachineCodeList({ payload }, { call, put }) {
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
    saveRestrictedMachineCode(state, action) {
      return {
        ...state,
        restrictedMachineCodeData: action.payload,
      };
    },
    saveMachineCodeList(state, action) {
      return {
        ...state,
        machineCodeListData: action.payload,
      };
    },
  },
};
