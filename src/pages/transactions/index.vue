<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ $t('menu.transactions') }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
	export default {
		name: 'Transactions',
		data() {
			return {

			};
		},
		head() {
			return {
				title: this.$root.$t('menu.transactions'),
			};
		},
	};
</script>