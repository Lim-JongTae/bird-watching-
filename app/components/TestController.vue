<template>
  <div class="fixed bottom-24 right-3 z-50 pointer-events-auto">
    <!-- Toggle Button -->
    <button
      @click="isExpanded = !isExpanded"
      class="flex items-center gap-1.5 px-3 py-2 bg-stone-900/95 text-amber-300 hover:bg-stone-800 rounded-full shadow-2xl border border-amber-400/40 text-xs font-bold backdrop-blur transition-all active:scale-95"
    >
      <span>🛠️ 마감 테스트 패널</span>
      <span class="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded-full font-mono">
        {{ simulatedTeams }}/{{ maxTeams }}팀
      </span>
      <span class="text-[10px]">{{ isExpanded ? '▼' : '▲' }}</span>
    </button>

    <!-- Expanded Test Control Panel -->
    <div
      v-if="isExpanded"
      class="mt-2 w-80 bg-stone-900/95 text-stone-100 p-4 rounded-2xl shadow-2xl border border-stone-700/80 backdrop-blur-md text-xs space-y-3"
    >
      <div class="flex items-center justify-between border-b border-stone-800 pb-2">
        <div class="flex items-center gap-1.5 font-bold text-amber-400">
          <span>⚙️</span>
          <span>접수 마감 시뮬레이터</span>
        </div>
        <button
          @click="resetToDefault"
          class="text-[10px] text-stone-400 hover:text-white underline font-normal"
        >
          초기화
        </button>
      </div>

      <!-- Quick Preset Buttons for 20 teams -->
      <div>
        <label class="block text-[11px] text-stone-400 mb-1 font-semibold">⚡ 원터치 마감 테스트</label>
        <div class="grid grid-cols-3 gap-1.5">
          <button
            @click="setPreset(0)"
            class="px-2 py-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-300 text-[11px] font-medium"
          >
            0팀 (초기)
          </button>
          <button
            @click="setPreset(19)"
            class="px-2 py-1.5 bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 rounded-lg text-[11px] font-medium"
          >
            19팀 (임계)
          </button>
          <button
            @click="setPreset(maxTeams)"
            class="px-2 py-1.5 bg-rose-900/80 hover:bg-rose-800 text-rose-200 rounded-lg text-[11px] font-bold border border-rose-600/50"
          >
            {{ maxTeams }}팀 (마감!)
          </button>
        </div>
      </div>

      <!-- Team Count Slider & Direct Input -->
      <div class="bg-stone-800/50 p-2.5 rounded-xl border border-stone-700/50 space-y-1.5">
        <div class="flex justify-between items-center text-[11px]">
          <span class="text-stone-300 font-semibold">시뮬레이션 참가팀 수:</span>
          <span class="font-extrabold text-amber-400 text-sm font-mono">{{ simulatedTeams }}팀</span>
        </div>
        <input
          type="range"
          min="0"
          max="40"
          v-model.number="simulatedTeams"
          class="w-full accent-amber-500 cursor-pointer"
        />
        <div class="flex justify-between text-[10px] text-stone-400">
          <span>0팀</span>
          <span>10팀</span>
          <span class="text-amber-400 font-bold">20팀(기본)</span>
          <span>30팀</span>
          <span>40팀</span>
        </div>
      </div>

      <!-- Max Capacity Input -->
      <div class="flex items-center justify-between bg-stone-800/50 p-2.5 rounded-xl border border-stone-700/50">
        <div>
          <span class="block text-[11px] text-stone-300 font-semibold">최대 참가 정원 (maxTeams):</span>
          <span class="text-[10px] text-stone-400">기본: 20팀 (늘리거나 줄일 수 있음)</span>
        </div>
        <div class="flex items-center gap-1">
          <button
            @click="maxTeams = Math.max(1, maxTeams - 5)"
            class="w-6 h-6 bg-stone-700 hover:bg-stone-600 text-white rounded font-bold"
          >-5</button>
          <input
            type="number"
            min="1"
            max="100"
            v-model.number="maxTeams"
            class="w-12 text-center bg-stone-900 border border-stone-600 rounded px-1 py-0.5 text-xs text-amber-300 font-bold"
          />
          <button
            @click="maxTeams += 5"
            class="w-6 h-6 bg-stone-700 hover:bg-stone-600 text-white rounded font-bold"
          >+5</button>
        </div>
      </div>

      <!-- Force Status Mode Selector -->
      <div>
        <label class="block text-[11px] text-stone-400 mb-1 font-semibold">강제 상태 오버라이드:</label>
        <div class="grid grid-cols-4 gap-1 text-[10px]">
          <button
            v-for="mode in statusModes"
            :key="mode.value"
            @click="setForceStatus(mode.value)"
            class="py-1 px-1 rounded text-center font-bold transition-colors"
            :class="forceStatus === mode.value 
              ? 'bg-amber-500 text-stone-900 shadow' 
              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>

      <!-- Status Indicator Summary -->
      <div class="p-2 bg-stone-950/80 rounded-lg border border-stone-800 text-[11px] space-y-1">
        <div class="flex justify-between">
          <span class="text-stone-400">최종 모의 상태:</span>
          <span
            class="font-black px-1.5 py-0.5 rounded text-[10px]"
            :class="{
              'bg-rose-900 text-rose-200': computedStatus === 'CLOSED',
              'bg-emerald-900 text-emerald-200': computedStatus === 'OPEN',
              'bg-amber-900 text-amber-200': computedStatus === 'UPCOMING'
            }"
          >
            {{ computedStatus === 'CLOSED' ? '🔴 CLOSED (마감)' : computedStatus === 'OPEN' ? '🟢 OPEN (진행 중)' : '🟡 UPCOMING (대기)' }}
          </span>
        </div>
        <p class="text-[10px] text-stone-400 leading-tight">
          💡 팀 수가 {{ maxTeams }}팀 이상이 되면 자동으로 구글 폼이 숨겨지고 마감 카드가 표시됩니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TestStatusOverride, ApplicationStatusType } from '~/composables/useApplicationStatus'

const props = defineProps<{
  initialTeams: number | null
  initialMaxTeams: number
  startDate: string
}>()

const emit = defineEmits<{
  (e: 'update:teams', value: number | null): void
  (e: 'update:maxTeams', value: number): void
  (e: 'update:forceStatus', value: TestStatusOverride): void
}>()

const isExpanded = ref(false)
const forceStatus = ref<TestStatusOverride>('AUTO')

const simulatedTeams = computed({
  get: () => props.initialTeams ?? 0,
  set: (val: number) => emit('update:teams', val)
})

const maxTeams = computed({
  get: () => props.initialMaxTeams,
  set: (val: number) => emit('update:maxTeams', val)
})

const statusModes: { label: string; value: TestStatusOverride }[] = [
  { label: '자동', value: 'AUTO' },
  { label: '오픈', value: 'OPEN' },
  { label: '마감', value: 'CLOSED' },
  { label: '대기', value: 'UPCOMING' }
]

const computedStatus = computed<ApplicationStatusType>(() => {
  if (forceStatus.value !== 'AUTO') return forceStatus.value
  if (simulatedTeams.value >= maxTeams.value) return 'CLOSED'
  const targetTime = new Date(props.startDate).getTime()
  if (Date.now() < targetTime) return 'UPCOMING'
  return 'OPEN'
})

function setForceStatus(status: TestStatusOverride) {
  forceStatus.value = status
  emit('update:forceStatus', status)
}

function setPreset(teams: number) {
  simulatedTeams.value = teams
  setForceStatus('AUTO')
}

function resetToDefault() {
  simulatedTeams.value = 0
  maxTeams.value = 20
  setForceStatus('AUTO')
}
</script>
