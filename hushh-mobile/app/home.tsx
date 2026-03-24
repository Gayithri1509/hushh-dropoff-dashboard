import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { trackEvent } from '../tracking';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    trackEvent('home_screen_viewed');
  }, []);

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome to Hushh 👋</Text>
        <Text style={styles.subtitle}>Your personal data wallet is ready</Text>
      </View>

      {/* Activation Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✅ Account Activated</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Data Points</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$0</Text>
          <Text style={styles.statLabel}>Earned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Private</Text>
        </View>
      </View>

      {/* What's Next */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's Next</Text>

        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🔐</Text>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Connect Your Data</Text>
            <Text style={styles.cardSub}>Link apps to start earning</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEmoji}>💰</Text>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Monetize Your Data</Text>
            <Text style={styles.cardSub}>Get paid for your insights</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardEmoji}>🛡️</Text>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Privacy Dashboard</Text>
            <Text style={styles.cardSub}>See who has your data</Text>
          </View>
        </View>
      </View>

      {/* Funnel Goal */}
      <View style={styles.goalBox}>
        <Text style={styles.goalTitle}>🎯 You made it!</Text>
        <Text style={styles.goalText}>
          You are part of our goal to reach 54% activation rate.
          Currently at 21% — help us grow!
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#888888',
  },
  badge: {
    marginHorizontal: 24,
    backgroundColor: '#0d2b1a',
    borderWidth: 1,
    borderColor: '#00ff88',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeText: {
    color: '#00ff88',
    fontSize: 15,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666666',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardEmoji: {
    fontSize: 28,
    marginRight: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: '#666666',
  },
  goalBox: {
    marginHorizontal: 24,
    marginBottom: 40,
    backgroundColor: '#1a1020',
    borderWidth: 1,
    borderColor: '#6c63ff',
    borderRadius: 12,
    padding: 20,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6c63ff',
    marginBottom: 8,
  },
  goalText: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 20,
  },
});