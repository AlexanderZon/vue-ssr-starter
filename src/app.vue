<template>
  <div>
    <main>
      <server-error
        v-if="serverError"
        :error="serverError"
      />
      <router-view v-else />
    </main>
  </div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import 'src/styles/reset.styl';

	import ServerError from 'src/components/server-error.vue';

	export default {
		name: 'App',
		components: { ServerError },
		computed: mapGetters(['serverError']),
		head() {
			let title = 'Loading...';
			if (this.serverError) {
				if (this.serverError.response && this.serverError.response.status === 404)
					title = '404 Page not found';
				else title = this.serverError.message ||
					this.serverError.response && this.serverError.response.data.message ||
					'Something went wrong...';
			}
			return {
				title,
				titleTemplate: '%s | App',
				htmlAttrs: {
					lang: 'en',
				},
				meta: [
					{ vmid: 'charset', charset: 'UTF-8' },
					{ vmid: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1' },
				],
			};
		},
	};
</script>

