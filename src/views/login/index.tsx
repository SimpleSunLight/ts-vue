import {
	Component, Vue
} from 'vue-property-decorator'

@Component({
})
class Login extends Vue {
	public render() {
		return (
			<div style='height: 500px; width: 500px; border: 1px solid red; position: relative;'>
				<vue-draggable-resizable>
					<p>aaaaa</p>
				</vue-draggable-resizable>
			</div>
		)
	}
}

export default Login
