import { CheckCircle2, Clock, RotateCcw, Undo2, XCircle } from 'lucide-react'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area'
import type { PermissionChange } from './useEnhancedPermissionChanges'

interface PermissionChangeHistoryProps {
  changes: PermissionChange[]
  onUndo: () => void
  onReset: () => void
  canUndo: boolean
  canReset: boolean
}

export const PermissionChangeHistory = ({
  changes,
  onUndo,
  onReset,
  canUndo,
  canReset,
}: PermissionChangeHistoryProps) => {
  const stats = useMemo(() => {
    const granted = changes.filter((c) => c.newValue && !c.oldValue).length
    const revoked = changes.filter((c) => !c.newValue && c.oldValue).length

    return { granted, revoked, total: changes.length }
  }, [changes])

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  if (changes.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Change History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No changes made yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Change History
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onUndo}
              disabled={!canUndo}
              className="h-8"
            >
              <Undo2 className="h-3 w-3 mr-1" />
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={!canReset}
              className="h-8"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">{stats.granted}</div>
            <div className="text-xs text-green-700">Granted</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">{stats.revoked}</div>
            <div className="text-xs text-red-700">Revoked</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-blue-700">Total</div>
          </div>
        </div>

        {/* Change List */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Changes</h4>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {changes
                .slice(-10)
                .reverse()
                .map((change, _index) => (
                  <div
                    key={`${change.permissionName}-${change.timestamp}`}
                    className="flex items-center justify-between p-2 rounded-lg border bg-card"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'p-1 rounded',
                          change.newValue ? 'bg-green-100' : 'bg-red-100'
                        )}
                      >
                        {change.newValue ? (
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{change.permissionName}</div>
                        <div className="text-xs text-muted-foreground">
                          {change.oldValue ? 'Revoked' : 'Granted'} at{' '}
                          {formatTime(change.timestamp)}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        change.newValue
                          ? 'border-green-200 text-green-700 bg-green-50'
                          : 'border-red-200 text-red-700 bg-red-50'
                      )}
                    >
                      {change.newValue ? 'Granted' : 'Revoked'}
                    </Badge>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
