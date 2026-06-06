import { FileText, FileImage, File } from 'lucide-react'

function getMimeType(name) {
  const ext = name.split('.').pop().toLowerCase()
  const map = {
    pdf: 'application/pdf',
    docx: 'application/msword',
    xlsx: 'application/vnd.ms-excel',
    txt: 'text/plain',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    svg: 'image/svg+xml',
    yaml: 'application/x-yaml',
    ttf: 'font/ttf',
  }
  return map[ext] || 'application/octet-stream'
}

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['pdf', 'docx', 'txt'].includes(ext)) return <FileText size={36} color='#00C2FF' />
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return <FileImage size={36} color='#00C2FF' />
  return <File size={36} color='#00C2FF' />
}

function getFileType(name) {
  const ext = name.split('.').pop().toLowerCase()
  const map = {
    pdf: 'PDF Document',
    docx: 'Word Document',
    xlsx: 'Excel Spreadsheet',
    txt: 'Text File',
    png: 'PNG Image',
    jpg: 'JPEG Image',
    jpeg: 'JPEG Image',
    svg: 'SVG Image',
    yaml: 'YAML Config',
    ttf: 'Font File',
  }
  return map[ext] || 'Unknown File'
}

const PropRow = ({ label, value, accent, small }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <span style={{ fontSize: 10, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
      {label}
    </span>
    <span style={{
      fontSize: small ? 11 : 12,
      color: accent ? '#00C2FF' : small ? '#6B7280' : '#E8EAF0',
      fontFamily: accent ? 'monospace' : 'inherit',
      wordBreak: 'break-all',
    }}>
      {value}
    </span>
  </div>
)

const Divider = () => (
  <div style={{ height: 1, background: '#2A2F45' }} />
)

function PropertiesPanel({ selectedFile, selectedPath, width }) {
  return (
    <div style={{
      width: width,
      minWidth: 200,
      height: '100vh',
      background: '#141720',
      borderLeft: '1px solid #2A2F45',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{ padding: '16px', borderBottom: '1px solid #2A2F45' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 500,
          color: '#6B7280',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>Properties</p>
      </div>

      {/* Body */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        {selectedFile ? (
          <>
            {/* File Preview Card */}
            <div style={{
              background: '#0D0F12',
              border: '1px solid #2A2F45',
              borderRadius: 8,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}>
              {getFileIcon(selectedFile.name)}
              <span style={{ fontSize: 12, fontWeight: 500, color: '#E8EAF0', textAlign: 'center', wordBreak: 'break-all' }}>
                {selectedFile.name}
              </span>
              <span style={{
                fontSize: 10,
                color: '#00C2FF',
                background: '#00C2FF12',
                border: '1px solid #00C2FF33',
                borderRadius: 4,
                padding: '3px 8px',
              }}>
                {getFileType(selectedFile.name)}
              </span>
            </div>

            <Divider />
            <PropRow label='Name' value={selectedFile.name} />
            <PropRow label='Type' value={getMimeType(selectedFile.name)} accent />
            <PropRow label='Size' value={selectedFile.size} />
            <Divider />
            <PropRow label='Modified' value='Just now' />
            <PropRow label='Location' value={selectedPath} small />
          </>
        ) : (
          <p style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 48 }}>
            No file selected
          </p>
        )}
      </div>
    </div>
  )
}

export default PropertiesPanel