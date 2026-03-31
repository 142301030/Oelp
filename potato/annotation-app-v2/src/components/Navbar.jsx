import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ROLE_LABEL = { user: 'Uploader', annotator: 'Annotator' };

export default function Navbar({ showBack, backTo, backLabel }) {
  const { state, actions } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Logout? Progress is auto-saved.')) {
      actions.logout();
      navigate('/login');
    }
  };

  return (
    <nav style={{
      background: '#fff', borderBottom: '1px solid #e2e8f0',
      padding: '10px 20px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', zIndex: 100, flexShrink: 0,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {showBack && (
          <button className="btn btn-secondary btn-sm" onClick={() => navigate(backTo || -1)}>
            ← {backLabel || 'Back'}
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '0.82rem',
          }}>W</div>
          <span style={{ fontWeight: 700, fontSize: '0.97rem', color: '#1e293b' }}>WordAlign</span>
        </div>
      </div>
      {state.isLoggedIn && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{state.username}</div>
            {state.role && (
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{ROLE_LABEL[state.role] || state.role}</div>
            )}
          </div>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
