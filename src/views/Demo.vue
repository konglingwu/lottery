<template lang="pug">
view-box.setting(ref="viewBox")
	input
</template>

<script>
import { ViewBox, XHeader } from 'vux'

export default {
	name: 'demo',
	components: {
		ViewBox,
		XHeader
	}
}
</script>
