<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { editProfile, subscribeToAuthChanges } from '../services/auth';
import BaseHeading1 from '../components/BaseHeading1.vue';
import { useRouter } from 'vue-router';
import BaseButton from '../components/BaseButton.vue';

let unsubscribeFromAuth = () => {};
const router = useRouter();
const loading = ref(false);
const editData = ref({
    displayName: '',
    bio: '',
    username: '',
});

onMounted(() => {
    unsubscribeFromAuth = subscribeToAuthChanges(
        newUserData => editData.value = {
            displayName: newUserData.displayName,
            bio: newUserData.bio,
            username: newUserData.username,
        }
    );
});

const handleSubmit = async () => {
    loading.value = true;

    try {
        await editProfile({...editData.value});
        router.push('/profile')
    } catch (error) {
        console.log('Error al guardar los cambios', error);
    }

    loading.value = false;
}

onUnmounted(() => {
    unsubscribeFromAuth();
})
</script>

<template>
    <BaseHeading1>Configuración</BaseHeading1>

    <div class="h-body p-4">
        <div class="bg-white w-full h-full border p-4">
            <form action="#" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-2 gap-6">
                    <div class="w-full">
                        <label for="displayName" class="block text-gray-500 mb-2">Nombre</label>
                        <input type="text" name="displayName" id="displayName" :readonly="loading" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition read-only:bg-gray-200" v-model="editData.displayName">
                    </div>
                    <div class="w-full">
                        <label for="username" class="block text-gray-500 mb-2">Nombre de usuario</label>
                        <input type="text" name="username" id="username" :readonly="loading" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition read-only:bg-gray-200" v-model="editData.username">
                    </div>
                </div>
                <div class="w-full pt-6">
                    <label for="bio" class="block text-gray-500 mb-2">Biografía</label>
                    <textarea type="text" name="bio" id="bio" :readonly="loading" class="w-full min-h-fit block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition read-only:bg-gray-200" v-model="editData.bio"></textarea>
                </div>
                <BaseButton class="mt-4">{{ !loading ? 'Guardar cambios' : 'Cargando' }}</BaseButton>
            </form>
        </div>
    </div>
</template>