import React from 'react'
import InstanceCard from './components/InstanceCard'
import { fetchInstances } from '@/lib/nostr'

export default async function InstancesPage() {
	const instances = await fetchInstances()

	return (
		<div className='container mx-auto p-2 flex flex-col gap-3'>
			<h2 className='text-lg tracking-wide text-center font-semibold uppercase'>
				Active Instances
			</h2>
			<div className='flex flex-col gap-2'>
				{instances.map((instance) => (
					<InstanceCard key={instance.event.id} {...instance} />
				))}
			</div>
		</div>
	)
}
