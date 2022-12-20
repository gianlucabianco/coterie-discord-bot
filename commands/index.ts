import type { CommonObj, CoterieCommand } from "../common.types";

const drive = () => {
  console.log({ action: "drive!" });
};

const forcePlayers = (args: CommonObj) => {
  console.log({ ...args });
};

const forceDecks = (args: CommonObj) => {
  console.log({ ...args });
};

const registerGame = (args: CommonObj) => {
  console.log({ ...args });
};

export const commands: CoterieCommand[] = [
  {
    name: "drive",
    action: () => drive(),
  },
  {
    name: "fp",
    action: (args) => args && forcePlayers(args),
  },
  {
    name: "fd",
    action: (args) => args && forceDecks(args),
  },
  {
    name: "register",
    action: (args) => args && registerGame(args), // TODO: needs the game id, should be invoked after the main drive command
  },
];

export const handleCommands = (commands: CommonObj[]) => {
  const drive = commands.find((command) => command.name === "drive");
  const secondaryCommands = commands.filter(
    (command) => command.name !== "drive"
  );

  secondaryCommands.forEach((command) => command.action());

  drive?.action();
};
