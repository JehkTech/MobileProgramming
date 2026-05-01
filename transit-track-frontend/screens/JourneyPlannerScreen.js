import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionButton, EtaCard, MetricTile, Pill, RouteOptionCard, ScreenScroll, SectionHeader, SurfaceCard } from '../components/designSystem';
import { colors, spacing, typography } from '../theme/index.js';

const routes = [
  {
    route: '42A',
    title: 'Walk + bus to City Centre',
    duration: '18 min',
    departure: 'Dep 09:15',
    fare: '$1.60',
    selected: true,
  },
  {
    route: '7 → 42',
    title: 'One transfer via Market',
    duration: '31 min',
    departure: 'Dep 09:22',
    fare: '$2.40',
  },
  {
    route: '15',
    title: 'Direct service to Hospital',
    duration: '24 min',
    departure: 'Dep 09:18',
    fare: '$2.10',
  },
];

export default function JourneyPlannerScreen() {
  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Pill label="PLAN" tone="primary" icon="map-outline" />
        <Text style={styles.pageTitle}>Journey Planner</Text>
        <Text style={styles.heroText}>
          Compare direct buses, transfers, and walk links with fares before you leave.
        </Text>
      </View>

      <SurfaceCard style={styles.tripCard}>
        <View style={styles.tripRow}>
          <MetricTile value="From" label="My Location" tone="primary" icon="navigate-outline" />
          <MetricTile value="To" label="City Centre" tone="neutral" icon="location-outline" />
        </View>
        <View style={styles.tripActions}>
          <ActionButton label="Swap stops" variant="ghost" icon="swap-vertical-outline" />
          <ActionButton label="Plan route" variant="primary" icon="arrow-forward-outline" />
        </View>
      </SurfaceCard>

      <SectionHeader title="Best options" subtitle="Ranked by speed and convenience." />
      <View style={styles.routeList}>
        {routes.map((route) => (
          <RouteOptionCard key={route.route} {...route} />
        ))}
      </View>

      <SectionHeader title="ETA preview" subtitle="Card 3 follows the live ETA spec." />
      <EtaCard
        route="42A"
        destination="City Centre"
        via="via High Street"
        minutes={3}
        note="Departed stop 3"
        progress={0.78}
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
  tripCard: {
    gap: spacing.md,
  },
  tripRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  tripActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  routeList: {
    gap: spacing.sm,
  },
});