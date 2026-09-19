import eventDataJson from '~/data/event.json'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const sheetId = config.googleSheetId
  const sheetGid = config.googleSheetGid || '0'
  const maxTeams = eventDataJson.overview?.maxTeams || 20

  if (!sheetId) {
    return {
      registeredTeams: 0,
      maxTeams,
      updatedAt: new Date().toISOString(),
      status: 'not_configured'
    }
  }

  try {
    // Fetch published Google Sheet as CSV (no API key needed if sheet is published to web)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`
    const response = await $fetch<string>(csvUrl, {
      responseType: 'text',
      timeout: 8000
    })

    // Count rows (subtract 1 for header row)
    const lines = response.trim().split('\n').filter((line: string) => line.trim() !== '')
    const teamCount = Math.max(0, lines.length - 1)

    return {
      registeredTeams: teamCount,
      maxTeams,
      updatedAt: new Date().toISOString(),
      status: 'ok'
    }
  } catch (error: unknown) {
    console.error('[team-count] Failed to fetch Google Sheet:', error)
    return {
      registeredTeams: 0,
      maxTeams,
      updatedAt: new Date().toISOString(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})

