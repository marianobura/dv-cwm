<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { onMounted, ref, watch, onUnmounted } from 'vue';
import { savePublicChatMessage, subscribeToPublicChatMessages } from '../services/public-chat';
import { subscribeToAuthChanges } from '../services/auth';
import BaseInput from '../components/BaseInput.vue';

let unsubscribeFromAuth = () => {};
const messages = ref([]);
const messageContainer = ref(null);

function scrollToBottom() {
    const container = messageContainer.value;
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
})

const newMessage = ref({
    sentBy: loggedUser.id,
    displayName: loggedUser.displayName,
    username: loggedUser.username,
    text: '',
});

onMounted(async () => {
    unsubscribeFromAuth = subscribeToPublicChatMessages(newMessages => messages.value = newMessages);
    unsubscribeFromAuth = subscribeToAuthChanges(newUserData => {
        loggedUser.value = newUserData;
        newMessage.value.sentBy = loggedUser.value.id;
    });
    scrollToBottom();
});

watch(messages, () => {
    scrollToBottom();
});

function handleSubmit() {
    if (!newMessage.value.text) {
        return;
    }

    savePublicChatMessage({
        sentBy: loggedUser.value.id,
        displayName: loggedUser.value.displayName,
        username: loggedUser.value.username,
        text: newMessage.value.text,
    });
    
    newMessage.value.text = '';
}

onUnmounted(() => {
    unsubscribeFromAuth();
})
</script>

<template>
    <BaseHeading1>Chat</BaseHeading1>

    <div class="flex flex-col gap-4 min-h-body p-4">
        <div ref="messageContainer" class="bg-white border h-chat min-h-chat overflow-auto p-4">
            <div class="flex flex-col gap-4 h-auto w-full">
                <!-- for -->
                <div v-for="message in messages" class="flex break-all gap-3 p-4 w-fit max-w-prose" :class="{ 
                    'bg-indigo-500 self-end flex-row-reverse': message.sentBy === loggedUser.id, 
                    'bg-white border': message.sentBy !== loggedUser.id }">
                    <div class="min-w-12">
                        <img class="block h-12 w-12 rounded-sm" src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="User Avatar">
                    </div>
                    <div class="flex flex-col">
                        <div class="flex gap-2" :class="{
                            'justify-end': message.sentBy === loggedUser.id,
                            'justify-start': message.sentBy !== loggedUser.id
                        }">
                            <p class="font-medium" :class="{ 
                            'text-white': message.sentBy === loggedUser.id, 
                            'text-black': message.sentBy !== loggedUser.id }">{{ message.displayName }}</p>
                            <p :class="{ 
                            'text-neutral-200': message.sentBy === loggedUser.id, 
                            'text-neutral-600': message.sentBy !== loggedUser.id }">~ @{{ message.username }}</p>
                        </div>
                        <p class="text-clip" :class="{ 
                        'text-white': message.sentBy === loggedUser.id, 
                        'text-black': message.sentBy !== loggedUser.id }">{{ message.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white p-4 border h-auto">
            <form @submit.prevent="handleSubmit" class="flex gap-2">
                <BaseInput 
                    label="Mensaje"
                    type="text"
                    fni="message"
                    placeholder="Escribe un nuevo mensaje"
                    v-model="newMessage.text"
                />
            </form>
        </div>
    </div>
</template>