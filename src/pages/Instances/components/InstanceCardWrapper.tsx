'use client'

import React, { FC, PropsWithChildren } from 'react'
import { useRouter } from 'next/navigation'

type Props = PropsWithChildren & {
	instanceId: string
}

const InstanceCardWrapper: FC<Props> = ({ instanceId, children }) => {
	const router = useRouter()

	const handleInstanceClick = () => {
		router.push('/instances/' + instanceId)
	}

	return (
		<div
			className='p-4 border rounded-xl hover:bg-gray-100 flex flex-col gap-4 cursor-pointer'
			onClick={handleInstanceClick}
		>
			{children}
		</div>
	)
}

export default InstanceCardWrapper
