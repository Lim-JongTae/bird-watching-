<template>
  <section class="px-4 py-4">
    <div class="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
      <h3 class="font-extrabold text-stone-900 text-sm mb-2.5 flex items-center gap-1.5">
        <span>📋</span> 참가 세부 요강 &amp; 혜택
      </h3>

      <dl class="space-y-2 text-xs">
        <!-- Fee -->
        <div class="flex justify-between py-1 border-b border-amber-200/60">
          <dt class="text-stone-600 font-medium">참가비</dt>
          <dd class="font-bold text-stone-900">{{ fee }}</dd>
        </div>

        <!-- Benefits -->
        <div class="py-1 border-b border-amber-200/60">
          <dt class="text-stone-600 font-medium mb-1">포함 내역</dt>
          <dd class="font-semibold text-brand-green bg-white/70 p-2 rounded text-[11px] leading-relaxed">
            <template v-for="(benefit, idx) in benefits" :key="idx">
              ✓ {{ benefit }}<br v-if="idx < benefits.length - 1" />
            </template>
          </dd>
        </div>

        <!-- Account -->
        <div class="py-1 border-b border-amber-200/60">
          <dt class="text-stone-600 font-medium mb-0.5">입금 계좌</dt>
          <dd class="text-stone-900">
            <span class="font-mono font-bold bg-white px-2 py-0.5 rounded border border-amber-300 text-xs">
              {{ account }}
            </span>
            <span class="block text-[11px] text-stone-500 mt-1">예금주: {{ accountHolder }}</span>
          </dd>
        </div>

        <!-- Transport -->
        <div class="py-1">
          <dt class="text-stone-600 font-medium mb-0.5">이동 및 집합</dt>
          <dd class="text-[11px] text-stone-700 leading-normal">
            {{ transportNote }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  fee: string
  benefits: string[]
  account: string
  accountHolder: string
  transportNote: string
}>()
</script>
