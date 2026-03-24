import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { trackEvent } from '../tracking';

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDobChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    } else if (cleaned.length > 4) {
      formatted =
        cleaned.slice(0, 2) +
        '/' +
        cleaned.slice(2, 4) +
        '/' +
        cleaned.slice(4, 8);
    }
    setDob(formatted);
  };

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter your full name.');
      return;
    }
    if (dob.length < 10) {
      Alert.alert('Invalid Date', 'Please enter your date of birth as DD/MM/YYYY.');
      return;
    }

    setLoading(true);

    await trackEvent('profile_setup_completed', {
      platform: Platform.OS,
      name_length: name.trim().length,
      has_dob: true,
    });

    setLoading(false);

    router.replace('/home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👤</Text>
          <Text style={styles.title}>Set Up Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell us a little about yourself so we can personalise your Hushh experience.
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '80%' }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 5</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#888"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#888"
            value={dob}
            onChangeText={handleDobChange}
            keyboardType="numeric"
            maxLength={10}
            returnKeyType="done"
          />
          <Text style={styles.hint}>
            🔒 Your data is encrypted and never sold.
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleContinue}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Saving...' : 'Continue →'}
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={async () => {
            await trackEvent('profile_setup_skipped', {
              platform: Platform.OS,
            });
            router.replace('/home');
          }}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#aaaaaa',
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#222',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6c63ff',
    borderRadius: 3,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'right',
  },
  form: {
    marginBottom: 32,
  },
  label: {
    color: '#cccccc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#ffffff',
    fontSize: 16,
  },
  hint: {
    color: '#666',
    fontSize: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#444',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipText: {
    color: '#666',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});