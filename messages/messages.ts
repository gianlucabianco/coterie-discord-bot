import { separator, prefix } from "./../commands/commands.config";
import commands from "../commands";

const getRawMessages = (message: Record<string, any>): string[] => {
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
        (cmd: Record<string, any>) => cmd.name === currMessage
      );

      if (!command) {
        currMessage && accumulator.invalidCommands.push(currMessage);
        return accumulator;
      }

      accumulator.validCommands.push(command);

      return accumulator;
    },
    {
      validCommands: [] as Record<string, any>[],
      invalidCommands: [] as string[],
    }
  );

export const handleMessage = (message: Record<string, any>) => {
  if (!message.content.startsWith(prefix)) return;

  const rawMessages = getRawMessages(message);

  const uniqueMessages = getUniqueMessages(rawMessages);

  const { validCommands, invalidCommands } =
    getValidAndInvalidCommands(uniqueMessages);

  if (invalidCommands.length) {
    return message.channel.send(
      `These are not valid Coterie commands: ${invalidCommands}. Please remove invalid commands and retype valid command`
    );
  }

  validCommands.forEach((command) => command.action());
};
