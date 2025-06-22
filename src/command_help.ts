import { CLICommand } from './command';

export function commandHelp(commands: Record<string, CLICommand>) {
  const commandMessages = Object.values(commands)
    .map((cmd) => `${cmd.name}: ${cmd.description}`)
    .join('\n');
  const message = `Welcome to the Pokedex!
Usage:

${commandMessages}
`;
  console.log(message);
}
