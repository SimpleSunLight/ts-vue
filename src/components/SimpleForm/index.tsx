import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import {
	Form, Input, Select, Radio, Icon, DatePicker, Button, Col, Row, Switch, Checkbox, Spin, TreeSelect
} from 'ant-design-vue'

import './index.less'

export interface SimpleFormFieldsTypeProps {
	name: string,
	label: string,
	search?: (value: any) => void
	change?: (value: any) => void
	select?: (value: any) => void
	disabled?: boolean
	required?: boolean
	labelInValue?: boolean
	placeholder?: string
	size?: 'default' | 'large' | 'small',
	showSearch?: boolean
	fetching?: boolean
	treeData?: any[]
	treeNodeFilterProp?: string
	treeCheckable?: boolean
	treeDefaultExpandAll?: boolean
	selectValue?: Array<{ text: number | string, value: number | string }>
}

export interface SimpleFormProps {
	fields: SimpleFormFieldsTypeProps[]
	layout?: 'horizontal' | 'vertical' | 'inline'
	size?: 'default' | 'large' | 'small'
	spanWidth?: number
	handleSubmit?: (value: any) => void
	handleValuesChange?: (value: any) => void
	formStyle?: any
}

@Component({
	name: 'SimpleForm',
	components: {
		'a-form': Form,
		'a-form-item': Form.Item,
		'a-input': Input,
		'a-input-textarea': Input.TextArea,
		'a-select': Select,
		'a-select-option': Select.Option,
		'a-radio': Radio,
		'a-radio-group': Radio.Group,
		'a-icon': Icon,
		'a-date-picker': DatePicker,
		'a-checkbox': Checkbox,
		'a-checkbox-group': Checkbox.Group,
		'a-range-picker': DatePicker.RangePicker,
		'a-button': Button,
		'a-row': Row,
		'a-col': Col,
		'a-switch': Switch,
		'a-spin': Spin,
		'a-treeselect': TreeSelect,
	}
})
export class OriginSimpleForm extends Vue {
	@Prop() private fields!: SimpleFormFieldsTypeProps[]
	@Prop() private layout!: 'horizontal' | 'vertical' | 'inline'
	@Prop() private formStyle!: any
	@Prop() private spanWidth!: number
	@Prop() private size!: 'default'| 'large' | 'small'
	@Prop() private Form!: any
	@Prop() private handleParentSubmit!: (value: any) => void

	@Emit()
	public renderType(fieldsData: any, size: 'default'| 'large' | 'small') {
		switch (fieldsData.type) {
			case 'select':
				return <a-select
					allowClear={true}
					showArrow={true}
					disabled={!!fieldsData.disabled || !fieldsData.selectValue || fieldsData.selectValue.length === 0}
					labelInValue={!!fieldsData.labelInValue === false ? false : true}
					placeholder={fieldsData.placeholder ? fieldsData.placehoder : '请输入'}
					size={fieldsData.size ? fieldsData.size : size}
					change={fieldsData.change}
				>
					{
						fieldsData.selectValue!.map((d: any) => <a-select-option key={d.value}>{d.text}</a-select-option>)
					}
				</a-select>
			case 'search_select':
			 	return <a-select
					allowClear={true}
					showArrow={false}
					filterOption={false}
					autoClearSearchValue={true}
					defaultActiveFirstOption={false}
					showSearch={!!fieldsData.showSearch}
					disabled={!!fieldsData.disabled}
					notFoundContent={!!fieldsData.fetching ? <a-spin size='small' /> : 'Not Found'}
					labelInValue={fieldsData.labelInValue === false ? false : true}
					placeholder={fieldsData.placeholder ? fieldsData.placehoder : '请输入'}
					size={fieldsData.size ? fieldsData.size : size}
					on-search={fieldsData.search}
					on-select={fieldsData.select}
				>
					{
						fieldsData.selectValue!.map((d: any) => <a-select-option key={d.value}>{d.text}</a-select-option>)
					}
				</a-select>
			case 'tree_select':
				return <a-treeselect
					allowClear={true}
					showArrow={false}
					on-select={fieldsData.select}
					treeData={fieldsData.treeData}
					disabled={!!fieldsData.disabled}
					treeNodeFilterProp={fieldsData.treeNodeFilterProp}
					showSearch={!!fieldsData.showSearch}
					treeCheckable={!!fieldsData.treeCheckable}
					treeDefaultExpandAll={!!fieldsData.treeDefaultExpandAll}
					labelInValue={fieldsData.labelInValue === false ? false : true}
					placeholder={fieldsData.placeholder ? fieldsData.placehoder : '请输入'}
					size={fieldsData.size ? fieldsData.size : size}
				/>
			case 'textarea':
				return <a-input-textarea
					disable={!!fieldsData.disabled}
					autosize={{ minRows: 3 }}
					placehoder={fieldsData.placehoder ? fieldsData.placehoder : '请输入'}
				/>
			case 'switch':
				return <a-switch />
			case 'datepicker':
				return <a-date-picker />
			case 'rangepicker':
				return <a-range-picker />
			case 'checkbox':
				return <a-checkbox-group>
					{
						fieldsData.selectValue!.map((d: any) => <a-checkbox key={d.value} value={d.value}>{d.text}</a-checkbox>)
					}
				</a-checkbox-group>
			case 'radio':
				return <a-radio-group>
					{
						fieldsData.selectValue!.map((d: any) => <a-radio key={d.value} value={d.value}>{d.text}</a-radio> )
					}
				</a-radio-group>
			default:
				return (
					<a-input
						disable={!!fieldsData.disabled}
						placehoder={fieldsData.placehoder ? fieldsData.placehoder : '请输入'}
						size={size}
					/>
				)
		}
	}

	@Emit()
	public handleSubmit(e: any) {
		e.preventDefault()
		this.Form.validateFields((err: any, values: any) => {
			if (!err) {
				this.handleParentSubmit(values)
			}
		})
	}

	@Emit()
	public renderForm() {
		const { getFieldDecorator } = this.Form
		const { fields, size, formStyle } = this
		const formLayout: any = {
			labelCol : {
				sm: { span: 6 },
				xs: { span: 8 }
			},
			wrapperCol: {
				sm: { span: 18 },
				xs: { span: 16 }
			}
		}
		return (
			<a-form layout='horizontal' class='simple-form' onSubmit={this.handleSubmit} style={formStyle}>
				{
					fields.map((d: any) => (
						<a-form-item label={d.label} {...{ props: formLayout }}>
							{
								getFieldDecorator(d.name, {
									initialValue: d.initialValue,
									rules: [{
										required: !!d.required
									}],
									valuePropName: d.type === 'checkbox' ? 'checked' : 'value'
								})(
									this.renderType(d, size)
								)
							}
						</a-form-item>
					))
				}
				{
					this.handleParentSubmit ?
					<a-form-item>
						<a-col offset='6'>
							<a-button type='primary' html-type='submit'>提交</a-button>
						</a-col>
					</a-form-item>
					:
					null
				}
			</a-form>
		)
	}

	@Emit()
	public renderInlineForm()	{
		const { getFieldDecorator } = this.Form
		const { fields, size, spanWidth, formStyle } = this
		const colSpan: any = { md: 8, sm: 24, lg: spanWidth }
		return (
			<a-form layout='inline' class='simple-form' onSubmit={this.handleSubmit} style={formStyle}>
				<a-row gutter={{ md: 8, lg: 24, xl: 24}}>
					{
						fields.map((d: any) => (
							<a-col key={d.label} {...{ props: colSpan }}>
								<a-form-item label={d.label}>
									{
										getFieldDecorator(d.name, {
											initialValue: d.initialValue,
											rules: [{
												required: !!d.required
											}],
											valuePropName: d.type === 'checkbox' ? 'checked' : 'value'
										})(
											this.renderType(d, size)
										)
									}
								</a-form-item>
							</a-col>
						))
					}
					{
						this.handleParentSubmit ?
						<a-form-item>
							<a-col offset={2}>
								<a-button type='primary' html-type='submit'>查询</a-button>
							</a-col>
						</a-form-item>
						:
						null
					}
				</a-row>
			</a-form>
		)
	}

	public render() {
		const { layout } = this
		if (layout === 'vertical') {
			// return this.renderVerticalForm()
		} else if (layout === 'inline') {
			return this.renderInlineForm()
		}
		return this.renderForm()
	}
}
export default Form.create({
	props: {
		handleParentSubmit: {
			type: Function
		},
		fields: {
			type: Array,
			default() {
				return []
			}
		},
		layout: {
			type: String,
			default: 'horizontal'
		},
		spanWidth: {
			type: Number,
			default: 6
		},
		size: {
			type: String,
			default: 'default'
		},
		formStyle: {
			type: Object,
			default() {
				return {}
			}
		},
		wrapperComponentRef: {
			type: Function,
		}
	}
})(OriginSimpleForm)
