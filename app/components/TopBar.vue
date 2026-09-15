<template>
  <header class="sticky top-0 z-40 bg-brand-green/95 backdrop-blur text-white px-4 py-3 flex items-center justify-between shadow-sm">
    <div class="flex items-center space-x-2">
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
      <span class="text-xs font-semibold tracking-wider text-amber-300">{{ organizerLabel }}</span>
    </div>

    <div class="flex items-center gap-2">
      <!-- Team count badge -->
      <span
        v-if="registeredTeams !== null"
        class="text-[11px] font-bold px-2 py-0.5 rounded-full border"
        :class="badgeClass"
      >
        {{ registeredTeams }}/{{ maxTeams }}팀
      </span>

      <a
        class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1"
        :class="isOpen 
          ? 'bg-amber-500 hover:bg-amber-600 text-white' 
          : 'bg-stone-800/80 hover:bg-stone-800 text-amber-300 border border-amber-400/30'"
        @click="$emit('scrollToForm')"
      >
        <span v-if="!isOpen">🔒</span>
        {{ isOpen ? '신청서 작성' : '9/20 접수 오픈' }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApplicationStatus } from '~/composables/useApplicationStatus'

const props = withDefaults(defineProps<{
  organizerLabel: string
  registeredTeams: number | null
  maxTeams: number
  startDate?: string
}>(), {
  startDate: '2026-09-20T00:00:00+09:00'
})

defineEmits(['scrollToForm'])

const { isOpen } = useApplicationStatus(props.startDate)

const badgeClass = computed(() => {
  if (props.registeredTeams === null) return ''
  const ratio = props.registeredTeams / props.maxTeams
  if (ratio >= 1) return 'bg-red-500/80 border-red-400 text-white'
  if (ratio >= 0.7) return 'bg-amber-500/80 border-amber-400 text-white'
  return 'bg-white/15 border-white/30 text-emerald-200'
})
</script>
