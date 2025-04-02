import React from 'react'
import AppLogo from '@/assets/icons/logo.svg'
import Link from 'next/link'

export default function Header() {
   return (
      <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="container-wrapper flex justify-center">
            <div className="container flex h-14 items-center gap-2 md:gap-4 px-4">
               <div className="flex items-center gap-2.5">
                  <div className="h-[36px] w-[32px]">
                     <Link href={'/'}>
                        <AppLogo />
                     </Link>
                  </div>
                  <h1 className="text-2xl font-bold">Nostr Enclaves</h1>
               </div>
            </div>
         </div>
      </header>
   )
}
