import { getCommands } from './command.js';
import { State } from './state.js';

export function cleanInput(input: string): string[] {
  return input.split(' ').filter((word) => word.length);
}

export async function startREPL(state: State) {
  const { rl } = state;
  rl.prompt();

  rl.on('line', async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const [command, ...args] = words;

    const commands = getCommands();
    if (commands[command]) {
      try {
        await commands[command].callback(state, ...args);
      } catch (error) {
        console.log(`${commands[command].name} command failed.`);
        console.log(`${(error as Error).message}`);
      }
    } else {
      console.log(`Unknown command.`);
    }

    rl.prompt();
  });
}
