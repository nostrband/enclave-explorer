import { Event, nip19 } from 'nostr-tools'

export const getNpubLink = (event: Event) => {
	const npub = nip19.npubEncode(event.pubkey)
	return `https://njump.me/${npub}`
}

export const getNeventLink = (event: Event) => {
	const nevent = nip19.neventEncode({
		id: event.id,
		relays: ['wss://relay.nostr.band/all'],
	})
	return `https://njump.me/${nevent}`
}
