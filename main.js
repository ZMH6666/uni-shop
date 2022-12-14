
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'


import {$http} from '@escook/request-miniprogram'
uni.$http = $http

$http.baseUrl = 'http://api-hmugo-web.itheima.net'

//拦截器
$http.beforeRequest = function(option){
	uni.showLoading({
		title:'数据加载中'
	})
}


$http.afterRequest = function(option){
	
	uni.hideLoading()
}

uni.$showMsg = function(title = "请求数据失败", duration =1500){
	uni.showToast({
		title,
		duration,
		icon:"none"
	})
	
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif