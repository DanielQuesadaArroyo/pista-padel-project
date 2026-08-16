import type { Season, Settings, Slot } from '~/types/models'
import { getSeason, getVisibleDates } from '~/utils/dates'
import { useSettingsService } from '~/services/settings.service'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings | null>(null)
  const slots = ref<Slot[]>([])
  const now = ref(new Date())

  const currentSeason = computed<Season | null>(() => settings.value ? getSeason(getVisibleDates(settings.value, now.value)[0], settings.value) : null)
  const visibleDates = computed(() => settings.value ? getVisibleDates(settings.value, now.value) : [])

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
    await loadSlots(getSeason(getVisibleDates(loadedSettings, now.value)[0], loadedSettings))
  }

  function refreshTime(value = new Date()) {
    now.value = value
  }

  return { currentSeason, loadInitialData, loadSettings, loadSlots, now, refreshTime, settings, slots, visibleDates }
})
