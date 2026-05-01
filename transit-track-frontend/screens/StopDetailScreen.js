import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ActionButton, EtaCard, Pill, ScreenScroll, SectionHeader, SurfaceCard } from '../components/designSystem';
import { colors, spacing, typography } from '../theme/index.js';
import { requestNotificationPermissions, scheduleStopAlert } from '../services/notifications';

// Define radius locally to avoid import issues
const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
};

export default function StopDetailScreen({ navigation, route }) {
  const stop = route?.params?.stop;
  const stopName = stop?.name || 'High St / Market';
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    requestNotificationPermissions().then(setNotificationsEnabled);
  }, []);

  const handleAlert = async (minutes) => {
    if (!notificationsEnabled) {
      Alert.alert('Notifications disabled', 'Enable notifications in settings');
      return;
    }
    await scheduleStopAlert(stopName, minutes);
    Alert.alert('Alert set', `You will be notified when bus arrives at ${stopName}`);
  };

  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <ActionButton label="Back" variant="ghost" icon="chevron-back-outline" onPress={() => navigation.goBack()} />
        <View style={styles.heroCopy}>
          <Pill label="STOP DETAIL" tone="primary" icon="location-outline" />
          <Text style={styles.stopName}>{stopName}</Text>
          <Text style={styles.heroText}>All buses at one stop with fast alert actions and a compact, readable layout.</Text>
        </View>
      </View>

      <SurfaceCard style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Platform</Text>
            <Text style={styles.summaryValue}>3 bays</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Saved</Text>
            <Text style={styles.summaryValue}>Yes</Text>
          </View>
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLabel}>Alerts</Text>
            <Text style={styles.summaryValue}>On</Text>
          </View>
        </View>
        <View style={styles.summaryActions}>
          <ActionButton label="Alert" variant="primary" icon="alarm-outline" onPress={() => handleAlert(3)} />
          <ActionButton label="Save stop" variant="ghost" icon="heart-outline" />
        </View>
      </SurfaceCard>

      <SectionHeader title="Departures" subtitle="The ETA card mirrors the production spec." />
      <View style={styles.etaList}>
        <EtaCard
          route="42A"
          destination="City Centre"
          via="via High Street"
          minutes={3}
          note="Departed stop 3"
          progress={0.78}
          onPress={() => handleAlert(3)}
        />
        <EtaCard
          route="7"
          destination="University"
          via="via Market"
          minutes={11}
          note="2 stops away"
          progress={0.44}
          onPress={() => handleAlert(11)}
        />
        <EtaCard
          route="15"
          destination="Hospital"
          via="via North Gate"
          minutes={24}
          note="Scheduled departure"
          progress={0.22}
        />
      </View>

      <SectionHeader title="Stop details" subtitle="An accessible summary card with the key metadata." />
      <SurfaceCard style={styles.detailCard}>
        <Text style={styles.detailTitle}>High priority service</Text>
        <Text style={styles.detailText}>
          Choose this stop when you want a single place to inspect routes, arm notifications, and store the location for later.
        </Text>
      </SurfaceCard>
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
  heroCopy: {
    marginTop: spacing.md,
  },
  stopName: {
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
    ...typography.cardTitle,
    color: colors.textDark,
  },
  summaryActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  etaList: {
    gap: spacing.sm,
  },
  detailCard: {
    gap: spacing.xs,
  },
  detailTitle: {
    ...typography.sectionHeading,
    color: colors.textDark,
  },
  detailText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
