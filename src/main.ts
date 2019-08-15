import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App'
import config from '@/utils/config'
import http from '@/utils/http'
import { message } from 'ant-design-vue'

import '@/styles/global.less'

Vue.prototype.$http = http
Vue.prototype.$message = message

Vue.config.productionTip = false

let flag: boolean = true

router.beforeEach((to, from, next) => {
	if (!store.state.app.menuData.length && flag) {
		flag = false
		store.dispatch('getUserInfo').then(() => {
			const toPath = config.noLoginList.indexOf(to.path) > -1 ? '/dashboard' : to.path
			store.dispatch('AddTabPane', toPath).then(() => {
				next({
					path: toPath, query: to.query, params: to.params, replace: true
				})
			})
		}).catch((err: any) => {
			if (config.noLoginList.indexOf(to.path) < 0) {
				next({ name: 'login', replace: true})
			}
			next()
			// throw err
		})
	}
	next()
})

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
