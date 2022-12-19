const drive = () => {
  console.log({ action: "drive!" });
};

const forcePlayers = (args: Record<string, any>) => {
  console.log({ ...args });
};

const forceDecks = (args: Record<string, any>) => {
  console.log({ ...args });
};

const registerGame = (args: Record<string, any>) => {
  console.log({ ...args });
};

type CoterieCommand = {
  name: String;
  action: (args?: Record<string, any>) => void;
};

const commands: CoterieCommand[] = [
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

export default commands;
