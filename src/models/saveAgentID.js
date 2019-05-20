export default {
  namespace: 'agentID',

  state: {
    id: '',
  },

  effects: {
    *saveAgentID({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        id: action.payload,
      };
    },
  },
};
