<script setup>
import { defineProps } from 'vue';

defineProps({
    content: String,
})
</script>

<template>
    <button class="py-2 px-4 border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition"><slot></slot></button>
</template>