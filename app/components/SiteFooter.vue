<template>
  <footer class="px-5 py-6 bg-stone-900 text-stone-400 text-xs mt-4">
    <div class="space-y-3">
      <div>
        <span class="text-amber-400 font-bold text-sm block mb-1">{{ title }}</span>
        <p class="text-[11px] text-stone-400">주최·주관 : {{ host }}</p>
      </div>
      <div class="border-t border-stone-800 pt-3 space-y-1 text-[11px]">
        <p><span class="text-stone-300 font-medium">문의 전화:</span> {{ contact }}</p>
        <p><span class="text-stone-300 font-medium">공식 이메일:</span> {{ email }}</p>
        <p><span class="text-stone-300 font-medium">입금 계좌:</span> {{ account }} ({{ accountHolder }})</p>
      </div>
      <div class="border-t border-stone-800 pt-3 text-[10px] text-stone-500 flex justify-between items-center">
        <span>© 2026 Seosan Birdland &amp; Korea Waterbird Network</span>
        <button
          class="text-stone-400 hover:text-white underline cursor-pointer"
          @click="scrollToTop"
        >
          맨 위로 ↑
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  host: string
  contact: string
  email: string
  account: string
  accountHolder: string
}>()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
