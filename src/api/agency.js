import { fetch } from '@/axios/index'

// 1. 代理报表
export function agentReport(query) {
	return fetch({
	    url: '/agent/agentReport.action',
	    method: 'POST',
	    params:query
	})
}

// 2. 下级列表
export function lowerReport(query) {
	return fetch({
	    url: '/agent/lowerReport.action',
	    method: 'POST',
	    params:query
	})
}

// 3. 会员管理
export function agentMember(query) {
	return fetch({
	    url: '/agent/agentMember.action',
	    method: 'POST',
	    params:query
	})
}

// 4. 投注明细
export function agentBetRecord(query) {
	return fetch({
	    url: '/agent/agentBetRecord.action',
	    method: 'POST',
	    params:query
	})
}

// 4. 投注详情
export function bettingDetails(query) {
	return fetch({
	    url: '/agent/bettingDetails.action',
	    method: 'POST',
	    params:query
	})
}

// 4. 交易明细
export function agentBillRecord(query) {
	return fetch({
	    url: '/agent/agentBillRecord.action',
	    method: 'POST',
	    params:query
	})
}