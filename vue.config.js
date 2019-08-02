'use strict'

const path = require('path')
const defaultSettings = require('./src/setting.ts')

function resolve(dir){
	return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'Vue + Ts + Antd' // page title

module.exports = {
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		name: name,
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack(config){
		config.module
			.rule('.tsx')
			.test(/\.tsx$/)
			.use('vue-jsx-hot-loader')
			.before('babel-loader')
			.loader('vue-jsx-hot-loader')
	},
	css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#0390FF',
          'border-radius-base': '3px',
          'border-radius-sm': '2px',
          'shadow-color': 'rgba(0,0,0,0.05)',
          'shadow-1-down': '4px 4px 40px @shadow-color',
          'border-color-split': '#f4f4f4',
          'border-color-base': '#e5e5e5',
          'font-size-base': '13px',
          'text-color': '#666',
        }
      }
    }
  },
}