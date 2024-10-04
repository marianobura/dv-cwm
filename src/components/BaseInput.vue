<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    label: String,
    type: String,
    fni: String,
    placeholder: String,
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="w-full">
        <label :for="fni" class="block text-gray-500 mb-2">{{ label }}</label>
        <input
            class="w-full block rounded-sm border border-neutral-400 py-1.5 px-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition"
            :type="type"
            :id="fni"
            :name="fni"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>