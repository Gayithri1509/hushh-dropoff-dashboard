import React, { useState } from "react";

const beforeData = {
  label: "Before Fix",
  activation: "21%",
  otpSuccess: "68%",
  profileSetup: "44%",
  color: "#ef4444",
  bg: "#fef2f2",
  border: "#fecaca",
  tagline: "High drop-off after OTP screen",
};

const afterData = {
  label: "After Fix",
  activation: "54%",
  otpSuccess: "89%",
  profileSetup: "76%",
  color: "#22c55e",
  bg: "#f0fdf4",
  border: "#bbf7d0",
  tagline: "Faster OTP + guided profile setup",
};

export default function ABSimulation() {
  const [isAfter, setIsAfter] = useState(false);
  const data = isAfter ? afterData : beforeData;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>🧪 A/B Fix Simulation</h2>
        <p style={styles.subtitle}>
          Toggle to see how fixing OTP latency + adding a progress bar improves
          activation
        </p>
      </div>

      {/* Toggle */}
      <div style={styles.toggleRow}>
        <span style={{ fontWeight: isAfter ? 400 : 700, color: "#ef4444" }}>
          Before Fix
        </span>
        <div
          onClick={() => setIsAfter(!isAfter)}
          style={{
            ...styles.toggleTrack,
            background: isAfter ? "#22c55e" : "#ef4444",
          }}
        >
          <div
            style={{
              ...styles.toggleThumb,
              transform: isAfter ? "translateX(26px)" : "translateX(2px)",
            }}
          />
        </div>
        <span style={{ fontWeight: isAfter ? 700 : 400, color: "#22c55e" }}>
          After Fix
        </span>
      </div>

      {/* Result Card */}
      <div
        style={{
          ...styles.card,
          background: data.bg,
          border: `2px solid ${data.border}`,
        }}
      >
        <div style={styles.cardLabel}>
          <span
            style={{
              ...styles.badge,
              background: data.color,
            }}
          >
            {data.label}
          </span>
          <span style={styles.tagline}>{data.tagline}</span>
        </div>

        <div style={styles.metricsRow}>
          <Metric
            label="Activation Rate"
            value={data.activation}
            color={data.color}
            big
          />
          <Metric
            label="OTP Success"
            value={data.otpSuccess}
            color={data.color}
          />
          <Metric
            label="Profile Setup"
            value={data.profileSetup}
            color={data.color}
          />
        </div>

        {isAfter && (
          <div style={styles.improvement}>
            🚀 Activation improved by <strong>+33 percentage points</strong> —
            that's a <strong>2.5× lift</strong>
          </div>
        )}
      </div>
    </div>
  );
}

function Metric({ label, value, color, big }) {
  return (
    <div style={styles.metric}>
      <div
        style={{
          fontSize: big ? 42 : 28,
          fontWeight: 800,
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div style={styles.metricLabel}>{label}</div>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#fff",
    borderRadius: 16,
    padding: "28px 32px",
    marginTop: 32,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  header: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 700, margin: 0, color: "#111" },
  subtitle: { fontSize: 14, color: "#666", marginTop: 6 },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
    fontSize: 15,
  },
  toggleTrack: {
    width: 56,
    height: 28,
    borderRadius: 999,
    cursor: "pointer",
    position: "relative",
    transition: "background 0.3s",
  },
  toggleThumb: {
    position: "absolute",
    top: 3,
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "#fff",
    transition: "transform 0.3s",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
  },
  card: {
    borderRadius: 12,
    padding: "24px 28px",
    transition: "all 0.4s ease",
  },
  cardLabel: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  badge: {
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 600,
  },
  tagline: { fontSize: 14, color: "#555" },
  metricsRow: {
    display: "flex",
    gap: 40,
    flexWrap: "wrap",
  },
  metric: { display: "flex", flexDirection: "column", gap: 6 },
  metricLabel: { fontSize: 13, color: "#666", fontWeight: 500 },
  improvement: {
    marginTop: 20,
    background: "#dcfce7",
    border: "1px solid #86efac",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 14,
    color: "#15803d",
  },
};