import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/demo/index',
			name: 'demo',
			meta: {
				keepAlive: true,
				pageTitle: '代理中心'
			},
			component: resolve => require(['@/views/demo'], resolve)
		},
		{
			path: '/agencyCenter',
			name: 'agencyCenter',
			meta: {
				keepAlive: true,
				pageTitle: '代理中心'
			},
			component: resolve => require(['@/views/agencyCenter/agencyCenter'], resolve)
		}, {
			path: '*',
			redirect: '/demo'
		}]
})
