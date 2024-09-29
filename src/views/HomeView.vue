<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { onMounted, ref } from 'vue';
import { savePost, subscribeToPost } from '../services/posts';
import { subscribeToAuthChanges } from '../services/auth';

const posts = ref([]);

const newPost = ref({
    username: '',
    displayName: '',
    text: '',
});

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
})

onMounted(async () => {
    subscribeToPost(newPosts => posts.value = newPosts);
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
});

function handleSubmit() {
    if (!newPost.value.text) {
        return;
    }

    savePost({
        ...newPost.value,
    });

    newPost.value.text = '';
}
</script>

<template>
    <BaseHeading1>Inicio</BaseHeading1>

    <div class="overflow-auto p-4 h-body min-h-body">
        <div class="w-full h-auto bg-white mb-6 border">
            <form action="#" @submit.prevent="handleSubmit" class="flex gap-3 relative p-4">
                <label for="text" class="absolute left-[22px] top-[22px] text-sm text-white bg-indigo-500 py-1 px-2 rounded-sm">Post:</label>
                <input type="text" name="text" id="text" class="block rounded-sm border pl-14 border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Nuevo post" v-model="newPost.text">
                <button class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
            </form>
        </div>
        <div class="grid gap-4 grid-cols-2">
            <!-- for -->
            <div v-for="post in posts" class="flex flex-col p-4 bg-white border">
                <div class="flex flex-col gap-3 justify-between flex-1">
                    <div class="flex flex-col gap-3">
                        <div class="flex gap-3 items-center">
                            <img class="block h-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                            <div class="flex flex-col">
                                <p class="font-medium">{{ loggedUser.displayName }}</p>
                                <p class="text-neutral-600">@{{ loggedUser.username }}</p>
                            </div>
                        </div>
                        <p>{{ post.text }}</p>
                    </div>
                    <div class="flex gap-10">
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                            <p>312</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            <p>174</p>
                        </div>
                    </div>                    
                </div>
                <div>
                    <hr class="my-4">
                    <form action="#" class="flex w-full gap-2 relative">
                        <img class="block h-10 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                        <label for="text" class="absolute left-[54px] top-[6px] text-sm text-white bg-indigo-500 py-1 px-2 rounded-sm">Mensaje:</label>
                        <input type="text" name="text" id="text" class="block rounded-sm border pl-20 border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Escribe un mensaje...">
                        <button class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
                    </form>
                </div>
            </div>
            <!-- for -->
        </div>
    </div>
</template>