<template>
	<div id="app">
		<main class="launchpad container">
			<launchpad-button
				v-for="index in [7, 8, 9, 4, 5, 6, 1, 2, 3]"
				:key="index"
				:board="activeBoard"
				:holdMode="holdMode"
				:index="index"
				ref="button"
			/>
		</main>
		<section class="settings container">
			<label for="hold-mode-input">Hold mode</label>
			<checkbox v-model="holdMode" id="hold-mode-input"></checkbox>
		</section>
		<footer>
			<selector :activeBoard="activeBoard" @toggleBoard="activeBoard = $event" />
		</footer>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import LaunchpadButton from '@/components/LaunchpadButton.vue';
import Selector from '@/components/Selector.vue';

export default Vue.extend({
	name: 'Launchpad',
	data() {
		return {
			activeBoard: 1,
			holdMode: false
		};
	},
	components: {
		Checkbox,
		LaunchpadButton,
		Selector
	},
	methods: {
		keyDown(e: KeyboardEvent) {
			if (e.code.startsWith('Digit')) {
				this.activeBoard = parseInt(e.key, 10);
				return;
			}
			if (e.repeat || e.key < '1' || e.key > '9') return;

			e.preventDefault();
			const key = parseInt(e.key, 10);
			const buttons = this.$refs.button as Element[];

			// Pass the keydown event to all the buttons.
			for (const button of buttons as any[]) {
				button.keyDown(key);
			}
		},
		keyUp(e: KeyboardEvent) {
			if (e.key < '1' || e.key > '9') return;

			e.preventDefault();
			const key = parseInt(e.key, 10);
			const buttons = this.$refs.button as Element[];

			// Pass the keyup event to all the buttons.
			for (const button of buttons as any[]) {
				button.keyUp(key);
			}
		}
	},
	mounted() {
		const body = document.querySelector('body') as HTMLBodyElement;
		body.addEventListener('keydown', this.keyDown);
		body.addEventListener('keyup', this.keyUp);
	}
});
</script>

<style lang="scss">
* {
	box-sizing: border-box;

	&:focus {
		outline: 0;
	}
	&::-moz-focus-inner {
		border: 0;
	}
}

html,
body {
	width: 100%;
	height: 100%;
	margin: 0;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
#app {
	color: #393939;
	height: 100%;

	@media (prefers-color-scheme: dark) {
		background: #181818;
		color: #ffffff;
	}
}

.container {
	width: 100%;
	max-width: 580px;
	margin: 0 auto;
	padding: 0 10px;
}

.launchpad {
	padding-top: 60px;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(3, 1fr);
}

.settings {
	margin-top: 20px;

	label {
		display: block;
		padding-bottom: 5px;
	}
}
</style>
