import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, radius } from '../theme';
import { requestNotificationPermissions, scheduleStopAlert } from '../services/notifications';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.stopName}>{stopName}</Text>
      </View>

      <View style={styles.busList}>
        <View style={styles.busItem}>
          <View style={styles.busInfo}>
            <Text style={styles.routeBadge}>42A</Text>
            <View>
              <Text style={styles.destination}>City Centre</Text>
              <Text style={styles.eta}>3 min</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAlert(3)}
          >
            <Text style={styles.actionText}>ALERT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.busItem}>
          <View style={styles.busInfo}>
            <Text style={styles.routeBadge}>7</Text>
            <View>
              <Text style={styles.destination}>University</Text>
              <Text style={styles.eta}>11 min</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleAlert(11)}
          >
            <Text style={styles.actionText}>ALERT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButtonFull}>
          <Text style={styles.actionTextFull}>SAVE STOP</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  backButtonText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  stopName: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  busList: {
    flex: 1,
  },
  busItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeBadge: {
    backgroundColor: colors.primary,
    color: colors.bg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    fontWeight: '600',
    marginRight: spacing.md,
  },
  destination: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  eta: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 2,
  },
  actionButton: {
    backgroundColor: colors.primaryLight,
    padding: spacing.sm,
    borderRadius: radius.sm,
  },
  actionText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 12,
  },
  bottomActions: {
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  actionButtonFull: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  actionTextFull: {
    color: colors.bg,
    fontWeight: '600',
    textAlign: 'center',
  },
});
