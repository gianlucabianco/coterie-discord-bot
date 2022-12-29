import type { Deck, Id, Player } from "./common.types"
import { decks, forbiddenDecks } from "./decks"

export const getRandomId = () => Math.random().toString(36).slice(2)

export const getRandomOrder = (players: string[]) => {
	const randomOrder: number[] = []
	while (randomOrder.length < players.length) {
		const rand = Math.floor(Math.random() * players.length)
		!randomOrder.includes(rand) && randomOrder.push(rand)
	}
	return randomOrder
}

export const randomizePlayersOrder = (players: string[]): string[] =>
	getRandomOrder(players).map(order => players[order])

const getRandomDeck = (availableDecks: Deck[]): Deck =>
	availableDecks[Math.floor(Math.random() * availableDecks.length)]

export const getDefaultPlayersBySeats = (players = 5) =>
	Array(players)
		.fill("this is an available deck slot")
		.map((_, idx) => `Player ${idx + 1}`)

const getAvailableDecks = (allDecks: Deck[], forbiddenDecks: Deck[], preselectedDecks: Deck[]): Deck[] => {
	const unavailableDecks = [...forbiddenDecks, ...preselectedDecks]

	return allDecks.reduce((decks, deck) => {
		const bannedDeckIndex = unavailableDecks.findIndex(dck => dck.id === deck.id)
		bannedDeckIndex === -1 ? decks.push(deck) : unavailableDecks.splice(bannedDeckIndex, 1)
		return decks
	}, [] as Deck[])
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

export const getRandomSeating = (players: string[], forcedDecks?: Deck[], forcedSeatings?: Player[]) => {
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
