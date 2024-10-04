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
                <BaseInput
                    label="Nuevo post"
                    type="text"
                    fni="post"
                    placeholder="Escribe un nuevo post"
                    v-model="newPost.text"
                />
            </form>
        </div>
        <div class="grid gap-4 grid-cols-1 2xl:grid-cols-2">
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
                        <BaseInput 
                            label="Comentario"
                            type="text"
                            fni="comment"
                            placeholder="Escribe un nuevo comentario"
                            v-model="newComment[post.id]"
                        />
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
        </div>
    </div>
</template>