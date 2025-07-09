'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PitchForm() {
  const [form, setForm] = useState({
    name: '',
    valuation: '',
    sector: '',
    country: '',
    city: '',
    stage: '',
    age: '',
    raise: '',
    description: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, valuation, sector, country, city, stage, age } = form;
    if (!name || !valuation || !sector || !country || !city || !stage || !age) {
      alert("Please fill in all required fields.");
      return;
    }

    localStorage.setItem('startupForm', JSON.stringify(form));

    const res = await fetch('/api/investor-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    localStorage.setItem('investorMatches', JSON.stringify(data.matches));
    router.push('/match');
  };

  const countryCities: Record<string, string[]> = {
    "United States": ["San Francisco", "New York", "Austin", "Seattle", "Los Angeles"],
    "China": ["Beijing", "Shanghai", "Shenzhen", "Hangzhou"],
    "India": ["Bangalore", "Mumbai", "Delhi", "Hyderabad"],
    "United Kingdom": ["London", "Manchester", "Bristol"],
    "Germany": ["Berlin", "Munich", "Hamburg"],
    "Canada": ["Toronto", "Vancouver", "Montreal"],
    "France": ["Paris", "Lyon", "Marseille"],
    "Australia": ["Sydney", "Melbourne", "Brisbane"],
    "Singapore": ["Singapore"],
    "Brazil": ["Sao Paulo", "Rio de Janeiro"],
    "Israel": ["Tel Aviv", "Jerusalem"],
    "Other": ["Remote"]
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Startup Profile
      </h2>

      <input
        name="name"
        placeholder="🏢 Startup Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      />

      <input
        name="valuation"
        placeholder="💰 Valuation (e.g., 120 for $120M)"
        type="number"
        value={form.valuation}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      />

      <select
        name="sector"
        value={form.sector}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      >
        <option value="">🎲 Select Industry</option>
        <option value="Artificial intelligence">Artificial intelligence</option>
        <option value="Fintech">Fintech</option>
        <option value="Healthtech">Healthtech</option>
        <option value="Biotech">Biotech</option>
        <option value="Edtech">Edtech</option>
        <option value="E-commerce">E-commerce</option>
        <option value="Supply chain & logistics">Supply chain & logistics</option>
        <option value="Other">Other</option>
      </select>

      <select
        name="country"
        value={form.country}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      >
        <option value="">🌍 Select Country</option>
        {Object.keys(countryCities).map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select
        name="city"
        value={form.city}
        onChange={handleChange}
        required
        disabled={!form.country}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      >
        <option value="">📍 Select City</option>
        {(countryCities[form.country] || []).map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
        {form.country && <option value="Other">Other</option>}
      </select>

      <select
        name="stage"
        value={form.stage}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      >
        <option value="">🚀 Select Stage</option>
        <option value="Pre-Seed">Pre-Seed</option>
        <option value="Seed">Seed</option>
        <option value="Angel">Angel</option>
        <option value="Series A">Series A</option>
        <option value="Series B">Series B</option>
        <option value="Series C">Series C</option>
        <option value="Series D">Series D</option>
        <option value="Pre-IPO">Pre-IPO</option>
        <option value="IPO">IPO</option>
      </select>

      <select
        name="age"
        value={form.age}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem' }}
      >
        <option value="">⏳ Select Age</option>
        <option value="0">Less than 1 year</option>
        <option value="1">1–3 years</option>
        <option value="3">3–6 years</option>
        <option value="6">6–10 years</option>
        <option value="10">10+ years</option>
      </select>

      <input
        name="raise"
        placeholder="💸 Raise Amount (Optional)"
        value={form.raise}
        onChange={handleChange}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem', color: '#888' }}
      />

      <textarea
        name="description"
        placeholder="📝 Brief Description (Optional)"
        value={form.description}
        onChange={handleChange}
        rows={4}
        style={{ padding: '0.5rem', fontSize: '1rem', width: '100%', marginBottom: '1rem', color: '#888' }}
      />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Match Me With Investors
      </button>
    </div>
  );
}
