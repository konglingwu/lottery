import { fetch } from '@/axios/index'

// 1. 代理报表
export function agentReport(query) {
	return fetch({
	    url: '/agentReport',
	    method: 'POST',
	    params:query
	})
}

// 2. 下级列表
export function lowerReport(query) {
	return fetch({
	    url: '/lowerReport',
	    method: 'POST',
	    params:query
	})
}

// 3. 会员管理
export function agentMember(query) {
	return fetch({
	    url: '/agentMember',
	    method: 'POST',
	    params:query
	})
}

// 4. 投注明细
export function agentBetRecord(query) {
	return fetch({
	    url: '/agentBetRecord',
	    method: 'POST',
	    params:query
	})
}