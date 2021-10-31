import Vue from "vue"
import VueRouter from "vue-router"

import store from "../store"

import Task from "../components/Task.vue"
import TaskDetails from "../components/TaskDetails.vue"
import Login from "../components/Login.vue"
import Logout from "../components/Logout.vue"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Task, name: 'Task', meta: { auth: true }},
        { path: '/login', component: Login, name: 'Login' },
        { path: '/logout', component: Logout, name: 'Logout', meta: { auth: true }},
        { path: '/:id', component: TaskDetails, name: 'TaskDetails', meta: { auth: true }},
    ]
})

router.beforeEach(async (to, from, next) => {
    if(to.matched.some(record => record.meta.auth)) {
        if(!store.getters['user/getAuth']) {
            store.dispatch('user/user').then(() => {
                if(!store.getters['user/getAuth']) {
                    next('/login');
                } else {
                    next();
                }
            }).catch((err) => {
                next('/login');
            });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router