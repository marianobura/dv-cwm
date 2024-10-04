<script setup>
import { onMounted, ref } from 'vue';
import { subscribeToAuthChanges } from '../services/auth';
import { subscribeToPost } from '../services/posts'
import BaseHeading1 from '../components/BaseHeading1.vue';

const posts = ref([]);

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
})

onMounted(() => {
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
    subscribeToPost(newPosts => posts.value = newPosts);
})
</script>

<template>
    <div class="flex items-end gap-4">
        <BaseHeading1>Mi perfil</BaseHeading1>
    </div>

    <div class="h-body p-4 min-h-body overflow-auto">
        <div class="bg-white w-full border p-4">
            <div class="w-full flex flex-col justify-center gap-12">
                <div class="w-full flex gap-6 justify-center">
                    <div class="w-full">
                        <dl class="flex flex-col gap-4 text-gray-900">
                            <div class="flex flex-col">
                                <dt class="mb-1 text-gray-500">Nombre</dt>
                                <dd class="text-lg font-semibold">{{ loggedUser.displayName }}</dd>
                            </div>
                            <hr>
                            <div class="flex flex-col">
                                <dt class="mb-1 text-gray-500">Correo electrónico</dt>
                                <dd class="text-lg font-semibold">{{ loggedUser.email }}</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="w-full">
                        <dl class="flex flex-col gap-4 text-gray-900">
                            <div class="flex flex-col">
                                <dt class="mb-1 text-gray-500">Nombre de usuario</dt>
                                <dd class="text-lg font-semibold">@{{ loggedUser.username }}</dd>
                            </div>
                            <hr>
                            <div class="flex flex-col">
                                <dt class="mb-1 text-gray-500">Biografía</dt>
                                <dd v-if="loggedUser.bio === undefined || loggedUser.bio === '' || loggedUser.bio === null" class="text-base font-normal">No tiene biografía</dd>
                                <dd v-else class="text-lg font-semibold">{{ loggedUser.bio }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <template v-if="posts.length > 0">
                    <div class="flex flex-col w-full h-fit">
                        <p class="text-lg font-medium">Últimos posts de @{{ loggedUser.username }}</p>
                        <ul class="flex flex-col gap-2 mt-3">
                            <li v-for="post in posts.filter(post => post.sentBy === loggedUser.id)" :key="post.id" class="flex items-center justify-between">
                                <div class="flex gap-3 truncate">
                                    <div class="flex justify-center items-center h-12 w-12 rounded-sm bg-indigo-50 text-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 3v4a2 2 0 0 0 2 2h4"/></svg>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium"><span class="font-normal">Por: </span>{{ post.displayName }}</p>
                                        <p class="text-sm text-neutral-500 truncate">{{ post.text }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>