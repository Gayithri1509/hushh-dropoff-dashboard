import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { trackEvent } from '../tracking';

export default function EmailScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    trackEvent('email_screen_viewed');
  }, []);

  // Simple email format check
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleContinue = async () => {
    const trimmed = email.trim();

    if (!trimmed) {
      Alert.alert('Required', 'Please enter your email address.');
      return;
    }

    if (!isValidEmail(trimmed)) {
      Alert.alert('Invalid Email', 'Please enter a valid email like name@example.com');
      return;
    }

    setLoading(true);

    try {
      // Go to OTP screen, pass the email along
      router.push({ pathname: '/otp', params: { email: trimmed } });

    } catch (error) {
      Alert.alert('Something went wrong', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* Top Area — matches logoArea from Screen 1 */}
      <View style={styles.topArea}>
        <Text style={styles.emailIcon}>✉️</Text>
        <Text style={styles.screenTitle}>Enter your email</Text>
        <Text style={styles.tagline}>We'll send you a 6-digit OTP to verify</Text>
      </View>

      {/* Middle Area — the input */}
      <View style={styles.middleArea}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#444444"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />
        <Text style={styles.helperText}>
          No spam. Your data stays private.
        </Text>
      </View>

      {/* Bottom Area — matches bottomArea from Screen 1 */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={[
            styles.button,
            !isValidEmail(email.trim()) && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={styles.buttonText}>Send OTP →</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
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
  topArea: {
    alignItems: 'center',
    marginTop: 40,
  },
  emailIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#888888',
    marginTop: 8,
    letterSpacing: 1,
    textAlign: 'center',
  },
  middleArea: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666666',
    letterSpacing: 2,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    fontSize: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',
  },
  helperText: {
    fontSize: 13,
    color: '#444444',
    marginTop: 10,
    alignSelf: 'flex-start',
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
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#1a3d2e',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: '#444444',
    fontSize: 14,
    marginTop: 4,
  },
});