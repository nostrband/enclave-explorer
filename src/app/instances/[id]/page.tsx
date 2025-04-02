import React, { Suspense } from 'react'
import InstanceDetailsPage from '@/pages/InstanceDetails'
import LoadingSpinner from '@/components/LoadingSpinner'

type PageProps = {
   params: Promise<{ id: string }>
}

export default async function InstanceDetails({ params }: PageProps) {
   const { id = '' } = await params
   return (
      <Suspense fallback={<LoadingSpinner />}>
         <InstanceDetailsPage id={id} />
      </Suspense>
   )
}
