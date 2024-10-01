<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { onMounted, ref } from 'vue';
import { savePost, subscribeToPost } from '../services/posts';
import { savePostComment, subscribeToPostComment } from '../services/post-comments';
import { subscribeToAuthChanges } from '../services/auth';

const posts = ref([]);
const comments = ref([]);

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
})

const newPost = ref({
    sentBy: loggedUser.id,
    text: '',
});

const newComment = ref({
    postId: null,
    sentBy: loggedUser.id,
    text: '',
});

onMounted(async () => {
    subscribeToPost(newPosts => posts.value = newPosts);
    subscribeToPostComment(newComments => comments.value = newComments);
    subscribeToAuthChanges(newUserData => {
        loggedUser.value = newUserData
        newPost.value.sentBy = loggedUser.value.id;
        newComment.value.sentBy = loggedUser.value.id;
    });
});

function handleSubmitPost() {
    if (!newPost.value.text) {
        return;
    }

    savePost({
        sentBy: loggedUser.value.id,
        text: newPost.value.text,
    });

    newPost.value.text = '';
}

function handleSubmitComment(postId) {
    if (!newComment.value.text) {
        return;
    }

    savePostComment({
        postId,
        sentBy: loggedUser.value.id,
        text: newComment.value.text,
    });

    newComment.value.text = '';
}
</script>

<template>
    <BaseHeading1>Inicio</BaseHeading1>

    <div class="overflow-auto p-4 h-body min-h-body">
        <div class="w-full h-auto bg-white mb-6 border">
            <form action="#" @submit.prevent="handleSubmitPost" class="flex gap-3 relative p-4">
                <label for="text" class="absolute left-[22px] top-[22px] text-sm text-white bg-indigo-500 py-1 px-2 rounded-sm">Post:</label>
                <input type="text" name="text" id="text" class="block rounded-sm border pl-14 border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Nuevo post" v-model="newPost.text">
                <button class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
            </form>
        </div>
        <div class="grid gap-4 grid-cols-2">
            <!-- for -->
            <div v-for="post in posts" :key="post.id" class="flex flex-col p-4 bg-white border">
                <div class="flex flex-col gap-3 justify-between flex-1">
                    <div class="flex gap-3 items-center">
                        <img class="block h-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                        <div class="flex flex-col">
                            <p class="font-medium">{{ loggedUser.displayName }}</p>
                            <p class="text-neutral-600">@{{ loggedUser.username }}</p>
                        </div>
                    </div>
                    <p>{{ post.text }}</p>
                </div>
                <div>
                    <hr class="my-4">
                    <form @submit.prevent="handleSubmitComment(post.id)" action="#" class="flex w-full gap-2 relative">
                        <label for="comment" class="absolute left-[6px] top-[6px] text-sm text-white bg-indigo-500 py-1 px-2 rounded-sm">Mensaje:</label>
                        <input type="text" name="comment" id="comment" class="block rounded-sm border pl-20 border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Escribe un mensaje..." v-model="newComment.text">
                        <button class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
                    </form>
                    <div v-for="comment in comments" class="flex flex-col gap-2 bg-neutral-50 p-2 mt-4 border">
                        <div class="flex gap-2 items-center">
                            <img class="block h-6 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                            <p class="font-medium text-sm">{{ loggedUser.displayName }} <span class="font-normal text-neutral-600">~ @{{ loggedUser.displayName }}</span></p>
                        </div>
                        <p class="text-sm">{{ comment.text }}</p>
                    </div>
                </div>
            </div>
            <!-- for -->
        </div>
    </div>
</template>