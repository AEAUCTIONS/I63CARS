// Design tokens ported from design_handoff_aeparts_marketplace/README.md
// Do not deviate from these values without updating the design handoff.

export const colors = {
  primaryBlue: '#1565D8',
  accentBlue: '#2563EB',
  orange: '#F97316',
  orangeLight: '#FB923C',
  navyInk: '#0F2440',
  cyan: '#22D3EE',
  lightBlue: '#9CC4FF',
  successGreen: '#34D399',
  dangerRed: '#F87171',
  starAmber: '#FBBF24',
  textSecondary: '#64748B',
  textMuted: '#8A99AB',
  textCard: '#5B6B7E',
  textCardStrong: '#33414F',
  appBackground: '#F4F7FB',
  cardSurface: '#FFFFFF',
  inputSurface: '#F1F5F9',
  headerIconBg: '#EEF3F8',
  borderStandard: 'rgba(15,23,42,0.08)',
  borderInput: 'rgba(15,23,42,0.12)',
  disabledBtnBg: '#DCE7F5',
  disabledBtnText: '#9DB6D6',
  validBorder: 'rgba(52,211,153,0.45)',

  // Brand mark (logo): "A" blue, "E" orange, "PARTS" navy
  brandA: '#1565D8',
  brandE: '#F97316',
  brandParts: '#0F2440',

  // Hero gradient stops (home hero, also used for the welcome glow)
  heroGradient: ['#0A1B33', '#102A4F', '#16407D'] as const,

  navActive: '#1565D8',
  navInactive: '#8A99AB',
} as const;

export const fonts = {
  heading: 'SpaceGrotesk_700Bold',
  headingSemiBold: 'SpaceGrotesk_600SemiBold',
  headingMedium: 'SpaceGrotesk_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  mono: 'SpaceMono_400Regular',
} as const;

// Scale (px), from README Typography section
export const type = {
  welcomeHeadline: 26,
  sectionHeadline: 21,
  productPrice: 26,
  stat: 22,
  screenTitle: 17,
  cardTitle: 14,
  body: 13,
  price: 13,
  label: 11,
  caption: 10,
  navLabel: 10,
} as const;

export const spacing = {
  screenPaddingH: 16,
  cardGap: 12,
  cardPadding: 14,
  sectionGap: 20,
  elementGap: 10,
} as const;

export const radii = {
  button: 13,
  card: 15,
  hero: 22,
  pill: 20,
  sheetTop: 24,
  iconTile: 11,
  fab: 17,
  full: 999,
  otpBox: 13,
} as const;

// Glow shadow pattern: 0 0 <blur>px -<spread>px rgba(<accent>, .4-.7)
// React Native doesn't support CSS box-shadow spread directly; approximate
// with shadow* (iOS) — Android falls back to elevation (no color glow).
export const shadows = {
  primaryButtonGlow: {
    shadowColor: colors.primaryBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 6,
  },
  orangeGlow: {
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 6,
  },
  hero: {
    shadowColor: '#08162C',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 24,
    elevation: 10,
  },
  card: {
    shadowColor: '#0F2440',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 3,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 12,
  },
} as const;
