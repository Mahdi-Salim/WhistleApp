/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#1f4b99';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#111827',
    textSecondary: '#6b7280',
    background: '#f3f6fb',
    tint: '#16a34a',
    icon: '#67448b',
    tabIconDefault: '#94a3b8',
    tabIconSelected: '#16a34a',
    card: '#ffffff',
    cardSecondary: '#eef2ff', 
    border: '#dbe3ee',
    primary: '#16a34a',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    secondary: '#3b82f6',
    purple: '#8b5cf6',
    gold: '#f59e0b',
    heroText: '#ffffff',
    heroSubText: 'rgba(255,255,255,0.85)',
    heroMuted: 'rgba(255,255,255,0.7)',
    successBackground: '#dcfce7',
    warningBackground: '#fef3c7',
    dangerBackground: '#fee2e2',
    shadow: 'rgba(15,23,42,0.08)',
    inputBackground: '#ffffff',
    modalBackground: '#ffffff',
    headerButton: 'rgba(255,255,255,0.14)',
    headerButtonSecondary: 'rgba(255,255,255,0.22)',
    headerLogo: 'rgba(255,255,255,0.18)',
    headerText: '#ffffff',
    white: '#ffffff',
    cardIconBackground: 'rgba(11,61,46,0.08)',
    successLight: '#dcfce7',
    successButton: '#15803d',
    backgroundSecondary: '#eef2f7',
    highLight: '#dcfce7',
    modal: '#ffffff',
    input: '#f1f5f9',
    dangerLight: 'rgba(239,68,68,0.15)',
  },
  dark: {
   text : '#ffffff',
   textSecondary: '#9ca3af',
   background: '#030712',
   tint: tintColorDark,
   icon: '#9BA1A6',
   tabIconDefault: '#9BA1A6',
   card: '#111827',
   cardSecondary: '#1f2973',
   border: '#1f2973',
   primary: '#22c55e',
   success: '#22c55e',
   warning: '#f59e0b',
   danger: '#ef4444',
   secondary: '#60a5fa',
   purple: '#a78bfa',
   gold: '#fbbf24',
   heroText: '#ffffff',
   heroSubText: 'rgba(255,255,255,0.85)',
   heroMuted: 'rgba(255,255,255,0.7)',
   successBackground: 'rgba(34,197,94,0.15)', 
   warningBackground: '#rgba(245,185,11,0.15)',
   dangerBackground: '#rgba(239,68,68,0.15)',
   shadow: 'rgba(0,0,0,0.35)',
   inputBackground: '#0f172a',
   modalBackground: '#111827',
    headerButton: 'rgba(255,255,255,0.08)',
    headerButtonSecondary: 'rgba(255,255,255,0.14)',
    headerLogo: 'rgba(255,255,255,0.12)',
    headerText: '#ffffff',
    cardIconBackground: 'rgba(34,197,94,0.15)',
    successLight: 'rgba(34,197,94,0.15)',
    successButton: '#22c55e',
   backgroundSecondary: '#111827',
    highLight: '#14532d',
    modal: '#111827',
    input: '#1f2937',
    dangerLight: 'rgba(239,68,68,0.15)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
