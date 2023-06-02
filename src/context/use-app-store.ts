import { create } from 'zustand'

// Extend this store if you need!

export interface AppStore {
  fontsLoaded: boolean
  setFontsLoaded: (fontsLoaded: boolean) => void
  navigationSitemapShowing: boolean
  setNavigationSitemapShowing: (navigationSitemapShowing: boolean) => void
  tabIsFocused: boolean
  setTabIsFocused: (tabIsFocused: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  fontsLoaded: false,
  setFontsLoaded: (fontsLoaded: boolean) => set((s) => ({ ...s, fontsLoaded })),
  navigationSitemapShowing: false,
  setNavigationSitemapShowing: (navigationSitemapShowing: boolean) =>
    set((s) => ({ ...s, navigationSitemapShowing })),
  tabIsFocused: true,
  setTabIsFocused: (tabIsFocused: boolean) =>
    set((s) => ({ ...s, tabIsFocused }))
}))
