import {
  ChevronRight, ChevronDown,
  Folder, FolderOpen,
  FileText, FileImage, File
} from 'lucide-react'

// Return the right icon based on file extension
function getFileIcon(name) {
  const ext = name.split('.').pop().toLowerCase()
  if (['pdf', 'docx', 'txt'].includes(ext)) return <FileText size={14} />
  if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return <FileImage size={14} />
  return <File size={14} />
}

function TreeNode({ node, depth = 0, selectedFile, onSelectFile, focusedId, onFocusChange, path = '', openIds, onToggleOpen }) {
  const isFolder = node.type === 'folder'
  const isSelected = selectedFile?.id === node.id
  const isFocused = focusedId === node.id
  // Check the openIds Set from FileTree to know if this folder is expanded
  const isOpen = openIds.has(node.id)
  // Build the full path as we go deeper into the tree
  const currentPath = path ? `${path} / ${node.name}` : node.name

  const handleClick = (e) => {
    // Stop click from bubbling up to App's background deselect handler
    e.stopPropagation()
    if (isFolder) {
      onToggleOpen(node.id)
    } else {
      onSelectFile(node, path || 'Root')
    }
    onFocusChange(node.id)
  }

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    // Left padding increases with depth to create visual indentation
    padding: `5px 16px 5px ${16 + depth * 16}px`,
    cursor: 'pointer',
    fontSize: 12,
    color: isSelected ? '#00C2FF' : '#E8EAF0',
    background: isSelected ? '#00C2FF12' : 'transparent',
    borderLeft: isSelected ? '2px solid #00C2FF' : '2px solid transparent',
    // Purple outline when navigating with keyboard
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
        {/* Chevron — only shown for folders, changes direction when open */}
        <span style={{ width: 12, color: isOpen ? '#00C2FF' : '#6B7280', display: 'flex' }}>
          {isFolder
            ? isOpen
              ? <ChevronDown size={12} />
              : <ChevronRight size={12} />
            : null}
        </span>

        {/* Icon — open/closed folder or file type icon */}
        <span style={{
          color: isSelected ? '#00C2FF' : isFolder ? (isOpen ? '#00C2FF' : '#7B61FF') : '#6B7280',
          display: 'flex'
        }}>
          {isFolder
            ? isOpen ? <FolderOpen size={14} /> : <Folder size={14} />
            : getFileIcon(node.name)}
        </span>

        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {node.name}
        </span>
      </div>

      {/* Recursion — if this folder is open, render its children as TreeNodes */}
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
          openIds={openIds}
          onToggleOpen={onToggleOpen}
        />
      ))}
    </div>
  )
}

export default TreeNode