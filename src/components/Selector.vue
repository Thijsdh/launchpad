<template>
	<div class="launchpad-selector">
		<div class="container">
			<ul>
				<li v-for="i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" :key="i">
					<button :class="{ active: i === activeBoard }" @click="$emit('toggleBoard', i)">{{ i }}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		activeBoard: Number
	}
});
</script>

<style lang="scss" scoped>
.launchpad-selector {
	position: fixed;
	bottom: 0;
	width: 100%;
}
ul {
	display: flex;
	flex-direction: row;
	padding: 0;
	list-style: none;
}
li {
	flex-grow: 1;
	text-align: center;
}
button {
	border: none;
	border-radius: 50%;
	width: 30px;
	height: 30px;
	background: #f3f3f3;

	@media (prefers-color-scheme: dark) {
		background: #383838;
		color: #ffffff;
	}

	&.active {
		background: #693eff;
		color: #f3f3f3;
	}
}
</style>
