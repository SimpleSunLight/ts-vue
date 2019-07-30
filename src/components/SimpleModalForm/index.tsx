import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import {
	Modal
} from 'ant-design-vue'
import { ModalOptions } from 'ant-design-vue/types/modal';
import SimpleForm, { SimpleFormProps, SimpleFormFieldsTypeProps, OriginSimpleForm } from '@/components/SimpleForm'

type SimpleModalFormProps = ModalOptions & SimpleFormProps

@Component({
	name: 'SimpleModalForm',
	components: {
		'a-modal': Modal,
		'a-simpleform': SimpleForm
	}
})
class SimpleModalForm extends Vue {
	@Prop() private title!: string
	@Prop() private width!: number
	@Prop({ default : 6 }) private spanWidth!: number
	@Prop({ default: [] }) private fields!: SimpleFormFieldsTypeProps[]
	@Prop({ default: 'horizontal' }) private layout!: 'horizontal' | 'vertical' | 'inline'
	// @Prop() private formRef!: OriginSimpleForm | null
	@Prop() private formRef!: any
	@Prop({ default: '取消' }) private cancelText!: string
	@Prop({ default: '确定' }) private okText!: string
	@Prop({ default: false }) private visible!: boolean
	@Prop({ default: false }) private confirmLoading!: boolean
	@Prop() private cancel!: (value: any) => void
	@Prop() private ok!: (value: any) => void

	@Emit()
	public saveFormRef(formRef: any) {
		this.formRef = formRef
	}

	@Emit()
	public handleSubmit(value: any) {
		console.log('aa', this.formRef)
	}

	public render() {
		const {
			title,
			width,
			fields,
			layout,
			okText,
			cancel,
			visible,
			spanWidth,
			cancelText,
			handleSubmit,
			confirmLoading,
		} = this
		const anotherProps = {
			layout,
			fields,
			spanWidth,
			wrapperComponentRef: this.saveFormRef
		}
		return (
			<a-modal
				width={width}
				title={title}
				on-cancel={cancel}
				okText={okText}
				visible={visible}
				on-ok={handleSubmit}
				destroyOnClose={true}
				cancelText={cancelText}
				confirmLoading={confirmLoading}
			>
				<a-simpleform {...{ props: anotherProps} } />
			</a-modal>
		)
	}
}

export default SimpleModalForm
