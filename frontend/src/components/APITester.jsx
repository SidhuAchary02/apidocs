import React, { useState } from 'react';
import axios from 'axios';

const methods = ['GET', 'POST', 'PUT', 'DELETE'];

function APITester() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('http://localhost:4000/forgot-password');
  const [body, setBody] = useState('{}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      setError(null);
      setResponse(null);

      const config = {
        method,
        url,
        headers: { 'Content-Type': 'application/json' },
        data: method !== 'GET' && method !== 'DELETE' ? JSON.parse(body) : undefined,
      };

      const res = await axios(config);

      setResponse({
        status: res.status,
        data: res.data,
      });
    } catch (err) {
      if (err.response) {
        setError({
          status: err.response.status,
          data: err.response.data,
        });
      } else {
        setError({
          status: 'Network Error',
          data: err.message,
        });
      }
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '1rem' }}>
      <h2>API Tester</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          {methods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Request URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
      </div>

      {(method === 'POST' || method === 'PUT') && (
        <textarea
          rows="8"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="JSON body"
          style={{ width: '100%', padding: '0.5rem', fontFamily: 'monospace' }}
        />
      )}

      <button onClick={sendRequest} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Send Request
      </button>

      {response && (
        <div style={{ marginTop: '1rem' }}>
          <h4>✅ Response ({response.status})</h4>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>
          <h4>❌ Error ({error.status})</h4>
          <pre>{JSON.stringify(error.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default APITester;
