import { getRoleManageList, getManageSettingList } from '@/services/api';

export default {
  namespace: 'managerSetting',

  state: {
    roleManageListData: {
      list: [],
      pagination: {},
    },
    manageSettingListData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRoleManageList({ payload }, { call, put }) {
      const response = yield call(getRoleManageList, payload);
      yield put({
        type: 'saveRoleManager',
        payload: response,
      });
    },
    *fetchManageSettingList({ payload }, { call, put }) {
      const response = yield call(getManageSettingList, payload);
      yield put({
        type: 'saveManageSetting',
        payload: response,
      });
    },
  },

  reducers: {
    saveRoleManager(state, action) {
      return {
        ...state,
        roleManageListData: action.payload,
      };
    },
    saveManageSetting(state, action) {
      return {
        ...state,
        manageSettingListData: action.payload,
      };
    },
  },
};
