<template>
  <aside class="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pb-3">
    <div class="w-full max-w-[440px] pointer-events-auto">
      <!-- When Open -->
      <a
        v-if="isOpen"
        class="flex items-center justify-between w-full bg-stone-900/95 text-white p-3 rounded-2xl shadow-2xl border border-stone-700 backdrop-blur active:scale-[0.98] transition-transform cursor-pointer"
        @click="handleClick"
      >
        <div class="flex items-center gap-2.5 pl-1">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-gentle-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <div>
            <p class="text-[11px] text-amber-300 font-bold leading-none">선착순 20팀 한정 접수</p>
            <p class="text-xs font-extrabold text-white mt-0.5 leading-none">지금 바로 참가 신청하기</p>
          </div>
        </div>
        <span class="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow">
          신청서 이동 →
        </span>
      </a>

      <!-- When Closed (Before 9/20 00:00) -->
      <a
        v-else
        class="flex items-center justify-between w-full bg-stone-900/95 text-white p-3 rounded-2xl shadow-2xl border border-stone-700/80 backdrop-blur transition-all cursor-pointer opacity-95 hover:border-amber-500/50"
        @click="handleClick"
      >
        <div class="flex items-center gap-2.5 pl-1">
          <span class="text-sm">🔒</span>
          <div>
            <p class="text-[11px] text-amber-300 font-bold leading-none">9월 20일(일) 00:00 접수 오픈</p>
            <p class="text-xs font-extrabold text-stone-200 mt-0.5 leading-none font-mono">
              남은시간: {{ countdownText }}
            </p>
          </div>
        </div>
        <span class="bg-stone-700 text-amber-300 font-bold text-xs px-3 py-2 rounded-xl border border-stone-600">
          오픈 대기 중
        </span>
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useApplicationStatus } from '~/composables/useApplicationStatus'

const props = withDefaults(defineProps<{
  startDate?: string
}>(), {
  startDate: '2026-09-20T00:00:00+09:00'
})

const emit = defineEmits(['scrollToForm'])

const { isOpen, countdownText } = useApplicationStatus(props.startDate)

function handleClick() {
  emit('scrollToForm')
}
</script>
