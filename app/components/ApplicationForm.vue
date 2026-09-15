<template>
  <section id="apply-section" class="px-4 py-5 scroll-mt-14">
    <div class="bg-white rounded-2xl p-4 border border-stone-200 shadow-md relative">
      <!-- Header -->
      <div class="border-b border-stone-100 pb-3 mb-4">
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-2"
          :class="isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900 border border-amber-200'"
        >
          <span class="w-2 h-2 rounded-full" :class="isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-pulse'"></span>
          {{ isOpen ? 'Google 스프레드시트 실시간 자동 접수 연동' : '9월 20일(일) 00시 접수 오픈 예정' }}
        </div>
        <h2 class="text-lg font-black text-stone-900">
          참가 신청서 작성
        </h2>
        <p class="text-xs text-stone-500 mt-0.5">
          선착순 20팀(80명) 마감시 조기 종료될 수 있습니다.
        </p>
      </div>

      <!-- If NOT open: Locked & Countdown Notice Card -->
      <div v-if="!isOpen" class="py-8 px-4 text-center bg-stone-50 rounded-xl border border-stone-200/80">
        <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner text-2xl">
          🔒
        </div>
        <h3 class="text-base font-black text-stone-900 mb-1">
          아직 접수 기간이 아닙니다
        </h3>
        <p class="text-xs text-stone-600 mb-4 leading-relaxed">
          <b class="text-amber-800">9월 20일(일) 00:00</b>부터 온라인 신청서 작성이 시작됩니다.<br/>
          시작 시각에 맞춰 폼이 자동으로 활성화됩니다.
        </p>

        <!-- Countdown Display -->
        <div class="inline-flex items-center justify-center gap-2 bg-stone-900 text-white px-5 py-3 rounded-xl shadow-md mb-2">
          <div class="text-center min-w-[38px]">
            <span class="block text-lg font-black text-amber-400 leading-none">{{ days }}</span>
            <span class="text-[10px] text-stone-400">일</span>
          </div>
          <span class="text-amber-400 font-bold text-sm">:</span>
          <div class="text-center min-w-[34px]">
            <span class="block text-lg font-black text-amber-400 leading-none">{{ String(hours).padStart(2, '0') }}</span>
            <span class="text-[10px] text-stone-400">시간</span>
          </div>
          <span class="text-amber-400 font-bold text-sm">:</span>
          <div class="text-center min-w-[34px]">
            <span class="block text-lg font-black text-amber-400 leading-none">{{ String(minutes).padStart(2, '0') }}</span>
            <span class="text-[10px] text-stone-400">분</span>
          </div>
          <span class="text-amber-400 font-bold text-sm">:</span>
          <div class="text-center min-w-[34px]">
            <span class="block text-lg font-black text-amber-400 leading-none">{{ String(seconds).padStart(2, '0') }}</span>
            <span class="text-[10px] text-stone-400">초</span>
          </div>
        </div>

        <p class="text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded-lg p-2.5 mt-4 max-w-sm mx-auto font-medium leading-relaxed">
          💡 9월 20일 00시 정각이 되면 페이지 새로고침 없이도 신청서가 자동으로 오픈되어 작성하실 수 있습니다.
        </p>
      </div>

      <!-- If open: Show Notice Banner & Google Form iframe -->
      <template v-else>
        <!-- Notice Banner for submission delay -->
        <div class="mb-3 px-3 py-2 bg-amber-50 border border-amber-200/60 rounded-xl flex items-start gap-2 text-xs text-amber-900">
          <span class="text-sm shrink-0">⏳</span>
          <p class="leading-relaxed">
            <span class="font-bold">접수 안내:</span> 폼 하단의 <b>[제출]</b> 버튼을 누른 뒤 <span class="underline underline-offset-2 font-semibold">'응답이 기록되었습니다'</span> 메시지가 표시될 때까지 약 3~5초간 기다려 주세요.
          </p>
        </div>

        <!-- Google Form iframe Container -->
        <div
          class="relative w-full overflow-hidden rounded-xl border border-stone-100"
          @mouseenter="handleFormInteraction"
          @touchstart="handleFormInteraction"
        >
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
      </template>
    </div>

    <!-- Bottom Toast Alert -->
    <Transition name="toast-slide">
      <div
        v-if="showToast"
        class="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-3 backdrop-blur-md transition-all duration-300"
        :class="toastType === 'success' 
          ? 'bg-emerald-900/90 text-white border-emerald-500/30' 
          : 'bg-stone-900/90 text-white border-stone-700/50'"
      >
        <div class="shrink-0 flex items-center justify-center w-7 h-7 rounded-full"
          :class="toastType === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'"
        >
          <span v-if="toastType === 'info'" class="text-sm animate-spin">⏳</span>
          <span v-else class="text-sm">✅</span>
        </div>
        <div class="flex-1 text-xs leading-snug">
          <p class="font-bold text-sm mb-0.5" v-if="toastType === 'info'">접수 처리 진행 안내</p>
          <p class="font-bold text-sm mb-0.5" v-else>접수 완료!</p>
          <p class="text-stone-200">{{ toastText }}</p>
        </div>
        <button
          @click="showToast = false"
          class="shrink-0 text-stone-400 hover:text-white text-xs p-1"
        >
          ✕
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useApplicationStatus } from '~/composables/useApplicationStatus'

const props = withDefaults(defineProps<{
  formUrl: string
  startDate?: string
}>(), {
  startDate: '2026-09-20T00:00:00+09:00'
})

const { isOpen, days, hours, minutes, seconds } = useApplicationStatus(props.startDate)

const isLoading = ref(true)
const iframeHeight = ref(1200)
const loadCount = ref(0)

// Toast state
const showToast = ref(false)
const toastText = ref('')
const toastType = ref<'info' | 'success'>('info')
let toastTimer: ReturnType<typeof setTimeout> | null = null

function triggerToast(text: string, type: 'info' | 'success' = 'info', duration = 6000) {
  toastText.value = text
  toastType.value = type
  showToast.value = true

  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, duration)
}

function handleFormInteraction() {
  if (!isLoading.value && loadCount.value === 1 && !showToast.value) {
    triggerToast("제출 버튼 클릭 후 '응답이 기록되었습니다' 문구가 나올 때까지 약 3~5초간 기다려 주세요.", 'info', 7000)
  }
}

function onIframeLoad() {
  isLoading.value = false
  loadCount.value++

  if (loadCount.value >= 2) {
    triggerToast("신청서 제출이 완료되었습니다! 안내 문자를 확인해 주세요.", 'success', 8000)
  }
}

function handleWindowBlur() {
  if (document.activeElement?.tagName === 'IFRAME' && loadCount.value === 1) {
    triggerToast("폼 입력/제출 진행 중... 완료 메시지가 뜰 때까지 창을 닫지 마세요.", 'info', 6000)
  }
}

onMounted(() => {
  window.addEventListener('blur', handleWindowBlur)
})

onUnmounted(() => {
  window.removeEventListener('blur', handleWindowBlur)
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 1rem);
}
</style>
