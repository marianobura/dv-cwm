<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';
import BaseButton from '../components/BaseButton.vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseInput from '../components/BaseInput.vue';
import SignState from '../components/SignState.vue';

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
                        <BaseInput
                            label="Correo electrónico"
                            type="text"
                            fni="email"
                            placeholder="test@test.com"
                            v-model="user.email"
                        />
                        <BaseInput
                            label="Contraseña"
                            type="password"
                            fni="password"
                            placeholder="test123"
                            v-model="user.password"
                        />
                        <div class="flex items-center mt-4 gap-4">
                            <BaseButton>Iniciar sesión</BaseButton>
                            <SignState login />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>