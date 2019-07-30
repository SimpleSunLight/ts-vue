import {
	Component, Vue
} from 'vue-property-decorator'
@Component({
})
class Form extends Vue {
	public render() {
		return (
			<keep-alive max={10} include={''}>
				<router-view/>
			</keep-alive>
		)
	}
}

export default Form
