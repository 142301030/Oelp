import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Navbar from '../../components/Navbar';

export default function DonePage() {
  const { state, actions, helpers } = useApp();
  const navigate = useNavigate();

  const reDownload = () => {
    const output = helpers.buildFinalOutput();
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `annotations_${state.username}_${Date.now()}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4, #ede9fe)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 76, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontWeight: 800, fontSize: '1.9rem', marginBottom: 8 }}>Annotation Complete!</h1>
          <p style={{ color: '#475569', marginBottom: 28, lineHeight: 1.7 }}>
            Great work, <strong>{state.username}</strong>! Your annotations for{' '}
            <strong>{state.annotatorData?.length ?? 0} sentences</strong> have been downloaded.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 28 }}>
            {[['📝', state.annotatorData?.length ?? 0, 'Sentences'], ['✅', Object.keys(state.annotations).length, 'Annotated'], ['👤', state.username, 'Annotator']].map(([icon, val, lbl]) => (
              <div key={lbl} className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>{val}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{lbl}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={reDownload}>⬇️ Download Again</button>
            <button className="btn btn-primary" onClick={() => { actions.reset(); navigate('/annotator/annotate'); }}>🔄 Annotate Again</button>
            <button className="btn btn-outline" onClick={() => navigate('/role-select')}>🏠 Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
