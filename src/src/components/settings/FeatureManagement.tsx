'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Features } from './Features'

export const FeatureManagement = () => {
  const [showFeatureDialog, setShowFeatureDialog] = useState(false)

  return (
    <section className="feature-management p-5 xl:p-10">
      {showFeatureDialog && <Features onDismiss={() => setShowFeatureDialog(false)} />}
      <h1 className="text-xl font-medium">Feature Management</h1>
      <hr className="mt-2 border" />
      <div className="pt-5">
        <article className="text-base-content mb-5">
          <p>You can manage the host side features by clicking the following button.</p>
        </article>
        <Button onClick={() => setShowFeatureDialog(true)}>Manage Host Features</Button>
      </div>
    </section>
  )
}
