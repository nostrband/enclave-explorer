import { FC } from 'react'
import { Instance } from '../../../lib/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getNeventLink, getNpubLink } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'
import { nip19 } from 'nostr-tools'

type Props = Instance

const InstanceCard: FC<Props> = ({ instance, event, name, version, build }) => {
   const navigate = useNavigate()
   const { launcher, event: launchEvent } = instance || {}
   const { builder, event: buildEvent } = build || {}

   const handleInstanceClick = () => {
      navigate('/instances/' + nip19.npubEncode(event.pubkey))
   }

   return (
      <div
         className="p-4 border rounded-xl hover:bg-gray-100 flex flex-col gap-4 cursor-pointer"
         onClick={handleInstanceClick}
      >
         <div className="flex flex-col gap-1 flex-11/12">
            <div className="flex gap-2 items-center">
               <h3 className="text-lg font-bold">{name}</h3>
               <Badge variant={'outline'}>Version: {version}</Badge>
            </div>

            <p className="text-muted-foreground text-sm break-words">
               PUBKEY:{' '}
               <a
                  href={getNeventLink(event.id)}
                  className="inline-block hover:underline hover:text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  {event.pubkey}
               </a>
            </p>
         </div>

         <div className="flex flex-wrap gap-6">
            {builder && buildEvent && (
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase">Build by:</span>
                  <a
                     href={getNpubLink(buildEvent.pubkey)}
                     className="flex items-center gap-2 text-gray-700 hover:underline hover:text-blue-500"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Avatar>
                        <AvatarImage src={builder.picture} alt={builder.name} />
                        <AvatarFallback className="rounded-lg">{builder.name?.substring(0, 2)}</AvatarFallback>
                     </Avatar>
                     <span>{builder.name}</span>
                  </a>
               </div>
            )}
            <Separator orientation="vertical" className="!h-[inherit]" />
            {launcher && launchEvent && (
               <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold uppercase">Launched by:</span>
                  <a
                     href={getNpubLink(launchEvent.pubkey)}
                     className="flex items-center gap-2 text-gray-700 hover:underline hover:text-blue-500"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     <Avatar>
                        <AvatarImage src={launcher.picture} alt={launcher.name} />
                        <AvatarFallback className="rounded-lg">{launcher.name?.substring(0, 2)}</AvatarFallback>
                     </Avatar>
                     <span>{launcher.name}</span>
                  </a>
               </div>
            )}
         </div>
      </div>
   )
}

export default InstanceCard
