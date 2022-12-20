import type { Deck, Id, Player } from "./common.types";
import { decks, forbiddenDecks } from "./decks";

export const getRandomId = () => Math.random().toString(36).slice(2);

const getRandomDeck = (availableDecks: Id[]): Id =>
  availableDecks[Math.floor(Math.random() * availableDecks.length)];

const getAvailableDecks = (
  allDecks: Id[],
  forbiddenDecks: Id[],
  randomDecks: Id[]
): Id[] =>
  allDecks.filter((id) => ![...forbiddenDecks, ...randomDecks].includes(id));

const getRandomDecks = (
  allDecks: Id[],
  forbiddenDecks: Id[],
  seats: number
): Id[] => {
  return Array(seats)
    .fill("")
    .reduce((randomDecks: Id[]) => {
      const availableDecks = getAvailableDecks(
        allDecks,
        forbiddenDecks,
        randomDecks
      );

      randomDecks.push(getRandomDeck(availableDecks));

      return randomDecks;
    }, []);
};

export const getRandomSeating = (
  players: string[] = ["miro", "paffo", "dani", "gas", "diego"], // FIXME: from temporary default value to actual param and controls
  forcedDecks?: string[],
  forcedSeatings?: string[]
) => {
  console.log({ forcedDecks, forcedSeatings, players });
  const decksIds = decks.map((deck) => deck.id);
  const forbiddenDecksIds = forbiddenDecks.map((deck) => deck.id);

  const randomDecks = getRandomDecks(
    decksIds,
    forbiddenDecksIds,
    players.length
  );

  // TODO: forcedDecks BL
  // TODO: forcedSeating BL
  // TODO: return statement BL performance improvement
  return players.map((player, idx) => {
    return {
      player,
      vdbUrl: decks.find((deck) => deck.id === randomDecks[idx]), //TODO: to improve performance, randomDecks should keep track of the deck complete data, to avoid a find in this map loop
    };
  });
};

/*
TODO: refactor this to enriched decks
export const getRandomSeating = (
  players: string[] = ["miro", "paffo", "dani", "gas", "diego"], FIXME: from temporary default value to actual param and controls
  forcedDecks?: Deck[],
  forcedSeatings?: Player[]
) => {
  console.log({ forcedDecks, forcedSeatings, players });
  const decksIds = decks.map((deck) => deck.id);
  const forbiddenDecksIds = forbiddenDecks.map((deck) => deck.id);

  const randomDecks = getRandomDecks(
    decksIds,
    forbiddenDecksIds,
    players.length
  );

  // TODO: forcedDecks BL
  // TODO: forcedSeating BL
  // TODO: return statement BL performance improvement
  return players.map((player, idx) => {
    return {
      player,
      vdbUrl: decks.find((deck) => deck.id === randomDecks[idx]), //TODO: to improve performance, randomDecks should keep track of the deck complete data, to avoid a find in this map loop
    };
  });
};
*/
