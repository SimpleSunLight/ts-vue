declare module 'vue-draggable-resizable' {
	import { Component, Vue, Prop } from 'vue-property-decorator'

	interface VueResizableProps {
		className?: string
		classNameDraggable?: string
		classNameResizable?: string
		classNameDragging?: string
		classNameResizing?: string
		classNameActive?: string
		classNameHandle?: string
		disableUserSelect?: boolean
		enableNativeDrag?: boolean
		active?: boolean
		preventDeactivation?: boolean
		draggable?: boolean
		resizable?: boolean
		w?: number
		h?: number
		minWidth?: number
		minHeight?: number
		maxWidth?: number
		maxHeight?: number
		x?: number
		y?: number
		z?: string | number
		handles?: string[]
		axis?: string
		grid?: number[]
		parent?: boolean | string
		dragHandle?: string
		dragCancel?: string
		lockAspectRatio?: boolean
		onDragStart?: (ev: any) => void
		onResizeStart?: (handle: any, ev: any) => void
	}
	@Component({
	})
	class VueDraggableResizable extends Vue {
		@Prop() private data: VueResizableProps
	}
	export default VueDraggableResizable
}

