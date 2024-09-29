import { createRouter, createWebHistory } from 'vue-router'
import { subscribeToAuthChanges } from '../services/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('../views/ChatView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
    ]
})

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
}

subscribeToAuthChanges(newUserData => loggedUser = newUserData);

router.beforeEach((to, from) => {
    if(to.meta.requiresAuth && loggedUser.id === null) {
        return {
            path: '/login',
        }
    }
});

export default router
