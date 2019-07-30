import {
	Component, Vue, Prop, Watch,
} from 'vue-property-decorator'
import { Menu, Icon } from 'ant-design-vue'
import { routeToArray } from '@/utils/routeFun'

import './MenuList.less'

@Component({
	components: {
		'a-menu': Menu,
		'a-submenu': Menu.SubMenu,
		'a-menu-item-group': Menu.ItemGroup,
		'a-menu-item': Menu.Item,
		'a-icon': Icon
	}
})
class MenuList extends Vue {
	public keys: string[] = []
	public openKeys: string[] = []

	@Prop({ default: '#010101' }) private bgColor!: string
	@Prop({ default: '#fff' }) private txtColor!: string

	@Watch('$route', { immediate: true, deep: true })
	public routeChange(to: any, from: any) {
		this.keys = routeToArray(to.path).routeArr
		const open = this.keys.concat()
		open.pop()
		this.openKeys = open || []
	}

	public openChange(openKeys: string[]) {
		this.openKeys = openKeys
	}

	public render() {
		const { menuData, siderbar: { opened } } = this.$store.state.app
		return (
		<a-menu
			inlineCollapsed={!opened}
			theme='dark'
			mode='inline'
			class='left-menu'
			openKeys={this.openKeys}
			on-openChange={this.openChange}
			selectedKeys={this.keys}
			on-click={(params: {item: any, key: string, keyPath: string[]}) => {
				const keyPath = params.keyPath.reverse()
				this.openPage(keyPath.join('/'))
			}}
		>
			{menuData ? this.renderMenu(menuData) : null}
		</a-menu>
		)
	}

	public renderMenu(menuData: any[], parentPath?: string): Array<JSX.Element | null> {
		return menuData.map((item: any) => {
			if (item.children) {
				let isEmpty = true;
				item.children.forEach((items: any) => {
					if (!items.hidden) {
						isEmpty = false
					}
				})
				if (isEmpty) {
					return <a-menu-item
						id={item.path}
						key={`${item.path}`}
					>
						<a-icon type={item.icon}></a-icon>
						<span>{item.name}</span>
					</a-menu-item>
				}
				return <a-submenu
					id={item.path}
					key={item.path}
				>
					<template slot='title'>
						<a-icon type={item.icon}></a-icon>
						<span>{item.name}</span>
					</template>
					{this.renderMenu(item.children, parentPath ? `${parentPath}/${item.path}` : item.path)}
				</a-submenu>
			}
			if (item.hidden) {
				return null
			}
			return <a-menu-item
				id={item.path}
				key={`${item.path}`}
			>
				<a-icon type={item.icon}></a-icon>
				<span>{item.name}</span>
			</a-menu-item>
		})
	}

	public openPage(path: string) {
		this.$router.push(path)
	}
}

export default MenuList

