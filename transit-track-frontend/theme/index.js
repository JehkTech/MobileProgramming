export const colors = {
  primary: '#1B4FD8',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  textDark: '#111827',
  textMuted: '#6B7280',
  bgLight: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceRaised: '#F8FAFC',
  border: '#E5E7EB',
  primarySoft: '#EAF0FF',
  secondarySoft: '#EEF2FF',
  successSoft: '#ECFDF5',
  warningSoft: '#FFFBEB',
  dangerSoft: '#FEF2F2',
  overlay: '#0F172A',
  overlaySoft: '#111827',
  tint: '#E5EDFF',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  screen: 20,
};

export const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const typography = {
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 24,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 20,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 18,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 14,
    textTransform: 'uppercase',
  },
};

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  floating: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 6,
  },
};

export const layout = {
  mobileWidth: 430,
  contentWidth: 430,
  edgePadding: spacing.screen,
  bottomTabHeight: 84,
};

export function getEtaTone(minutes) {
  if (minutes < 5) {
    return {
      text: colors.success,
      soft: colors.successSoft,
      label: 'Arriving now',
    };
  }

  if (minutes <= 10) {
    return {
      text: colors.warning,
      soft: colors.warningSoft,
      label: 'Coming soon',
    };
  }

  return {
    text: '#FFFFFF',
    soft: colors.primary,
    label: 'Scheduled',
  };
}

export const tokens = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  layout,
  getEtaTone,
};
