import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function NotFoundPage() {
	return (
		<div className='h-full w-full grid place-items-center'>
			<div className='flex flex-col gap-2.5 items-center'>
				<span className='text-2xl'>No page found</span>
				<Button>
					<Link href={'/instances'}>Return to home</Link>
				</Button>
			</div>
		</div>
	)
}
