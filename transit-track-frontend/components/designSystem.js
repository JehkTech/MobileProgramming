import React from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography, shadows, layout, getEtaTone } from '../theme';

export function AppCanvas({ children, style }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.canvas, style]}>
        <View pointerEvents="none" style={styles.glowOne} />
        <View pointerEvents="none" style={styles.glowTwo} />
        {children}
      </View>
    </SafeAreaView>
  );
}

export function ScreenScroll({ children, contentContainerStyle, style }) {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function SectionHeader({ title, subtitle, actionLabel, onActionPress }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionCopy}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress} style={styles.sectionAction}>
          <Text style={styles.sectionActionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function SurfaceCard({ children, style }) {
  return <View style={[styles.surfaceCard, style]}>{children}</View>;
}

export function Pill({ label, tone = 'neutral', icon }) {
  return (
    <View style={[styles.pill, pillToneStyles[tone]]}>
      {icon ? <Ionicons name={icon} size={12} color={pillTextColors[tone]} style={styles.pillIcon} /> : null}
      <Text style={[styles.pillText, { color: pillTextColors[tone] }]}>{label}</Text>
    </View>
  );
}

export function MetricTile({ value, label, tone = 'neutral', icon }) {
  return (
    <View style={[styles.metricTile, tone === 'primary' && styles.metricPrimary]}>
      <View style={[styles.metricIconWrap, metricIconTone[tone]]}>
        <Ionicons name={icon} size={14} color={metricIconColors[tone]} />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

export function ActionButton({ label, onPress, variant = 'primary', icon }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed, focused }) => [
        styles.actionButton,
        actionButtonTone[variant],
        pressed && styles.pressed,
        focused && styles.focusVisible,
      ]}
    >
      {icon ? <Ionicons name={icon} size={14} color={actionTextColor[variant]} style={styles.actionIcon} /> : null}
      <Text style={[styles.actionButtonText, { color: actionTextColor[variant] }]}>{label}</Text>
    </Pressable>
  );
}

export function EtaCard({ route, destination, via, minutes, note, progress = 0.5, onPress }) {
  const etaTone = getEtaTone(minutes);
  const progressWidth = `${Math.min(100, Math.max(10, Math.round(progress * 100)))}%`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.etaCard, pressed && styles.etaPressed]}
    >
      <View style={styles.etaTopRow}>
        <View style={styles.routeBadge}>
          <Text style={styles.routeBadgeText}>{route}</Text>
        </View>

        <View style={styles.etaHeadline}>
          <Text style={styles.etaDestination}>{destination}</Text>
          <Text style={styles.etaVia}>{via}</Text>
        </View>

        <View style={styles.etaValueBlock}>
          <Text style={[styles.etaValue, { color: etaTone.text }]}>{minutes}’</Text>
          <Text style={styles.etaClock}>{etaTone.label}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>

      <View style={styles.etaFooter}>
        <Text style={styles.etaFooterText}>{note}</Text>
        <Text style={styles.etaFooterTextRight}>Tap for details</Text>
      </View>
    </Pressable>
  );
}

export function RouteOptionCard({ route, title, duration, departure, fare, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.routeCard,
        selected && styles.routeCardSelected,
        pressed && styles.routeCardPressed,
      ]}
    >
      <View style={styles.routeCardTop}>
        <Text style={styles.routeCardTitle}>{route}</Text>
        <Text style={styles.routeCardDuration}>{duration}</Text>
      </View>
      <Text style={styles.routeCardSubtitle}>{title}</Text>
      <Text style={styles.routeCardMeta}>{departure} • {fare}</Text>
    </Pressable>
  );
}

export function SettingsRow({ icon, title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.settingsRow, pressed && styles.routeCardPressed]}>
      <View style={styles.settingsIconWrap}>
        <Ionicons name={icon} size={15} color={colors.primary} />
      </View>
      <View style={styles.settingsCopy}>
        <Text style={styles.settingsTitle}>{title}</Text>
        {subtitle ? <Text style={styles.settingsSubtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </Pressable>
  );
}

export function BottomTabs({ tabs, activeTab, onTabChange }) {
  return (
    <View style={styles.bottomTabs}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable key={tab.key} onPress={() => onTabChange(tab.key)} style={({ pressed }) => [styles.bottomTabItem, pressed && styles.pressed]}>
            <View style={[styles.bottomTabIconWrap, isActive && styles.bottomTabIconWrapActive]}>
              <Ionicons name={tab.icon} size={16} color={isActive ? colors.primary : colors.textMuted} />
            </View>
            <Text style={[styles.bottomTabLabel, isActive && styles.bottomTabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const pillTextColors = {
  neutral: colors.textMuted,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

const pillToneStyles = {
  neutral: { backgroundColor: colors.bgLight, borderColor: colors.border },
  primary: { backgroundColor: colors.primarySoft, borderColor: '#D3DFFF' },
  success: { backgroundColor: colors.successSoft, borderColor: '#C7F0E0' },
  warning: { backgroundColor: colors.warningSoft, borderColor: '#F7E2B3' },
  danger: { backgroundColor: colors.dangerSoft, borderColor: '#F5C2C7' },
};

const metricIconTone = {
  neutral: { backgroundColor: colors.bgLight },
  primary: { backgroundColor: colors.primarySoft },
  success: { backgroundColor: colors.successSoft },
  warning: { backgroundColor: colors.warningSoft },
  danger: { backgroundColor: colors.dangerSoft },
};

const metricIconColors = {
  neutral: colors.textMuted,
  primary: colors.primary,
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
};

const actionButtonTone = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondarySoft },
  ghost: { backgroundColor: colors.bgLight },
  danger: { backgroundColor: colors.danger },
};

const actionTextColor = {
  primary: colors.surface,
  secondary: colors.primary,
  ghost: colors.textDark,
  danger: colors.surface,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bgLight,
  },
  canvas: {
    flex: 1,
    width: '100%',
    maxWidth: layout.contentWidth,
    alignSelf: 'center',
    backgroundColor: colors.bgLight,
    position: 'relative',
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? {
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: colors.border,
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
        }
      : null),
  },
  glowOne: {
    position: 'absolute',
    top: -120,
    right: -100,
    width: 260,
    height: 260,
    borderRadius: 260,
    backgroundColor: 'rgba(27, 79, 216, 0.08)',
  },
  glowTwo: {
    position: 'absolute',
    bottom: 140,
    left: -110,
    width: 220,
    height: 220,
    borderRadius: 220,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: layout.edgePadding,
    paddingTop: spacing.lg,
    paddingBottom: layout.bottomTabHeight + spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  sectionCopy: {
    flex: 1,
  },
  sectionTitle: {
    ...typography.sectionHeading,
    color: colors.textDark,
  },
  sectionSubtitle: {
    marginTop: 4,
    ...typography.caption,
    color: colors.textMuted,
  },
  sectionAction: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  sectionActionText: {
    ...typography.overline,
    color: colors.primary,
  },
  surfaceCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadows.card,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  pillIcon: {
    marginRight: 4,
  },
  pillText: {
    ...typography.overline,
  },
  metricTile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  metricPrimary: {
    borderColor: '#D3DFFF',
    backgroundColor: colors.primarySoft,
  },
  metricIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  metricValue: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  metricLabel: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textMuted,
  },
  actionButton: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionIcon: {
    marginRight: 6,
  },
  actionButtonText: {
    ...typography.cardTitle,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  focusVisible: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  etaCard: {
    minHeight: 80,
    borderRadius: radius.sm,
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#0B1120',
    ...shadows.floating,
  },
  etaPressed: {
    opacity: 0.95,
  },
  etaTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeBadge: {
    minWidth: 28,
    minHeight: 22,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  routeBadgeText: {
    ...typography.overline,
    color: colors.surface,
    letterSpacing: 0.2,
  },
  etaHeadline: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  etaDestination: {
    ...typography.cardTitle,
    color: colors.surface,
  },
  etaVia: {
    marginTop: 2,
    ...typography.caption,
    color: 'rgba(255,255,255,0.72)',
  },
  etaValueBlock: {
    alignItems: 'flex-end',
    minWidth: 56,
  },
  etaValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  etaClock: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.62)',
    marginTop: 2,
  },
  progressTrack: {
    height: 3,
    marginTop: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  etaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  etaFooterText: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  etaFooterTextRight: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.55)',
  },
  routeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  routeCardSelected: {
    borderColor: '#BFD0FF',
    backgroundColor: '#F5F8FF',
  },
  routeCardPressed: {
    opacity: 0.9,
  },
  routeCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routeCardTitle: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  routeCardDuration: {
    ...typography.cardTitle,
    color: colors.primary,
    fontWeight: '700',
  },
  routeCardSubtitle: {
    marginTop: 4,
    ...typography.body,
    color: colors.textMuted,
  },
  routeCardMeta: {
    marginTop: 6,
    ...typography.caption,
    color: colors.textMuted,
  },
  settingsRow: {
    minHeight: 56,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  settingsIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingsCopy: {
    flex: 1,
  },
  settingsTitle: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  settingsSubtitle: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textMuted,
  },
  bottomTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingTop: 8,
    paddingBottom: 10,
  },
  bottomTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  bottomTabIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bottomTabIconWrapActive: {
    backgroundColor: colors.primarySoft,
  },
  bottomTabLabel: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: colors.textMuted,
  },
  bottomTabLabelActive: {
    color: colors.primary,
  },
});