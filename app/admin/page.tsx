'use client';
import { useState } from 'react';

export default function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  async function upload() {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/import', { 
      method: 'POST', 
      body: fd 
    });
    setResult(await res.json());
  }

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Data Import</h1>
      <p className="text-gray-600">Upload candidate data (JSON or Excel files)</p>
      <input 
        type="file" 
        accept=".json,.xlsx" 
        onChange={e => setFile(e.target.files?.[0] || null)} 
        className="border rounded px-2 py-2"
      />
      <button 
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600" 
        onClick={upload}
        disabled={!file}
      >
        Upload Data
      </button>
      {result && (
        <pre className="bg-slate-100 p-3 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
