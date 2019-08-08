import {
	Component, Vue, Prop, Emit, Watch
} from 'vue-property-decorator'
import {
	Badge, Dropdown, Breadcrumb, Popover, Icon, Menu,
} from 'ant-design-vue'
import Cookies from 'js-cookie'
import { routeToArray } from '@/utils/routeFun'
import MenuList from '@/layout/Siderbar/MenuList'

import './Header.less'

interface BreadItemIf {
	url: string
	text: string
}

@Component({
	components: {
		'a-popover': Popover,
		'a-badge': Badge,
		'a-dropdown': Dropdown,
		'a-breadcrumb': Breadcrumb,
		'a-breadcrumb-item': Breadcrumb.Item,
		'a-icon': Icon,
		'a-menu': Menu,
		'a-menu-item': Menu.Item,
		'a-menu-divider': Menu.Divider,
		'menu-list': MenuList
	}
})
class Header extends Vue {
	public menuData: any[] = [
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
	public breadList: any[] = []
	public onIndex: number = 0

	@Prop() private username!: string

	@Watch('$route',  { immediate: true, deep: true })
	public routeChange(to: any, from: any) {
		const toDepth = routeToArray(to.path)
		this.onIndex = 0
		this.breadList = []
		this.routerBread(this.menuData, toDepth.routeArr)
	}

	@Watch('menuData')
	public initRouteBread() {
		const toDepth = routeToArray(this.$route.path);
		this.routerBread(this.menuData, toDepth.routeArr);
	}

	@Emit()
	public routerBread(data: any, toDepth: string[]) {
		data.map((d: any) => {
			if (d.path === toDepth[this.onIndex]) {
				this.breadList.push({
					url: d.path,
					text: d.name ? d.name : ''
				})
				if (d.children && (toDepth.length - 1) >= this.onIndex) {
					this.onIndex += 1
					this.routerBread(d.children, toDepth)
				}
			}
			return true
		})
	}

	@Emit()
	public switchSiderbar(): void {
		this.$store.dispatch('ToggleSiderbar')
	}

	@Emit()
	public menuClick(params: {item: any, key: string, keyPath: string[]}): void {
		const self = this
		switch (params.key) {
			case '1':
				break
			case '2':
				break
			case '3':
				Cookies.remove('token');
				this.$router.push('/login');
				break
			default:
				break
		}
	}

	public render() {
		const { username } = this
		const { menuData, siderbar: { opened }, isMobile } = this.$store.state.app
		this.menuData = menuData

		return (
			<header class='header-wrap'>
				<div class='header-left'>
					{
						isMobile ? <a-popover
							placement='bottom'
							title=''
							width='300'
							trigger='click'
						>
							<menu-list slot='content' bgColor='#fff' textColor='#898989' />
							<i class='menu-btn iconfont-listMenu'></i>
						</a-popover> : <i class={`menu-btn iconfont-${opened ? 'indent' : 'outdent'}`} on-click={this.switchSiderbar}></i>
					}
					{
						isMobile ? null
						: <a-breadcrumb class='header-bread' separator='/'>
							{
								// tslint:disable-next-line:max-line-length
								this.breadList.map((d: BreadItemIf) => <a-breadcrumb-item to={d.url ? { path: '/' } : null} >{d.text}</a-breadcrumb-item>)
							}
						</a-breadcrumb>
					}
				</div>
				<ul class='header-menu'>
					<li>
						<a-badge count={12} class='item'>
							<i class='iconfont-email'></i>
						</a-badge>
					</li>
					<li>
						<i class='iconfont-bell'></i>
					</li>
					<li class='user'>
						<Dropdown>
							<span class='ant-dropdown-link'>
								<a-icon type='user' />
								<span class='name'>admin</span>
							</span>
							<a-menu slot='overlay' on-click={this.menuClick}>
								<a-menu-item key='1'>个人中心</a-menu-item>
								<a-menu-item key='2'>修改密码</a-menu-item>
								<a-menu-divider />
								<a-menu-item key='3'>
									<font color='red'>退出登录</font>
								</a-menu-item>
							</a-menu>
						</Dropdown>
					</li>
				</ul>
			</header>
		)
	}
}

export default Header
