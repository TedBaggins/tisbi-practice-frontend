import Vue from 'vue';
import VueRouter from 'vue-router';
import Students from '@/views/Students';
import Faculties from '@/views/Faculties';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Students,
    },
    {
        path: '/students',
        name: 'students',
        component: Students,
    },
    {
        path: '/faculties',
        name: 'faculties',
        component: Faculties,
    },
];

const router = new VueRouter({
    routes,
});

export default router;