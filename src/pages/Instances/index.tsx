import React from 'react'
import Link from 'next/link'
import InstanceCard from './components/InstanceCard'
import { instances } from './const'

export default function InstancesPage() {
	return (
		<div className='container mx-auto p-2 flex flex-col gap-3'>
			<h2 className='text-lg tracking-wide text-center font-semibold uppercase'>
				Active Instances
			</h2>
			<div className='flex flex-col gap-2'>
				{instances.map((instance) => (
					<Link key={instance.id} href={`/instances/${instance.id}`}>
						<InstanceCard instance={instance} />
					</Link>
				))}
			</div>
		</div>
	)
}
