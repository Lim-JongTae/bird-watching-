<template>
  <section id="apply-section" class="px-4 py-5 scroll-mt-14">
    <div class="bg-white rounded-2xl p-4 border border-stone-200 shadow-md">
      <!-- Header -->
      <div class="border-b border-stone-100 pb-3 mb-4">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold mb-2">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          Google 스프레드시트 실시간 자동 접수 연동
        </div>
        <h2 class="text-lg font-black text-stone-900">
          참가 신청서 작성
        </h2>
        <p class="text-xs text-stone-500 mt-0.5">
          선착순 20팀 마감 시 조기 종료됩니다. 정확히 입력해 주세요.
        </p>
      </div>

      <!-- Google Form iframe -->
      <div class="relative w-full overflow-hidden rounded-xl border border-stone-100">
        <!-- Loading indicator -->
        <div
          v-if="isLoading"
          class="absolute inset-0 flex flex-col items-center justify-center bg-stone-50 z-10"
        >
          <div class="w-8 h-8 border-3 border-brand-green/30 border-t-brand-green rounded-full animate-spin mb-3"></div>
          <p class="text-xs text-stone-500">Google 설문지를 불러오는 중...</p>
        </div>

        <iframe
          :src="formUrl"
          width="100%"
          :height="iframeHeight"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="w-full border-0 transition-opacity duration-300"
          :class="isLoading ? 'opacity-0' : 'opacity-100'"
          @load="onIframeLoad"
        >
          로딩 중...
        </iframe>
      </div>

      <!-- Fallback link -->
      <div class="mt-3 text-center">
        <p class="text-[11px] text-stone-400">
          폼이 보이지 않으면
          <a
            :href="formUrl.replace('?embedded=true', '')"
            target="_blank"
            class="text-brand-green font-semibold hover:underline"
          >
            여기를 클릭하여 새 창에서 신청
          </a>
          해주세요.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  formUrl: string
}>()

const isLoading = ref(true)
const iframeHeight = ref(1200)

function onIframeLoad() {
  isLoading.value = false
}
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}
</style>
