<template>
	<div class="button-container">
		<button :class="{ ready: file.length, playing }" ref="button" @mousedown.left="play" @mouseup.left="stop" @contextmenu="clear">{{ index }}</button>
		<input type="file" ref="fileInput" @change="fileChange">
		<audio v-if="file.length" :src="file" ref="audio"></audio>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	data() {
		return {
			file: '',
			playing: false,
		};
	},
	props: {
		board: Number,
		index: Number,
	},
	methods: {
		clear(e: MouseEvent) {
			e.preventDefault();
			this.stop();
			this.file = '';
			this.save(null);
			return false;
		},
		fileChange(fileChangeEvent: Event) {
			const reader = new FileReader();
			reader.addEventListener('load', (readerLoadEvent) => {
				const e = readerLoadEvent as ProgressEvent;
				const target = e.target as any;
				this.file = target.result;
				this.save(target.result);
			});

			const fileInput = this.$refs.fileInput as HTMLInputElement;
			const files = fileInput.files as FileList;
			if (!files.length) {
				return;
			}
			reader.readAsDataURL(files[0]);
		},
		keyDown(key: number) {
			if (key === this.index) {
				this.play();
			}
		},
		keyUp(key: number) {
			if (key === this.index) {
				this.stop();
			}
		},
		load() {
			this.file = '';
			this.stop();
			const file = window.localStorage.getItem(this.storageIndex);
			if (file) {
				this.file = file;
			}
		},
		play() {
			if (!this.file.length) {
				const input = this.$refs.fileInput as HTMLInputElement;
				input.click();
			} else {
				this.playing = true;
				const audioElement = this.$refs.audio as HTMLAudioElement;
				audioElement.play();
			}
		},
		save(file: string | null) {
			window.localStorage.setItem(this.storageIndex, this.file);
		},
		stop() {
			if (!this.playing) {
				return;
			}
			this.playing = false;
			const audioElement = this.$refs.audio as HTMLAudioElement;
			audioElement.pause();
			audioElement.currentTime = 0;
		},
	},
	computed: {
		storageIndex() {
			return `button-${this.board}-${this.index}`;
		},
	},
	watch: {
		// Reload when the board changes.
		board() {
			this.load();
		},
	},
	mounted() {
		this.load();
	},
});
</script>

<style lang="scss" scoped>
button {
	width: 100%;
	height: 100%;
	border: none;
	background: #c3c3c3;
	height: 80px;
	border-radius: 5px;
	font-size: 2em;

	&.ready {
		background: #f3f3f3;
	}
	&.playing {
		background: #693eff;
		color: #f3f3f3;
	}
}
input[type='file'] {
	display: none;
}
</style>
