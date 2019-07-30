import {
	Component, Vue, Emit
} from 'vue-property-decorator'
import { Table } from 'ant-design-vue'
@Component({
	components: {
		'a-table': Table
	}
})
class CustomTable extends Vue {
	public columns: any[] = [{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		width: '20%',
		scopedSlots: { customRender: 'name' },
	}, {
		title: 'Gender',
		dataIndex: 'gender',
		filters: [
			{ text: 'Male', value: 'male' },
			{ text: 'Female', value: 'female' },
		],
		width: '20%',
	}, {
		title: 'Email',
		dataIndex: 'email',
	}]
	public data: any[] = []
	public pagination: any = {}

	@Emit()
	public handleTableChange(pagination: any, filters: any, sorter: any) {
		console.log('a', pagination, filters, sorter)
	}
	public render() {
		const { columns, data } = this
		return (
			<div>
				<a-table
					columns={columns}
					rowKey={(record: any) => record.login.uuid}
					dataSource={data}
					pagination={this.pagination}
					on-click={this.handleTableChange}
				/>
			</div>
		)
	}
}

export default CustomTable
