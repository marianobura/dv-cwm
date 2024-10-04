<script setup>
import { onMounted, ref } from 'vue';
import { logout, subscribeToAuthChanges } from './services/auth';
import NavbarLinks from './components/NavbarLinks.vue';
import { useRouter } from 'vue-router';
import { subscribeToPost } from './services/posts';

const router = useRouter();
const loggedUser = ref([]);
const posts = ref([]);

onMounted(() => {
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
    subscribeToPost(newPosts => posts.value = newPosts);
});

const handleLogout = () => {
    logout();
    router.push('/login');
}
</script>

<template>
    <nav class="flex flex-col justify-between p-4 bg-white text-black border-r">
        <div>
            <router-link to="/" class="text-xl font-bold">DV Social</router-link>
            <ul class="flex flex-col gap-1 pt-6">
                <NavbarLinks url="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>Inicio</NavbarLinks>
                <NavbarLinks url="/chat"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></svg>Chat</NavbarLinks>
                <NavbarLinks url="/profile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>Perfil</NavbarLinks>
            </ul>
        </div>
        <div>
            <template v-if="loggedUser.id !== null">
                <hr class="h-px mb-2 bg-black border-0 opacity-30">
                <div class="flex justify-between items-center pt-2">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="block h-12 rounded-sm" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User Avatar">
                        <div class="flex flex-col">
                            <p class="font-medium">{{ loggedUser.displayName }}</p>
                            <p class="text-neutral-600">@{{ loggedUser.username }}</p>
                        </div>
                    </div>
                    <form action="#" @submit.prevent="handleLogout">
                        <button type="submit" class="hover:bg-red-500 hover:text-white rounded-sm p-2 cursor-pointer transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></button>
                    </form>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col gap-2">
                    <router-link to="/login" class="flex items-center justify-center w-full p-2 border border-indigo-500 text-indigo-500 rounded-sm font-semibold hover:text-white hover:bg-indigo-500 transition">Iniciar sesión</router-link>
                    <router-link to="/register" class="flex items-center justify-center w-full p-2 border border-black text-black rounded-sm font-semibold hover:bg-black hover:text-white transition">Crear cuenta</router-link>
                </div>
            </template>
        </div>
    </nav>
    <main class="bg-neutral-50">
        <router-view />
    </main>
</template>
