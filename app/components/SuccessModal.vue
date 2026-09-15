<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-2xl max-w-xs w-full p-5 text-center shadow-2xl transform transition-all animate-in">
        <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl mb-3">
          ✓
        </div>
        <h3 class="text-base font-black text-stone-900 mb-1">참가 신청 접수 완료!</h3>
        <p class="text-xs text-stone-600 mb-4 leading-relaxed">
          신청서가 성공적으로 접수되었습니다.<br/>
          안내 문자가 대표자 번호로 발송될 예정입니다.<br/><br/>
          <span class="font-bold text-brand-green">입금 안내: {{ account }}</span>
        </p>
        <button
          class="w-full py-2.5 bg-brand-green text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-900 transition-colors cursor-pointer"
          @click="$emit('close')"
        >
          확인
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  account: string
}>()

defineEmits(['close'])
</script>

<style scoped>
.animate-in {
  animation: modal-pop 0.3s ease-out;
}
@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
