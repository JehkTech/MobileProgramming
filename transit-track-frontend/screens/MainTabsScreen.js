import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppCanvas, BottomTabs } from '../components/designSystem';
import HomeScreen from './HomeScreen';
import JourneyPlannerScreen from './JourneyPlannerScreen';
import AlertsScreen from './AlertsScreen';
import ProfileScreen from './ProfileScreen';

const tabs = [
  { key: 'home', label: 'MAP', icon: 'map-outline' },
  { key: 'plan', label: 'PLAN', icon: 'walk-outline' },
  { key: 'alerts', label: 'ALERTS', icon: 'notifications-outline' },
  { key: 'profile', label: 'PROFILE', icon: 'person-outline' },
];

const screens = {
  home: HomeScreen,
  plan: JourneyPlannerScreen,
  alerts: AlertsScreen,
  profile: ProfileScreen,
};

export default function MainTabsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('home');
  const ActiveScreen = screens[activeTab] || HomeScreen;

  return (
    <AppCanvas>
      <View style={styles.body}>
        <ActiveScreen navigation={navigation} />
      </View>
      <BottomTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
    </AppCanvas>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});