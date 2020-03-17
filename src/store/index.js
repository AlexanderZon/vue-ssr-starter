import Vue from 'vue';
import Vuex from 'vuex';
import http from '../http';

Vue.use(Vuex);

const fireNotFoundError = (state, message = '404 Not found') => {
	state.serverError = { statusCode: 404, message };
};

// we should return factory for SSR (runInNewContext: false)
export default () => new Vuex.Store({
  actions: {
    fetchConfig: (context) => {
      return new Promise((resolve, reject) => {
        http.get('http://localhost:8000/config').then(response => {
          context.commit('setConfig', response.data);
          resolve(response.data);
        }).catch(thrown => {
          reject(thrown);
        });
      });
    },
  },
	state: {
    serverError: false,
    config: {},
	},
	getters: {
    serverError: state => state.serverError,
    getConfig: state => state.config,
	},
	mutations: {
		setError(state, err) {
			if (err && (err === 404 || err.statusCode === 404)) fireNotFoundError(state, err.message);
			else state.serverError = err || true;
		},
		fireNotFoundError,
		clearError(state) {
			state.serverError = false;
    },
    setConfig(state, data) {
      state.config = data;
    },
	},
});
