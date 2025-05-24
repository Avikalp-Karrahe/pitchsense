'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function MatchPage() {
  const router = useRouter();
  const [matches, setMatches] = useState([]);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('investorMatches');
    const formStored = localStorage.getItem('startupForm');
    if (stored) setMatches(JSON.parse(stored));
    if (formStored) setForm(JSON.parse(formStored));
  }, []);

  function estimateValuation(stage: string, industry: string, location: string, date_joined: string) {
    const stageRanges: Record<string, [number, number]> = {
        'Pre-Seed': [0.15, 1],
        'Angel': [0.5, 2],
        'Seed': [5, 15],
        'Series A': [10, 30],
        'Series B': [30, 100],
        'Series C': [50, 200],
        'Series D': [100, 300],
        'Pre-IPO': [200, 1000],
        'IPO': [500, 10000]
    };

    const industryMultipliers: Record<string, number> = {
      'Artificial intelligence': 1.4,
      'Fintech': 1.3,
      'Healthtech': 1.5,
      'Biotech': 1.6,
      'Edtech': 0.9,
      'E-commerce': 1.0,
      'Supply chain': 1.2,
      'Other': 1.0
    };

    const locationMultipliers: Record<string, number> = {
      'San Francisco': 1.3,
      'New York': 1.2,
      'London': 1.1,
      'Beijing': 1.2,
      'Shanghai': 1.1,
      'India': 0.9,
      'Jakarta': 0.9,
      'Sao Paulo': 0.9,
      'Other': 1.0
    };

    let ageMultiplier = 1.0;
    let age = 3;
    try {
      const joinedDate = new Date(date_joined.split(' ')[0]);
      const diffYears = (new Date().getTime() - joinedDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
      age = Math.floor(diffYears);
      if (age < 1) ageMultiplier = 0.8;
      else if (age < 3) ageMultiplier = 1.0;
      else if (age < 6) ageMultiplier = 1.1;
      else if (age < 10) ageMultiplier = 1.2;
      else ageMultiplier = 1.0;
    } catch {}

    const base = stageRanges[stage] || [5, 20];
    const indMult = industryMultipliers[industry] || 1.0;
    const locMult = locationMultipliers[location] || 1.0;

    const combined = indMult * locMult * ageMultiplier;
    const low = +(base[0] * combined).toFixed(2);
    const high = +(base[1] * combined).toFixed(2);

    return {
      low,
      high,
      base,
      indMult,
      locMult,
      age,
      ageMultiplier,
      combined
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {form && (() => {
          const est = estimateValuation(form.stage, form.sector, form.city, form.date_joined || '2022-01-01');
          return (
            <div style={{ backgroundColor: '#fff7dd', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
              <strong style={{ fontSize: '1.2rem' }}>💰 Estimated Valuation:</strong> ${est.low}M – ${est.high}M
              <div style={{
                backgroundColor: '#f4f4f4',
                padding: '0.6rem 1rem',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                borderRadius: '6px'
              }}>
                🔍 <strong>Your input:</strong> ${parseInt(form.valuation)}M <span style={{ color: '#666' }}>vs. Estimated range</span>
              </div>
              <div style={{ fontSize: '0.9rem' }}>
                Stage base: ${est.base[0]}M–${est.base[1]}M · Industry: {form.sector} ({est.indMult}×) · {form.city} ({est.locMult}×) · Age: {est.age}y ({est.ageMultiplier}×)
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                Multipliers are based on industry norms for comparable companies by stage, sector, location, and age.
              </div>
            </div>
          );
        })()}

        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🎯 Top Investor Matches
        </h3>

        {matches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          matches.map((match: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              style={{
                backgroundColor: '#1b1b1b',
                color: '#fff',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1rem'
              }}
            >
              <p><strong>{match.name}</strong></p>
              <p><strong>Match Score:</strong> {match.score ? `${match.score}%` : 'N/A'}</p>
              <p><strong>Industry:</strong> {match.industry}</p>
              <p><strong>Stage:</strong> {match.stage}</p>
              <p><strong>Location:</strong> {match.location}</p>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.8rem' }}>
                <button style={{ fontSize: '1.2rem', background: '#333', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '5px' }}>👍</button>
                <button style={{ fontSize: '1.2rem', background: '#333', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '5px' }}>👎</button>
                <button
                  onClick={() => router.push('/preview')}
                  style={{
                    backgroundColor: '#00e1ff',
                    color: '#000',
                    padding: '0.6rem 1.2rem',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  ✨ Start Email & Deck Preview
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
