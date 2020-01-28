//vue
import Vue from 'vue'

//路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
//导入自己路由
import router from './router.js'

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.root='http://www.liulongbin.top:3005';
//设置post表单格式数据
Vue.http.options.emulateJSON=true;

import moment from 'moment'
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
	return moment(dataStr).format(pattern)
})

//按需导入mui组件
// import { Header,Swipe, SwipeItem,Button,Lazyload  } from 'mint-ui';
// Vue.use(Lazyload);
// Vue.component(Header.name, Header); 
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(MintUI)

//mui 样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//VuePreview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import app from './App.vue'

var vm=new Vue({
	el:'#app',
	render: c => c(app),
	router    //挂载路由
})