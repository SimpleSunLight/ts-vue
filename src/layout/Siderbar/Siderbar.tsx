import { Component, Vue } from 'vue-property-decorator'
import config from '@/utils/config'
import MenuList from '@/layout/Siderbar/MenuList'

import './Siderbar.less'

@Component
class SiderBar extends Vue {
	public render() {
		const { menuData, siderbar: { opened } } = this.$store.state.app
		return (
			<div class='sider-bar'>
				<div class='logo-wrap'>
					<img src={config.logo} alt='logo'/>
					<h1 className='txt'>{config.name}</h1>
				</div>
				<MenuList />
			</div>
		)
	}
}

export default SiderBar

