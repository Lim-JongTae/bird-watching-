<template>
  <div class="min-h-screen bg-[var(--color-page-bg)] antialiased">
    <!-- Mobile Container Wrapper -->
    <div class="mobile-container flex flex-col pb-28">
      <!-- TopBar -->
      <TopBar
        :organizer-label="eventData.organizerLabel"
        :registered-teams="teamCount"
        :max-teams="20"
        :start-date="eventData.overview.applicationStartDate"
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
          :start-date="eventData.overview.applicationStartDate"
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
      <FloatingCTA
        :start-date="eventData.overview.applicationStartDate"
        @scroll-to-form="scrollToForm"
      />
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

// SEO & Open Graph (KakaoTalk preview)
useSeoMeta({
  title: '2026 서산 천수만 탐조대회',
  description: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)',
  ogTitle: '2026 서산 천수만 탐조대회',
  ogDescription: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)',
  ogImage: 'https://bird-watching-xi.vercel.app/og-image.png',
  ogImageUrl: 'https://bird-watching-xi.vercel.app/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogUrl: 'https://bird-watching-xi.vercel.app/',
  ogType: 'website',
  ogSiteName: '2026 서산 천수만 탐조대회',
  twitterCard: 'summary_large_image',
  twitterTitle: '2026 서산 천수만 탐조대회',
  twitterDescription: '서산 천수만에서 펼쳐지는 국내 최대 탐조 행사! 가창오리 군무 감상 & 전담 가이드 제공 (선착순 20팀)',
  twitterImage: 'https://bird-watching-xi.vercel.app/og-image.png'
})
</script>
