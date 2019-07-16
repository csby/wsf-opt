import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('./views/Login.vue'),
            beforeEnter: function(to, from, next) {
                let authorized = Vue.prototype.$db.authorized();
                if(authorized) {
                    if(from) {
                        next(from);
                    }
                    else {
                        next('/');
                    }
                }
                else {
                    next(true);
                }
            }
        },
        {
            path: '/',
            component: Home,
            beforeEnter: function(to, from, next) {
                let authorized = Vue.prototype.$db.authorized();
                if(authorized) {
                    next(true);
                }
                else {
                    next('/login');
                }
            },
            children: [
                {
                    path: "",
                    component: Dashboard
                }
            ]
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})