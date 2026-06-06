import { PanelRight } from 'lucide-react'

function MainContent({ selectedFile }) {
  return (
    <div style={{
      flex: 1,
      height: '100vh',
      background: '#0D0F12',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    }}>
      {selectedFile ? (
        <>
          <div style={{
            background: '#141720',
            border: '1px solid #2A2F45',
            borderRadius: 12,
            padding: '48px 64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <p style={{ fontSize: 13, color: '#6B7280' }}>Previewing</p>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#E8EAF0' }}>{selectedFile.name}</p>
            <p style={{ fontSize: 12, color: '#00C2FF', fontFamily: 'monospace' }}>
              {selectedFile.size}
            </p>
          </div>
        </>
      ) : (
        <>
          <PanelRight size={48} color='#2A2F45' />
          <p style={{ fontSize: 13, color: '#6B7280' }}>Select a file to preview</p>
          <p style={{ fontSize: 11, color: '#2A2F45' }}>or use keyboard arrows to navigate</p>
        </>
      )}
    </div>
  )
}

export default MainContent