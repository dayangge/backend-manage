import {
  getRestrictedCharacter,
  removeRestrictedCharacter,
  addRestrictedCharacter,
} from '@/services/api';

export default {
  namespace: 'restrictedCharacter',

  state: {
    restrictedCharacterData: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchRestrictedCharacter({ payload }, { call, put }) {
      const response = yield call(getRestrictedCharacter, payload);
      yield put({
        type: 'saveRestrictedCharacter',
        payload: response,
      });
    },
    *addRestrictedCharacter({ payload, callback }, { call, put }) {
      const response = yield call(addRestrictedCharacter, payload);
      yield put({
        type: 'saveRestrictedCharacter',
        payload: response,
      });
      if (callback) callback(response);
    },
    *removeRestrictedCharacter({ payload, callback }, { call, put }) {
      const response = yield call(removeRestrictedCharacter, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    saveRestrictedCharacter(state, action) {
      return {
        ...state,
        restrictedCharacterData: action.payload,
      };
    },
  },
};
