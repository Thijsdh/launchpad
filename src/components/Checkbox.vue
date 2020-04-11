<template>
	<div>
		<input
			type="checkbox"
			:id="id"
			:checked="value"
			:disabled="disabled"
			true-value="yes"
			false-value="no"
			@input="$emit('input', !value)"
		/>
		<label
			:for="id"
			:style="{
				'--color': color,
				'--color-checked': colorChecked,
				'--color-disabled': colorDisabled,
				'--size': size + 'px',
			}"
		></label>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	props: {
		value: Boolean,
		id: String,
		size: { type: Number, default: 24 },
		color: { type: String, default: '#777777' },
		colorChecked: { type: String, default: '#693eff' },
		colorDisabled: { type: String, default: '#acacac' },
		disabled: { type: Boolean, default: false }
	}
});
</script>

<style lang="scss" scoped>
$transition: 350ms cubic-bezier(0.23, 1, 0.32, 1);
input {
	height: 0;
	width: 0;
	display: none;

	&:checked + label {
		background: var(--color-checked);
		&:after {
			left: calc(100% - 5px);
			transform: translateX(-100%);
		}
	}

	&:disabled + label {
		cursor: auto;
		background: var(--color-disabled);
	}
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: calc(var(--size) * 2);
	height: var(--size);
	background: var(--color);
	display: block;
	border-radius: var(--size);
	position: relative;
	transition: background $transition;

	&:after {
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		width: calc(var(--size) - 10px);
		height: calc(var(--size) - 10px);
		background: #fff;
		border-radius: calc(var(--size) - 10px);
		transition: width $transition, transform $transition, left $transition;
	}
	&:active:after {
		width: var(--size);
	}
}
</style>