import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';

const roles = [
  {
    id: 'user', label: 'Uploader', icon: '📤',
    description: 'Upload a JSON/JSONL dataset, validate it, and configure the annotation task.',
    features: ['Upload .json / .jsonl', 'Validate data format', 'Set annotation purpose'],
    color: '#4f46e5', bg: '#ede9fe',
  },
  {
    id: 'annotator', label: 'Annotator', icon: '🖊️',
    description: 'Verify existing word alignments sentence by sentence.',
    features: ['Sticky sentence display', 'Hover to highlight words', 'Yes / No per alignment pair'],
    color: '#059669', bg: '#d1fae5',
  },
];

export default function RoleSelectionPage() {
  const { state, actions } = useApp();
  const navigate = useNavigate();

  const pick = (id) => {
    actions.setRole(id);
    navigate(id === 'user' ? '/user/instructions' : '/annotator/instructions');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar />
      <div className="page-container" style={{ maxWidth: 680 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: 8 }}>Welcome, {state.username}! 👋</h1>
          <p style={{ color: '#64748b' }}>Choose your role to continue.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {roles.map(r => (
            <div key={r.id} onClick={() => pick(r.id)}
              style={{
                background: 'white', border: `2px solid ${state.role === r.id ? r.color : '#e2e8f0'}`,
                borderRadius: 14, padding: 24, cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = state.role === r.id ? r.color : '#e2e8f0'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ width: 50, height: 50, borderRadius: 12, background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 14 }}>{r.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 7 }}>{r.label}</h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: 14, lineHeight: 1.6 }}>{r.description}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {r.features.map((f, i) => (
                  <li key={i} style={{ fontSize: '0.79rem', color: '#475569', display: 'flex', gap: 6, marginBottom: 3 }}>
                    <span style={{ color: r.color, fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className="btn w-full" style={{ marginTop: 18, background: r.color, color: 'white', justifyContent: 'center', fontWeight: 600 }}>
                Continue as {r.label} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
