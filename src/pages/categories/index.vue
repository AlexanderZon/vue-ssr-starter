<template>
  <v-container>
    <v-card>
      <v-card-text>
        {{ $t('menu.categories') }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
	export default {
		name: 'Categories',
		data() {
			return {

			};
		},
		head() {
			return {
				title: this.$root.$t('menu.categories'),
			};
		},
	};
</script>