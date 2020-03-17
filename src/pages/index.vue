<template>
  <v-app id="inspire">
    <template v-if="loading">
      <v-content>
        <v-container grid-list-xs>
          <v-layout
            row
            wrap
          >
            <v-flex
              xs12
              class="text-center"
            >
              <v-progress-circular
                :indeterminate="true"
                color="primary"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
    <template v-else>
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
    </template>
  </v-app>
</template>

<script>
	import LayoutMenu from 'src/components/layouts/menu.vue';
	import LayoutHeader from 'src/components/layouts/header.vue';
	import { mapGetters } from 'vuex';

	export default {
		components: {
			'layout-menu': LayoutMenu,
			'layout-header': LayoutHeader,
		},
		props: {
			source: String,
		},
		data: () => ({
			loading: false,
			dialog: false,
			drawer: null,
			theme: 'light',
		}),
		computed: {
			...mapGetters({
				config: 'getConfig',
			}),
		},
		created() {
			this.loading = true;
			this.$store.dispatch('fetchConfig')
				.then((response) => {
					this.$vuetify.theme.themes.light.primary = response.themes.light.primary;
					setTimeout(() => {
						this.loading = false;
					}, 0);
				});
		},
	};
</script>