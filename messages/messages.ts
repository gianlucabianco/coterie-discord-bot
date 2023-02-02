import { argsIdentifier, prefix, mainCommand, startingCommands } from "./../commands/commands.config"
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

	// TODO: handle seating message before invoking handle commands

	handleCommands(validCommands, message)
}
