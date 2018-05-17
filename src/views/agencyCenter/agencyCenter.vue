<template lang="pug">
<div>
view-box.setting(ref="viewBox")
	x-header(slot="header" v-bind:title="$route.meta.pageTitle") 
</div> 
</template>

<script>
import { ViewBox, XHeader, Group, CellBox, XSwitch, XButton, Confirm } from 'vux'

export default {
	name: 'demo',
	components: {
		ViewBox,
		XHeader,
		Group,
		CellBox,
		XSwitch,
		XButton,
		Confirm
	},
	data () {
		return {
		}
	},
	computed: {
	},
	created () {
	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>

</style>
