import type { CommonObj, CoterieCommand } from "../common.types"
import { getDefaultPlayersBySeats, getRandomSeating } from "../utils"

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

const replyWithPM = ({ message, args }: CommonObj) =>
	message.author.send(`
		Ciao, questo è il seating:
		${getSeatingMessage(args).join("\n")}
	`)

// TODO: implement this
// const decklists = () => {}

// TODO: implement this
// const getHelp = () => {}

const handleError = (e: CommonObj) => {
	return console.error(e)
}

const setPlayers = (args: string[]) => args

export const handleCommands = (commands: CommonObj[], message: CommonObj) => {
	const players = commands.find(command => command.name === "players")?.args ?? getDefaultPlayersBySeats() // TODO: this could be a simple empty string
	const drive = commands.find(command => command.name === "drive")

	const pm = commands.find(command => command.name === "pm")

	pm && pm.action({ message, args: players })

	!pm && drive && drive.action({ message, args: players })
}

export const availableCommands: CoterieCommand[] = [
	{
		name: "drive",
		action: args => (args ? drive(args) : handleError({ driveArgs: args })),
	},
	{
		name: "players",
		action: args => (args ? setPlayers(args as string[]) : handleError({ playersArgs: args })),
	},
	{
		name: "pm",
		action: args => replyWithPM(args as string[]),
	},
	// {
	// 	name: "help",
	// 	action: args => (args ? getHelp(args as string[]) : handleError({ playersArgs: args })),
	// },
	// {
	// 	name: "decklists",
	// 	action: args => (args ? decklists(args as string[]) : handleError({ playersArgs: args })),
	// },
	/*
	TODO: commands ideas
	{
		name: "player", // FORCE PLAYER(S) // TODO: chose meaningful/useful names // TODO: commands could come from parsing and should be used as args and could be chainable
		action: args => args && forcePlayers(args),
	},
	{
		name: "deck", // FORCE DECK(S)
		action: args => args && forceDecks(args),
	},
	{
		name: "archetype", // FORCE ARCHETYPE(S)
		action: args => args && forceDecks(args),
	},
	{
		name: "seating", // FORCE SEATING(S)
		action: args => args && forceDecks(args),
	},
	{
		name: "predator", // FORCE PREDATOR
		action: args => args && forceDecks(args),
	},
	{
		name: "prey", // FORCE PREY
		action: args => args && forceDecks(args),
	},
	{
		name: "register",
		action: args => args && registerGame(args), // TODO: needs the game id, should be invoked after the main drive command
	},
	*/
]

/*
TODO: every command execution abstraction draft implementation 
export const handleCommands = (commands: CommonObj[], message: CommonObj) => {
	const sortedCommands = commands
		.reduce(
			(sortedCommands, command) => {
				command.name === "drive" ? sortedCommands[1].push(command) : sortedCommands[0].push(command)
				return sortedCommands
			},
			[[], []]
		)
		.flat()

	sortedCommands.forEach((command: CommonObj) => command.action({ message, args: command.args }))
}

*/
