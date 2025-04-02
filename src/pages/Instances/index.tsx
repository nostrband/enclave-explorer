'use client'

import React, { useEffect, useState } from 'react'
import InstanceCard from './components/InstanceCard'
import { fetchInstances } from '@/lib/nostr'
import { Instance } from '../../lib/types'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function InstancesPage() {
   const [isLoading, setIsLoading] = useState(true)
   const [instances, setInstances] = useState<Instance[]>([])

   useEffect(() => {
      const load = async () => {
         try {
            setIsLoading(true)
            const instances = await fetchInstances()
            setInstances(instances)
         } catch (error) {
            console.log(error)
         } finally {
            setIsLoading(false)
         }
      }
      load()
   }, [])

   if (isLoading) {
      return <LoadingSpinner />
   }

   return (
      <div className="container mx-auto p-2 flex flex-col gap-3">
         <h2 className="text-lg tracking-wide text-center font-semibold uppercase">Active Instances</h2>
         <div className="flex flex-col gap-2">
            {instances.map((instance) => (
               <InstanceCard key={instance.event.id} {...instance} />
            ))}
         </div>
      </div>
   )
}
