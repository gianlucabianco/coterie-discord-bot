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

const decklists = ({ message, args }: CommonObj) => {
	console.log({ args })
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

// TODO: this could be implemented like this:
// const players = commands.find(command => command.name === "players")?.args ?? getDefaultPlayersBySeats() // TODO: this could be a simple empty string

export const handleCommands = (commands: CommonObj[], message: CommonObj) => {
	const players = getDefaultPlayersBySeats()

	commands.forEach(command => command?.action({ message, args: players }))

	/*
	const drive = commands.find(command => command.name === "drive")
	const drivePM = availableCommands?.find(command => command.name === "dpm")

	const help = commands.find(command => command.name === "help")
	const helpPM = commands.find(command => command.name === "hpm")

	const decklists = commands.find(command => command.name === "decklists")
	const decklistsPM = commands.find(command => command.name === "dlpm")

	drive?.action({ message, args: players })
	drivePM?.action({ message, args: players })

	help?.action({ message, args: players })
	helpPM?.action({ message, args: players })

	decklists?.action({ message, args: players })
	decklistsPM?.action({ message, args: players })
	*/
}

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
		action: args => {
			console.log({ msg: "inside drivepm action!" })
			return args ? drivePM(args) : handleError({ driveArgs: args })
		},
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
