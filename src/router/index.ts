import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '/login',
			name: 'login',
			meta: { key: 'login' },
			component: () => import(/* webpackChunkName: "login" */ '@/views/login')
		},
		{
			path: '/total',
			name: 'total',
			meta: { key: 'total' },
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ '@/views/tree'),
			children: [
				{
					path: 'businessTotal',
					name: '业务统计',
					component: () => import(/* webpackChunkName: "about" */ '@/views/tree/CustomTree'),
					meta: { key: 'admin' }
				}, {
					path: 'dataTotal',
					name: '数据统计',
					component: () => import(/* webpackChunkName: "about" */ '@/views/tree/CustomTree'),
					meta: { key: 'admin' }
				}
			]
		},
		{
			path: '/root',
			name: 'root',
			component: () => import(/* webpackChunkName: "about" */ '@/views/table'),
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			meta: { key: 'root' },
			children: [
				{
					path: 'menuManage',
					name: '菜单管理',
					component: () => import(/* webpackChunkName: "about" */ '@/views/form/CustomForm/CustomForm'),
					meta: { key: 'menuManage' }
				}, {
					path: 'userManage',
					name: '用户管理',
					component: () => import(/* webpackChunkName: "about" */ '@/views/table/CustomTable'),
					meta: { key: 'userManage' }
				}
			]
		}
	]
})
