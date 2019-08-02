import { Component, Vue, Emit, Prop } from 'vue-property-decorator'
import { Card, Input, Tree } from 'ant-design-vue'

interface IIProp {
	expandedKeys: string[] | string[]
	handleChange: (e: any) => void
	searchValue: string
	showLine: boolean
	showIcon: boolean
	checkable: boolean
	autoExpandParent: boolean
	treeData: string[] | number[]
	selectedKeys?: string[] | number[]
	placeholder: string
	treeStyle?: any
}

@Component({
	components: {
		'a-tree': Tree,
		'a-card': Card,
		'a-tree-node': Tree.TreeNode,
		'a-input-search': Input.Search
	}
})
class SimpleTree extends Vue {
	@Prop() private handleChange!: (e: any) => void
	@Prop({ default: '' }) private searchValue!: string
	@Prop({ default() { return {}} }) private treeStyle!: object
	@Prop({ default : false }) private showLine!: boolean
	@Prop({ default : false }) private showIcon	!: boolean
	@Prop({ default : false }) private checkable!: boolean
	@Prop() private handleOnExpand!: (expandedKeys: any) => void
	@Prop({ default : true }) private autoExpandParent!: boolean
	@Prop({ default : '请输入查找的信息' }) private placeholder!: string
	@Prop({ default() { return []} }) private expandedKeys!: string[] | number[]
	@Prop({ default() { return []} }) private selectedKeys!: string[] | number[]
	@Prop({ default() { return []} }) private treeData!: string[] | number[]

	public render() {

		const {
			treeData,
			showIcon,
			showLine,
			treeStyle,
			checkable,
			searchValue,
			placeholder,
			expandedKeys,
			selectedKeys,
			handleChange,
			handleOnExpand,
			autoExpandParent
		} = this

		const loop = (data: any[]) => data.map((item: any) => {
			const index = item.title.indexOf(searchValue)
			const beforeStr = item.title.substr(0, index)
			const afterStr = item.title.substr(index + searchValue.length)
			const title =
				index > -1 ? (
					<span>
						{beforeStr}
							<span style={{ color: '#f50' }}>{searchValue}</span>
						{afterStr}
					</span>
				) : (
					<span>{item.title}</span>
				)
			if (item.children) {
				return (
					<a-tree-node key={item.key} title={title}>
						{loop(item.children)}
					</a-tree-node>
				)
			}
			return <a-tree-node key={item.key} title={title} />
		})

		return (
			<a-card style={treeStyle}>
				<a-input-search
					placeholder={placeholder}
					on-change={handleChange}
				/>
				<a-tree
					showIcon={showIcon}
					showLine={showLine}
					checkable={checkable}
					on-expand={handleOnExpand}
					selectedKeys={selectedKeys}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
				>
					{loop(treeData)}
				</a-tree>
			</a-card>
		)
	}
}

export default SimpleTree
