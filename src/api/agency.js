import { fetch } from '@/axios/index'

// 1. 代理报表
export function agentReport() {
	  return fetch({
	    url: '/agentReport',
	    method: 'GET'
	  })
	
	}