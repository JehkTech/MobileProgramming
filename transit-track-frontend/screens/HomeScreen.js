import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { ActionButton, EtaCard, MetricTile, Pill, ScreenScroll, SectionHeader, SurfaceCard } from '../components/designSystem';
import { colors, spacing, typography } from '../theme';
import { fetchStops } from '../services/api';
import TransitMap from '../components/TransitMap';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const FALLBACK_STOPS = [
  { id: 1, name: 'High St / Market', latitude: 37.78825, longitude: -122.4324 },
  { id: 2, name: 'University Gate', latitude: 37.78945, longitude: -122.4301 },
];

function parseStops(rawStops) {
  if (!Array.isArray(rawStops)) {
    return [];
  }

  return rawStops
    .map((stop) => ({
      id: String(stop.id),
      name: stop.name || `Stop ${stop.id}`,
      latitude: Number(stop.latitude),
      longitude: Number(stop.longitude),
    }))
    .filter(
      (stop) =>
        Number.isFinite(stop.latitude) &&
        Number.isFinite(stop.longitude),
    );
}

export default function HomeScreen({ navigation }) {
  const [stops, setStops] = useState(parseStops(FALLBACK_STOPS));
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadStops() {
      try {
        const apiStops = await fetchStops();
        const parsedStops = parseStops(apiStops);
        if (!isMounted) {
          return;
        }

        if (parsedStops.length > 0) {
          setStops(parsedStops);
          setUsingFallback(false);
          return;
        }
      } catch {
        if (!isMounted) {
          return;
        }
      }

      setStops(parseStops(FALLBACK_STOPS));
      setUsingFallback(true);
    }

    loadStops().finally(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const initialRegion = useMemo(() => {
    const firstStop = stops[0] || FALLBACK_STOPS[0];
    return {
      latitude: Number(firstStop.latitude),
      longitude: Number(firstStop.longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  }, [stops]);

  const etaCards = useMemo(
    () => [
      {
        route: '42A',
        destination: 'City Centre',
        via: 'via High Street',
        minutes: 3,
        note: 'Departed stop 3',
        progress: 0.78,
      },
      {
        route: '7',
        destination: 'University',
        via: 'via Market',
        minutes: 11,
        note: '2 stops away',
        progress: 0.44,
      },
      {
        route: '15',
        destination: 'Hospital',
        via: 'via North Gate',
        minutes: 24,
        note: 'Scheduled departure',
        progress: 0.24,
      },
    ],
    [],
  );

  return (
    <ScreenScroll contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Pill label="LIVE" tone="success" icon="radio-outline" />
        <Text style={styles.pageTitle}>TransitTrack</Text>
        <Text style={styles.heroText}>
          Real-time stop ETAs, saved journeys, and commuter alerts in a mobile-first shell.
        </Text>
      </View>

      <SurfaceCard style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <MetricTile value={stops.length} label="Stops loaded" tone="primary" icon="location-outline" />
          <MetricTile value="24" label="Live routes" tone="neutral" icon="bus-outline" />
          <MetricTile value="3" label="Alerts armed" tone="success" icon="notifications-outline" />
        </View>
        <View style={styles.summaryActions}>
          <ActionButton label="Plan" variant="ghost" icon="map-outline" onPress={() => navigation.navigate('StopDetail', { stop: stops[0] || FALLBACK_STOPS[0] })} />
          <ActionButton label="Alert" variant="primary" icon="alarm-outline" onPress={() => navigation.navigate('StopDetail', { stop: stops[0] || FALLBACK_STOPS[0] })} />
        </View>
      </SurfaceCard>

      <SectionHeader title="Live map" subtitle="Responsive preview with the mobile layout preserved on web." />
      <TransitMap
        stops={stops}
        initialRegion={initialRegion}
        onStopPress={(stop) => navigation.navigate('StopDetail', { stop })}
      />

      <SectionHeader title="Next departures" subtitle="Card 3 uses the ETA treatment from the spec." />
      <View style={styles.etaList}>
        {etaCards.map((card) => (
          <EtaCard key={card.route} {...card} onPress={() => navigation.navigate('StopDetail', { stop: stops[0] || FALLBACK_STOPS[0] })} />
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingBanner}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>Loading stop data...</Text>
        </View>
      ) : null}

      {usingFallback ? (
        <View style={styles.fallbackBanner}>
          <Text style={styles.fallbackText}>
            Using local stop data. Set EXPO_PUBLIC_API_BASE_URL to connect live API.
          </Text>
        </View>
      ) : null}

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Accessibility first</Text>
        <Text style={styles.footerText}>
          Touch targets are at least 44x44, type follows the 14/18/24 scale, and all critical text stays readable at 200% zoom.
        </Text>
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
  summaryActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  etaList: {
    gap: spacing.sm,
  },
  loadingBanner: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginLeft: spacing.sm,
    ...typography.caption,
    color: colors.textDark,
  },
  fallbackBanner: {
    marginTop: spacing.md,
    backgroundColor: colors.warningSoft,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: '#F7E2B3',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  fallbackText: {
    color: '#92400E',
    ...typography.caption,
    textAlign: 'center',
  },
  footerCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footerTitle: {
    ...typography.cardTitle,
    color: colors.textDark,
  },
  footerText: {
    marginTop: 4,
    ...typography.caption,
    color: colors.textMuted,
  },
});
