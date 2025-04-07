import { Navigate, Route, Routes } from 'react-router-dom'
import InstanceDetailsPage from '@/pages/InstanceDetails'
import InstancesPage from '@/pages/Instances'
import { AppLayout } from '@/layout/AppLayout'

export default function AppRoutes() {
   return (
      <Routes>
         <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to={'/instances'} />} />
            <Route path="instances" element={<InstancesPage />} />
            <Route path="instances/:id" element={<InstanceDetailsPage />} />
         </Route>
      </Routes>
   )
}
