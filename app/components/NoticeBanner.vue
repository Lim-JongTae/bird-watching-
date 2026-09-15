<template>
  <section class="px-4 py-3 bg-amber-100 border-y border-amber-300 flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-lg shrink-0 shadow">
      🌏
    </div>
    <div>
      <p class="text-[11px] text-amber-800 font-semibold leading-tight">SPECIAL NOTICE</p>
      <p class="text-xs font-bold text-amber-950 leading-snug">
        {{ text }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
