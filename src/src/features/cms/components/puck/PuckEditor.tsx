'use client'

import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Alert } from '@/shared/components/ui/alert'

import { Puck, usePuck, createUsePuck, ActionBar } from '@measured/puck'
import { 
  Lock, 
  Unlock, 
  Eye, 
  Edit3,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import React, { useCallback, useState, useEffect, useMemo } from 'react'
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
  }, [lockedComponents, selectedItem, refreshPermissions]);

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
  const [lockedComponents, setLockedComponents] = useState<Record<string, boolean>>({})

  // Process and validate the initial data
  const processedData = useMemo(() => {
    try {
      let processed = data
      
      // Ensure we have valid data
      if (typeof data === 'string') {
        try {
          processed = JSON.parse(data)
        } catch (parseError) {
          processed = null
        }
      }
      
      // Validate the processed data structure
      if (!processed || 
          typeof processed !== 'object' || 
          !processed.content || 
          !Array.isArray(processed.content)) {
        processed = {
          content: [],
          root: { props: { title: 'New Page' } },
          zones: {},
        }
      }
      
      return ensureValidPuckData(processed) as any
    } catch (error) {
      console.error('PuckEditor data processing error:', error)
      setHasError(true)
      setErrorMessage('Failed to load page content. Please try refreshing the page.')
      return {
        content: [],
        root: { props: { title: 'New Page' }, id: 'root' },
        zones: {},
      }
    }
  }, [data])

  // Initialize the editor once
  useEffect(() => {
    if (processedData && !isInitialized) {
      setIsInitialized(true)
      setHasError(false)
    }
  }, [processedData, isInitialized])

  const handleChange = useCallback(
    (newData: any) => {
      try {
        if (!newData) return
        const validData = ensureValidPuckData(newData)
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

  const configOverride = useMemo(() => ({
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
  }), [lockedComponents])

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

  if (!isInitialized || !processedData) {
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

  if (!processedData.content || !Array.isArray(processedData.content)) {
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
    <div className={`w-full ${className}`}>
      <Puck
        config={configOverride}
        data={processedData}
        onChange={handleChange}
        iframe={{ enabled: false }}
        permissions={{ lockable: true, publish: false }} // Disable publish functionality
        overrides={{
          actionBar: (props) => (
            <ActionBarOverride {...props} lockedComponents={lockedComponents} setLockedComponents={setLockedComponents} />
          ),
          header: () => <div />, // Empty header to remove publish button
        }}
      />
    </div>
  )
}
