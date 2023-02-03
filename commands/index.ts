import type { CommonObj, CoterieCommand, Archetype } from "../common.types"
import { decks } from "../decks"
import { getDefaultPlayersBySeats, getRandomSeating } from "../utils"

// TODO: type missing typing for every func

const getSeatingMessage = (args: string[]) =>
	getRandomSeating(args).map((seat, idx) => {
		return `
		Player ${idx + 1}: ${seat.player}
		deck: ${seat.name}
		vdbURL: ${seat.vdbURL}
	`
	})

const drive = ({ message, args }: CommonObj) =>
	message.channel.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)

const drivePM = ({ message, args }: CommonObj) => {
	console.log({ author: message.author })
	return message.author.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)
}

// TODO: this should be implemented for every "pm" command
const replyWithPM = ({ message, args }: CommonObj) =>
	message.author.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)

const archetypes: Archetype[] = ["wall", "politics", "combat", "ally", "bleed", "combo", "swarm", "multimaster", "star"]

const getDecklistsByArchetype = (): CommonObj[][] => {
	const decksByArchetype = archetypes.map((type: Archetype) =>
		decks.reduce((acc, curr) => {
			curr.archetypes.includes(type) && acc.push(curr)
			return acc
		}, [] as CommonObj[])
	)

	return decksByArchetype
}

const decklists = ({ message, args }: CommonObj) => {
	getDecklistsByArchetype().forEach(element => {
		console.log({ element })
	})
	// console.log({ TODO: "this should be splitted, or should be printed by archetypes" })
	// message.author.send(`
	// 	Ciao, queste sono tutte le liste disponibili:
	// 	${decks
	// 		.map(({ name, vdbURL, archetypes }) => {
	// 			return `
	// 	Deck name: ${name}
	// 	vdbURL: ${vdbURL}
	// 	archetypes: ${archetypes}
	// `
	// 		})
	// 		.join("\n")}
	// `)
}

const decklistsPM = ({ message, args }: CommonObj) => {
	console.log({ args })
}

const getHelp = ({ message, args }: CommonObj) => {
	console.log({ args })
}

const getHelpPM = ({ message, args }: CommonObj) => {
	console.log({ args })
}

const handleError = (e: CommonObj) => {
	return console.error(e)
}
// TODO: pass getDefaultPlayersBySeats if "drive" | "dpm" commands only
export const handleCommands = (commands: CommonObj[], message: CommonObj, args?: string[]) =>
	commands.forEach(command => command?.action({ message, args: getDefaultPlayersBySeats(args?.length) }))

/*
TODO: maybe error handling should be placed inside every func
*/

export const availableCommands: CoterieCommand[] = [
	{
		name: "drive",
		action: args => (args ? drive(args) : handleError({ driveArgs: args })),
	},
	{
		name: "help",
		action: args => (args ? getHelp(args) : handleError({ playersArgs: args })),
	},
	{
		name: "decklists",
		action: args => (args ? decklists(args) : handleError({ playersArgs: args })),
	},
	{
		name: "dpm",
		action: args => (args ? drivePM(args) : handleError({ driveArgs: args })),
	},
	{
		name: "hpm",
		action: args => (args ? getHelpPM(args) : handleError({ playersArgs: args })),
	},
	{
		name: "dlpm",
		action: args => (args ? decklistsPM(args) : handleError({ playersArgs: args })),
	},
]
