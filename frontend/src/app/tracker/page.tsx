'use client';
import { useEffect, useState } from 'react';

const statuses = ['Not Replied Yet', 'Contacted', 'Replied', 'Intro Requested', 'Not a Fit'];

type Investor = {
  name: string;
  email: string;
  status: string;
  lastUpdated: string;
};

export default function TrackerPage() {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [newInvestor, setNewInvestor] = useState({ name: '', email: '', status: 'Not Replied Yet' });

  useEffect(() => {
    const stored = localStorage.getItem('outreachStatus');
    const matches = localStorage.getItem('investorMatches');
    const data: Investor[] = stored
      ? JSON.parse(stored)
      : matches
      ? JSON.parse(matches).map((inv: any) => ({
          name: inv.name || 'Unknown',
          email: inv.email || 'N/A',
          status: 'Not Replied Yet',
          lastUpdated: new Date().toLocaleString(),
        }))
      : [];

    setInvestors(data);
  }, []);

  const save = (data: Investor[]) => {
    localStorage.setItem('outreachStatus', JSON.stringify(data));
    setInvestors(data);
  };

  const updateStatus = (i: number, newStatus: string) => {
    const updated = [...investors];
    updated[i].status = newStatus;
    updated[i].lastUpdated = new Date().toLocaleString();
    save(updated);
  };

  const addInvestor = () => {
    const newEntry = {
      ...newInvestor,
      lastUpdated: new Date().toLocaleString(),
    };
    const updated = [...investors, newEntry];
    save(updated);
    setNewInvestor({ name: '', email: '', status: 'Not Replied Yet' });
  };

  const filtered = investors.filter(
    (inv) =>
      (filter === 'All' || inv.status === filter) &&
      (inv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportCSV = () => {
    const csv = ['Name,Email,Status,Last Updated', ...filtered.map(inv =>
      `${inv.name},${inv.email},${inv.status},${inv.lastUpdated}`)].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'investor-tracker.csv';
    a.click();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: 'auto' }}>
      <h2>📋 Outreach Tracker</h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Search name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', flexGrow: 1 }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button onClick={exportCSV} style={exportButton}>📥 Export CSV</button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          placeholder="Add name"
          value={newInvestor.name}
          onChange={(e) => setNewInvestor({ ...newInvestor, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="Add email"
          value={newInvestor.email}
          onChange={(e) => setNewInvestor({ ...newInvestor, email: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newInvestor.status}
          onChange={(e) => setNewInvestor({ ...newInvestor, status: e.target.value })}
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button onClick={addInvestor} style={addButton}>➕ Add</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Name</th>
            <th style={th}>Email</th>
            <th style={th}>Status</th>
            <th style={th}>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inv, i) => (
            <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
              <td style={td}>{inv.name}</td>
              <td style={td}>{inv.email}</td>
              <td style={td}>
                <select value={inv.status} onChange={(e) => updateStatus(i, e.target.value)}>
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td style={td}>{inv.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = { padding: '0.75rem', borderBottom: '2px solid #ccc', textAlign: 'left' };
const td = { padding: '0.75rem', borderBottom: '1px solid #eee' };
const inputStyle = { flex: 1, padding: '0.5rem' };
const exportButton = {
  backgroundColor: '#62C494',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
const addButton = {
  ...exportButton,
  backgroundColor: '#4AD39C',
};
