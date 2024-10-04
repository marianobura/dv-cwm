<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { onMounted, ref } from 'vue';
import { savePost, subscribeToPost } from '../services/posts';
import { savePostComment, subscribeToPostComment } from '../services/post-comments';
import { subscribeToAuthChanges } from '../services/auth';
import BaseInput from '../components/BaseInput.vue';

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
    displayName: loggedUser.displayName,
    username: loggedUser.username,
    text: '',
});

const newComment = ref({});

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
        displayName: loggedUser.value.displayName,
        username: loggedUser.value.username,
        text: newPost.value.text,
    });

    newPost.value.text = '';
}

function handleSubmitComment(postId) {
    if (!newComment.value[postId]) {
        return;
    }

    savePostComment({
        postId,
        sentBy: loggedUser.value.id,
        displayName: loggedUser.value.displayName,
        username: loggedUser.value.username,
        text: newComment.value[postId],
    });

    newComment.value[postId] = '';
}
</script>

<template>
    <BaseHeading1>Inicio</BaseHeading1>

    <div class="overflow-auto p-4 h-body min-h-body">
        <div class="w-full h-auto bg-white mb-4 border">
            <form @submit.prevent="handleSubmitPost" class="flex gap-2 p-4">
                <div class="flex border border-neutral-400 w-full group">
                    <label for="post" class="text-sm text-white bg-indigo-500 px-1.5 py-1 h-fit m-[5px] rounded-sm">Nuevo post</label>
                    <input type="text" name="post" id="post" class="block rounded-sm py-1.5 pr-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Escribe un nuevo post" v-model="newPost.text" />
                </div>
                <button type="submit" class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
            </form>
        </div>
        <div class="grid gap-4 grid-cols-1 2xl:grid-cols-2">
            <!-- for -->
            <div v-for="post in posts" :key="post.id" class="flex flex-col p-4 bg-white border break-all">
                <div class="flex flex-col gap-3 flex-1">
                    <div class="flex gap-3 items-center">
                        <img class="block h-12 rounded-sm" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User Avatar">
                        <div class="flex flex-col">
                            <p class="font-medium">{{ post.displayName }}</p>
                            <p class="text-neutral-600">@{{ post.username }}</p>
                        </div>
                    </div>
                    <p>{{ post.text }}</p>
                </div>
                <div>
                    <hr class="my-4">
                    <form @submit.prevent="handleSubmitComment(post.id)" class="flex gap-2">
                        <div class="flex border border-neutral-400 w-full">
                            <label for="comment" class="text-sm text-white bg-indigo-500 px-1.5 py-1 h-fit m-[5px] rounded-sm">Comentario</label>
                            <input type="text" name="comment" id="comment" class="block rounded-sm py-1.5 pr-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Escribe un nuevo comentario" v-model="newComment[post.id]" />
                        </div>
                        <button type="submit" class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
                    </form>
                    <div v-for="comment in comments.filter(comment => comment.postId === post.id)" :key="comment.id" class="flex flex-col gap-2 bg-neutral-50 p-2 mt-4 border">
                        <div class="flex gap-2 items-center">
                            <img class="block h-6 rounded-sm" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User Avatar">
                            <p class="font-medium text-sm">{{ comment.displayName }} <span class="font-normal text-neutral-600">~ @{{ comment.username }}</span></p>
                        </div>
                        <p class="text-sm">{{ comment.text }}</p>
                    </div>
                </div>
            </div>
            <!-- for -->
        </div>
    </div>
</template>