import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { trackEvent } from "../tracking";

export default function OTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    trackEvent("otp_screen_viewed", { email });

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleOtpChange(value: string, index: number) {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyPress(key: string, index: number) {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const isComplete = otp.every((digit) => digit !== "");
  const otpCode = otp.join("");

  async function handleVerify() {
    if (!isComplete) {
      Alert.alert("Enter Code", "Please enter all 6 digits.");
      return;
    }

    setLoading(true);

    try {
      if (otpCode === "123456") {
        await trackEvent("otp_verified", { email, success: true });
        router.push({ pathname: "/profile", params: { email } });
      } else {
        await trackEvent("otp_failed", { email, reason: "wrong_code" });
        Alert.alert(
          "Wrong Code",
          "That code is incorrect. Try again or resend.\n\n(Hint: use 123456 for demo)",
          [{ text: "OK" }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!canResend) return;

    await trackEvent("otp_resend_requested", { email });

    setCanResend(false);
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Alert.alert("Code Sent!", "A new code has been sent to " + email);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.inner}>

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.icon}>🔐</Text>

        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit code to{"\n"}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { if (ref) inputRefs.current[index] = ref; }}
              style={[styles.otpBox, digit !== "" && styles.otpBoxFilled]}
              value={digit}
              onChangeText={(val) => handleOtpChange(val, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.hintBox}>
          <Text style={styles.hintText}>💡 Demo mode: use code 123456</Text>
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, (!isComplete || loading) && styles.verifyButtonDisabled]}
          onPress={handleVerify}
          disabled={!isComplete || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify Code →</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't get it? </Text>
          {canResend ? (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendLink}>Resend code</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.resendTimer}>Resend in {resendTimer}s</Text>
          )}
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 60,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 32,
  },
  backText: {
    color: "#888",
    fontSize: 16,
  },
  icon: {
    fontSize: 56,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 36,
  },
  emailText: {
    color: "#a78bfa",
    fontWeight: "600",
  },
  otpRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  otpBox: {
    width: 48,
    height: 58,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#333",
    backgroundColor: "#1a1a1a",
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  otpBoxFilled: {
    borderColor: "#a78bfa",
    backgroundColor: "#1e1533",
  },
  hintBox: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#333",
  },
  hintText: {
    color: "#888",
    fontSize: 13,
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#7c3aed",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  verifyButtonDisabled: {
    backgroundColor: "#3b2d6a",
    opacity: 0.6,
  },
  verifyButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendLabel: {
    color: "#666",
    fontSize: 14,
  },
  resendLink: {
    color: "#a78bfa",
    fontSize: 14,
    fontWeight: "600",
  },
  resendTimer: {
    color: "#555",
    fontSize: 14,
  },
});