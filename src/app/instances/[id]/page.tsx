import React from 'react'
import InstanceDetailsPage from '@/pages/InstanceDetails'

type PageProps = {
	params: Promise<{ id: string }>
}

export default async function InstanceDetails({ params }: PageProps) {
	const { id = '' } = await params
	return <InstanceDetailsPage id={id} />
}
