import { create } from 'zustand'

// Extend this store if you need!

export interface AppStore {
  navigationSitemapShowing: boolean
  setNavigationSitemapShowing: (navigationSitemapShowing: boolean) => void
  tabIsFocused: boolean
  setTabIsFocused: (tabIsFocused: boolean) => void
}

export const useAppStore = create<AppStore>((set) => ({
  navigationSitemapShowing: false,
  setNavigationSitemapShowing: (navigationSitemapShowing: boolean) =>
    set((s) => ({ ...s, navigationSitemapShowing })),
  tabIsFocused: true,
  setTabIsFocused: (tabIsFocused: boolean) =>
    set((s) => ({ ...s, tabIsFocused }))
}))
