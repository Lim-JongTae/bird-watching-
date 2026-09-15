<template>
  <div class="min-h-screen bg-[var(--color-page-bg)] antialiased">
    <!-- Mobile Container Wrapper -->
    <div class="mobile-container flex flex-col pb-28">
      <!-- TopBar -->
      <TopBar
        :organizer-label="eventData.organizerLabel"
        :registered-teams="teamCount"
        :max-teams="20"
        @scroll-to-form="scrollToForm"
      />

      <main class="flex-1">
        <!-- HeroBanner -->
        <HeroBanner
          :title="eventData.title"
          :hero-image="eventData.heroImage"
          :application-period-badge="eventData.applicationPeriodBadge"
          :description="eventData.heroDescription"
          :dates="eventData.overview.dates"
          :location="eventData.overview.location"
          :participants="eventData.overview.participants"
          :fee="eventData.overview.fee"
        />

        <!-- NoticeBanner -->
        <NoticeBanner :text="eventData.noticeText" />

        <!-- ProgramFeatures -->
        <ProgramFeatures :features="eventData.programFeatures" />

        <!-- ScheduleTimeline -->
        <ScheduleTimeline
          :schedule="eventData.schedule"
          :date-range="eventData.overview.dates"
          :field-image="eventData.fieldImage"
        />

        <!-- GuideAndBank -->
        <GuideAndBank
          :fee="eventData.overview.fee"
          :benefits="eventData.benefits"
          :account="eventData.overview.account"
          :account-holder="eventData.overview.accountHolder"
          :transport-note="eventData.transportNote"
        />

        <!-- ApplicationForm (Google Form iframe) -->
        <ApplicationForm
          :form-url="eventData.googleFormUrl"
        />

        <!-- SiteFooter -->
        <SiteFooter
          :title="eventData.title"
          :host="eventData.overview.host"
          :contact="eventData.overview.contact"
          :email="eventData.overview.email"
          :account="eventData.overview.account"
          :account-holder="eventData.overview.accountHolder"
        />
      </main>

      <!-- FloatingCTA -->
      <FloatingCTA @scroll-to-form="scrollToForm" />
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import eventDataJson from '~/data/event.json'

const eventData = ref(eventDataJson)

// Fetch team count from server API (polls every 30s)
const teamCount = ref<number | null>(null)
let pollTimer: ReturnType<typeof setInterval> | null = null

async function fetchTeamCount() {
  try {
    const data = await $fetch<{ registeredTeams: number; status: string }>('/api/team-count')
    if (data.status === 'ok') {
      teamCount.value = data.registeredTeams
    }
  } catch {
    // Silently fail — badge simply won't show
  }
}

onMounted(() => {
  fetchTeamCount()
  pollTimer = setInterval(fetchTeamCount, 30000)
})

onUnmounted(() => {
  if (pollTimer) clearInterval(pollTimer)
})
function scrollToForm() {
  const el = document.getElementById('apply-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO
useHead({
  title: `${eventData.value.title} - 참가 신청`,
  meta: [
    { name: 'description', content: eventData.value.heroDescription },
    { property: 'og:title', content: `${eventData.value.title} - 참가 신청` },
    { property: 'og:description', content: eventData.value.heroDescription },
    { property: 'og:image', content: eventData.value.heroImage },
    { property: 'og:type', content: 'website' }
  ]
})
</script>
