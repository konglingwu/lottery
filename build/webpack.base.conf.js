var path = require('path')
var utils = require('./utils')

var projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader')

var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var webpack = require('webpack')
var AppCachePlugin = require('appcache-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

var isDev = process.env.NODE_ENV.trim() !== 'production'

var program = require('commander');
program
	.option('--host [host]')
	.parse(process.argv);
var host = program.host
var projectName = '好彩彩票'
switch (host) {
	case '91cs99':
		projectName = '91彩神'
		break;
	case 'rongyucp':
		projectName = '荣誉彩票'
		break;
	case '888ffc':
		projectName = '好彩彩票'
		break;
	default:
		break;
}

// 生产坏境
var customPlugin = new webpack.DefinePlugin({
	__DEV__: isDev,
	API_HOST: JSON.stringify(''),
	PROJECT_NAME: JSON.stringify(projectName),
	// SERVICELINK: JSON.stringify(''), // 客服链接
	COUNTDOWN_INTERVAL: 1e3 // 间隔
});

let webpackConfig = {
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	plugins: [customPlugin],
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: vueLoaderConfig
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)$/,
			loader: 'file-loader'
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			include: [resolve('src'), resolve('test')]
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: utils.assetsPath('img/[name].[hash:7].[ext]')
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url-loader',
			options: {
				limit: 10000,
				name: function () {
					let pre = isDev ? '' : '/'
					return pre + utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
		}]
	}
}


module.exports = vuxLoader.merge(webpackConfig, {
	plugins: ['vux-ui', 'progress-bar', 'duplicate-style', {
		name: 'style-parser',
		fn: function (source) {
			// 根据this.resourcePath 来确定是否要引入以及引入的相对路径
			if (/views/.test(this.resourcePath)) {
				// return "@import '../scss/utils.scss';\n" + source
			}
			return source
		}
	}, {
			name: 'less-theme',
			path: 'src/styles/theme.less'
		},
		{
			name: 'iconfont',
			path: 'src/styles/font/iconfont.css'
		}]
})
