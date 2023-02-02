import { argsIdentifier, prefix, startingCommands } from "./../commands/commands.config"
import { availableCommands, handleCommands } from "../commands"
import type { CommonObj, Message } from "../common.types"

const purgeWhiteSpaces = (str: string) => str.replace(/ /g, "")
// TODO: type getCommands return value => from CommonObj to CustomType
const getCommands = (message: CommonObj): CommonObj[] => {
	return (message.content as string)
		.toLowerCase()
		.split(prefix)
		.reduce((commands, rawCommand) => {
			if (rawCommand) {
				const [rawName, rawArgs] = rawCommand.split(argsIdentifier).filter(argsChain => argsChain)

				const name = rawName && purgeWhiteSpaces(rawName)
				const args = rawArgs && rawArgs.split(" ").filter(arg => arg)

				const command: CommonObj = {}

				if (!name) return commands

				name && (command["name"] = name)
				args && (command["args"] = args)

				commands.push(command)
			}
			return commands
		}, [] as CommonObj[])
}

const getUniqueCommands = (commands: CommonObj[]): CommonObj[] => {
	const uniqueCommandsNames: CommonObj[] = [...new Set(commands.map(command => command.name))]

	return uniqueCommandsNames.reduce((acc: CommonObj[], commandName) => {
		const targetCommand = commands.find(commands => commands.name === commandName)
		targetCommand && acc.push(targetCommand)
		return acc
	}, [])
}

const getValidAndInvalidCommands = (commands: CommonObj[]) =>
	commands.reduce(
		(validAndInvalidCommands, currCommand) => {
			const availableCommand = availableCommands.find((availableCommand: CommonObj) =>
				currCommand.name.startsWith(availableCommand.name)
			)

			!availableCommand
				? validAndInvalidCommands.invalidCommands.push(currCommand)
				: validAndInvalidCommands.validCommands.push({
						...availableCommand,
						...currCommand,
				  })

			return validAndInvalidCommands
		},
		{
			validCommands: [] as CommonObj[],
			invalidCommands: [] as string[],
		}
	)

const checkIfStartingCommand = ({ content }: { content: string }) =>
	startingCommands.some(startingCommand => content.startsWith(startingCommand))

const hasPairedCommand = (allCommands: CommonObj, [mainCommand, secondaryCommand]: string[]) =>
	allCommands.filter((command: CommonObj) => command.name === mainCommand || command.name === secondaryCommand)
		.length > 1

const pairedCommands: Record<string, [string, string]> = {
	drive: ["drive", "dpm"],
	help: ["help", "hpm"],
	decklists: ["decklists", "dlpm"],
}

const purgedCommands = (validCommands: CommonObj) => {
	return validCommands.filter((command: CommonObj) => {
		const targetCommands: [string, string] = pairedCommands[command.name]
		if (!targetCommands) return command

		const [main, secondary] = targetCommands

		const isPaired = hasPairedCommand(validCommands, [main, secondary])

		if (isPaired && command.name === main) return command
	})
	// validCommands.reduce((commands: CommonObj[], command: CommonObj) => {
	// 	const hasDriveAndPm = hasPairedCommand(validCommands, ["drive", "dpm"])
	// 	const hasHelpAndPm = hasPairedCommand(validCommands, ["help", "hpm"])
	// 	const hasDecklistsAndPm = hasPairedCommand(validCommands, ["decklists", "dlpm"])

	// 	// TODO: abstract the following (using a map?)
	// 	const shouldPurgeDrivePm = hasDriveAndPm && command.name !== "dpm"
	// 	const shouldPurgeHelpPm = hasHelpAndPm && command.name !== "hpm"
	// 	const shouldPurgeDeckListsPm = hasDecklistsAndPm && command.name !== "dlpm"

	// 	const shouldPurgeCommand = shouldPurgeDrivePm || shouldPurgeDeckListsPm || shouldPurgeHelpPm

	// 	!shouldPurgeCommand && commands.push(command)
	// 	return commands
	// }, [])
}

const handlePms = (validCommands: CommonObj) => {
	// TODO: check if there are pms corresponding to the main command.
	// if there are both, pass to the main command the boolean pm? and strip away the single pm command
	// TODO: bl here
}

export const handleMessage = (message: Message) => {
	if (message.author.bot) return

	if (!checkIfStartingCommand(message)) return

	const commands = getCommands(message)

	const uniqueCommands = getUniqueCommands(commands)

	const { validCommands, invalidCommands } = getValidAndInvalidCommands(uniqueCommands)

	if (invalidCommands.length) {
		return message.channel.send(
			`These are not valid Coterie commands: ${invalidCommands.map(
				(command: CommonObj): string => command.name
			)}. Please remove invalid commands and type valid commands.`
		)
	}

	// TODO: handlePms()

	// const players = getDefaultPlayersBySeats(selectedPlayers)
	handleCommands(validCommands, message)
}
