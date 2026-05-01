import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionButton, EtaCard, Pill, ScreenScroll, SectionHeader, SurfaceCard } from '../components/designSystem';
import { colors, spacing, typography } from '../theme';

const alerts = [
  {
    status: 'ACTIVE ALERT',
    route: '42A - High St',
    helper: 'Notify 5 min before',
    tone: 'primary',
  },
  {
    status: 'PAUSED',
    route: '7 - Uni Campus',
    helper: 'Notify 8 min before',
    tone: 'neutral',
  },
  {
    status: 'DELAY ALERT',
    route: '42A — 12 min late',
    helper: 'Now 09:27 (was 09:15)',
    tone: 'danger',
  },
];

export default function AlertsScreen() {
  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Pill label="ALERTS" tone="success" icon="notifications-outline" />
        <Text style={styles.pageTitle}>My Alerts</Text>
        <Text style={styles.heroText}>
          Live push notifications for the stops and routes you care about most.
        </Text>
      </View>

      <SurfaceCard style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Active</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Paused</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Delay</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>
        </View>
        <ActionButton label="+ Add alert" variant="primary" icon="add-outline" />
      </SurfaceCard>

      <SectionHeader title="Alert states" subtitle="Designed for quick status scanning." />
      <View style={styles.cardList}>
        {alerts.map((alert) => (
          <SurfaceCard key={alert.route} style={styles.alertCard}>
            <Pill label={alert.status} tone={alert.tone} icon="sparkles-outline" />
            <Text style={styles.alertRoute}>{alert.route}</Text>
            <Text style={styles.alertHelper}>{alert.helper}</Text>
          </SurfaceCard>
        ))}
      </View>

      <SectionHeader title="ETA sample" subtitle="The same card style used on the home screen." />
      <EtaCard
        route="7"
        destination="University"
        via="via Market"
        minutes={11}
        note="2 stops away"
        progress={0.45}
      />
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  hero: {
    marginBottom: spacing.lg,
  },
  pageTitle: {
    ...typography.pageTitle,
    color: colors.textDark,
    marginTop: spacing.sm,
  },
  heroText: {
    marginTop: spacing.xs,
    ...typography.body,
    color: colors.textMuted,
  },
  summaryCard: {
    gap: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  summaryBlock: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  summaryValue: {
    marginTop: 4,
    ...typography.sectionHeading,
    color: colors.textDark,
  },
  cardList: {
    gap: spacing.sm,
  },
  alertCard: {
    gap: 6,
  },
  alertRoute: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  alertHelper: {
    ...typography.caption,
    color: colors.textMuted,
  },
});