import React, { FC } from 'react'
import { Instance } from '../types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type Props = {
	instance: Instance
}

const InstanceCard: FC<Props> = ({ instance }) => {
	return (
		<div className='p-4 border rounded-xl hover:bg-gray-100 flex gap-3.5 items-center'>
			<div className='flex flex-col gap-2 items-center flex-1/12'>
				<Avatar className='h-12 w-12 rounded-lg grayscale'>
					<AvatarImage
						src={instance.owner.avatarUrl}
						alt={instance.owner.name}
					/>
					<AvatarFallback className='rounded-lg'>
						{instance.owner.name.substring(0, 1)}
					</AvatarFallback>
				</Avatar>
				<p className='font-medium text-center'>{instance.owner.name}</p>
			</div>

			<div className='flex flex-col gap-1 flex-11/12'>
				<h3 className='text-lg font-bold'>{instance.name}</h3>
				<p className='text-muted-foreground text-sm'>
					ID: {instance.id}
				</p>
				<Badge variant={'outline'}>Version: {instance.version}</Badge>
			</div>
		</div>
	)
}

export default InstanceCard
