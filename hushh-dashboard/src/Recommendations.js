import React from 'react';

function Recommendations({ data }) {
  const colors = {
    critical: { bg: '#FCEBEB', text: '#791F1F', num: '#E24B4A' },
    warning:  { bg: '#FAEEDA', text: '#633806', num: '#EF9F27' },
    good:     { bg: '#E1F5EE', text: '#085041', num: '#1D9E75' },
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      border: '0.5px solid #e5e5e0',
      padding: '20px',
    }}>
      <div style={{ fontSize: '12px', fontWeight: '500', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
        Fix recommendations — ranked by impact
      </div>

      {data.map((rec, i) => {
        const c = colors[rec.level];
        return (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px 0',
            borderBottom: i < data.length - 1 ? '0.5px solid #eee' : 'none'
          }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: c.bg, color: c.num,
              fontSize: '12px', fontWeight: '500',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              {rec.rank}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#1a1a1a', marginBottom: '3px' }}>
                {rec.title}
              </div>
              <div style={{ fontSize: '12px', color: '#777' }}>
                {rec.detail}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '18px', fontWeight: '500', color: '#1D9E75' }}>
                {rec.impact}
              </div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>activation</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Recommendations;