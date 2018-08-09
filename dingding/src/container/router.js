// 定义路由

// 第一步 导入路由模板
import VueRouter from 'vue-router';

// 第二步 引入订单 JSDK

import dingtalk from 'weex-dingtalk';
import journey from 'weex-dingtalk-journey';

import {setLeft, setTitle, setClose} from '../lib/util.js';
import storage from '../lib/storage.js';

// 第三步导入组件

import home from '../pages/home/index.vue';

// 登录注册
import login from '../pages/login/login.vue';
import register from '../pages/login/register.vue';
import statistics from '../pages/statistics/statistics.vue';
import repository from '../pages/repository/repository.vue';

// 工作台

import workbenchView from '../pages/workbench/workbenchView.vue';

import workbench from '../pages/workbench/workbench.vue';
import selectItem from '../pages/workbench/selectItem.vue';
import patrolSystem from '../pages/workbench/patrolSystem.vue';
import startPartol from '../pages/workbench/startPartol.vue';
import endPartol from '../pages/workbench/endPartol.vue';
import partoling from '../pages/workbench/partoling.vue';
import selectTask from '../pages/workbench/selectTask.vue';
import partoltask from '../pages/workbench/partoltask.vue';

import pointLocation from '../pages/workbench/pointLocation.vue';
import addPrtol from '../pages/workbench/addPrtol.vue';
import replacePrtol from '../pages/workbench/replacePrtol.vue';
import selectPoint from '../pages/workbench/selectPoint.vue';
import missingLoaction from '../pages/workbench/missingLoaction.vue';


import partolRemind from '../pages/workbench/partolRemind.vue';

// 会员中心

import memberView from '../pages/member/memberView.vue';
import member from '../pages/member/member.vue';
import memberIfon from '../pages/member/memberIfon.vue';
import changePassword from '../pages/member/changePassword.vue';
import aboutUS from '../pages/member/aboutUS.vue';
import staffList from '../pages/member/staffList.vue';
import staffAudit from '../pages/member/staffAudit.vue';


const routes = [{
    path: '/',
    name: 'login',
    component: login
},
    {
        path: '/home',
        name: 'home',
        component: home
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
        component: workbenchView,
        children: [
            {
                path: '/',
                name: 'workbench',
                component: workbench,
                beforeEnter: (to, from, next) => {
                    //console.log(storage.getItem('type'))
                    if (from.path === '/selectItem' && storage.getItem('type') == 1) {
                        // next('workbench')
                    } else {
                        from.path === '/selectItem' ? next('/') : next();
                    }
                }
            },
            {
                path: 'selectItem',
                name: 'selectItem',
                component: selectItem,
                beforeEnter: (to, from, next) => {
                    //console.log(storage.getItem('type'))

                    if (storage.getItem('type') == 1) {
                        next('/workbench/?id=3')
                    } else {
                        from.path === '/workbench' ? next('/') : next();
                    }

                }
            },
            {
                path: 'startPartol',
                name: 'startPartol',
                component: startPartol
            },
            {
                path: 'endPartol',
                name: 'endPartol',
                component: endPartol,
                beforeEnter: (to, from, next) => {
                    console.log(from.path)
                    if (from.path === '/workbench/patrolSystem') {
                        next('/workbench/')
                    } else if (from.path === '/workbench/') {
                        next('/')

                    } else if (from.path === '/') {
                        next(false)
                    } else {
                        next();
                    }
                }
            },
            {
                path: 'partoling',
                name: 'partoling',
                component: partoling,
                beforeEnter: (to, from, next) => {

                    //console.log(storage.getItem('type'))

                    if (from.path === '/selectTask' && storage.getItem('type') == 1) {
                        next('/workbench/patrolSystem')
                    } else if (from.path === '/workbench/endPartol') {
                        next(false);
                    }
                    else {
                        from.path === '/selectTask' ? next('/') : next();
                    }

                }
            },
            {
                path: 'selectTask',
                name: 'selectTask',
                component: selectTask,
                beforeEnter: (to, from, next) => {
                    // console.log(from.path)
                    if (storage.getItem('type') == 1) {
                        next('/workbench/patrolSystem')
                    } else if (storage.getItem('type') == 2) {
                        next('/workbench/')
                    } else if (storage.getItem('type') == 3) {
                        if (from.path === '/') {
                            next(false)
                        } else {
                            next('/')
                        }

                    }
                    else {
                        from.path === '/partoling' ? next('/') : next();
                    }

                }
            },
            {
                path: 'partoltask',
                name: 'partoltask',
                component: partoltask
            },
            {
                path: 'patrolSystem',
                name: 'patrolSystem',
                component: patrolSystem,
                beforeEnter: (to, from, next) => {
                    // console.log(from.path)
                    next()
                    //from.path === '/workbench' ? next('/') :next();
                }
            },
            {
                path: 'pointLocation',
                name: 'pointLocation',
                component: pointLocation
            },
            {
                path: 'missingLoaction',
                name: 'missingLoaction',
                component: missingLoaction
            },
            {
                path: 'addPrtol',
                name: 'addPrtol',
                component: addPrtol
            },
            {
                path: 'replacePrtol',
                name: 'replacePrtol',
                component: replacePrtol,
                beforeEnter: (to, from, next) => {
                    //console.log(storage.getItem('type'))
                    if (from.path === '/selectPoint' && storage.getItem('type3') == 1) {
                        next('/workbench/patrolSystem')
                    } else {
                        from.path === '/selectPoint' ? next('/') : next();
                    }

                }
            },
            {
                path: 'selectPoint',
                name: 'selectPoint',
                component: selectPoint,
                beforeEnter: (to, from, next) => {

                    if (storage.getItem('type') == 1) {
                        console.log(from.path)
                        // if (from.path == '/workbench/patrolSystem') {
                        //     next('/workbench/');
                        // } else if (from.path == '/workbench/pointLocation') {
                        //     next('/workbench/patrolSystem');
                        // } else if (from.path == '/workbench/') {
                        //     next('/')
                        // } else {
                        //     next('/workbench/pointLocation')
                        // }
                    } else {
                        from.path === '/replacePrtol' ? next('/') : next();
                    }

                }
            },
            {
                path: 'partolRemind',
                name: 'partolRemind',
                component: partolRemind
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: statistics
            },

        ]

    },
    {
        path: '/member',
        component: memberView,
        children: [{
            path: '/',
            name: 'member',
            component: member
        },
            {
                path: 'memberIfon',
                name: 'memberIfon',
                component: memberIfon
            },
            {
                path: 'changePassword',
                name: 'changePassword',
                component: changePassword
            },
            {
                path: 'aboutUS',
                name: 'aboutUS',
                component: aboutUS
            },
            {
                path: 'staffList',
                name: 'staffList',
                component: staffList
            },
            {
                path: 'staffAudit',
                name: 'staffAudit',
                component: staffAudit
            }
        ]
    }
];


dingtalk.error(function (err) {
    console.log(JSON.stringify(err))
    toast('Error : ' + JSON.stringify(err));
});


export default function Router(Vue) {

    Vue.use(VueRouter);
    const router = new VueRouter({
        routes: routes
    });

    const backHandler = function (e) {
        if (env.isWeb) {
            e.preventDefault();
        }
        router.go(-1);
    }

    return {
        router
    }
}