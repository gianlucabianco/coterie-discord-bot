import { separator, prefix } from "./../commands/commands.config";
import { commands, handleCommands } from "../commands";
import type { CommonObj } from "../common.types";

const getRawMessages = (message: CommonObj): string[] => {
  const prefixPurgedMessage = message.content.slice(1);
  return prefixPurgedMessage.toLowerCase().split(separator);
};

const getUniqueMessages = (messages: string[]): string[] => [
  ...new Set(messages),
];

const getValidAndInvalidCommands = (messages: string[]) =>
  messages.reduce(
    (accumulator, currMessage) => {
      const command = commands.find(
        (cmd: CommonObj) => cmd.name === currMessage
      );

      if (!command) {
        currMessage && accumulator.invalidCommands.push(currMessage);
        return accumulator;
      }

      accumulator.validCommands.push(command);

      return accumulator;
    },
    {
      validCommands: [] as CommonObj[],
      invalidCommands: [] as string[],
    }
  );

export const handleMessage = (message: CommonObj) => {
  if (!message.content.startsWith(prefix)) return;

  const rawMessages = getRawMessages(message);

  const uniqueMessages = getUniqueMessages(rawMessages);

  const { validCommands, invalidCommands } =
    getValidAndInvalidCommands(uniqueMessages);

  if (invalidCommands.length) {
    return message.channel.send(
      `These are not valid Coterie commands: ${invalidCommands}. Please remove invalid commands and type valid commands.`
    );
  }

  handleCommands(validCommands);
};
