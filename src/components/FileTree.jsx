import { useState, useCallback, useEffect } from 'react'
import { Search } from 'lucide-react'
import TreeNode from './TreeNode'

// Flatten the nested tree into a single list — needed for keyboard navigation
function flattenTree(nodes, result = []) {
  for (const node of nodes) {
    result.push(node)
    if (node.children) flattenTree(node.children, result)
  }
  return result
}

// Walk the tree recursively and return the IDs of all parent folders for a given file
// Used by "Show in Enclosing Folder" to know which folders to expand
function getAncestorIds(nodes, targetId, path = []) {
  for (const node of nodes) {
    if (node.id === targetId) return path
    if (node.children) {
      const result = getAncestorIds(node.children, targetId, [...path, node.id])
      if (result) return result
    }
  }
  return null
}

function FileTree({ data, selectedFile, onSelectFile, width, revealFile, onRevealDone }) {
  const [focusedId, setFocusedId] = useState(null)
  const [search, setSearch] = useState('')
  // Set of open folder IDs — Set is used for O(1) lookup
  const [openIds, setOpenIds] = useState(new Set())

  const allNodes = flattenTree(data)

  // When "Show in Enclosing Folder" is triggered, expand all ancestor folders
  // and focus the target file in the tree
  useEffect(() => {
    if (revealFile) {
      const ancestorIds = getAncestorIds(data, revealFile.id)
      if (ancestorIds) {
        setOpenIds(prev => {
          const next = new Set(prev)
          ancestorIds.forEach(id => next.add(id))
          return next
        })
        setFocusedId(revealFile.id)
      }
      onRevealDone()
    }
  }, [revealFile, data, onRevealDone])

 // Keyboard navigation — ArrowUp/Down moves focus, Right expands, Left collapses, Enter selects
const handleKeyDown = useCallback((e) => {
  const flat = allNodes
  const currentIndex = flat.findIndex(n => n.id === focusedId)
  const node = flat.find(n => n.id === focusedId)

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    const next = flat[currentIndex + 1]
    if (next) setFocusedId(next.id)

  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    const prev = flat[currentIndex - 1]
    if (prev) setFocusedId(prev.id)

  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    if (node && node.type === 'folder' && !openIds.has(node.id)) {
      setOpenIds(prev => { const next = new Set(prev); next.add(node.id); return next })
    }

  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (node && node.type === 'folder' && openIds.has(node.id)) {
      setOpenIds(prev => { const next = new Set(prev); next.delete(node.id); return next })
    }

  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (node && node.type === 'file') {
      const path = getAncestorIds(data, node.id)?.map(id => flat.find(n => n.id === id)?.name).filter(Boolean).join(' / ') || 'Root'
      onSelectFile(node, path)
    }
  }
}, [focusedId, allNodes, openIds, onSelectFile, data])

 // If search is active, find matches and auto-expand their ancestor folders
const filtered = search
  ? allNodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
  : null

useEffect(() => {
  if (search) {
    const matches = allNodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
    matches.forEach(match => {
      const ancestors = getAncestorIds(data, match.id)
      if (ancestors) {
        setOpenIds(prev => {
          const next = new Set(prev)
          ancestors.forEach(id => next.add(id))
          return next
        })
      }
    })
  }
}, [search, data])

  // Add or remove a folder ID from the open set when clicked
  const toggleOpen = (id) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
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
        outline: 'none',
        flexShrink: 0,
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Header */}
      <div style={{ padding: '16px 16px 10px', borderBottom: '1px solid #2A2F45' }}>
        <p style={{
          fontSize: 11,
          fontWeight: 500,
          color: '#6B7280',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}>Vault Explorer</p>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: '#0D0F12',
          border: '1px solid #2A2F45',
          borderRadius: 6,
          padding: '7px 10px',
        }}>
          <Search size={13} color='#6B7280' />
          <input
            type='text'
            placeholder='Search files...'
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#E8EAF0',
              fontSize: 12,
              width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Tree Body — show filtered results or full tree */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {filtered
          ? filtered.length > 0
            ? filtered.map(node => (
              <TreeNode
                key={node.id}
                node={node}
                depth={0}
                selectedFile={selectedFile}
                onSelectFile={onSelectFile}
                focusedId={focusedId}
                onFocusChange={setFocusedId}
                openIds={openIds}
                onToggleOpen={toggleOpen}
              />
            ))
            : <p style={{ fontSize: 12, color: '#6B7280', padding: '16px', textAlign: 'center' }}>
                No results found
              </p>
          : data.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
              focusedId={focusedId}
              onFocusChange={setFocusedId}
              openIds={openIds}
              onToggleOpen={toggleOpen}
            />
          ))}
      </div>
    </div>
  )
}

export default FileTree