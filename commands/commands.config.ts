export const mainCommand = "!drive"
export const prefix = "!"
export const separator = " "
export const argsIdentifier = ":"
export const argsSeparator = "-"

/*
TODO: !modal is a temp command, for test purpose only
*/
export const startingCommands = ["!help", "!decklists", "!drive", "!pm", "!modal"]

/*
QUERY EXAMPLE:
!drive: miro(arch-wall prey-3 predator-ale) gas(arch-ccci prey-1) ale chiara
!drive => main command
: => main command / args separator
() => wraps args subcommands
sub sub commands => command-args
*/
