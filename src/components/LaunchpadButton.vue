<template>
	<div class="button-container">
		<button :class="{ ready: file.length, playing }" ref="button" @mousedown.left="play" @mouseup.left="stop" @contextmenu="clear">
			<span class="index" v-text="index"></span>
			<span class="title" v-if="title && title.length" v-text="title"></span>
		</button>
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
			title: '',
			playing: false
		};
	},
	props: {
		board: Number,
		index: Number
	},
	methods: {
		clear(e: MouseEvent) {
			e.preventDefault();
			this.stop();
			this.save(null);
			return false;
		},
		fileChange(fileChangeEvent: Event) {
			const fileInput = this.$refs.fileInput as HTMLInputElement;
			const files = fileInput.files as FileList;
			const file = files.item(0) as File;

			const reader = new FileReader();
			reader.addEventListener('load', readerLoadEvent => {
				const e = readerLoadEvent as ProgressEvent;
				const target = e.target as any;
				const buttonItem = {
					title: file.name.substring(0, file.name.lastIndexOf('.')),
					file: target.result
				};
				this.save(buttonItem);
			});

			if (!files.length) return;
			reader.readAsDataURL(file);
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
			const item = window.localStorage.getItem(this.storageIndex);
			if (item) {
				const buttonItem: ButtonItem = JSON.parse(item);
				this.title = buttonItem.title;
				this.file = buttonItem.file;
			} else {
				this.title = '';
				this.file = '';
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
		save(item: ButtonItem | null) {
			if (item === null) {
				window.localStorage.removeItem(this.storageIndex);
			} else {
				window.localStorage.setItem(
					this.storageIndex,
					JSON.stringify(item)
				);
			}
			this.load();
		},
		stop() {
			if (!this.playing) {
				return;
			}
			this.playing = false;
			const audioElement = this.$refs.audio as HTMLAudioElement;
			audioElement.pause();
			audioElement.currentTime = 0;
		}
	},
	computed: {
		storageIndex() {
			return `button-${this.board}-${this.index}`;
		}
	},
	watch: {
		// Reload when the board changes.
		board() {
			this.load();
		}
	},
	mounted() {
		this.load();
	}
});
</script>

<style lang="scss" scoped>
button {
	width: 100%;
	height: 100%;
	border: none;
	background: #c3c3c3;
	height: 120px;
	border-radius: 5px;

	@media (prefers-color-scheme: dark) {
		background: #383838;
		color: #ffffff;
	}

	&.ready {
		background: #f3f3f3;
		@media (prefers-color-scheme: dark) {
			background: #454545;
		}
	}
	&.playing {
		background: #693eff;
		color: #f3f3f3;
	}

	span {
		display: block;
	}

	.index {
		font-size: 2.5em;
	}
	.title {
		font-size: 1.2em;
	}
}
input[type='file'] {
	display: none;
}
</style>
