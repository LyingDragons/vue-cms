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

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//先调用main.js  先从本地存储中读出来
var car= JSON.parse(localStorage.getItem('car')||'[]')

var store =new Vuex.Store({
	state:{ //this.$store.state.***
		car:car
	},
	mutations:{
		addToCar(state,goodsinfo){
			//1.如果有，增加
			//2.没有，则push
			var flag=false;   //没有找到对应商品

			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count+=parseInt(goodsinfo.count) 
					flag=true;
					return true;
				}
			})
			if(!flag){
				state.car.push(goodsinfo)
			}
			//存储
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsinfo(state,goodsinfo){
			//修改+  -
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count=parseInt(goodsinfo.count)
					return true
				}
			})
			//存储
			localStorage.setItem('car',JSON.stringify(state.car))
		}
	},
	getters:{

		getAllCount(state){
			var c=0;
			state.car.forEach(item=>{
				c+=item.count;

			})
			return c;
		},
		getGoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count
			})
			return o
		}
	}

});

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
	router,    //挂载路由
	store      //状态管理
})