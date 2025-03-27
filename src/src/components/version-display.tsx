'use client'

import { useEffect, useState } from 'react'

export function VersionDisplay() {
  const [version, setVersion] = useState<string>('')

  useEffect(() => {
    fetch('/version.json')
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => setVersion('unknown'))
  }, [])

  return <span className="text-xs text-muted-foreground">v{version}</span>
} 