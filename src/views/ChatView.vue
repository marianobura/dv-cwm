<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { onMounted, ref, watch } from 'vue';
import { savePublicChatMessage, subscribeToPublicChatMessages } from '../services/public-chat';
import { subscribeToAuthChanges } from '../services/auth';

const messages = ref([]);
const messageContainer = ref(null);

const newMessage = ref({
    name: '',
    displayName: '',
    text: '',
});

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

onMounted(async () => {
    subscribeToPublicChatMessages(newMessages => messages.value = newMessages);
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
    scrollToBottom();
});

watch(messages, () => {
    scrollToBottom();
});

function handleSubmit() {
    savePublicChatMessage({
        ...newMessage.value,
    });
    
    newMessage.value.text = '';
}
</script>

<template>
    <BaseHeading1>Chat</BaseHeading1>

    <div class="flex flex-col gap-4 min-h-body p-4">
        <div ref="messageContainer" class="bg-white border h-chat min-h-chat overflow-auto p-4">
            <div class="flex flex-col gap-4 h-auto w-full">
                <!-- for -->
                <div v-for="message in messages" class="flex gap-3 p-4 bg-white border w-fit">
                    <div class="min-w-12">
                        <img class="block h-12 w-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                    </div>
                    <div class="flex flex-col">
                        <div class="flex gap-2">
                            <p class="font-medium">{{ loggedUser.displayName }}</p>
                            <p class="text-neutral-600">~ @{{ loggedUser.username }}</p>
                        </div>
                        <p class="text-clip">{{ message.text }}</p>
                    </div>
                </div>
                <!-- for -->
                <!-- <div v-for="message in messages" class="flex gap-3 p-4 bg-indigo-500 border w-fit">
                    <div class="min-w-12">
                        <img class="block h-12 w-12 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                    </div>
                    <div class="flex flex-col">
                        <div class="flex gap-2">
                            <p class="text-white font-medium">{{ message.name }}</p>
                            <p class="text-neutral-300">~ {{ message.displayName }}</p>
                        </div>
                        <p class="text-white text-clip">{{ message.text }}</p>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="bg-white p-4 border h-auto">
            <form action="#" @submit.prevent="handleSubmit" class="flex w-full gap-2 relative">
                <img class="block h-10 rounded-sm" src="https://i.pravatar.cc/150?img=13" alt="User Avatar">
                <label for="text" class="absolute left-[54px] top-[6px] text-sm text-white bg-indigo-500 py-1 px-2 rounded-sm">Mensaje:</label>
                <input type="text" name="text" id="text" class="block rounded-sm border pl-20 border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="Escribe un mensaje..." required v-model="newMessage.text">
                <button class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
            </form>
        </div>
    </div>
</template>