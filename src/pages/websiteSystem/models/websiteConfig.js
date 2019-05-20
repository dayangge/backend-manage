import {
  getWebsiteContactConfig,
  getWebsiteSiteConfig,
  getWebsiteMobileConfig,
  getWebsiteServerConfig,
  getWebsiteShareConfig,
  getWebsiteIosConfig,
} from '@/services/api';

export default {
  namespace: 'websiteConfig',

  state: {
    contactConfig: {},
    siteConfig: {},
    mobileConfig: {},
    serverConfig: {},
    shareConfig: {},
    iosConfig: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchContactConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteContactConfig, payload);
      yield put({
        type: 'saveContactConfig',
        payload: response,
      });
    },
    *fetchSiteConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteSiteConfig, payload);
      yield put({
        type: 'saveSiteConfig',
        payload: response,
      });
    },
    *fetchMobileConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteMobileConfig, payload);
      yield put({
        type: 'saveMobileConfig',
        payload: response,
      });
    },
    *fetchServerConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteServerConfig, payload);
      yield put({
        type: 'saveServerConfig',
        payload: response,
      });
    },
    *fetchShareConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteShareConfig, payload);
      yield put({
        type: 'saveShareConfig',
        payload: response,
      });
    },
    *fetchIosConfig({ payload }, { call, put }) {
      const response = yield call(getWebsiteIosConfig, payload);
      yield put({
        type: 'saveIosConfig',
        payload: response,
      });
    },
  },

  reducers: {
    saveContactConfig(state, action) {
      return {
        ...state,
        contactConfig: action.payload,
      };
    },
    saveSiteConfig(state, action) {
      return {
        ...state,
        siteConfig: action.payload,
      };
    },
    saveMobileConfig(state, action) {
      return {
        ...state,
        mobileConfig: action.payload,
      };
    },
    saveServerConfig(state, action) {
      return {
        ...state,
        serverConfig: action.payload,
      };
    },
    saveShareConfig(state, action) {
      return {
        ...state,
        shareConfig: action.payload,
      };
    },
    saveIosConfig(state, action) {
      return {
        ...state,
        iosConfig: action.payload,
      };
    },
  },
};
