import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { colors, spacing } from '../theme';
import { fetchStops } from '../services/api';

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

  return (
    <View style={styles.container}>
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
            onPress={() => navigation.navigate('StopDetail', { stop })}
          />
        ))}
      </MapView>

      {loading ? (
        <View style={styles.loadingBanner}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={styles.loadingText}>Loading stops...</Text>
        </View>
      ) : null}

      {usingFallback ? (
        <View style={styles.fallbackBanner}>
          <Text style={styles.fallbackText}>
            Using local stop data. Set EXPO_PUBLIC_API_BASE_URL to connect live API.
          </Text>
        </View>
      ) : null}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navItemText}>MAP</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navItemText}>NEARBY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <Text style={styles.navItemText}>PLAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingBanner: {
    position: 'absolute',
    top: spacing.xl,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: 999,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    marginLeft: spacing.sm,
    color: colors.text,
    fontSize: 12,
  },
  fallbackBanner: {
    position: 'absolute',
    bottom: 64,
    left: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.amberLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.amber,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  fallbackText: {
    color: colors.amber,
    fontSize: 12,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.bg,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  navItem: {
    alignItems: 'center',
  },
  navItemText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
