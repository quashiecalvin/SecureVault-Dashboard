import { useState, useCallback, useEffect } from 'react'
import { Search } from 'lucide-react'
import TreeNode from './TreeNode'

function flattenTree(nodes, result = []) {
  for (const node of nodes) {
    result.push(node)
    if (node.children) flattenTree(node.children, result)
  }
  return result
}

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
  const [openIds, setOpenIds] = useState(new Set())

  const allNodes = flattenTree(data)

useEffect(() => {
  if (revealFile) {
    console.log('revealFile:', revealFile)
    const ancestorIds = getAncestorIds(data, revealFile.id)
    console.log('ancestorIds:', ancestorIds)
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
}, [revealFile])

  const handleKeyDown = useCallback((e) => {
    const flat = allNodes
    const currentIndex = flat.findIndex(n => n.id === focusedId)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = flat[currentIndex + 1]
      if (next) setFocusedId(next.id)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = flat[currentIndex - 1]
      if (prev) setFocusedId(prev.id)
    } else if (e.key === 'Enter') {
      const node = flat.find(n => n.id === focusedId)
      if (node && node.type === 'file') onSelectFile(node)
    }
  }, [focusedId, allNodes, onSelectFile])

  const filtered = search
    ? allNodes.filter(n => n.name.toLowerCase().includes(search.toLowerCase()))
    : null

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

      {/* Tree Body */}
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