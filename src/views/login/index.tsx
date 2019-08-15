import {
	Component, Vue, Emit, Prop
} from 'vue-property-decorator'
import { Form, Button, Icon, Input, message } from 'ant-design-vue'
import config from '@/utils/config'

import './index.less'

@Component({
	components: {
		'a-form': Form,
		'a-form-item': Form.Item,
		'a-button': Button,
		'a-icon': Icon,
		'a-input': Input
	},
	props: {
		Form
	}
})
class Login extends Vue {
	[x: string]: any;

	public loading: boolean = false
	public loginForm: {
		username: string
		password: string
	} = {
		username: '',
		password: ''
	}

	@Prop() private Form!: any

	@Emit()
	public submitForm() {
		this.Form.validateFields((err: any, values: object) => {
			if (!err) {
				this.$http.post('/api/login', values).then((data: any) => {
					this.loading = true
					this.$store.dispatch('getUserInfo').then(() => {
						this.$router.push('/')
					})
					message.success('登陆成功!')
				}).catch((error: any) => {
					throw error
				})
			} else {
				this.$message.error('账号或密码错误!')
			}
		})
	}

	public render() {
		const{ getFieldDecorator }  = this.Form
		return (
			<div class='loginWrap'>
				<h2 class='loginTxt'>WELCOME<br />VUE-TS-ADMIN</h2>
				<div class='loginForm'>
					<div class='logo'>
						<img src={require('../../assets/logo.svg')} alt='logo' />
						<span>{config.name}</span>
					</div>
					<a-form ref='loginForm' on-submit={this.submitForm}>
						<a-form-item>
							{getFieldDecorator('username', {
								rules: [{ required: true, message: 'Please enter a user name' }]
							})(
								<a-input
									id='username'
									prefix-icon='iconfont-user'
									placeholder='Please enter a user name'
								>
									<a-icon slot='prefix' type='user' />
								</a-input>
							)}
						</a-form-item>
						<a-form-item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: 'Please enter a password' }]
							})(
								<a-input
									id='password'
									prefix-icon='iconfont-lock'
									type='password'
									on-pressEnter={this.submitForm}
									placeholder='Please enter a password'
								>
									<a-icon slot='prefix' type='lock' />
								</a-input>
							)}
						</a-form-item>
						<a-form-item>
							<a-button type='primary' loading={this.loading} on-click={this.submitForm}>Login</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		)
	}
}

export default Form.create({})(Login)
