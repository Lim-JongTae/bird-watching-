import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useApplicationStatus(startDateStr: string = '2026-09-20T00:00:00+09:00') {
  const isOpen = ref(false)
  const remainingSeconds = ref(0)
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)

  let timer: ReturnType<typeof setInterval> | null = null

  function checkStatus() {
    const targetTime = new Date(startDateStr).getTime()
    const nowTime = new Date().getTime()
    const diff = targetTime - nowTime

    if (diff <= 0) {
      isOpen.value = true
      remainingSeconds.value = 0
      days.value = 0
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
    } else {
      isOpen.value = false
      const totalSec = Math.floor(diff / 1000)
      remainingSeconds.value = totalSec
      days.value = Math.floor(totalSec / (3600 * 24))
      hours.value = Math.floor((totalSec % (3600 * 24)) / 3600)
      minutes.value = Math.floor((totalSec % 3600) / 60)
      seconds.value = totalSec % 60
    }
  }

  const countdownText = computed(() => {
    if (isOpen.value) return '접수 진행 중'
    if (days.value > 0) {
      return `${days.value}일 ${hours.value}시간 ${minutes.value}분 ${seconds.value}초 남음`
    }
    return `${String(hours.value).padStart(2, '0')}:${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`
  })

  onMounted(() => {
    checkStatus()
    timer = setInterval(checkStatus, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    isOpen,
    days,
    hours,
    minutes,
    seconds,
    countdownText,
    checkStatus
  }
}
