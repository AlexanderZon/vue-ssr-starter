<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <layout-menu />
    </v-navigation-drawer>
    <layout-header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
	import LayoutMenu from 'src/components/layouts/menu.vue';
	import LayoutHeader from 'src/components/layouts/header.vue';

	export default {
		components: {
			'layout-menu': LayoutMenu,
			'layout-header': LayoutHeader,
		},
		props: {
			source: String,
		},
		data: () => ({
			dialog: false,
			drawer: null,
			theme: 'light',
		}),
	};
</script>