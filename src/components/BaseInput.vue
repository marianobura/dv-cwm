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
    <div class="flex border border-neutral-400 w-full">
        <label :for="fni" class="text-sm text-white bg-indigo-500 px-1.5 py-1 h-fit m-[5px] rounded-sm">{{ label }}</label>
        <input 
            class="block rounded-sm py-1.5 pr-3 placeholder:text-gray-400 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none flex-1 transition"
            :type="type"
            :name="fni"
            :id="fni"
            :placeholder="placeholder"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
    <button type="submit" class="h-10 w-10 flex items-center justify-center border rounded-sm border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition flex-shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"/><path d="M6 12h16"/></svg></button>
</template>