<template>
    <img v-if="type === 'MINI'" :width="size" :height="size" class="animate-spin" src="../assets/icons/loading.svg">

    <div v-else
        class="absolute top-0 left-0 w-full h-full bg-slate-200 bg-opacity-50 flex items-center justify-center z-[9999]">
        <img :width="size" :height="size" class="animate-spin" src="../assets/icons/loading.svg">
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    /**
     * MINI: chỉ có loading
     * FULL: phủ toàn trang
     */
    type?: 'MINI' | 'FULL'
    size?: string
}>(), {
    type: 'MINI',
    size: '25'
})
</script>