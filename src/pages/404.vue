<template>
  <not-found />
</template>

<script>
	import NotFound from 'src/components/not-found.vue';
	export default {
		components: { NotFound },
		head: {
			title: '404 Not Found',
		},
	};
</script>