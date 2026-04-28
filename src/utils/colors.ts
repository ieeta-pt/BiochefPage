/**
 * BioChef Design Tokens — Material Design palette matching the live BioChef SPA.
 *
 * Used by SVG diagrams and React components that need raw hex values
 * (Tailwind utility classes are preferred everywhere else; see
 * tailwind.config.cjs and src/styles/global.css for the canonical
 * source of design tokens).
 */

export const colors = {
  // Primary brand — Material Teal (matches live app `primary.main: #009688`)
  brand: '#009688',
  brandDark: '#00796B',
  brandLight: '#E0F2F1',
  brand50: '#E0F2F1',
  brand100: '#B2DFDB',
  brand200: '#80CBC4',
  brand300: '#4DB6AC',
  brand400: '#26A69A',
  brand500: '#009688',
  brand600: '#00897B',
  brand700: '#00796B',
  brand800: '#00695C',

  // Accent — Material Deep Orange (matches live app `secondary.main: #ff5722`)
  accent: '#FF5722',
  accentDark: '#E64A19',
  accentLight: '#FBE9E7',
  accent50: '#FBE9E7',
  accent100: '#FFCCBC',
  accent500: '#FF5722',
  accent600: '#F4511E',
  accent700: '#E64A19',

  // Tertiary — Blue (used for Browser/Runtime tone in diagrams)
  tertiary: '#2563EB',
  tertiaryDark: '#1D4ED8',
  tertiaryLight: '#EFF6FF',

  // Neutrals
  background: '#F5F5F5',
  surface: '#FFFFFF',
  border: '#E0E0E0',
  text: '#1A1A1A',
  textSecondary: '#525252',
  textTertiary: '#6B6B6B'
} as const;

export type ColorKey = keyof typeof colors;

export const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default colors;
