import {
	Component, Prop, Emit, Vue, Watch,
} from 'vue-property-decorator'
import { Tabs } from 'ant-design-vue'
import Header from '@/layout/Header/Header'
import Siderbar from '@/layout/Siderbar/Siderbar'
import config from '@/utils/config'

import './AppMain.less'

@Component({
	components: {
		'a-tabs': Tabs,
		'a-tab-pane': Tabs.TabPane,
	}
})
class AppMain extends Vue {

	public onTabs: any = '1'
	public tabList: any = []

	@Prop() private menuData!: any[]

	@Watch('$route', { immediate: true, deep: true })
	public routeChange(to: any, from: any) {
		this.$store.dispatch('AddTabPane', to.path)
	}

	@Emit()
	public tabChange(name: any) {
		this.tabList.forEach((item: any, indexs: number) => {
			if (item.name === name) {
				this.$router.push({ name: item.name, params: { id: item.params }, query: item.query });
				this.$store.dispatch('TabChange', item.name);
			}
		})
	}

	@Emit()
	public removeTab(name: string) {
		this.$store.dispatch('RemoveTab', name)
	}

	@Emit()
	public onTabEdit(targetKey: string, action: string) {
		if (action === 'remove') {
			this.removeTab(targetKey)
		}
	}

	public render() {
		const {
			siderbar: { opened = 1 }, tabList, tabActiveKey, keepList, isMobile,
		} = this.$store.state.app
		this.onTabs = tabActiveKey // 激活状态保存
		this.tabList = tabList
		if (config.openPages.indexOf(this.$route.path) > -1) {
			return (
				<div class='app-one'>
					<router-view />
				</div>
			)
		}

		return (
			<div class={`app-main ${opened ? '' : 'siderLayout'}`}>
				{
					isMobile ? null : <Siderbar />
				}
				<div class='page-content'>
					<Header />
					<a-tabs
						class='page-tabs'
						activeKey={this.onTabs}
						type='editable-card'
						on-change={this.tabChange}
						on-edit={this.onTabEdit}
					>
						{
							tabList.map((d: any) => <a-tab-pane
								closable={tabList.length > 1}
								key={d.name}
								tab={d.name}
							></a-tab-pane>)
						}
					</a-tabs>
					<div class='page-wrap'>
						<keep-alive max={10} include={keepList}>
							<router-view />
						</keep-alive>
					</div>
				</div>
			</div>
		)
	}
}

export default AppMain
