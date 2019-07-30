const routeToArray = (route: string): { routeArr: string[], params: string } => {
	if (!route) {
		return {
			routeArr: [],
			params: ''
		}
	}
	const arr: string[] = route.split('/')
	const ret: string[] = []
	let params = ''
	arr.shift()
	arr.forEach((d: any, i: any) => {
		if (parseInt(d, 10)) {
			params = d
			return
		}
		ret.push( i ? d : `/${d}`)
	})
	return {
		routeArr: ret,
		params
	}
}

const findMenu = (
	data: any,
	url: string[],
	tabList: any[],
	tabActiveKey: string,
	params?: string,
	query?: any,
	key?: string[]
) => {
	let result: any = {
		tabList,
		tabActiveKey
	}
	data.forEach((d: any) => {
		if (url.indexOf(d.path.replace(/\/:\w+/g, '')) > -1) {
			if (!key) {
				key = []
			}
			key.push(d.meta.key)
			if (url.length === 1) {
				result.tabList.push({
					...d,
					params,
					query
				})
				result.tabActiveKey = d.name
			}
		} else {
			url.shift()
			result = findMenu(d.children, url, tabList, tabActiveKey, params, query, key)
		}
	})
	result.key = key
	return result
}

export {
	routeToArray,
	findMenu
}
