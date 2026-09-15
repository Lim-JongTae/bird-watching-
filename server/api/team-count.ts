// Google Sheets team count API
// Fetches the number of registered teams from a published Google Sheet
//
// Setup:
// 1. Google Form 응답 스프레드시트 열기
// 2. 파일 > 공유 > 웹에 게시 > 게시 클릭
// 3. .env 파일에 GOOGLE_SHEET_ID / GOOGLE_SHEET_GID 설정

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const sheetId = config.googleSheetId
  const sheetGid = config.googleSheetGid || '0'

  if (!sheetId) {
    return {
      registeredTeams: 0,
      maxTeams: 20,
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
      maxTeams: 20,
      updatedAt: new Date().toISOString(),
      status: 'ok'
    }
  } catch (error: unknown) {
    console.error('[team-count] Failed to fetch Google Sheet:', error)
    return {
      registeredTeams: 0,
      maxTeams: 20,
      updatedAt: new Date().toISOString(),
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
