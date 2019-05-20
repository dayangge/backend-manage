export default {
  namespace: 'pervUrl',

  state: {
    url: '',
    agentUrl: '',
  },

  effects: {
    *saveUrl({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },
    *saveAgentUrl({ payload }, { put }) {
      yield put({
        type: 'saveAgent',
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        url: action.payload,
      };
    },
    saveAgent(state, action) {
      return {
        ...state,
        agentUrl: action.payload,
      };
    },
  },
};
