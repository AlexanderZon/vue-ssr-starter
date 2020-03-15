<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ $t('menu.accounts') }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
	export default {
		name: 'Accounts',
		data() {
			return {

			};
		},
		head() {
			return {
				title: this.$root.$t('menu.accounts'),
			};
		},
	};
</script>