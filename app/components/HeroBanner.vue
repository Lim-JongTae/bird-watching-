<template>
  <section class="relative overflow-hidden bg-brand-green text-white">
    <!-- Hero Image -->
    <div class="relative h-60 w-full overflow-hidden">
      <img
        :alt="title"
        class="w-full h-full object-cover object-bottom transform scale-110"
        :src="heroImage"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/40 to-transparent"></div>
      <div class="absolute top-3 left-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-amber-300 badge-blur border border-amber-300/30">
          🦅 생태 보전 &amp; 탐조 축제
        </span>
      </div>
    </div>

    <!-- Hero Content -->
    <div class="px-5 pt-1 pb-6 relative -mt-8">
      <div class="inline-block bg-amber-500/90 text-stone-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded shadow-sm tracking-wide mb-2">
        {{ applicationPeriodBadge }}
      </div>
      <h1 class="text-2xl font-black leading-tight tracking-tight text-white mb-2">
        {{ title.split(' ').slice(0, 3).join(' ') }}<br/>
        <span class="text-amber-400">{{ title.split(' ').slice(3).join(' ') }}</span> 공식 참가 신청
      </h1>
      <p class="text-xs text-stone-200 leading-relaxed font-light">
        {{ description }}
      </p>

      <!-- Core Summary Tags -->
      <div class="grid grid-cols-2 gap-2 mt-4 text-xs">
        <div class="bg-white/10 rounded-lg p-2.5 border border-white/10">
          <span class="block text-amber-300 font-semibold mb-0.5">🗓 일시</span>
          <span class="text-white text-[11px] font-medium">{{ dates }}</span>
        </div>
        <div class="bg-white/10 rounded-lg p-2.5 border border-white/10">
          <span class="block text-amber-300 font-semibold mb-0.5">📍 장소</span>
          <span class="text-white text-[11px] font-medium">{{ location }}</span>
        </div>
        <div class="bg-white/10 rounded-lg p-2.5 border border-white/10">
          <span class="block text-amber-300 font-semibold mb-0.5">👥 모집규모</span>
          <span class="text-white text-[11px] font-medium">{{ participants }}</span>
        </div>
        <div class="bg-white/10 rounded-lg p-2.5 border border-white/10">
          <span class="block text-amber-300 font-semibold mb-0.5">💰 참가비</span>
          <span class="text-white text-[11px] font-medium">{{ fee }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  heroImage: string
  applicationPeriodBadge: string
  description: string
  dates: string
  location: string
  participants: string
  fee: string
}>()
</script>
