<template lang="pug">
tabbar
	tabbar-item(v-for="item in navs" key="item" v-bind:link="item.link" v-bind:selected="route.name == item.link.name")
		i.iconfont(v-bind:class="item.icon" slot="icon")
		span(slot="label" v-text="item.label")
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
import { LAYOUT } from '@/store/mutation-types'
import { mapState, mapGetters } from 'vuex'

export default {
	props: {
		route: {
			default: {}
		}
	},
	data () {
		return {
		}
	},
	computed: {
		...mapGetters({
			navs: LAYOUT.NAVS
		}),
	},
	components: {
		Tabbar,
		TabbarItem
	}
}
</script>
