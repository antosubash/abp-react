'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { Alert } from '@/components/ui/alert'

import { Puck, usePuck, createUsePuck, ActionBar, IconButton } from '@measured/puck'
import { 
  Globe, 
  Lock, 
  Unlock, 
  Eye, 
  Edit3, 
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { config } from './config'
import { ensureValidPuckData } from './utils'

export interface PuckEditorProps {
  data: any
  onChange: (data: any) => void
  onSave?: (data: any) => void
  readOnly?: boolean
  className?: string
}

const usePuckHook = createUsePuck<typeof config>()

// Custom Header component with enhanced design
const CustomHeader = ({ onPublish }: { onPublish: (data: any) => void }) => {
  const { appState, dispatch } = usePuck()
  const previewMode = appState.ui.previewMode
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const toggleMode = () => {
    dispatch({
      type: 'setUi',
      ui: {
        previewMode: previewMode === 'edit' ? 'interactive' : 'edit',
      },
    })
  }

  const handlePublish = async () => {
    setIsSaving(true)
    setSaveStatus('saving')
    try {
      await onPublish(appState.data)
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (error) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return <RefreshCw size="16" className="animate-spin" />
      case 'saved':
        return <CheckCircle size="16" className="text-green-600" />
      case 'error':
        return <AlertTriangle size="16" className="text-red-600" />
      default:
        return <Globe size="16" />
    }
  }

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Publishing...'
      case 'saved':
        return 'Published'
      case 'error':
        return 'Failed to publish'
      default:
        return 'Publish'
    }
  }

  return (
    <header
      className="flex flex-wrap gap-4 p-4 px-6 bg-gradient-to-r from-slate-50 to-white text-slate-800 items-center border-b border-slate-200 shadow-sm"
      onClick={() => dispatch({ type: "setUi", ui: { itemSelector: null } })}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Edit3 size="16" className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-800">Page Editor</h1>
          <p className="text-xs text-slate-500">Create and edit your content</p>
        </div>
      </div>
      
      <div className="ml-auto flex items-center gap-3">
        {/* Mode Toggle */}
        <div className="flex items-center bg-slate-100 rounded-lg p-1">
          <Button 
            onClick={toggleMode} 
            variant={previewMode === 'edit' ? 'default' : 'ghost'}
            size="sm"
            className={`h-8 px-3 text-xs font-medium transition-all ${
              previewMode === 'edit' 
                ? 'bg-white shadow-sm text-slate-800' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Edit3 size="14" className="mr-1" />
            Edit
          </Button>
          <Button 
            onClick={toggleMode} 
            variant={previewMode === 'interactive' ? 'default' : 'ghost'}
            size="sm"
            className={`h-8 px-3 text-xs font-medium transition-all ${
              previewMode === 'interactive' 
                ? 'bg-white shadow-sm text-slate-800' 
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            <Eye size="14" className="mr-1" />
            Preview
          </Button>
        </div>

        <div className="w-px h-8 bg-slate-200 mx-2"></div>

        {/* Publish Button */}
        <Button
          onClick={handlePublish}
          disabled={isSaving}
          className={`flex items-center gap-2 font-medium transition-all ${
            saveStatus === 'saved' 
              ? 'bg-green-600 hover:bg-green-700' 
              : saveStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          size="sm"
        >
          {getSaveStatusIcon()}
          {getSaveStatusText()}
        </Button>
      </div>
    </header>
  )
}



// Custom header for better branding
const CustomHeaderComponent = ({ dataKey }: { dataKey: string }) => {
  return (
    <CustomHeader
      onPublish={async (data: any) => {
        localStorage.setItem(dataKey, JSON.stringify(data))
      }}
    />
  )
}

// Enhanced Action Bar with better visual design
const ActionBarOverride = ({ 
  children, 
  label, 
  parentAction, 
  lockedComponents, 
  setLockedComponents 
}: { 
  children: React.ReactNode, 
  label?: string, 
  parentAction?: React.ReactNode, 
  lockedComponents: Record<string, boolean>, 
  setLockedComponents: React.Dispatch<React.SetStateAction<Record<string, boolean>>> 
}) => {
  const { selectedItem, getPermissions, refreshPermissions } = usePuck();
  const globalPermissions = getPermissions();
  
  useEffect(() => {
    if (selectedItem?.props?.id) {
      refreshPermissions({ item: selectedItem });
    }
  }, [lockedComponents, selectedItem?.props?.id, refreshPermissions]);

  if (!selectedItem || !selectedItem.props?.id) {
    return (
      <ActionBar>
        <ActionBar.Group>
          {parentAction}
          {label && <ActionBar.Label label={label} />}
        </ActionBar.Group>
        <ActionBar.Group>{children}</ActionBar.Group>
      </ActionBar>
    );
  }

  const itemId = selectedItem.props.id;
  const isLocked = !!lockedComponents[itemId];

  return (
    <ActionBar>
      <ActionBar.Group>
        {parentAction}
        {label && <ActionBar.Label label={label} />}
      </ActionBar.Group>
      <ActionBar.Group>
        {children}
        {globalPermissions.lockable && typeof itemId === 'string' && (
          <ActionBar.Action
            onClick={() => {
              setLockedComponents({
                ...lockedComponents,
                [itemId]: !isLocked,
              });
              refreshPermissions({ item: selectedItem });
            }}
            label={isLocked ? 'Unlock' : 'Lock'}
          >
            {isLocked ? <Unlock size={16} /> : <Lock size={16} />}
          </ActionBar.Action>
        )}
      </ActionBar.Group>
    </ActionBar>
  );
};

export const PuckEditor = ({
  data,
  onChange,
  onSave,
  readOnly = false,
  className = '',
}: PuckEditorProps) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [puckData, setPuckData] = useState<any>(null)
  const [lockedComponents, setLockedComponents] = useState<Record<string, boolean>>({})

  React.useEffect(() => {
    try {
      let processedData = data
      
      // Ensure we have valid data
      if (typeof data === 'string') {
        try {
          processedData = JSON.parse(data)
        } catch (parseError) {
          processedData = null
        }
      }
      
      // Validate the processed data structure
      if (!processedData || 
          typeof processedData !== 'object' || 
          !processedData.content || 
          !Array.isArray(processedData.content)) {
        processedData = {
          content: [],
          root: { props: { title: 'New Page' } },
          zones: {},
        }
      }
      
      const validData = ensureValidPuckData(processedData)
      setPuckData(validData)
      setIsInitialized(true)
      setHasError(false)
    } catch (error) {
      console.error('PuckEditor data processing error:', error)
      setHasError(true)
      setErrorMessage('Failed to load page content. Please try refreshing the page.')
      const fallbackData = ensureValidPuckData(null)
      setPuckData(fallbackData)
      setIsInitialized(true)
    }
  }, [data])

  const handleChange = useCallback(
    (newData: any) => {
      try {
        if (!newData) return
        const validData = ensureValidPuckData(newData)
        setPuckData(validData)
        try {
          const dataToSend = JSON.stringify(validData)
          onChange(dataToSend)
        } catch (error) {
          setHasError(true)
          setErrorMessage('Failed to save changes. Please try again.')
        }
      } catch (error) {
        setHasError(true)
        setErrorMessage('Failed to update content. Please try again.')
      }
    },
    [onChange]
  )

  const handleSave = useCallback(
    (data: any) => {
      try {
        if (onSave) {
          onSave(data)
        }
      } catch (error) {
        setHasError(true)
        setErrorMessage('Failed to save. Please try again.')
      }
    },
    [onSave]
  )

  const resetError = useCallback(() => {
    setHasError(false)
    setErrorMessage('')
    setIsInitialized(false)
  }, [])

  const configOverride = {
    ...config,
    components: {
      ...Object.keys(config.components).reduce((acc, componentKey) => {
        const originalComponent = config.components[componentKey as keyof typeof config.components]
        return {
          ...acc,
          [componentKey]: {
            ...originalComponent,
            resolvePermissions: (data: any, { permissions }: any) => {
              if (data?.props?.id && lockedComponents[data.props.id]) {
                return {
                  drag: false,
                  edit: false,
                  duplicate: false,
                  delete: false,
                }
              }
              return permissions
            },
          },
        }
      }, {}),
    },
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8 bg-slate-50">
        <Card className="max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertTriangle size="24" className="text-red-600" />
            </div>
            <CardTitle className="text-red-600">Editor Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Alert variant="destructive" className="mb-4 text-left">
              {errorMessage ||
                'The page editor encountered an error. Please try refreshing the page.'}
            </Alert>
            <Button onClick={resetError} className="flex items-center gap-2 mx-auto">
              <RefreshCw size="16" />
              Retry Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isInitialized || !puckData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw size="24" className="text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Loading Editor</h3>
          <p className="text-slate-500">Preparing your content editor...</p>
        </div>
      </div>
    )
  }

  if (!puckData.content || !Array.isArray(puckData.content)) {
    const fallbackData = ensureValidPuckData(null)
    setPuckData(fallbackData)
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw size="24" className="text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Initializing Editor</h3>
          <p className="text-slate-500">Setting up your workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full bg-slate-50 ${className}`}>
      <Puck
        key={JSON.stringify(puckData)}
        config={configOverride}
        data={puckData}
        onChange={handleChange}
        iframe={{ enabled: false }}
        permissions={{ lockable: true }}
        overrides={{
          actionBar: (props) => (
            <ActionBarOverride {...props} lockedComponents={lockedComponents} setLockedComponents={setLockedComponents} />
          ),
          header: () => <CustomHeaderComponent dataKey="puck-editor-data" />,
        }}
      />
    </div>
  )
}
