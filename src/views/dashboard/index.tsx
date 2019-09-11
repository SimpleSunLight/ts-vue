import {
	Component, Vue, Emit
} from 'vue-property-decorator'
import {
	Button, DatePicker, Modal, Row, Col, Card, Icon, Radio,
} from 'ant-design-vue'
// import Chart from 'chart.js';
// import { numFormat } from '@/utils/index';

import './index.less'

@Component({
	name: 'Dashboard',
	components: {
		'a-button': Button,
		'a-date-picker': DatePicker,
		'a-radio-group': Radio.Group,
		'a-radio-button': Radio.Button,
		'a-modal': Modal,
		'a-row': Row,
		'a-col': Col,
		'a-card': Card,
		'a-icon': Icon,
	},
})
export default class Dashboard extends Vue {

	public loading: boolean = true

	public render() {
		return (
			<a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
				<a-col>
					<a-card title='首页' loading={this.loading} style={{ width: 400 }}>aa</a-card>
				</a-col>
			</a-row>
		)
	}
}
