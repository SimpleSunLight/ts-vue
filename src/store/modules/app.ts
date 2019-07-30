import { routeToArray, findMenu } from '@/utils/routeFun'
import router from '@/router'

const app = {
	state: {
		siderbar: {
			opened: localStorage.getItem('siderbarStatus')
		},
		theme: 'default',
		menuData: [
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
						meta: {  key: 'cc' },
						permission: true,
						children: []
					}, {
						name: '用户管理',
						path: 'userManage',
						icon: 'desktop',
						meta: { key: 'dd' },
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
						path: 'maManage',
						icon: 'desktop',
						meta: { key: 'bb' },
						permission: true,
						children: []
					}, {
						name: '数据统计',
						path: 'admin',
						icon: 'desktop',
						meta: { key: 'aa' },
						permission: true,
						children: []
					}
				]
			},
		],
		tabList: [
		],
		tabActivekey: '',
		keepList: [
		],
		isMobile: false
	},
	mutations: {
		TOGGLE_SIDERBAR: (state: any) => {
			localStorage.setItem('siderbarStatus', state.siderbar.opened ? '1' : '0')
			state.siderbar.opened = !state.siderbar.opened
		},
		SAVE_MENU: (state: any, menuData: []) => {
			state.menuData = menuData
		},
		TAB_CHANGE: (state: any, data: { tabList: any, tabActiveKey: string }) => {
			state.tabList = data.tabList
			state.tabActiveKey = data.tabActiveKey
		},
		KEEP_CHANGE: (state: any, list: string[]) => {
			state.keepList = list
		},
		ISMOBILE: (state: any, isMobile: boolean) => {
			state.isMobile = isMobile
		}
	},
	actions: {
		ChangeMobile: (context: any, isMobile: boolean) => {
			context.commit('ISMOBILE', isMobile)
		},
		ToggleSiderbar: (context: any) => {
			context.commit('TOGGLE_SIDERBAR')
		},
		GetMenuData: (context: any, menuData: []) => {
			context.commit('SVAE_MENU', menuData)
		},
		AddKeep: async (context: any, name: string[]) => {
			const { keepList } = context.state
			name.forEach((d: string) => {
				if (keepList.indexOf(d) === -1) {
					keepList.push(d)
				}
			})
			await context.commit('KEEP_CHANGE', keepList)
		},
		AddTabPane: (context: any, url: string) => new Promise((resolve, reject) => {
			const {
				menuData, tabList, tabActiveKey, keepList
			} = context.state
			let resultData: any = {
				tabList,
				tabActiveKey,
				key: []
			}
			let haveMenu: boolean = false
			const ArrPath = routeToArray(url)
			tabList.map((d: any) => {
				if (ArrPath.routeArr.indexOf(d.path.replace(/\/:\w+/g, '')) > -1) {
					resultData.tabActiveKey = d.name
					haveMenu = true
					return false
				}
				return d
			})
			if (!haveMenu) {
				resultData = findMenu(menuData, ArrPath.routeArr, tabList, tabActiveKey, ArrPath.params)
				if (resultData.tabActiveKey && resultData.key) {
					context.dispatch('AddKeep', resultData.key)
				}
			}
			context.commit('TAB_CHANGE', resultData)
			resolve(true)
		}),
		RemoveTab: (context: any, name: string) => {
			let { tabList } = context.state
			const { keepList } = context.state
			const resultData = {
				tabList: [],
				tabActiveKey: ''
			}
			tabList = tabList.filter((d: any, index: number) => {
				if (name === d.name) {
					resultData.tabActiveKey = index ? tabList[index - 1].name : tabList[index + 1].name
					keepList.splice(keepList.indexOf(d.meta.key), 1)
					context.commit('KEEP_CHANGE', keepList)
					router.push({
						name: resultData.tabActiveKey
					})
					return false
				}
			})
			resultData.tabList = tabList
			context.commit('TAB_CHANGE', resultData)
		},
		TabChange: (context: any, name: string) => {
			const { tabList } = context.state
			const resultData = {
				tabList,
				tabActiveKey: name
			}
			context.commit('TAB_CHANGE', resultData)
		}
	}
}

export default app
