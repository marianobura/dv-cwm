<template>
    <div class="flex items-center w-full h-24 p-4 bg-white border-b m-0">
        <h1 class="text-3xl font-semibold tracking-tight text-black"><slot /></h1>
        <slot name="config" />
    </div>
</template>