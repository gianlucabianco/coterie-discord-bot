import type { Deck, Id, Player } from "./common.types"
import { decks, forbiddenDecks } from "./decks"

export const getRandomId = () => Math.random().toString(36).slice(2)

export const randomizePlayersOrder = (players: string[]): string[] =>
	players
		.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)

const getRandomDeck = (availableDecks: Deck[]): Deck =>
	availableDecks[Math.floor(Math.random() * availableDecks.length)]

/*  
const getRandomDeck = (availableDecks: Id[]): Id =>
  availableDecks[Math.floor(Math.random() * availableDecks.length)];
  */

const getAvailableDecks = (allDecks: Deck[], forbiddenDecks: Deck[], randomDecks: Deck[]): Deck[] => {
	const unavailableDecks = [...forbiddenDecks, ...randomDecks]
	const unavailableDecksIds = unavailableDecks.map(dck => dck.id)
	return allDecks.filter(deck => !unavailableDecksIds.includes(deck.id))
}

const getRandomDecks = (allDecks: Deck[], forbiddenDecks: Deck[], seats: number): Deck[] => {
	return Array(seats)
		.fill("this is an available deck slot")
		.reduce((randomDecks: Deck[]) => {
			const availableDecks = getAvailableDecks(allDecks, forbiddenDecks, randomDecks)

			randomDecks.push(getRandomDeck(availableDecks))

			return randomDecks
		}, [])
}

export const getRandomSeating = (
	players: string[] = ["miro", "paffo", "dani", "gas", "diego"], // TODO: from temporary default value to actual param and controls
	forcedDecks?: Deck[],
	forcedSeatings?: Player[]
) => {
	console.log({ forcedDecks, forcedSeatings, players })

	const randomDecks = getRandomDecks(decks, forbiddenDecks, players.length)

	// TODO: forcedDecks BL
	// TODO: forcedSeating BL
	return randomizePlayersOrder(players).map((player, idx) => {
		return {
			player,
			...randomDecks[idx],
		}
	})
}
