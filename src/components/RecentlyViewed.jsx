import { useState } from 'react'
import { FileText, FileImage, File, Clock, FolderOpen } from 'lucide-react'

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['pdf', 'docx', 'txt'].includes(ext)) return <FileText size={14} />
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return <FileImage size={14} />
  return <File size={14} />
}

function RecentlyViewed({ recentFiles, selectedFile, onSelectFile, onShowInFolder, width }) {
  const [contextMenu, setContextMenu] = useState(null) // { x, y, file }

  const handleRightClick = (e, file) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ x: e.clientX, y: e.clientY, file })
  }

  const handleShowInFolder = () => {
  if (contextMenu?.file) {
    onSelectFile(contextMenu.file, contextMenu.file.path)
    onShowInFolder(contextMenu.file)
  }
  setContextMenu(null)
}

  const handleClick = (e, file) => {
    e.stopPropagation()
    onSelectFile(file, file.path)
    setContextMenu(null)
  }

  return (
    <div
      style={{
        width: width,
        minWidth: 200,
        height: '100vh',
        background: '#141720',
        borderRight: '1px solid #2A2F45',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
      onClick={() => setContextMenu(null)}
    >
      {/* Header */}
      <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid #2A2F45' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 500,
          color: '#6B7280',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>Recently Viewed</p>
        <p style={{ fontSize: 11, color: '#2A2F45' }}>Last 5 files opened</p>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {recentFiles.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            height: '100%',
            paddingBottom: 48,
          }}>
            <Clock size={36} color='#2A2F45' />
            <p style={{ fontSize: 12, color: '#6B7280' }}>No recent files</p>
            <p style={{ fontSize: 11, color: '#2A2F45' }}>Files you open will appear here</p>
          </div>
        ) : (
          recentFiles.map((file, index) => {
            const isSelected = selectedFile?.id === file.id
            return (
              <div
                key={file.id}
                onClick={(e) => handleClick(e, file)}
                onContextMenu={(e) => handleRightClick(e, file)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  background: isSelected ? '#00C2FF12' : 'transparent',
                  borderLeft: isSelected ? '2px solid #00C2FF' : '2px solid transparent',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isSelected) e.currentTarget.style.background = '#1C2030'
                }}
                onMouseLeave={e => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent'
                }}
              >
                {/* Icon */}
                <span style={{ color: isSelected ? '#00C2FF' : '#6B7280', display: 'flex', flexShrink: 0 }}>
                  {getFileIcon(file.name)}
                </span>

                {/* Info */}
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p style={{
                    fontSize: 12,
                    color: isSelected ? '#00C2FF' : '#E8EAF0',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {file.name}
                  </p>
                  <p style={{
                    fontSize: 10,
                    color: '#6B7280',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: 2,
                  }}>
                    {file.path}
                  </p>
                </div>

                {/* Index badge */}
                <span style={{
                  fontSize: 10,
                  color: '#2A2F45',
                  flexShrink: 0,
                }}>#{index + 1}</span>
              </div>
            )
          })
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: '#1C2030',
            border: '1px solid #2A2F45',
            borderRadius: 8,
            padding: '4px',
            zIndex: 1000,
            minWidth: 200,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div
            onClick={handleShowInFolder}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 12,
              color: '#E8EAF0',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2A2F45'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <FolderOpen size={14} color='#00C2FF' />
            Show in Enclosing Folder
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentlyViewed