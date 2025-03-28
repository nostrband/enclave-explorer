import React, { FC } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { fetchInstances } from '@/lib/nostr'
import Image from 'next/image'
import { format } from 'date-fns'
import { getNeventLink, getNpubLink } from '@/utils/helpers'

type Props = {
	id: string
}

const InstanceDetailsPage: FC<Props> = async ({ id }) => {
	const instances = await fetchInstances()
	const currentInstance = instances.find((i) => i.event.id === id)

	if (!currentInstance)
		return (
			<div className='container flex flex-col gap-3 mx-auto py-4 items-center'>
				<p className='text-2xl font-semibold text-center'>
					Instance not found
				</p>
				<Button variant={'outline'}>
					<Link href={'/instances'}>Return to Instances</Link>
				</Button>
			</div>
		)

	const { instance, build, sourceRef = '' } = currentInstance || {}
	const { launcher, event } = instance || {}
	const { builder, event: buildEvent } = build || {}

	const buildCreatedAt = buildEvent?.created_at
		? format(buildEvent.created_at * 1000, 'yyyy/MM/dd, hh:mm:ss a')
		: ''

	return (
		<div className='container mx-auto px-4 py-6 flex flex-col gap-6'>
			<Card>
				<CardHeader>
					<CardTitle className='text-xl'>
						Instance: {currentInstance.name}
					</CardTitle>
					<CardDescription>
						<div className='flex flex-col gap-2'>
							<p className='break-all'>
								ID: {currentInstance.event.id}
							</p>
							<p className='break-all'>
								PUBKEY:{' '}
								{event && (
									<a
										href={getNeventLink(event)}
										className='inline-block hover:underline hover:text-blue-500'
										target='_blank'
										rel='noopener noreferrer'
									>
										{currentInstance.event.pubkey}
									</a>
								)}
								{!event && currentInstance.event.pubkey}
							</p>
							{sourceRef && (
								<p className='break-all'>
									Source code:{' '}
									<a
										href={sourceRef}
										className='hover:underline hover:text-blue-500'
										target='_blank'
										rel='noopener noreferrer'
									>
										{' '}
										{sourceRef}
									</a>
								</p>
							)}
							<Badge variant={'outline'}>
								Version: {currentInstance.version}
							</Badge>
						</div>
					</CardDescription>
				</CardHeader>

				{launcher && event && (
					<CardContent>
						<div className='flex flex-col gap-2'>
							<span>Launched by:</span>

							<a
								href={getNpubLink(event)}
								className='flex items-center gap-2 text-gray-700 hover:underline hover:text-blue-500'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={launcher.picture}
									alt={launcher.name}
									width={32}
									height={32}
									className='rounded-full'
								/>
								<span className='text-sm'>{launcher.name}</span>
							</a>
						</div>
					</CardContent>
				)}
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Build</CardTitle>
					<CardDescription>
						Details about the enclave build
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-2'>
						{buildCreatedAt && <p>Created at: {buildCreatedAt}</p>}
						{builder && buildEvent && (
							<div className='flex flex-col gap-2'>
								<span>Build by:</span>

								<a
									href={getNpubLink(buildEvent)}
									className='flex items-center gap-2 text-gray-700 hover:underline hover:text-blue-500'
									target='_blank'
									rel='noopener noreferrer'
								>
									<Image
										src={builder.picture}
										alt={builder.name}
										width={32}
										height={32}
										className='rounded-full'
									/>
									<span className='text-sm'>
										{builder.name}
									</span>
								</a>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Telemetry</CardTitle>
					<CardDescription>
						Example: requests per minute, load status, etc.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>This area can display charts or other telemetry data.</p>
				</CardContent>
			</Card>
		</div>
	)
}

export default InstanceDetailsPage
