<script setup>
import { onMounted, ref } from 'vue';
import { logout, subscribeToAuthChanges } from './services/auth';
import NavbarLinks from './components/Navigation/NavbarLinks.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loggedUser = ref({
    id: null,
    email: null,
});

onMounted(() => {
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
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
                        <img class="block h-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
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
    <footer class="flex flex-col bg-white border-l">
        <div class="flex items-center justify-between border-b h-24 p-4">
            <template v-if="loggedUser.id !== null">
                <div class="flex flex-row gap-3 items-center">
                    <img class="block h-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                    <div class="flex flex-col">
                        <p class="font-medium">{{ loggedUser.displayName }}</p>
                        <p class="text-neutral-600">@{{ loggedUser.username }}</p>
                    </div>
                </div>
                <router-link to="/settings" class="flex gap-2">
                    <div class="flex justify-center items-center h-12 w-12 border rounded-sm hover:bg-neutral-100 hover:cursor-pointer transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                </router-link>
            </template>
            <template v-else>
                <img class="block h-12 rounded-sm" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="User Avatar">
            </template>
        </div>
        <div class="overflow-auto h-body min-h-body p-4">
            <p class="text-lg font-medium">Chats recientes</p>
            <ul class="flex flex-col gap-4 mt-3">
                <!-- for -->
                <template v-if="loggedUser.id !== null">
                    <li class="flex items-center justify-between">
                        <div class="flex gap-3">
                            <img class="block h-12 rounded-sm" src="https://i.pravatar.cc/150?img=12" alt="User Avatar">
                            <div class="flex-1 min-w-0">
                                <p class="font-medium">Sebastian Winter</p>
                                <p class="text-sm text-neutral-500 truncate max-w-52">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                        </div>
                        <div class="flex justify-center items-center h-12 w-12 rounded-sm text-indigo-500 hover:text-white hover:bg-indigo-500 hover:cursor-pointer transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-more"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /><path d="M8 12h.01" /><path d="M12 12h.01" /><path d="M16 12h.01" /></svg>
                        </div>
                    </li>
                </template>
                <template v-else>
                    <!-- Login for see recent chats -->
                    <div>
                        <p><router-link to="/login" class="font-medium text-indigo-500 border-b border-indigo-500 hover:border-b-2">Inicia sesión</router-link> para ver tus chats recientes</p>
                    </div>
                </template>
                <!-- for -->
            </ul>
        </div>
    </footer>
</template>
