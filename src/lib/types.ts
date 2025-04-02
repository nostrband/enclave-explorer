import { Event } from 'nostr-tools'

export type Profile = {
   event: Event
   name: string
   about: string
   picture: string
}

export type Instance = {
   event: Event
   valid: boolean
   name?: string
   version?: string
   sourceRef?: string
   PCR0: string
   PCR1: string
   PCR2: string
   PCR4?: string
   PCR8?: string
   relays: string[]
   type: string
   expiration?: number
   instance: {
      event?: Event
      PCR4?: string
      launcher?: Profile
   }
   build: {
      event?: Event
      PCR8?: string
      builder?: Profile
   }
}
