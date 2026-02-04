// src/features/ui/slices/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'
export type Language = 'en' | 'vi'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

export interface UIState {
  globalLoading: boolean
  sidebarOpen: boolean
  theme: ThemeMode
  language: Language
  notifications: Notification[]
}

const initialState: UIState = {
  globalLoading: false,
  sidebarOpen: true,
  theme: 'light',
  language: (localStorage.getItem('lang') as Language) || 'en',
  notifications: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /* ---------- GLOBAL ---------- */
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload
    },

    /* ---------- SIDEBAR ---------- */
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },

    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload
    },

    /* ---------- THEME ---------- */
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },

    /* ---------- LANGUAGE ---------- */
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload
      localStorage.setItem('lang', action.payload)
    },

    /* ---------- NOTIFICATIONS ---------- */
    addNotification(
      state,
      action: PayloadAction<Omit<Notification, 'id'>>
    ) {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
      })
    },

    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(
        n => n.id !== action.payload
      )
    },

    clearNotifications(state) {
      state.notifications = []
    },
  },
})

export const {
  setGlobalLoading,
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  setLanguage,
  addNotification,
  removeNotification,
  clearNotifications,
} = uiSlice.actions

export default uiSlice.reducer
