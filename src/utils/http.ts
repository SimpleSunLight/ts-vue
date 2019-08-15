import { message } from 'ant-design-vue'
import axios from 'axios'
import qs from 'qs'

const http = axios.create({
	// baseURL: process.env.BASE_URL,
	timeout: 5000
})

/**
 *request拦截器
 */
http.interceptors.request.use((config) => {
	config.method === 'post' ?
	config.data = qs.stringify({...config.data}) : config.params = {...config.params}
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	return config
}, (err) => {
	Promise.reject(err)
})

/**
 * response拦截器
 */
http.interceptors.response.use(
	(response) => {
		if (response.data.code === 0) {
			return response.data
		} else {
			// message.error(response.data.err)
			return response.data
		}
	}, (err) => {
		const code = JSON.parse(JSON.stringify(err)).response.status === 404 ? '404' : '网络异常, 请重试'
		message.error(code)
		return Promise.reject(err)
	}
)

export default http
