import Vue from 'vue';

import Cookies from 'js-cookie';
const oauthToken = Cookies.get('oauth_token');

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import messages from 'src/i18n/index.js';

const i18n = new VueI18n({
	locale: 'es',
	messages,
});

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css';


Vue.use(Vuetify);
import colors from 'vuetify/lib/util/colors';

const opts = {
	icons: {
		iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
	theme: {
		dark: false,
		themes: {
			light: {
				primary: colors.purple.base,
				secondary: colors.grey.darken1,
				accent: colors.shades.black,
				error: colors.red.accent3,
			},
			dark: {
				primary: colors.blue.lighten3,
			},
		},
	},
};

const vuetify = new Vuetify(opts);


import { filenameToCamelCase } from 'src/utils';

// IMPORTANT NOTE: imports order bellow matters if we want CSS related imports to be in desired order

// we should import app.vue first
// assuming common styles, resets, etc. are imported from app.vue itself and they should be loaded first
import app from 'src/app.vue';

// filters
const requireFilters = require.context('src/filters/', true, /\.(js|ts)$/);
for (const name of requireFilters.keys())
	Vue.filter(filenameToCamelCase(name), requireFilters(name).default);

// page components are adding styles next
import createRouter from 'src/router';
import createStore from 'src/store';

// we should return factory for SSR (runInNewContext: false)
export default context => {
	const store = createStore(context),
		router = createRouter(context);
	return new Vue({ i18n, vuetify, store, router, ...app, __OAUTH_TOKEN__: oauthToken });
};
