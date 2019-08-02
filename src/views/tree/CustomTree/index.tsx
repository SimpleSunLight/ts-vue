import {
	Component, Vue, Emit
} from 'vue-property-decorator'
import SimpleTree from '@/components/SimpleTree'

const x = 3
const y = 2
const z = 1
const gData: any[] = []
const dataList: any[] = []

const generateData = (_level: any, _preKey?: any, _tns?: any) => {
	const preKey = _preKey || '0'
	const tns = _tns || gData

	const children = []
	for (let i = 0; i < x; i++) {
		const key = `${preKey}-${i}`
		tns.push({ title: key, key, scopedSlots: { title: 'title' }})
		if (i < y) {
			children.push(key)
		}
	}
	if (_level < 0) {
		return tns
	}
	const level = _level - 1
	children.forEach((key, index) => {
		tns[index].children = []
		return generateData(level, key, tns[index].children)
	})
}

generateData(z)

const generateList = (data: any) => {
	// tslint:disable-next-line:prefer-for-of
	for (let i = 0; i < data.length; i++) {
		const node = data[i]
		const key = node.key
		dataList.push({ key, title: key })
		if (node.children) {
			generateList(node.children)
		}
	}
}

generateList(gData)

const getParentKey = (key: any, tree: any): any => {
	let parentKey
	// tslint:disable-next-line:prefer-for-of
	for (let i = 0; i < tree.length; i++) {
		const node = tree[i]
		if (node.children) {
			if (node.children.some((item: any) => item.key === key)) {
				parentKey = node.key
			} else if (getParentKey(key, node.children)) {
				parentKey = getParentKey(key, node.children)
			}
		}
	}
	return parentKey
}

@Component({
	components: {
		'a-simpletree': SimpleTree
	}
})
class CustomTree extends Vue {
	private treeData: any[] = gData
	private searchValue: string = ''
	private expandedKeys: any[] = []
	private autoExpandParent: boolean = true

	@Emit()
	public handleOnExpand(expandedKeys: any) {
		this.expandedKeys = expandedKeys
		this.autoExpandParent = false
	}

	@Emit()
	public handleChange(e: any) {
		const value = e.target.value
		const expandedKeys = dataList.map((item: any) => {
			if (item.key.indexOf(value) > -1) {
				return getParentKey(item.key, this.treeData)
			}
			return null
		}).filter((item: any, i: any, self: any) => item && self.indexOf(item) === i)
		Object.assign(this, {
			expandedKeys,
			searchValue: value,
			autoExpandParent: true,
		})
	}

	public render() {
		const { handleChange, handleOnExpand, treeData, expandedKeys, searchValue, autoExpandParent } = this
		return (
			<a-simpletree
				checkable={true}
				treeData={treeData}
				searchValue={searchValue}
				handleChange={handleChange}
				expandedKeys={expandedKeys}
				handleOnExpand={handleOnExpand}
				autoExpandParent={autoExpandParent}
				treeStyle={{ width: '250px', height: 'calc(100vh - 98px)' }}
			/>
		)
	}
}

export default CustomTree
