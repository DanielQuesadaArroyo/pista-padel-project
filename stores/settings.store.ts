import type { Season, Settings, Slot } from '~/types/models'
import { getSeason, getVisibleDates } from '~/utils/dates'
import { useSettingsService } from '~/services/settings.service'
import { logger } from '~/utils/logger'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings | null>(null)
  const slots = ref<Slot[]>([])
  const now = ref(new Date())

  const currentSeason = computed<Season | null>(() => settings.value ? getSeason(getVisibleDates(settings.value, now.value)[0], settings.value) : null)
  const visibleDates = computed(() => settings.value ? getVisibleDates(settings.value, now.value) : [])

  async function loadSettings() {
    try { settings.value = await useSettingsService().getSettings(); return settings.value }
    catch (error) { logger.error('Error cargando configuración', { error }); throw error }
  }

  async function loadSlots(season: Season) {
    try { slots.value = await useSettingsService().getSlots(season) }
    catch (error) { logger.error('Error cargando slots', { season, error }); throw error }
  }

  async function loadInitialData() {
    try {
      const loadedSettings = await useSettingsService().getSettings()
      settings.value = loadedSettings
      await loadSlots(getSeason(getVisibleDates(loadedSettings, now.value)[0], loadedSettings))
    } catch (error) {
      logger.error('Error cargando configuración inicial', { error })
      throw error
    }
  }

  function refreshTime(value = new Date()) {
    now.value = value
  }

  return { currentSeason, loadInitialData, loadSettings, loadSlots, now, refreshTime, settings, slots, visibleDates }
})
