import { Files, Clock, Star, Settings, Shield } from 'lucide-react'

function Sidebar({ activeView, onViewChange }) {
  const iconStyle = (active) => ({
    width: 36,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: active ? '#00C2FF' : '#6B7280',
    background: active ? '#00C2FF18' : 'transparent',
  })

  return (
    <div style={{
      width: 60,
      minWidth: 60,
      height: '100vh',
      background: '#141720',
      borderRight: '1px solid #2A2F45',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px 0',
      gap: 8,
    }}>
      {/* Logo */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: '#00C2FF18',
        border: '1px solid #00C2FF44',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}>
        <Shield size={16} color='#00C2FF' />
      </div>

      {/* Divider */}
      <div style={{ width: 24, height: 1, background: '#2A2F45', margin: '4px 0' }} />

      {/* Nav Icons */}
      <div
        style={iconStyle(activeView === 'explorer')}
        onClick={(e) => { e.stopPropagation(); onViewChange('explorer') }}
        title='File Explorer'
      >
        <Files size={18} />
      </div>

      <div
        style={iconStyle(activeView === 'recent')}
        onClick={(e) => { e.stopPropagation(); onViewChange('recent') }}
        title='Recently Viewed'
      >
        <Clock size={18} />
      </div>

      <div style={iconStyle(false)} title='Starred'>
        <Star size={18} />
      </div>

      {/* Divider */}
      <div style={{ width: 24, height: 1, background: '#2A2F45', margin: '4px 0' }} />

      <div style={iconStyle(false)} title='Settings'>
        <Settings size={18} />
      </div>

      {/* Avatar */}
      <div style={{
        marginTop: 'auto',
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: '#7B61FF22',
        border: '1px solid #7B61FF44',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 11,
        fontWeight: 500,
        color: '#7B61FF',
        cursor: 'pointer',
      }}>CQ</div>
    </div>
  )
}

export default Sidebar