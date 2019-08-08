// tslint:disable-next-line: no-var-requires
const Logo = require('../assets/logo.svg')

const API = process.env.NODE_ENV === 'production' ? '' : '/api'

const config = {
	name: 'vue-typescript',
	footerText: 'vue-typescript  © 2018 chencan',
	logo: Logo,
	icon: '/favicon.ico',
	API,
	openPages: ['/login', '/404', '/401'], // 全屏页面
	noLoginList: ['/login']
}

export default config
