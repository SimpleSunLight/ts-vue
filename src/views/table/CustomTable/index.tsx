import {
	Component, Vue, Emit
} from 'vue-property-decorator'
import { Table } from 'ant-design-vue'

import './index.less'

@Component({
	components: {
		'a-table': Table
	}
})
class CustomTable extends Vue {
	public columns: any[] = [{
		dataIndex: 'name',
		key: 'name',
		title: 'Name',
		scopedSlots: { customRender: 'name' },
	}, {
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	}, {
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	}, {
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		scopedSlots: { customRender: 'tags' },
	}, {
		title: 'Action',
		key: 'action',
		scopedSlots: { customRender: 'action' },
	}]
	public data: any[] = [{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	}, {
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	}, {
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}, {
		key: '4',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	}, {
		key: '5',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	}, {
		key: '6',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}, {
		key: '7',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	}, {
		key: '8',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	}, {
		key: '9',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}, {
		key: '10',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
		tags: ['nice', 'developer'],
	}, {
		key: '11',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
		tags: ['loser'],
	}, {
		key: '12',
		name: 'Joe Black',
		age: 32,
		address: 'Sidney No. 1 Lake Park',
		tags: ['cool', 'teacher'],
	}]

	public current: number = 1

	@Emit()
	public handleOnChange(pagination: any, filters: any, sorter: any) {
		this.current = pagination.current
	}

	public render() {
		const { columns, data, handleOnChange, current } = this
		return (
			<div class='wrapperTable'>
				<a-table
					bordered={true}
					columns={columns}
					rowKey={(record: any) => record.key}
					dataSource={data}
					pagination={{
						current,
						total: data.length,
						defaultPageSize: 10,
						pageSize: 10,
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: (total: any) => `共${total}条`,
					}}
					on-change={handleOnChange}
				/>
			</div>
		)
	}
}

export default CustomTable
