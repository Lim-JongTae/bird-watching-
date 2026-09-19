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
        class="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
        :class="buttonClass"
        @click="$emit('scrollToForm')"
      >
        <span v-if="isClosed">🚫</span>
        <span v-else-if="isUpcoming">🔒</span>
        {{ buttonText }}
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useApplicationStatus, type TestStatusOverride } from '~/composables/useApplicationStatus'

const props = withDefaults(defineProps<{
  organizerLabel: string
  registeredTeams: number | null
  maxTeams: number
  startDate?: string
  forceStatus?: TestStatusOverride
}>(), {
  startDate: '2026-09-20T00:00:00+09:00',
  forceStatus: 'AUTO'
})

defineEmits(['scrollToForm'])

const { isOpen, isClosed, isUpcoming } = useApplicationStatus(
  toRef(props, 'startDate'),
  toRef(props, 'registeredTeams'),
  toRef(props, 'maxTeams'),
  toRef(props, 'forceStatus')
)

const badgeClass = computed(() => {
  if (props.registeredTeams === null) return ''
  if (isClosed.value || props.registeredTeams >= props.maxTeams) {
    return 'bg-rose-500 border-rose-400 text-white animate-pulse'
  }
  const ratio = props.registeredTeams / props.maxTeams
  if (ratio >= 0.7) return 'bg-amber-500/80 border-amber-400 text-white'
  return 'bg-white/15 border-white/30 text-emerald-200'
})

const buttonClass = computed(() => {
  if (isClosed.value) return 'bg-rose-950/90 text-rose-200 border border-rose-500/50 hover:bg-rose-900'
  if (isOpen.value) return 'bg-amber-500 hover:bg-amber-600 text-white'
  return 'bg-stone-800/80 hover:bg-stone-800 text-amber-300 border border-amber-400/30'
})

const buttonText = computed(() => {
  if (isClosed.value) return '접수 마감'
  if (isOpen.value) return '신청서 작성'
  return '9/20 접수 오픈'
})
</script>

