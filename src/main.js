// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('array.prototype.find').shim()
require('array.prototype.findIndex').shim()
import Vue from 'vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import {
	AjaxPlugin,
	AlertPlugin
} from 'vux'
import App from './App'
import '@/scss/main.scss'

Vue.config.productionTip = false

Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
import VueClipboards from 'vue-clipboards'
Vue.use(VueClipboards)

Vue.http.defaults.baseURL = API_HOST
Vue.http.defaults.timeout = 15e3
if (!__DEV__) Vue.http.defaults.withCredentials = true

window.diffTime = 0

if (/(Android|Linux)/.test(navigator.userAgent)) document.body.className = 'android-hack'
try {
	iOSNative
} catch (err) {
	document.body.classList.add('tool-fixed')
}

Vue.http.interceptors.response.use(res => {
	const data = res.data,
		url = res.config.url;
	if (data.code == 401) {
		store.commit(USER.SWITCH, {
			status: true,
			notReload: ~url.indexOf('lottery')
		})
		return Promise.reject()
	}
	return res
}, err => {
	if (err.response) {
		switch (err.response.status) {
			case 401:
				let notReload = err.response.config.url.indexOf('lottery') > -1
				store.commit(USER.SWITCH, {
					status: true,
					notReload: notReload
				})
				break;
			default:
				break;
		}
	}
	return Promise.reject(err)
})


function log() {
	if (__DEV__ && console && console.log) {
		let args = Array.prototype.slice.call(arguments)
		args.unshift('[APP]:')
		console.log.apply(console, args)
	}
}
window.log = log

const FastClick = require('fastclick')
FastClick.attach(document.body)

// loading
store.registerModule('vux', {
	state: {
		isLoading: false
	},
	mutations: {
		updateLoadingStatus(state, payload) {
			state.isLoading = payload.isLoading
		}
	}
})

router.beforeEach(function(to, from, next) {
	try {
		let username = store.getters[USER.ACCOUNTINFO].username
		if (username.substring(0, 5) == 'Guest' && to.meta && to.meta.hasAuth) {
			Vue.$vux.alert.show({
				content: '抱歉，试玩账号不能进行此操作'
			})
			next(false)
			return
		}
	} catch (error) {}

	store.commit('updateLoadingStatus', {
		isLoading: true
	})
	next()
})
router.afterEach(function(to) {
	store.commit('updateLoadingStatus', {
		isLoading: false
	})
})


/* eslint-disable no-new */
const VUE = new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
