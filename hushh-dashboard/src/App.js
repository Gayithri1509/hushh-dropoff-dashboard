import React, { useState, useEffect } from 'react';
import { recommendations } from './data';
import MetricCards from './MetricCards';
import FunnelChart from './FunnelChart';
import Recommendations from './Recommendations';
import ABSimulation from './ABSimulation';
import LiveAlerts from './LiveAlerts';
import Filters from './Filters';

const deviceMultiplier = { "All": 1, "iOS": 0.58, "Android": 0.42 };

function App() {
  const [period, setPeriod] = useState("30");
  const [device, setDevice] = useState("All");
  const [funnelData, setFunnelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/funnel')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const mapped = data.funnel.map(item => ({
            step: item.step,
            users: item.count,
          }));
          setFunnelData(mapped);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch funnel:', err);
        setLoading(false);
      });
  }, []);

  const filteredData = funnelData
    ? funnelData.map(step => ({
        ...step,
        users: Math.round(step.users * deviceMultiplier[device]),
      }))
    : [];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: 20, color: '#64748b' }}>
        Loading live data...
      </div>
    );
  }

  return (
    <div style={styles.page}>

      {/* Top header bar */}
      <div style={styles.topBar}>
        <div style={styles.topBarInner}>
          <div style={styles.logo}>
            <span style={styles.logoHushh}>hushh</span>
            <span style={styles.logoDivider}>/</span>
            <span style={styles.logoSub}>drop-off intel</span>
          </div>
          <div style={styles.liveChip}>
            <span style={styles.liveDot} />
            Live
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={styles.content}>

        {/* Page title */}
        <div style={styles.titleBlock}>
          <h1 style={styles.pageTitle}>Signup Funnel Dashboard</h1>
          <p style={styles.pageSubtitle}>
            Showing last <strong>{period} days</strong> · <strong>{device}</strong> · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Filters */}
        <Filters
          period={period}
          device={device}
          onPeriodChange={setPeriod}
          onDeviceChange={setDevice}
        />

        {/* Live Alerts */}
        <LiveAlerts />

        {/* Metric Cards */}
        <Section label="Overview">
          <MetricCards data={filteredData} />
        </Section>

        {/* Funnel Chart */}
        <Section label="Funnel Breakdown">
          <FunnelChart data={filteredData} />
        </Section>

        {/* Recommendations */}
        <Section label="Recommended Fixes">
          <Recommendations data={recommendations} />
        </Section>

        {/* A/B Simulation */}
        <Section label="Fix Impact Simulation">
          <ABSimulation />
        </Section>

        {/* Footer */}
        <div style={styles.footer}>
          Built for Hushh Hackathon · Drop-Off Detection Dashboard
        </div>

      </div>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={sectionStyles.wrapper}>
      <div style={sectionStyles.label}>{label}</div>
      {children}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f6fa",
    fontFamily: "'Segoe UI', sans-serif",
  },
  topBar: {
    background: "#0f172a",
    padding: "0 2rem",
    height: 56,
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  topBarInner: {
    maxWidth: 1000,
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  logoHushh: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: "-0.5px",
  },
  logoDivider: {
    color: "#378ADD",
    fontSize: 18,
    fontWeight: 300,
  },
  logoSub: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: 400,
  },
  liveChip: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 999,
    padding: "4px 12px",
    fontSize: 12,
    color: "#4ade80",
    fontWeight: 600,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#4ade80",
    display: "inline-block",
  },
  content: {
    maxWidth: 1000,
    margin: "0 auto",
    padding: "2rem",
  },
  titleBlock: {
    marginBottom: 24,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#0f172a",
    margin: 0,
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 6,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 48,
    paddingTop: 24,
    borderTop: "1px solid #e2e8f0",
  },
};

const sectionStyles = {
  wrapper: {
    marginTop: 32,
  },
  label: {
    fontSize: 11,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 12,
  },
};

export default App;