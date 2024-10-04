<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../services/auth';
import BaseButton from '../components/BaseButton.vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseInput from '../components/BaseInput.vue';
import SignState from '../components/SignState.vue';

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
                        <BaseInput
                            label="Correo electrónico"
                            type="text"
                            fni="email"
                            placeholder="test@test.com"
                            v-model="user.email"
                        />
                        <div class="flex w-full gap-2">
                            <BaseInput
                                label="Nombre"
                                type="text"
                                fni="displayName"
                                placeholder="Nombre"
                                v-model="user.displayName"
                            />
                            <BaseInput
                                label="Nombre de usuario"
                                type="text"
                                fni="username"
                                placeholder="@usuario"
                                v-model="user.username"
                            />
                        </div>
                        <div>
                            <BaseInput
                                label="Contraseña"
                                type="password"
                                fni="password"
                                placeholder="test123"
                                v-model="user.password"
                            />
                        </div>
                        <div class="flex items-center mt-4 gap-4">
                            <BaseButton>Crear cuenta</BaseButton>
                            <SignState register />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>