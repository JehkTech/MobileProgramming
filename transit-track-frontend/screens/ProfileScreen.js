import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionButton, Pill, ScreenScroll, SectionHeader, SettingsRow, SurfaceCard } from '../components/designSystem';
import { colors, spacing, radius, typography } from '../theme';

const savedStops = [
  'High St / Market',
  'University Gate',
  'Hospital',
];

export default function ProfileScreen() {
  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <SurfaceCard style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AJ</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>Alex J.</Text>
          <Text style={styles.role}>42 journeys this month</Text>
        </View>
        <Pill label="PRO" tone="primary" icon="shield-checkmark-outline" />
      </SurfaceCard>

      <SectionHeader title="Saved stops" subtitle="Pinned locations for fast routing." />
      <View style={styles.stopList}>
        {savedStops.map((stop) => (
          <SurfaceCard key={stop} style={styles.savedStopCard}>
            <Text style={styles.savedStopText}>★ {stop}</Text>
          </SurfaceCard>
        ))}
      </View>

      <SectionHeader title="Settings" subtitle="Preference controls with accessible targets." />
      <View>
        <SettingsRow icon="notifications-outline" title="Notification timing" subtitle="Alert minutes and quiet hours" />
        <SettingsRow icon="contrast-outline" title="Dark mode" subtitle="System, light, or dark" />
        <SettingsRow icon="accessibility-outline" title="Accessibility" subtitle="Text size and motion preferences" />
      </View>

      <SectionHeader title="Account" subtitle="Shortcuts for sign-out and support." />
      <View style={styles.accountActions}>
        <ActionButton label="Support" variant="ghost" icon="help-circle-outline" />
        <ActionButton label="Sign out" variant="danger" icon="log-out-outline" />
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.surface,
    fontSize: 18,
    fontWeight: '700',
  },
  profileCopy: {
    flex: 1,
  },
  name: {
    ...typography.sectionHeading,
    color: colors.textDark,
  },
  role: {
    marginTop: 2,
    ...typography.caption,
    color: colors.textMuted,
  },
  stopList: {
    gap: spacing.sm,
  },
  savedStopCard: {
    paddingVertical: spacing.md,
  },
  savedStopText: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  accountActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});