import React from 'react';

interface SimpleDebugLayoutProps {
  modeName: string;
  error?: string;
}

export const SimpleDebugLayout: React.FC<SimpleDebugLayoutProps> = ({ modeName, error }) => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      background: '#f8fafc',
      padding: '2rem'
    }}>
      <h1 style={{ color: '#1e293b', marginBottom: '1rem' }}>
        ASMBLR Debug Mode
      </h1>
      <p style={{ color: '#475569', marginBottom: '0.5rem' }}>
        Selected Mode: <strong>{modeName}</strong>
      </p>
      {error && (
        <p style={{ color: '#dc2626', marginBottom: '1rem' }}>
          Error: {error}
        </p>
      )}
      <div style={{ 
        background: 'white', 
        padding: '1rem', 
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
          If you're seeing this, there's an issue loading the main interface.
          Check the browser console for more details.
        </p>
        <button 
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          style={{
            marginTop: '1rem',
            padding: '8px 16px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Clear Storage & Reload
        </button>
      </div>
    </div>
  );
};


