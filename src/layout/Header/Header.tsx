import {
	Component, Vue, Prop, Emit
} from 'vue-property-decorator'
import {
	Badge, Dropdown, Breadcrumb, Popover, Icon, Menu,
} from 'ant-design-vue'
import MenuList from '@/layout/Siderbar/MenuList'
import Cookies from 'js-cookie'

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
	public menuData: any[] = []
	public breadList: any[] = []
	public onIndex: number = 0

	@Prop() private username!: string

	@Emit()
	public switchSiderbar(): void {
		this.$store.dispatch('ToggleSiderbar')
	}

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
