import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Navbar from '../../components/Navbar';

const purposes = [
  { id: 'evaluate',    label: 'Evaluate Model',     icon: '🤖', description: 'Verify model-generated alignments against human judgement.', color: '#4f46e5', bg: '#ede9fe' },
  { id: 'groundtruth', label: 'Create Ground Truth', icon: '🏆', description: 'Build a gold-standard human-annotated alignment dataset.',    color: '#059669', bg: '#d1fae5' },
];

export default function PurposePage() {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(state.purpose || null);

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar showBack backTo="/user/upload" backLabel="Upload" />
      <div className="page-container">
        <div className="step-indicator">
          <div className="step completed"><div className="step-num">✓</div>Instructions</div>
          <div className="step-line completed"></div>
          <div className="step completed"><div className="step-num">✓</div>Upload</div>
          <div className="step-line completed"></div>
          <div className="step active"><div className="step-num">3</div>Purpose</div>
          <div className="step-line"></div>
          <div className="step"><div className="step-num">4</div>Configure</div>
        </div>
        <div className="card">
          <div className="card-header" style={{ background: '#ede9fe' }}>
            <span>🎯</span> Annotation Purpose
            <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>Step 3 of 4</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 24 }}>
              {purposes.map(p => (
                <div key={p.id} onClick={() => setSelected(p.id)}
                  style={{
                    border: `2px solid ${selected === p.id ? p.color : '#e2e8f0'}`,
                    borderRadius: 12, padding: 22, cursor: 'pointer',
                    background: selected === p.id ? p.bg : 'white', transition: 'all 0.18s',
                    boxShadow: selected === p.id ? `0 0 0 4px ${p.color}20` : 'none',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                  <h3 style={{ fontWeight: 700, marginBottom: 6 }}>{p.label} {selected === p.id && '✓'}</h3>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.6 }}>{p.description}</p>
                </div>
              ))}
            </div>
            {selected && <div className="alert alert-success">✓ Selected: <strong>{purposes.find(p => p.id === selected)?.label}</strong></div>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-secondary" onClick={() => navigate('/user/upload')}>← Back</button>
              <button className="btn btn-primary btn-lg" disabled={!selected}
                onClick={() => { actions.setPurpose(selected); navigate('/user/configure'); }}>
                Continue →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
