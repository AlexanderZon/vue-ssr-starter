<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ $t('menu.dashboard') }}. Token: {{ $root.$options.__OAUTH_TOKEN__ }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
	export default {
		name: 'Dashboard',
		data() {
			return {

			};
		},
		head() {
			return {
				title: this.$root.$t('menu.dashboard'),
			};
		},
	};
</script>