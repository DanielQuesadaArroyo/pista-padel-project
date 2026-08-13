import type { Season, Settings, Slot } from '~/types/models'
import { getSeason, getVisibleDates } from '~/utils/dates'
import { useSettingsService } from '~/services/settings.service'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings | null>(null)
  const slots = ref<Slot[]>([])

  const currentSeason = computed<Season | null>(() => settings.value ? getSeason(getVisibleDates(settings.value)[0], settings.value) : null)
  const visibleDates = computed(() => settings.value ? getVisibleDates(settings.value) : [])

  async function loadSettings() {
    settings.value = await useSettingsService().getSettings()
    return settings.value
  }

  async function loadSlots(season: Season) {
    slots.value = await useSettingsService().getSlots(season)
  }

  async function loadInitialData() {
    const loadedSettings = await useSettingsService().getSettings()
    settings.value = loadedSettings
    await loadSlots(getSeason(getVisibleDates(loadedSettings)[0], loadedSettings))
  }

  return { currentSeason, loadInitialData, loadSettings, loadSlots, settings, slots, visibleDates }
})
