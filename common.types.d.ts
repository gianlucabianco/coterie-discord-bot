export type Id = string
export type Order = 1 | 2 | 3 | 4 | 5

export type Player = {
	id: Id
	name: string
	seating: Order
	archetype: Archetype
	order: Order
}

export type Archetype = "wall" | "politics" | "combat" | "ally" | "bleed" | "combo"

export type Deck = {
	id: string
	vdbURL: string
	name: string
	archetypes: Archetype[]
}

export type CoterieCommand = {
	name: String
	action: (args?: CommonObj) => void
}

export type CommonObj = Record<string, any>
