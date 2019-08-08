import { Component, Vue } from 'vue-property-decorator'
import { LocaleProvider } from 'ant-design-vue'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import Loader from '@/components/Loader/index.vue'
import AppMain from '@/layout/AppMain'

@Component({
	components: {
		'loader': Loader,
		'a-locale-provide': LocaleProvider,
	}
})
class App extends Vue {
	public render() {
		const self = this
		return (
			<div id='app'>
			<loader spin={self.$store.getters.spinning} fullScreen></loader>
				<a-locale-provide locale={zh_CN}>
					<AppMain />
				</a-locale-provide>
			</div>
		)
	}
}

export default App
