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