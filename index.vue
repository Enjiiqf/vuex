<template>
	<div>
		<h1>首页</h1>
		<div>{{ count }}
		<button @click="handleAsyncIncrement">async +1</button>
		<button @click="handleDecrease">-1</button>
		</div>
		<div>{{ list }}</div>
		<div>{{ listCount }}</div>
	</div>
</template>

<script>
	export default{
		computed: {
			count(){
				return this.$store.state.count;
			},
			list(){
				return this.$store.getters.filteredList;
			},
			listCount(){
				return this.$store.getters.listCount;
			}
		},
		methods: {
			handleAsyncIncrement () {
				this.$store.dispatch('asyncIncrement').then(()=>{
					console.log(this.$store.state.count);
				});
			},
			handleDecrease () {
				this.$store.commit('decrease');
			}
		}

	}
</script>

