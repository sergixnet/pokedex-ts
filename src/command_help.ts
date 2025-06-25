import { State } from './state';

export async function commandHelp(state: State) {
  const { commands } = state;
  const commandMessages = Object.values(commands)
    .map((cmd) => `${cmd.name}: ${cmd.description}`)
    .join('\n');
  const message = `Welcome to the Pokedex!
Usage:

${commandMessages}
`;
  console.log(message);
}
