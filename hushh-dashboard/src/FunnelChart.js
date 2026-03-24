import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function FunnelChart({ data }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (entry) => {
    setSelected(selected?.step === entry.step ? null : entry);
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '0.5px solid #e5e5e0',
      padding: '20px',
      marginBottom: '24px'
    }}>
      <div style={{ fontSize: '12px', fontWeight: '500', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
        Signup funnel — click any bar to inspect
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} onClick={(e) => e?.activePayload && handleClick(e.activePayload[0].payload)}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => v >= 1000 ? Math.round(v / 1000) + 'k' : v} />
          <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
          <Bar dataKey="users" radius={[6, 6, 0, 0]} cursor="pointer">
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.color}
                opacity={selected && selected.step !== entry.step ? 0.4 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {selected && (
        <div style={{
          marginTop: '16px',
          background: '#f7f7f4',
          borderRadius: '8px',
          padding: '14px 16px',
          fontSize: '13px',
          lineHeight: '1.6'
        }}>
          <div style={{ fontWeight: '500', marginBottom: '6px', color: '#1a1a1a' }}>
            Step {selected.step} — {selected.name} &nbsp;
            <span style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '99px',
              background: selected.status === 'Critical' ? '#FCEBEB' : selected.status === 'Warning' ? '#FAEEDA' : '#E1F5EE',
              color: selected.status === 'Critical' ? '#791F1F' : selected.status === 'Warning' ? '#633806' : '#085041'
            }}>
              {selected.status}
            </span>
          </div>
          <div style={{ color: '#555', marginBottom: '6px' }}>
            <strong style={{ color: '#1a1a1a' }}>What happens:</strong> {selected.why}
          </div>
          <div style={{ color: '#555' }}>
            <strong style={{ color: '#1a1a1a' }}>Fix:</strong> {selected.fix}
          </div>
        </div>
      )}
    </div>
  );
}

export default FunnelChart;
