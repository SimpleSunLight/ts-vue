import { Component, Vue } from 'vue-property-decorator'
import { LocaleProvider } from 'ant-design-vue'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import AppMain from '@/layout/AppMain'

@Component({
	components: {
		'a-locale-provide': LocaleProvider
	}
})
class App extends Vue {
	public render() {
		return (
			<div id='app'>
				<a-locale-provide locale={zh_CN}>
					<AppMain />
				</a-locale-provide>
			</div>
		)
	}
}

export default App
