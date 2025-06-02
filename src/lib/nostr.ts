import { Instance } from '@/lib/types'
import { Event, Relay } from 'nostr-tools'
import { Validator } from 'nostr-enclaves'
import { hexToBytes } from '@noble/hashes/utils'

const relay = new Relay('wss://relay.nostr.band/all')

function now() {
   return Math.floor(Date.now() / 1000)
}

export function tv(e: Event, name: string) {
   return e.tags.find((t) => t.length > 1 && t[0] === name)?.[1]
}

export function tvl(e: Event, name: string, label: string) {
   return e.tags.find((t) => t.length > 2 && t[0] === name && t[2] === label)?.[1]
}

async function parseInstanceEvent(e: Event) {
   let valid = false
   try {
      await new Validator().validateInstance(e)
      valid = true
   } catch {}

   try {
      const prod = e.tags.find((t) => t.length > 1 && t[0] === 't' && t[1] === 'prod')
      const dev = e.tags.find((t) => t.length > 1 && t[0] === 't' && t[1] === 'dev')
      const debug = !hexToBytes(tvl(e, 'x', 'PCR0')!).find((c) => c !== 0)
      const type = debug ? 'debug' : prod && !dev ? 'prod' : 'dev'
      const open = !!e.tags.find((t) => t.length > 1 && t[0] === 'o' && t[1] === 'true')

      const i: Instance = {
         valid,
         event: e,
         open,
         name: tv(e, 'name'),
         version: tv(e, 'v'),
         sourceRef: tv(e, 'r'),
         PCR0: tvl(e, 'x', 'PCR0') || '',
         PCR1: tvl(e, 'x', 'PCR1') || '',
         PCR2: tvl(e, 'x', 'PCR2') || '',
         PCR4: tvl(e, 'x', 'PCR4'),
         PCR8: tvl(e, 'x', 'PCR8'),
         type,
         relays: e.tags.filter((t) => t.length > 1 && t[0] === 'relay').map((t) => t[1]),
         expiration: Number(tv(e, 'expiration') || '0'),
         instance: {
            event: JSON.parse(tv(e, 'instance') || 'null'),
         },
         build: {
            event: JSON.parse(tv(e, 'build') || 'null'),
         },
      }

      if (i.instance.event) i.instance.PCR4 = tv(i.instance.event, 'PCR4')
      if (i.build.event) i.build.PCR8 = tv(i.build.event, 'PCR8')

      return i
   } catch (err) {
      console.log('bad instance', err, e)
   }
}

async function fetchProfiles(pubkeys: string[]) {
   if (!relay.connected) await relay.connect()

   const events = new Map<string, Event>()
   await new Promise<void>((ok) => {
      const sub = relay.subscribe(
         [
            {
               kinds: [0],
               authors: pubkeys,
            },
         ],
         {
            oneose() {
               sub.close()
               ok()
            },
            onevent(e) {
               const old = events.get(e.pubkey)
               if (old && old.created_at > e.created_at) return
               events.set(e.pubkey, e)
            },
            eoseTimeout: 5000,
         }
      )
   })

   return [...events.values()]
      .map((e) => {
         try {
            const p = JSON.parse(e.content)
            p.event = e
            return p
         } catch {}
      })
      .filter((p) => !!p)
}

export async function fetchInstances() {
   if (!relay.connected) await relay.connect()

   const events = new Map<string, Event>()
   await new Promise<void>((ok) => {
      const sub = relay.subscribe(
         [
            {
               kinds: [63793],
               since: now() - 3 * 3600,
            },
         ],
         {
            oneose() {
               sub.close()
               ok()
            },
            onevent(e) {
               const old = events.get(e.pubkey)
               if (old && old.created_at > e.created_at) return
               events.set(e.pubkey, e)
            },
            eoseTimeout: 5000,
         }
      )
   })

   const ins: Instance[] = []
   for (const e of events.values()) {
      const i = await parseInstanceEvent(e)
      if (i) ins.push(i)
   }

   const pubkeys = new Set<string>()
   for (const i of ins) {
      if (i.build.event) pubkeys.add(i.build.event.pubkey)
      if (i.instance.event) pubkeys.add(i.instance.event.pubkey)
   }

   if (pubkeys.size) {
      const profiles = await fetchProfiles([...pubkeys])
      for (const i of ins) {
         if (i.build.event) i.build.builder = profiles.find((p) => p.event.pubkey === i.build.event?.pubkey)
         if (i.instance.event) i.instance.launcher = profiles.find((p) => p.event.pubkey === i.instance.event?.pubkey)
      }
   }

   console.log('ins', ins)
   return ins
}
