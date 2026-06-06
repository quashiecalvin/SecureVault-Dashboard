import { useState } from 'react'
import {
  ChevronRight, ChevronDown,
  Folder, FolderOpen,
  FileText, FileImage, File
} from 'lucide-react'

function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['pdf', 'docx', 'txt'].includes(ext)) return <FileText size={14} />
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return <FileImage size={14} />
  return <File size={14} />
}

function TreeNode({ node, depth = 0, selectedFile, onSelectFile, focusedId, onFocusChange, path = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const isFolder = node.type === 'folder'
  const isSelected = selectedFile?.id === node.id
  const isFocused = focusedId === node.id
  const currentPath = path ? `${path} / ${node.name}` : node.name

  const handleClick = (e) => {
    e.stopPropagation()
    if (isFolder) {
      setIsOpen(!isOpen)
    } else {
      onSelectFile(node, path || 'Root')
    }
    onFocusChange(node.id)
  }

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: `5px 16px 5px ${16 + depth * 16}px`,
    cursor: 'pointer',
    fontSize: 12,
    color: isSelected ? '#00C2FF' : '#E8EAF0',
    background: isSelected ? '#00C2FF12' : 'transparent',
    borderLeft: isSelected ? '2px solid #00C2FF' : '2px solid transparent',
    outline: isFocused && !isSelected ? '1px solid #7B61FF' : 'none',
    outlineOffset: -1,
    userSelect: 'none',
    transition: 'background 0.15s',
  }

  return (
    <div>
      <div
        style={rowStyle}
        onClick={handleClick}
        onMouseEnter={e => {
          if (!isSelected) e.currentTarget.style.background = '#1C2030'
        }}
        onMouseLeave={e => {
          if (!isSelected) e.currentTarget.style.background = 'transparent'
        }}
      >
        {/* Chevron */}
        <span style={{ width: 12, color: isOpen ? '#00C2FF' : '#6B7280', display: 'flex' }}>
          {isFolder
            ? isOpen
              ? <ChevronDown size={12} />
              : <ChevronRight size={12} />
            : null}
        </span>

        {/* Icon */}
        <span style={{
          color: isSelected ? '#00C2FF' : isFolder ? (isOpen ? '#00C2FF' : '#7B61FF') : '#6B7280',
          display: 'flex'
        }}>
          {isFolder
            ? isOpen ? <FolderOpen size={14} /> : <Folder size={14} />
            : getFileIcon(node.name)}
        </span>

        {/* Name */}
        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {node.name}
        </span>
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children?.map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
          focusedId={focusedId}
          onFocusChange={onFocusChange}
          path={currentPath}
        />
      ))}
    </div>
  )
}

export default TreeNode