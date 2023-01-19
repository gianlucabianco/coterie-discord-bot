import { Message } from "../common.types"

const findValidInteractionCommand = () => "ciao, sono un comando"

const replyToInteraction = (message: Message, command: string) => {
	console.log({ message, command })
}

export const handleInteraction = (message: Message) => {
	const command = findValidInteractionCommand()
	if (!!!command) {
		//TODO: show an error message
		return
	}

	replyToInteraction(message, command)
}
