import { mount } from '@vue/test-utils'
import { reactive } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SideMenu from '~/components/SideMenu.vue'

afterEach(() => vi.unstubAllGlobals())

describe('SideMenu', () => {
  it('shows the reactive alias, definitive order, routes and Lucide icons', async () => {
    const profileStore = reactive({ profile: { alias: 'Vecino152' } })
    vi.stubGlobal('useAuthStore', () => ({ signOut: vi.fn() }))
    vi.stubGlobal('useProfileStore', () => profileStore)
    vi.stubGlobal('useRoute', () => ({ path: '/reservations' }))
    vi.stubGlobal('navigateTo', vi.fn())

    const wrapper = mount(SideMenu, {
      props: { modelValue: true },
      global: {
        stubs: {
          Icon: { props: ['name'], template: '<span class="icon-stub" :data-name="name" />' },
          NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
        },
      },
    })

    expect(wrapper.get('.menu-header strong').text()).toBe('Vecino152')
    profileStore.profile.alias = 'NuevoAlias'
    await wrapper.vm.$nextTick()
    expect(wrapper.get('.menu-header strong').text()).toBe('NuevoAlias')
    expect(wrapper.findAll('.menu-item').map((item) => item.text())).toEqual([
      'Notificaciones', 'Reservas', 'Mis reservas', 'Cambiar alias', 'Normas de uso', 'Acerca de', 'Salir',
    ])
    expect(wrapper.findAll('a').map((item) => item.attributes('href'))).toEqual([
      '/notifications', '/reservations', '/my-reservations', '/alias', '/rules', '/about',
    ])
    expect(wrapper.findAll('.menu-item .icon-stub').map((item) => item.attributes('data-name'))).toEqual([
      'lucide:bell', 'lucide:calendar-days', 'lucide:calendar-check', 'lucide:user-cog',
      'lucide:file-text', 'lucide:info', 'lucide:log-out',
    ])
    expect(wrapper.get('a[href="/reservations"]').classes()).toContain('active')
    expect(wrapper.get('.sign-out').classes()).toContain('sign-out')
    expect(wrapper.find('.avatar').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('JH152')
  })
})
