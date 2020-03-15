import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

const opts = {
	icons: {
		iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
	},
}

const vuetify = new Vuetify(opts)


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
	return new Vue({ vuetify, store, router, ...app });
};
