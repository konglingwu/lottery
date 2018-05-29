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

// 6. 交易明细-所有类型
export function agentBillRecordAll(query) {
	return fetch({
	    url: '/agent/agentBillRecordAll.action',
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

// 12. 返点赔率表
export function rebateDes(query) {
	return fetch({
	    url: '/agent/rebateDes.action',
	    method: 'POST',
	    params:query
	})
}

// 13. 交易明细-提现记录
export function agentBillRecordWithdrawals(query) {
	return fetch({
	    url: '/agent/agentBillRecordWithdrawals.action',
	    method: 'POST',
	    params:query
	})
}

// 14. 交易明细-充值记录
export function agentBillRecordRecharge(query) {
	return fetch({
	    url: '/agent/agentBillRecordRecharge.action',
	    method: 'POST',
	    params:query
	})
}