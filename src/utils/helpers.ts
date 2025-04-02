import { Event, nip19 } from 'nostr-tools'

export const getNpubLink = (pubkey: string) => {
   const npub = nip19.npubEncode(pubkey)
   return `https://njump.me/${npub}`
}

export const getNeventLink = (id: string) => {
   const nevent = nip19.neventEncode({
      id,
      relays: ['wss://relay.nostr.band/all'],
   })
   return `https://njump.me/${nevent}`
}
