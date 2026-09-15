<template>
  <section class="px-4 pt-6 pb-2">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-base font-extrabold text-stone-900 flex items-center gap-1.5">
        <span class="w-2 h-4 bg-brand-green rounded-full inline-block"></span>
        대회 운영 방식 &amp; 시상 요강
      </h2>
      <span class="text-[11px] font-medium text-brand-green bg-green-100 px-2 py-0.5 rounded">룰 &amp; 가이드</span>
    </div>

    <div class="space-y-3">
      <div
        v-for="(feature, idx) in features"
        :key="idx"
        class="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm flex items-start gap-3"
      >
        <div
          class="p-2 rounded-lg text-lg"
          :class="iconBgClass(feature.iconBg)"
        >
          {{ feature.icon }}
        </div>
        <div class="text-xs">
          <h3 class="font-bold text-stone-900 mb-0.5">{{ feature.title }}</h3>
          <p class="text-stone-600 leading-relaxed text-[11px]">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  iconBg: string
  title: string
  description: string
}

defineProps<{
  features: Feature[]
}>()

function iconBgClass(bg: string): string {
  const map: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-800',
    amber: 'bg-amber-50 text-amber-800',
    orange: 'bg-orange-50 text-orange-800'
  }
  return map[bg] || 'bg-stone-50 text-stone-800'
}
</script>
