import React from 'react';

function MetricCards({ data }) {
  const entered = data[0].users;
  const activated = data[4].users;
  const lost = entered - activated;
  const rate = Math.round((activated / entered) * 100);

  const cards = [
    { label: "Users entered", value: entered.toLocaleString(), sub: "Started signup", color: "#378ADD" },
    { label: "Activated", value: activated.toLocaleString(), sub: "Completed flow", color: "#1D9E75" },
    { label: "Lost in funnel", value: lost.toLocaleString(), sub: `${100 - rate}% overall drop`, color: "#E24B4A" },
    { label: "Activation rate", value: `${rate}%`, sub: "Target: 35%", color: rate >= 35 ? "#1D9E75" : "#E24B4A" },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginBottom: '24px'
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '16px',
          border: '0.5px solid #e5e5e0'
        }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '6px' }}>
            {card.label}
          </div>
          <div style={{ fontSize: '24px', fontWeight: '500', color: card.color }}>
            {card.value}
          </div>
          <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MetricCards;
