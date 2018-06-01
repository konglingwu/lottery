import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		// 代理中心开始
		{
			path: '/',
			name: 'agencyCenter',
			meta: {
				keepAlive: true,
				pageTitle: '代理中心'
			},
			component: resolve => require(['@/views/agencyCenter/agencyCenter'], resolve)
		},
		// 代理中心结束
		// 代理说明开始
		{
			path: '/agentIntro',
			name: 'agentIntro',
			meta: {
				keepAlive: true,
				pageTitle: '代理说明'
			},
			component: resolve => require(['@/views/agencyCenter/agentIntro'], resolve)
		},	
		// 代理说明结束
		// 代理报表开始
		{
			path: '/agentReport',
			name: 'agentReport',
			meta: {
				keepAlive: true,
				pageTitle: '代理报表'
			},
			component: resolve => require(['@/views/agencyCenter/agentReport'], resolve)
		},	
		// 代理报表结束		
		// 下级报表开始
		{
			path: '/lowerReport',
			name: 'lowerReport',
			meta: {
				keepAlive: true,
				pageTitle: '下级报表'
			},
			component: resolve => require(['@/views/agencyCenter/lowerReport'], resolve)
		},	
		// 下级报表结束		
		// 下级用户开始
		{
			path: '/manageInvite',
			name: 'manageInvite',
			meta: {
				keepAlive: true,
				pageTitle: '下级用户'
			},
			component: resolve => require(['@/views/agencyCenter/manageInvite'], resolve)
		},	
		// 下级用户结束	
		// 会员管理开始
		{
			path: '/agentMember',
			name: 'agentMember',
			meta: {
				keepAlive: true,
				pageTitle: '会员管理'
			},
			component: resolve => require(['@/views/agencyCenter/agentMember'], resolve)
		},	
		// 会员管理结束			
		// 投注明细开始
		{
			path: '/agentBetRecord',
			name: 'agentBetRecord',
			meta: {
				keepAlive: true,
				pageTitle: '投注明细'
			},
			component: resolve => require(['@/views/agencyCenter/agentBetRecord'], resolve)
		},	
		// 投注明细结束		
		// 交易明细开始
		{
			path: '/agentBillRecord',
			name: 'agentBillRecord',
			meta: {
				keepAlive: true,
				pageTitle: '交易明细'
			},
			component: resolve => require(['@/views/agencyCenter/agentBillRecord'], resolve)
		},	
		// 返点赔率表开始
		{
			path: '/rebateTable',
			name: 'rebateTable',
			meta: {
				keepAlive: true,
				pageTitle: '返点赔率表'
			},
			component: resolve => require(['@/views/agencyCenter/rebateTable'], resolve)
		},			
		// 返点赔率表结束
		// 注单详情开始
		{
			path: '/bettingDetails',
			name: 'bettingDetails',
			meta: {
				keepAlive: true,
				pageTitle: '注单详情'
			},
			component: resolve => require(['@/views/agencyCenter/bettingDetails'], resolve)
		},			
		// 注单详情结束																	
		 {
			path: '*',
			redirect: '/demo'
		}]
})
