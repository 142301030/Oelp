import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const SAMPLE_JSON = `[
  {
    "id": 1,
    "english": "I love apples",
    "target": "ഞാൻ ആപ്പിൾ ഇഷ്ടപ്പെടുന്നു",
    "english_tokens": ["I", "love", "apples"],
    "target_tokens": ["ഞാൻ", "ആപ്പിൾ", "ഇഷ്ടപ്പെടുന്നു"],
    "alignment": [
      { "en_word": "I",      "ml_word": "ഞാൻ" },
      { "en_word": "love",   "ml_word": "ഇഷ്ടപ്പെടുന്നു" },
      { "en_word": "apples", "ml_word": "ആപ്പിൾ" }
    ]
  }
]`;

const JSONL_SAMPLE = `{"en_sentence":"The cat sat","ml_sentence":"പൂച്ച ഇരുന്നു","alignment":[{"en_word":"cat","ml_word":"പൂച്ച"}]}
{"en_sentence":"I love you","ml_sentence":"ഞാൻ നിന്നെ സ്നേഹിക്കുന്നു","alignment":[{"en_word":"love","ml_word":"സ്നേഹിക്കുന്നു"}]}`;

export default function UserInstructionsPage() {
  const navigate = useNavigate();

  const downloadSample = () => {
    const blob = new Blob([SAMPLE_JSON], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'sample_alignment.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <Navbar showBack backTo="/role-select" backLabel="Change Role" />
      <div className="page-container">
        <div className="step-indicator">
          <div className="step active"><div className="step-num">1</div>Instructions</div>
          <div className="step-line"></div>
          <div className="step"><div className="step-num">2</div>Upload</div>
          <div className="step-line"></div>
          <div className="step"><div className="step-num">3</div>Purpose</div>
          <div className="step-line"></div>
          <div className="step"><div className="step-num">4</div>Configure</div>
        </div>
        <div className="card">
          <div className="card-header" style={{ background: '#ede9fe' }}>
            <span style={{ fontSize: 18 }}>📋</span> Upload Instructions
            <span className="badge badge-primary" style={{ marginLeft: 'auto' }}>Step 1 of 4</span>
          </div>
          <div className="card-body">
            <section style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, color: '#4f46e5', marginBottom: 8 }}>🎯 What this tool does</h3>
              <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.91rem' }}>
                Upload a bilingual dataset of English–Malayalam (or English–Hindi) sentence pairs.
                Each sentence already has word alignment pairs. Annotators will verify whether each
                alignment is correct and correct it if not.
              </p>
            </section>
            <hr className="divider" />
            <section style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, color: '#4f46e5', marginBottom: 10 }}>📁 Supported Formats</h3>
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontWeight: 600, fontSize: '0.87rem', marginBottom: 6 }}>Format 1 — JSON Array</p>
                <pre className="code-block">{SAMPLE_JSON}</pre>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.87rem', marginBottom: 6 }}>Format 2 — JSONL (one JSON per line) <span className="badge badge-success" style={{ fontSize:'0.7rem' }}>Your uploaded file</span></p>
                <pre className="code-block">{JSONL_SAMPLE}</pre>
              </div>
            </section>
            <hr className="divider" />
            <section style={{ marginBottom: 24 }}>
              <h3 style={{ fontWeight: 700, color: '#4f46e5', marginBottom: 10 }}>✅ Required Fields</h3>
              {[
                ['en_sentence / english', 'English sentence text', true],
                ['ml_sentence / target', 'Malayalam / target language sentence', true],
                ['alignment', 'Array of {en_word, ml_word} pairs', true],
                ['id', 'Unique identifier (auto-assigned if missing)', false],
                ['english_tokens / target_tokens', 'Token arrays (auto-split if missing)', false],
              ].map(([f, d, req]) => (
                <div key={f} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.86rem' }}>
                  <code style={{ background: '#f1f5f9', padding: '1px 7px', borderRadius: 5, flexShrink: 0 }}>{f}</code>
                  <span style={{ color: '#475569' }}>{d}</span>
                  <span className={`badge ${req ? 'badge-success' : 'badge-info'}`} style={{ marginLeft: 'auto', flexShrink: 0 }}>{req ? 'Required' : 'Optional'}</span>
                </div>
              ))}
            </section>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={downloadSample}>⬇️ Sample JSON</button>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/user/upload')}>Continue to Upload →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
