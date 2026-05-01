import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Pill } from './designSystem';
import { colors, spacing, typography } from '../theme/index.js';

// Define radius locally to avoid import issues
const radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
};

export default function TransitMap({ stops, initialRegion, onStopPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Live map</Text>
          <Text style={styles.subtitle}>Tap any marker to open the compact stop detail view.</Text>
        </View>
        <Pill label="LIVE" tone="success" icon="radio-outline" />
      </View>

      <View style={styles.mapWrap}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {stops.map((stop) => (
            <Marker
              key={stop.id}
              coordinate={{
                latitude: stop.latitude,
                longitude: stop.longitude,
              }}
              title={stop.name}
              description="Tap for stop details"
              onPress={() => onStopPress(stop)}
            />
          ))}
        </MapView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
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
  mapWrap: {
    height: 280,
    overflow: 'hidden',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    flex: 1,
  },
});
