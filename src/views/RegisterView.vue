<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth';
import BaseHeading1 from '../components/BaseHeading1.vue';

const router = useRouter();

const user = ref({
    email: '',
    displayName: '',
    username: '',
    password: '',
});

const handleSubmit = async () => {
    try {
        await register(user.value);
        
        router.push('/');
    } catch (error) {
        console.error("[RegisterView handleSubmit] Error al registrar: ", error);
    }
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
                            <label for="email" class="block text-gray-500 mb-2">Correo electrónico</label>
                            <input type="text" name="email" id="email" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="test@test.com" v-model="user.email">
                        </div>
                        <div class="flex w-full gap-2">
                            <div class="w-full">
                                <label for="displayName" class="block text-gray-500 mb-2">Nombre</label>
                                <input type="text" name="displayName" id="displayName" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="John Doe" v-model="user.displayName">
                            </div>
                            <div class="w-full">
                                <label for="username" class="block text-gray-500 mb-2">Nombre de usuario</label>
                                <input type="text" name="username" id="username" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="johndoe" v-model="user.username">
                            </div>
                        </div>
                        <div>
                            <label for="password" class="block text-gray-500 mb-2">Contraseña</label>
                            <input type="password" name="password" id="password" class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition" placeholder="test123" v-model="user.password">
                        </div>
                        <div class="flex items-center mt-4 gap-4">
                            <BaseButton>Crear cuenta</BaseButton>
                            <p class="text-gray-500">¿Ya tienes cuenta? <router-link to="/login" class="font-medium text-indigo-500 border-b border-indigo-500 hover:border-b-2">Iniciar sesión</router-link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>