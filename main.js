import Vue from 'vue';//汇入Vue架构
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';//汇入app.vue组件

Vue.use(VueRouter);
Vue.use(Vuex);
const Routers = [
	{
		path: '/index',
		meta: {
			title: '首页'
		},
		component: (resolve) => require(['./views/index.vue'],resolve)
	},
	{
		path: '/about',
		meta: {
			title: '关于'
		},
		component: (resolve) => require(['./views/about.vue'],resolve)
	},
	{
		path: '*',//当存取的路径不存在时，重新导向到首页
		redirect: '/index'
	},
	{
		path: '/user/:id',//存取localhost：8080/user会重新导向到index，需要带一个id才能到user.vue例如localhost:8080/user/123456
		meta: {
			title: '个人首页'
		},
		component: (resolve) => require(['./views/user.vue'],resolve)
	}
];
const RouterConfig = {
	//使用HTML5的History路由模式，通过/来设定路径，不过不设定mode，就会使用#来设定路径
	mode: 'history',
	routes: Routers
};
const router = new VueRouter(RouterConfig);
//vue-router提供了导览钩子beforeEach和afterEach,它们会在路由即将改变前和改变后触发
//所以设定标题可以在beforeEach钩子完成
router.beforeEach((to, from, next) => {
	window.document.title = to.meta.title;
		next();
});
// router.afterEach((to, from, next) => {
// 	window.scrollTo(0,0);
// })
const store = new Vuex.Store({
	//vuex 的设定
	state: {
		count: 0,
		list: [1,5,8,10,30,50]
	},
	getters: {
		filteredList: state=>{
			return state.list.filter(item => item<10);
		},
		listCount: (state,getters)=>{
			return getters.filteredList.length;
		}
	},
	mutations: {
		increment(state,n=1) {
			state.count += n;
		},
		decrease(state){
			state.count--;
		}
	},
	actions: {
		asyncIncrement(context){
			//用一个promise在一秒后传送mutation
			return new Promise(resolve=>{
				setTimeout(() => {
					context.commit('increment');
					resolve();
				},1000)
			});
		}
	}
});
//建立Vue根实例
new Vue ({
	el: '#app',
	router: router,
	//使用vuex
	store: store,
	render: h=>h(App)
});
