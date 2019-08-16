import {
	Component, Vue, Emit
} from 'vue-property-decorator'
import SimpleForm from '@/components/SimpleForm'
import SimpleModalForm from '@/components/SimpleModalForm'
@Component({
	components: {
		'a-simpleform': SimpleForm,
		'a-simplemodalform': SimpleModalForm
	}
})
class CustomForm extends Vue {
	public treeData: any[] = [{
		title: 'Node1',
		value: '0-0',
		key: '0-0',
		children: [{
			title: 'Child Node1',
			value: '0-0-0',
			key: '0-0-0',
		}],
	}, {
		title: 'Node2',
		value: '0-1',
		key: '0-1',
		children: [{
			title: 'Child Node3',
			value: '0-1-0',
			key: '0-1-0',
			disabled: true,
		}, {
			title: 'Child Node4',
			value: '0-1-1',
			key: '0-1-1',
		}, {
			title: 'Child Node5',
			value: '0-1-2',
			key: '0-1-2',
		}]
	}]
	public data: any[] = [
		{
			name: 'A',
			label: 'A',
			initialValue: 'aa',
			required: true,
			type: 'input'
		}, {
			name: 'B',
			label: 'B',
			initialValue: true,
			required: true,
			type: 'switch'
		}, {
			name: 'C',
			label: 'C',
			required: true,
			type: 'datepicker'
		}, {
			name: 'D',
			label: 'D',
			required: true,
			type: 'rangepicker'
		}, {
			name: 'E',
			label: 'E',
			required: true,
			search: this.search,
			select: this.select,
			labelInValue: true,
			showSearch: true,
			selectValue: [],
			fetching: false,
			type: 'search_select'
		}, {
			name: 'F',
			label: 'F',
			required: true,
			type: 'textarea'
		}, {
			name: 'G',
			label: 'G',
			labelInValue: true,
			required: true,
			selectValue: [{ text: 'a', value: 'a' }, { text: 'v', value: 'v'}],
			type: 'select'
		}, {
			name: 'H',
			label: 'H',
			labelInValue: true,
			required: true,
			treeData: this.treeData,
			select: this.treeSelect,
			showSearch: true,
			treeDefaultExpandAll: true,
			treeCheckable: false,
			treeNodeFilterProp: 'title',
			type: 'tree_select'
		}, {
			name: 'I',
			label: 'I',
			labelInValue: true,
			required: true,
			selectValue: [{ text: 'a', value: 'a' }, { text: 'v', value: 'v'}],
			type: 'radio'
		}, {
			name: 'J',
			label: 'J',
			labelInValue: true,
			required: true,
			selectValue: [{ text: 'a', value: 'a' }, { text: 'v', value: 'v'}],
			type: 'checkbox'
		},
	]

	public data1: any[] = [
		{
			name: 'name',
			label: '姓名',
			required: true,
			type: 'input'
		}, {
			name: 'address',
			label: '地址',
			required: true,
			type: 'input'
		}, {
			name: 'dateTime',
			label: '日期',
			required: true,
			type: 'rangepicker'
		}
	]
	public visible: boolean = false
	public visible1: boolean = false
	@Emit()
	public treeSelect(value: string, option: any) {
		console.log('treeSelect', value)
	}

	@Emit()
	public search(value: string) {
		this.data[4].fetching = true
		const _this = this
		setTimeout(() => {
			_this.data[4].selectValue = [{ text: 'a', value: 'a' }, { text: 'v', value: 'v'}]
			_this.data[4].fetching = false
		}, 1000)
	}

	@Emit()
	public select(value: string, option: any) {
		console.log('select', value)
	}

	@Emit()
	public handleSubmit(value: any) {
		console.log('data', value)
	}

	@Emit()
	public showModal(value: any) {
		this.visible1 = !this.visible1
	}

	public render() {
		const {
			// data,
			data1,
			visible1,
			showModal,
			handleSubmit,
		} = this
		return (
			<div>
				{/* <a-simpleform
					layout='vertical'
					fields={data}
					handleParentSubmit={handleSubmit}
					formStyle={{ background: '#fff' }}
				/> */}
				<a-simplemodalform
					title='新建菜单'
					fields={data1}
					cancel={showModal}
					visible={visible1}
					ok={handleSubmit}
				/>
				<button on-click={showModal}>commit</button>
			</div>
		)
	}
}

export default CustomForm
