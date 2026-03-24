import React, { useState } from "react";

const alerts = [
  {
    id: 1,
    level: "critical",
    icon: "🔴",
    title: "OTP failure spike detected",
    detail:
      "OTP failure rate jumped to 52% in the last 2 hours — 3× above baseline. Likely cause: SMS gateway latency.",
    action: "Check SMS provider dashboard",
    time: "2 min ago",
    bg: "#fef2f2",
    border: "#fecaca",
    titleColor: "#991b1b",
    detailColor: "#7f1d1d",
    badgeBg: "#fee2e2",
    badgeColor: "#991b1b",
    badgeText: "Critical",
  },
  {
    id: 2,
    level: "warning",
    icon: "🟡",
    title: "Profile setup abandonment rising",
    detail:
      "63% of users are stopping at the 'Full Name' field. This field may feel invasive before users see Hushh's value.",
    action: "Make name field optional",
    time: "18 min ago",
    bg: "#fffbeb",
    border: "#fde68a",
    titleColor: "#92400e",
    detailColor: "#78350f",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    badgeText: "Warning",
  },
];

export default function LiveAlerts() {
  const [dismissed, setDismissed] = useState([]);

  const visible = alerts.filter((a) => !dismissed.includes(a.id));

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          🚨 Live Alerts
          {visible.length > 0 && (
            <span style={styles.count}>{visible.length}</span>
          )}
        </h2>
        <p style={styles.subtitle}>Real-time anomalies in your signup funnel</p>
      </div>

      {visible.length === 0 ? (
        <div style={styles.empty}>
          ✅ All clear — no active alerts right now
        </div>
      ) : (
        <div style={styles.list}>
          {visible.map((alert) => (
            <div
              key={alert.id}
              style={{
                ...styles.card,
                background: alert.bg,
                border: `1.5px solid ${alert.border}`,
              }}
            >
              <div style={styles.cardTop}>
                <div style={styles.cardLeft}>
                  <span
                    style={{
                      ...styles.badge,
                      background: alert.badgeBg,
                      color: alert.badgeColor,
                    }}
                  >
                    {alert.icon} {alert.badgeText}
                  </span>
                  <span style={{ ...styles.time, color: alert.detailColor }}>
                    {alert.time}
                  </span>
                </div>
                <button
                  onClick={() => setDismissed([...dismissed, alert.id])}
                  style={styles.dismiss}
                  title="Dismiss alert"
                >
                  ✕
                </button>
              </div>

              <div
                style={{ ...styles.alertTitle, color: alert.titleColor }}
              >
                {alert.title}
              </div>
              <div
                style={{ ...styles.alertDetail, color: alert.detailColor }}
              >
                {alert.detail}
              </div>

              <div style={styles.actionRow}>
                <span style={{ ...styles.actionLabel, color: alert.titleColor }}>
                  Suggested fix:
                </span>
                <span style={{ ...styles.actionText, color: alert.detailColor }}>
                  {alert.action}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: "#111",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  count: {
    background: "#ef4444",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 999,
    padding: "2px 8px",
  },
  subtitle: { fontSize: 14, color: "#666", marginTop: 6 },
  empty: {
    background: "#f0fdf4",
    border: "1.5px solid #bbf7d0",
    borderRadius: 10,
    padding: "16px 20px",
    fontSize: 14,
    color: "#15803d",
  },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    borderRadius: 12,
    padding: "18px 20px",
    transition: "all 0.3s",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardLeft: { display: "flex", alignItems: "center", gap: 10 },
  badge: {
    fontSize: 12,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 999,
  },
  time: { fontSize: 12 },
  dismiss: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#999",
    padding: "2px 6px",
    borderRadius: 4,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 6,
  },
  alertDetail: {
    fontSize: 13,
    lineHeight: 1.6,
    marginBottom: 12,
  },
  actionRow: {
    display: "flex",
    gap: 8,
    fontSize: 13,
    alignItems: "center",
  },
  actionLabel: { fontWeight: 700 },
  actionText: {},
};