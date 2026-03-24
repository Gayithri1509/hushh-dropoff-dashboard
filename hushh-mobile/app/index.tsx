import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { trackEvent } from '../tracking';

export default function LaunchScreen() {
  const router = useRouter();

  useEffect(() => {
    trackEvent('app_launch');
  }, []);

  return (
    <View style={styles.container}>

      {/* Logo Area */}
      <View style={styles.logoArea}>
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.appName}>hushh</Text>
        <Text style={styles.tagline}>Your Personal Data Wallet</Text>
      </View>

      {/* Middle Text */}
      <View style={styles.middleArea}>
        <Text style={styles.headline}>
          Take control of your personal data
        </Text>
        <Text style={styles.subtext}>
          Join thousands who own and monetize their data securely
        </Text>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomArea}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/email')}
        >
          <Text style={styles.buttonText}>Get Started →</Text>
        </TouchableOpacity>

        <Text style={styles.goalText}>
          🎯 Goal: Activation 21% → 54%
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 30,
    paddingVertical: 60,
    justifyContent: 'space-between',
  },
  logoArea: {
    alignItems: 'center',
    marginTop: 40,
  },
  lockIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
    letterSpacing: 1,
  },
  middleArea: {
    alignItems: 'center',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtext: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  bottomArea: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00ff88',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalText: {
    color: '#444444',
    fontSize: 13,
    marginTop: 20,
  },
});