import InstancesPage from '@/pages/Instances'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Instances() {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<InstancesPage />
		</Suspense>
	)
}
