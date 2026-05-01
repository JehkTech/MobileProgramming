import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../theme';
import { Pill, EtaCard } from './designSystem';

export default function TransitMap({ stops, initialRegion, onStopPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Web Map Preview</Text>
          <Text style={styles.subtitle}>
            Native map tiles are disabled on web in this build. Select a stop or open the detail view below.
          </Text>
        </View>
        <Pill label="MAP" tone="primary" icon="map-outline" />
      </View>

      <View style={styles.board}>
        <View style={styles.roadHorizontal} />
        <View style={[styles.roadHorizontal, { top: '68%' }]} />
        <View style={styles.roadVertical} />
        <View style={[styles.roadVertical, { left: '58%' }]} />
        <View style={styles.mapLabel}>
          <Text style={styles.mapLabelTitle}>Center</Text>
          <Text style={styles.mapLabelCoords}>
            {initialRegion.latitude.toFixed(4)}, {initialRegion.longitude.toFixed(4)}
          </Text>
        </View>
        {stops.map((stop, index) => (
          <View
            key={stop.id}
            style={[
              styles.marker,
              { top: `${26 + index * 22}%`, left: `${24 + index * 18}%` },
            ]}
          >
            <View style={styles.markerDot} />
            <Text style={styles.markerLabel}>{stop.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.etaRow}>
        <EtaCard
          route="42A"
          destination="City Centre"
          via="via High Street"
          minutes={3}
          note="Departed stop 3"
          progress={0.78}
          onPress={() => onStopPress(stops[0])}
        />
      </View>

      <View style={styles.list}>
        {stops.map((stop) => (
          <Pressable
            key={stop.id}
            style={styles.stopButton}
            onPress={() => onStopPress(stop)}
          >
            <Text style={styles.stopName}>{stop.name}</Text>
            <Text style={styles.stopCoords}>
              {stop.latitude.toFixed(4)}, {stop.longitude.toFixed(4)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    ...typography.sectionHeading,
    color: colors.textDark,
  },
  subtitle: {
    marginTop: 4,
    ...typography.caption,
    color: colors.textMuted,
  },
  board: {
    height: 230,
    marginTop: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#0F172A',
    overflow: 'hidden',
    position: 'relative',
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '40%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '38%',
    width: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  mapLabel: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  mapLabelTitle: {
    ...typography.overline,
    color: colors.surface,
  },
  mapLabelCoords: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
  },
  marker: {
    position: 'absolute',
    alignItems: 'center',
  },
  markerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.warning,
    borderWidth: 3,
    borderColor: '#DBEAFE',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  markerLabel: {
    marginTop: 4,
    ...typography.caption,
    color: colors.surface,
    textAlign: 'center',
    maxWidth: 90,
  },
  etaRow: {
    marginTop: spacing.md,
  },
  list: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  stopButton: {
    backgroundColor: colors.bgLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  stopName: {
    color: colors.textDark,
    ...typography.cardTitle,
  },
  stopCoords: {
    color: colors.textMuted,
    marginTop: spacing.xs,
    ...typography.caption,
  },
});
