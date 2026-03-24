import React from "react";

export default function Filters({ period, device, onPeriodChange, onDeviceChange }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.left}>
        <span style={styles.label}>📅 Time period</span>
        <div style={styles.buttonGroup}>
          {["7", "14", "30"].map((d) => (
            <button
              key={d}
              onClick={() => onPeriodChange(d)}
              style={{
                ...styles.btn,
                background: period === d ? "#378ADD" : "#f4f4f4",
                color: period === d ? "#fff" : "#444",
                fontWeight: period === d ? 700 : 400,
              }}
            >
              {d} days
            </button>
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <span style={styles.label}>📱 Device</span>
        <div style={styles.buttonGroup}>
          {["All", "iOS", "Android"].map((d) => (
            <button
              key={d}
              onClick={() => onDeviceChange(d)}
              style={{
                ...styles.btn,
                background: device === d ? "#378ADD" : "#f4f4f4",
                color: device === d ? "#fff" : "#444",
                fontWeight: device === d ? 700 : 400,
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
    alignItems: "center",
    background: "#fff",
    borderRadius: 12,
    padding: "16px 24px",
    marginBottom: 24,
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
  },
  left: { display: "flex", alignItems: "center", gap: 12 },
  right: { display: "flex", alignItems: "center", gap: 12 },
  label: { fontSize: 13, color: "#666", fontWeight: 500 },
  buttonGroup: { display: "flex", gap: 6 },
  btn: {
    border: "none",
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};