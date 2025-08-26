'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const initialDeck = [
  { title: 'Problem', text: 'Startups often waste weeks crafting pitch decks that don’t speak to investors.' },
  { title: 'Solution', text: 'PitchSense helps founders co-create their deck using AI trained on top-tier VC pitches.' },
  { title: 'Market Size', text: 'We estimate a $12B global TAM in fundraising automation & tooling.' },
  { title: 'Go-to-Market Strategy', text: '' },
  { title: 'Ask', text: 'We’re raising $750K to onboard 1,000 early-stage startups in the next 12 months.' },
];

export default function PreviewPage() {
  const [deck, setDeck] = useState(initialDeck);
  const [email, setEmail] = useState('');
  const [vcName, setVcName] = useState<string | null>(null);
  const [view, setView] = useState<'email' | 'onepager'>('email');

  const router = useRouter();

  useEffect(() => {
    const vc = new URLSearchParams(window.location.search).get('vc');
    setVcName(vc);
    setEmail(
      `Hi ${vc ?? '[Investor Name]'},\n\nI'm building PitchSense — an AI agent that helps founders instantly create VC-grade decks and outreach emails tailored to each fund.\n\nBased on your thesis, I think we’re a strong fit. Would love to share more.\n\n– Rachel`
    );
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: 'auto', color: '#000' }}>
        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setView('email')}
            style={{
              backgroundColor: view === 'email' ? '#10b981' : '#eee',
              color: view === 'email' ? 'white' : 'black',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ✉️ Email Preview
          </button>
          <button
            onClick={() => setView('onepager')}
            style={{
              backgroundColor: view === 'onepager' ? '#10b981' : '#eee',
              color: view === 'onepager' ? 'white' : 'black',
              fontWeight: 'bold',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            📄 One-Pager Preview
          </button>
        </div>

        {/* Email Section */}
        {view === 'email' && (
          <>
            <h3>✉️ Email Preview</h3>
            <div
              style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
              }}
            >
              <textarea
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '1rem',
                  fontSize: '1rem',
                  color: '#000',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                }}
              />
            </div>
            <button
              style={{
                backgroundColor: '#5b32f4',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              💌 Export Email to Word
            </button>
          </>
        )}

        {/* One-Pager Section */}
        {view === 'onepager' && (
          <>
            <h3>📄 One-Pager Preview</h3>
            {deck.map((section, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                }}
              >
                <h4 style={{ marginBottom: '0.5rem' }}>{section.title}</h4>
                <textarea
                  value={section.text}
                  onChange={(e) => {
                    const updated = [...deck];
                    updated[i].text = e.target.value;
                    setDeck(updated);
                  }}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    color: '#000',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                  }}
                />
              </div>
            ))}
            <button
              style={{
                backgroundColor: '#5b32f4',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              📄 Export One-Pager to Word
            </button>
          </>
        )}
      </div>
    </div>
  );
}
