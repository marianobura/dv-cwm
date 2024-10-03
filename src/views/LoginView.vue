<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';
import BaseButton from '../components/BaseButton.vue';
import BaseHeading1 from '../components/BaseHeading1.vue';

const router = useRouter();

const user = ref({
    email: '',
    password: '',
});
const loading = ref(false);

async function handleSubmit() {
    loading.value = true;

    try {
        await login({...user.value});
        router.push('/');
    } catch (error) {
        console.error("[Login handleSubmit] Error al autenticar: ", error);
        // TODO: Manejar el error y mostrar un feedback.
    }

    loading.value = false;
}
</script>

<template>
    <BaseHeading1>Iniciar sesión</BaseHeading1>

    <div class="overflow-auto p-4 h-body min-h-body">
        <div class="flex flex-col items-center justify-center">
            <div class="w-full bg-white border">
                <div class="p-4">
                    <form class="space-y-4" action="#" @submit.prevent="handleSubmit">
                        <div>
                            <label for="displayName" class="block text-gray-500 mb-2">Correo electrónico</label>
                            <input type="text" name="displayName" id="displayName" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="test@test.com" v-model="user.email">
                        </div>
                        <div>
                            <label for="password" class="block text-gray-500 mb-2">Contraseña</label>
                            <input type="password" name="password" id="password" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="test123" v-model="user.password">
                        </div>
                        <div class="flex items-center mt-4 gap-4">
                            <BaseButton>Iniciar sesión</BaseButton>
                            <p class="text-gray-500">¿No tienes cuenta? <router-link to="/register" class="font-medium text-indigo-500 border-b border-indigo-500 hover:border-b-2">Registrate</router-link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>