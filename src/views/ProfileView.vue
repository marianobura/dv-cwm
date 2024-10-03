<script setup>
import { onMounted, ref } from 'vue';
import { subscribeToAuthChanges } from '../services/auth';
import BaseHeading1 from '../components/BaseHeading1.vue';

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
})

onMounted(() => {
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
})
</script>

<template>
    <div class="flex items-end gap-4">
        <BaseHeading1>Mi perfil</BaseHeading1>
    </div>

    <div class="h-body p-4">
        <div class="bg-white w-full h-full border p-4">
            <div class="w-full flex flex-col justify-center gap-2">
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
            </div>
        </div>
    </div>
</template>