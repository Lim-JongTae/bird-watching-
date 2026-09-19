<template>
  <div class="min-h-screen bg-[var(--color-page-bg)] antialiased relative">
    <!-- Mobile Container Wrapper -->
    <div class="mobile-container flex flex-col pb-28">
      <!-- TopBar -->
      <TopBar
        :organizer-label="eventData.organizerLabel"
        :registered-teams="teamCount"
        :max-teams="maxTeams"
        :start-date="eventData.overview.applicationStartDate"
        :force-status="forceStatus"
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
          :participants="`총 ${maxTeams}개팀 선착순 (팀당 3~5명)`"
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

        <!-- ApplicationForm (Google Form iframe / Closed notice) -->
        <ApplicationForm
          :form-url="eventData.googleFormUrl"
          :start-date="eventData.overview.applicationStartDate"
          :registered-teams="teamCount"
          :max-teams="maxTeams"
          :force-status="forceStatus"
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
        :registered-teams="teamCount"
        :max-teams="maxTeams"
        :force-status="forceStatus"
        @scroll-to-form="scrollToForm"
      />

      <!-- Interactive Test Control Panel (Visible only in Development mode) -->
      <TestController
        v-if="isDev"
        :initial-teams="teamCount"
        :initial-max-teams="maxTeams"
        :start-date="eventData.overview.applicationStartDate"
        @update:teams="teamCount = $event"
        @update:maxTeams="maxTeams = $event"
        @update:forceStatus="forceStatus = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import eventDataJson from '~/data/event.json'
import type { TestStatusOverride } from '~/composables/useApplicationStatus'

const isDev = import.meta.dev
const eventData = ref(eventDataJson)

const maxTeams = ref<number>(eventDataJson.overview.maxTeams || 20)
const teamCount = ref<number | null>(null)
const forceStatus = ref<TestStatusOverride>('AUTO')

let pollTimer: ReturnType<typeof setInterval> | null = null

async function fetchTeamCount() {
  try {
    const data = await $fetch<{ registeredTeams: number; maxTeams?: number; status: string }>('/api/team-count')
    if (data.status === 'ok') {
      // If user hasn't modified simulated team count manually, use fetched value
      if (teamCount.value === null) {
        teamCount.value = data.registeredTeams
      }
    }
  } catch {
    // Silently fail
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

// SEO & Open Graph
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

