<template>
  <section class="px-4 py-5">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-base font-extrabold text-stone-900 flex items-center gap-1.5">
        <span class="w-2 h-4 bg-brand-orange rounded-full inline-block"></span>
        1박 2일 행사 세부 일정
      </h2>
      <span class="text-[11px] text-stone-500 font-medium">{{ dateRange }}</span>
    </div>

    <!-- Field Image -->
    <div v-if="fieldImage" class="mb-4 rounded-xl overflow-hidden border border-stone-200 shadow-sm">
      <img
        :src="fieldImage"
        alt="서산 천수만 탐조단 현장 모습"
        class="w-full h-36 object-cover object-center"
      />
      <div class="bg-stone-50 px-3 py-1.5 text-[11px] text-stone-600 flex justify-between items-center border-t border-stone-200">
        <span>📷 천수만 필드 탐조 활동 현장</span>
        <span class="text-brand-green font-semibold">전문 가이드 동행</span>
      </div>
    </div>

    <!-- Schedule Days -->
    <div class="space-y-3">
      <div
        v-for="(day, dIdx) in schedule"
        :key="dIdx"
        class="bg-white rounded-xl p-3.5 border border-stone-200 shadow-sm"
      >
        <div class="flex items-center gap-2 pb-2 mb-2 border-b border-stone-100">
          <span
            class="px-2 py-0.5 rounded text-white font-bold text-xs"
            :class="dIdx === 0 ? 'bg-brand-green' : 'bg-brand-lightgreen'"
          >
            {{ day.day }}
          </span>
          <span class="text-xs font-bold text-stone-800">{{ day.date }}</span>
        </div>

        <ul class="space-y-2 text-xs">
          <li
            v-for="(item, iIdx) in day.items"
            :key="iIdx"
            class="flex items-start"
            :class="item.highlight ? highlightClass(item.highlightColor) : ''"
          >
            <span
              class="w-24 shrink-0 font-medium text-[11px]"
              :class="item.highlight ? highlightTimeClass(item.highlightColor) : 'text-stone-500'"
            >
              {{ item.time }}
            </span>
            <div>
              <span class="font-bold" :class="item.highlight ? 'text-stone-900' : 'text-stone-800'">
                {{ item.title }}
              </span>
              <p
                class="text-[11px]"
                :class="item.highlight ? highlightLocClass(item.highlightColor) : 'text-stone-500'"
              >
                {{ item.location }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ScheduleItem {
  time: string
  title: string
  location: string
  highlight: boolean
  highlightColor?: string
}

interface ScheduleDay {
  day: string
  date: string
  color: string
  items: ScheduleItem[]
}

defineProps<{
  schedule: ScheduleDay[]
  dateRange: string
  fieldImage?: string
}>()

function highlightClass(color?: string): string {
  if (color === 'emerald') return 'bg-emerald-50/70 p-1.5 rounded -mx-1.5'
  return 'bg-amber-50/70 p-1.5 rounded -mx-1.5'
}

function highlightTimeClass(color?: string): string {
  if (color === 'emerald') return 'font-bold text-emerald-800'
  return 'font-bold text-brand-orange'
}

function highlightLocClass(color?: string): string {
  if (color === 'emerald') return 'text-emerald-800'
  return 'text-amber-800'
}
</script>
