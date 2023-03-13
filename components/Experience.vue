<script setup lang="ts">
</script>

<template>
    <div class="flex p-3 bg-transparent">
        <span class="italic text-white w-24 font-myriad-light">{{ $.vnode.key > 1 ? 2024 - $.vnode.key : 'Current' }}</span>
        <div class="flex flex-col">
            <span class="text-xl font-semibold">MERVKI Art Collective</span>
            <span class="font-myriad-light">Dar es salaam, Tanzania</span>
            <span class="font-myriad-light">Activities: Marketing, Promotion, webdesign</span>
            <span class="mt-3 font-myriad-light">www.MERVKIRepp.com</span>
        </div>
    </div>
</template>