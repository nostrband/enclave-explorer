import React, { FC } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { instances } from '../Instances/const'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { format } from 'date-fns'

type Props = {
	id: string
}

const InstanceDetailsPage: FC<Props> = ({ id }) => {
	const currentInstance = instances.find((i) => i.id === id)

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

	const createdAt = format(
		currentInstance.build.createdAt,
		'yyyy/MM/dd, hh:mm:ss a',
	)

	return (
		<div className='container mx-auto px-4 py-6 flex flex-col gap-6'>
			<Card>
				<CardHeader>
					<CardTitle className='text-xl'>
						Instance: {currentInstance.name}
					</CardTitle>
					<CardDescription>
						<div className='flex flex-col gap-2'>
							<p>ID: {currentInstance.id}</p>
							<Badge variant={'outline'}>
								Version: {currentInstance.version}
							</Badge>
						</div>
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className='flex items-center gap-2'>
						{currentInstance.owner.avatarUrl && (
							<Image
								src={currentInstance.owner.avatarUrl}
								alt={currentInstance.owner.name}
								width={32}
								height={32}
								className='rounded-full'
							/>
						)}
						<span className='text-sm text-gray-700'>
							Owner: {currentInstance.owner.name}
						</span>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Build</CardTitle>
					<CardDescription>
						Details about the enclave build
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Commit hash: {currentInstance.build.commitHash}</p>
					<p>Created at: {createdAt}</p>
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
