import { ref, computed, onMounted, onUnmounted, unref, type Ref } from 'vue'

export type ApplicationStatusType = 'UPCOMING' | 'OPEN' | 'CLOSED'
export type TestStatusOverride = 'AUTO' | 'UPCOMING' | 'OPEN' | 'CLOSED'

export function useApplicationStatus(
  startDateInput: string | Ref<string> = '2026-09-20T00:00:00+09:00',
  registeredTeamsInput: number | null | Ref<number | null> = null,
  maxTeamsInput: number | Ref<number> = 20,
  forceStatusInput: TestStatusOverride | Ref<TestStatusOverride> = 'AUTO'
) {
  const remainingSeconds = ref(0)
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)

  let timer: ReturnType<typeof setInterval> | null = null

  function checkCountdown() {
    const startDateStr = unref(startDateInput)
    const targetTime = new Date(startDateStr).getTime()
    const nowTime = new Date().getTime()
    const diff = targetTime - nowTime

    if (diff <= 0) {
      remainingSeconds.value = 0
      days.value = 0
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
    } else {
      const totalSec = Math.floor(diff / 1000)
      remainingSeconds.value = totalSec
      days.value = Math.floor(totalSec / (3600 * 24))
      hours.value = Math.floor((totalSec % (3600 * 24)) / 3600)
      minutes.value = Math.floor((totalSec % 3600) / 60)
      seconds.value = totalSec % 60
    }
  }

  const status = computed<ApplicationStatusType>(() => {
    const force = unref(forceStatusInput)
    if (force && force !== 'AUTO') {
      return force
    }

    const regTeams = unref(registeredTeamsInput)
    const maxTeams = unref(maxTeamsInput)

    // Check capacity limit
    if (regTeams !== null && regTeams >= maxTeams) {
      return 'CLOSED'
    }

    // Check start date countdown
    const startDateStr = unref(startDateInput)
    const targetTime = new Date(startDateStr).getTime()
    const nowTime = new Date().getTime()

    if (nowTime < targetTime) {
      return 'UPCOMING'
    }

    return 'OPEN'
  })

  const isOpen = computed(() => status.value === 'OPEN')
  const isClosed = computed(() => status.value === 'CLOSED')
  const isUpcoming = computed(() => status.value === 'UPCOMING')

  const closeReason = computed<'FULL' | 'EXPIRED' | null>(() => {
    if (!isClosed.value) return null
    const regTeams = unref(registeredTeamsInput)
    const maxTeams = unref(maxTeamsInput)
    if (regTeams !== null && regTeams >= maxTeams) {
      return 'FULL'
    }
    return 'EXPIRED'
  })

  const countdownText = computed(() => {
    if (isClosed.value) return '접수 마감'
    if (isOpen.value) return '접수 진행 중'
    if (days.value > 0) {
      return `${days.value}일 ${hours.value}시간 ${minutes.value}분 ${seconds.value}초 남음`
    }
    return `${String(hours.value).padStart(2, '0')}:${String(minutes.value).padStart(2, '0')}:${String(seconds.value).padStart(2, '0')}`
  })

  onMounted(() => {
    checkCountdown()
    timer = setInterval(checkCountdown, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    status,
    isOpen,
    isClosed,
    isUpcoming,
    closeReason,
    days,
    hours,
    minutes,
    seconds,
    countdownText,
    checkCountdown
  }
}

