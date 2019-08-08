import http from '@/utils/http'

const menuData = [
	// {
	// 	name: '首页',
	// 	icon: 'desktop',
	// 	path: '/dashboard',
	// 	meta: { key: 'dashboard' },
	// 	children: []
	// },
	{
		name: '权限管理',
		icon: 'desktop',
		path: '/root',
		meta: { key: 'root' },
		children: [
			{
				name: '菜单管理',
				path: 'menuManage',
				icon: 'desktop',
				meta: {  key: 'menuManage' },
				permission: true,
				children: []
			}, {
				name: '用户管理',
				path: 'userManage',
				icon: 'desktop',
				meta: { key: 'userManage' },
				permission: true,
				children: []
			}
		]
	},
	{
		name: '图表统计',
		icon: 'desktop',
		path: '/total',
		meta: { key: 'total' },
		children: [
			{
				name: '业务统计',
				path: 'businessTotal',
				icon: 'desktop',
				meta: { key: 'businessTotal' },
				permission: true,
				children: []
			}, {
				name: '数据统计',
				path: 'dataTotal',
				icon: 'desktop',
				meta: { key: 'dataTotal' },
				permission: true,
				children: []
			}
		]
	},
]

const user = {
	state: {
		user: {
			username: '',
			userid: '',
		},
		spinning: true
	},
	mutations: {
		SAVEUSER: (state: any, userData: object) => {
			state.user = userData
		},
		LOADING: (state: any, loading: boolean) => {
			state.spinning = loading;
		},
	},
	actions: {
		getUserInfo: (context: any) => new Promise((resolve, reject) => {
			context.commit('LOADING', false)
			http.get('/api/getUserInfo').then((res) => {
				context.commit('LOADING', true)
				if (res) {
					const userData = {
						userid: res.data.id,
						username: res.data.username
					}
					context.commit('SAVEUSER', userData)
					context.dispatch('GetMenuData', menuData)
					resolve(res)
				} else {
					reject(res)
				}
			}).catch((err) => {
				context.commit('LOADING', true)
				reject(err)
			})
		})
	}
}

export default user
