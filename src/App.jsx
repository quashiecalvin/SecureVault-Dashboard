import Sidebar from './components/Sidebar'
import FileTree from './components/FileTree'
import MainContent from './components/MainContent'
import PropertiesPanel from './components/PropertiesPanel'
import ResizeHandle from './components/ResizeHandle'
import { useState, useCallback } from 'react'
import data from './data/data.json'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedPath, setSelectedPath] = useState(null)
  const [treeWidth, setTreeWidth] = useState(320)
  const [propsWidth, setPropsWidth] = useState(300)

  const handleSelectFile = (file, path) => {
    if (selectedFile?.id === file.id) {
      setSelectedFile(null)
      setSelectedPath(null)
    } else {
      setSelectedFile(file)
      setSelectedPath(path)
    }
  }

  const handleTreeResize = useCallback((delta) => {
    setTreeWidth(prev => Math.min(500, Math.max(200, prev + delta)))
  }, [])

  const handlePropsResize = useCallback((delta) => {
    setPropsWidth(prev => Math.min(500, Math.max(200, prev - delta)))
  }, [])

  return (
    <div
      style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}
      onClick={() => { setSelectedFile(null); setSelectedPath(null) }}
    >
      <Sidebar />

      <FileTree
        data={data}
        selectedFile={selectedFile}
        onSelectFile={handleSelectFile}
        width={treeWidth}
      />

      <ResizeHandle onResize={handleTreeResize} />

      <MainContent
        selectedFile={selectedFile}
        onClick={e => e.stopPropagation()}
      />

      <ResizeHandle onResize={handlePropsResize} />

      <PropertiesPanel
        selectedFile={selectedFile}
        selectedPath={selectedPath}
        width={propsWidth}
      />
    </div>
  )
}

export default App