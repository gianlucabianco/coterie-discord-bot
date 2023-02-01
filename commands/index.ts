import type { CommonObj, CoterieCommand } from "../common.types"
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

const drivePM = ({ message, args }: CommonObj) =>
	message.author.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)

// TODO: this should be implemented for every "pm" command
const replyWithPM = ({ message, args }: CommonObj) =>
	message.author.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)

const decklists = args => {
	console.log({ args })
}

const decklistsPM = args => {
	console.log({ args })
}

const getHelp = args => {
	console.log({ args })
}

const getHelpPM = args => {
	console.log({ args })
}

const handleError = (e: CommonObj) => {
	return console.error(e)
}

export const handleCommands = (commands: CommonObj[], message: CommonObj) => {
	// TODO: add missing command BL / remove unused command BL
	const players = commands.find(command => command.name === "players")?.args ?? getDefaultPlayersBySeats() // TODO: this could be a simple empty string
	const drive = commands.find(command => command.name === "drive")

	const pm = commands.find(command => command.name === "pm")

	const modal = commands.find(command => command.name === "modal")

	modal && modal.action({ message, args: players })

	pm && pm.action({ message, args: players })

	!pm && drive && drive.action({ message, args: players })
}

/*
TODO: implement the following:
const startingCommands = ["!help", "!decklists", "!drive", "!helppm", "!decklistspm", "!drivepm"]
*/

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
		name: "drivepm",
		action: args => (args ? drivePM(args) : handleError({ driveArgs: args })),
	},
	{
		name: "helppm",
		action: args => (args ? getHelpPM(args) : handleError({ playersArgs: args })),
	},
	{
		name: "decklistspm",
		action: args => (args ? decklistsPM(args) : handleError({ playersArgs: args })),
	},
]
