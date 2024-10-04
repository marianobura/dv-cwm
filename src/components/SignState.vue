<script setup>
import { defineProps } from 'vue';

defineProps({
    login: {
        type: Boolean,
        required: true,
    },
    register: {
        type: Boolean,
        required: true,
    }
});
</script>

<template>
    <p class="text-gray-500">{{ login ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?' }} <router-link :to="login ? '/register' : '/login'" class="font-medium text-indigo-500 border-b border-indigo-500 hover:border-b-2">{{ login ? 'Crea una cuenta' : 'Iniciar sesión' }}</router-link></p>
</template>