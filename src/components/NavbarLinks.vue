<script setup>
import { defineProps } from 'vue'

const props = defineProps ({
    url: {
        type: String,
        required: true
    }
})
</script>

<template>
    <li><router-link class="flex items-center py-2 px-3 gap-4 rounded-sm font-medium hover:bg-indigo-500 hover:text-white transition" :to="props.url"><slot /></router-link></li>
</template>