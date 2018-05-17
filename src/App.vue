<template lang="pug">
.g-doc
	router-view
	loading(v-model="isLoading")
</template>

<script>
import { Loading } from 'vux'
import { mapState } from 'vuex'

export default {
	name: 'app',
	components: {
		Loading
	},
	data () {
		return {
		}
	},
	computed: {
		...mapState({
			isLoading: state => state.vux.isLoading
		})
	},
	created () {
	},
	methods: {
	}
}
</script>
