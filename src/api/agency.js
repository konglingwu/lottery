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

// 5. 投注详情
export function bettingDetails(query) {
	return fetch({
	    url: '/agent/bettingDetails.action',
	    method: 'POST',
	    params:query
	})
}

// 6. 交易明细
export function agentBillRecord(query) {
	return fetch({
	    url: '/agent/agentBillRecord.action',
	    method: 'POST',
	    params:query
	})
}

// 7. 下级用户-返点列表
export function agentRebate(query) {
	return fetch({
	    url: '/agent/agentRebate.action',
	    method: 'POST',
	    params:query
	})
}

// 8. 下级用户-生成邀请码
export function invitingCode(query) {
	return fetch({
	    url: '/agent/invitingCode.action',
	    method: 'POST',
	    params:query
	})
}

// 9. 邀请码-列表
export function InvitingCodeList(query) {
	return fetch({
	    url: '/agent/InvitingCodeList.action',
	    method: 'POST',
	    params:query
	})
}

// 10. 返点详情
export function rebateDetails(query) {
	return fetch({
	    url: '/agent/rebateDetails.action',
	    method: 'POST',
	    params:query
	})
}

// 11. 删除邀请码
export function deleteInvitationCode(query) {
	return fetch({
	    url: '/agent/deleteInvitationCode.action',
	    method: 'DELETE',
	    params:query
	})
}

// 12. 删除邀请码
export function rebateDes(query) {
	return fetch({
	    url: '/agent/rebateDes.action',
	    method: 'POST',
	    params:query
	})
}