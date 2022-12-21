import type { CommonObj, CoterieCommand } from "../common.types"

const drive = () => {
	console.log({ action: "drive!" })
}

const forcePlayers = (args: CommonObj) => {
	console.log({ ...args })
}

const forceDecks = (args: CommonObj) => {
	console.log({ ...args })
}

const registerGame = (args: CommonObj) => {
	console.log({ ...args })
}

export const commands: CoterieCommand[] = [
	{
		name: "drive",
		action: () => drive(),
	},
	{
		name: "player", // FORCE PLAYER(S) // TODO: chose meaningful/useful names // TODO: commands could come from parsing and should be used as args and could be chainable
		action: (args) => args && forcePlayers(args),
	},
	{
		name: "deck", // FORCE DECK(S)
		action: (args) => args && forceDecks(args),
	},
	{
		name: "archetype", // FORCE ARCHETYPE(S)
		action: (args) => args && forceDecks(args),
	},
	{
		name: "seating", // FORCE SEATING(S)
		action: (args) => args && forceDecks(args),
	},
	{
		name: "predator", // FORCE PREDATOR
		action: (args) => args && forceDecks(args),
	},
	{
		name: "prey", // FORCE PREY
		action: (args) => args && forceDecks(args),
	},
	{
		name: "register",
		action: (args) => args && registerGame(args), // TODO: needs the game id, should be invoked after the main drive command
	},
]

export const handleCommands = (commands: CommonObj[]) => {
	const drive = commands.find((command) => command.name === "drive")
	const secondaryCommands = commands.filter((command) => command.name !== "drive")

	console.log({ secondaryCommands })

	secondaryCommands.forEach((command) => command.action())

	drive?.action()
}
