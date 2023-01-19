export type Id = string
export type Order = 1 | 2 | 3 | 4 | 5

export type Author = {
	id: string
	bot: boolean
	username: string
}

export type Channel = { send: (msg: string) => void }

export type Message = {
	author: Author
	content: string
	channel: Channel
	reply: (args: Record<string, any>) => void
}

export type Player = {
	id: Id
	name: string
	seating: Order
	archetype: Archetype
	order: Order
}
// TODO: generate sub archetypes: ex. "wall" | "hardwall"
export type Archetype = "wall" | "politics" | "combat" | "ally" | "bleed" | "combo" | "swarm" | "multimaster"

export type Deck = {
	id: string
	vdbURL: string
	name: string
	archetypes: Archetype[]
}

export type CoterieCommand = {
	name: String
	action: (args?: CommonObj | string[]) => void
}

export type CommonObj = Record<string, any>
