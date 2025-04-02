import React from 'react'
import { LoaderIcon } from 'lucide-react'

export default function LoadingSpinner() {
   return (
      <div className="w-full h-full flex items-center justify-center">
         <LoaderIcon className="animate-spin" />
      </div>
   )
}
