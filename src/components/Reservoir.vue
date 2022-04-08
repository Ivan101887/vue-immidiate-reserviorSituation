<template>
	<ul class="cards d-flex">
		<Card v-for="item in data" :key="item.id" :parent-data="item" />
	</ul>
</template>

<script>
	import Card from "@/components/Card";
	export default {
		data() {
			return {
				data: {},
			};
		},
		components: {
			Card,
		},
		async created() {
			const api = "https://www.taiwanstat.com/waters/latest";
			try {
				const res = await this.$http.get(api);
				this.data = res.data[0];
			} catch (err) {
				console.log("獲取資料失敗:\n", err);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.cards {
		flex: {
			wrap: wrap;
		}
	}
</style>