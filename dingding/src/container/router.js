// 定义路由

// 第一步 导入路由模板
import VueRouter from 'vue-router';

// 第二部导入组件

import home from '../pages/home/index.vue';

// 登录注册
import login from '../pages/login/login.vue';
import register from '../pages/login/register.vue';
import select from '../pages/login/select.vue';

import statistics from '../pages/statistics/statistics.vue';
import repository from '../pages/repository/repository.vue';
import workbench from '../pages/workbench/workbench.vue';

// 会员中心
import member from '../pages/member/member.vue';
import memberIfon from '../pages/member/memberIfon.vue';
import changePassword from '../pages/member/changePassword.vue';
import aboutUS from '../pages/member/aboutUS.vue';
const routes = [ 
  {
    path:'/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/select',
    name: 'select',
    component: select
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/repository',
    name: 'repository',
    component: repository
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: workbench
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: statistics
  },
  {
    path: '/member',
    name: 'member',
    component: member
  },
  {
    path: '/memberIfon',
    name: 'memberIfon',
    component: memberIfon
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: changePassword
  },
  {
    path: '/aboutUS',
    name: 'aboutUS',
    component: aboutUS
  }
];

export default function Router(Vue){
  Vue.use(VueRouter);
  const router = new VueRouter({
    routes: routes
  });
  const left = {
    show: true,
    control: true,
    text: '返回'
  }
  const backHandler = function(e){
    if (env.isWeb){
      e.preventDefault();
    }

    router.go(-1);
  }
  //setLeft(left, backHandler);
  // jsApiOAuth().then(function(){
  //   console.log('签名完成');
  // }).catch(function(err){
  //   console.log(JSON.stringify(err))
  // });
  return {
    router
  }
}