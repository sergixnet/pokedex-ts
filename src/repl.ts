import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';
import { getCommands } from './command.js';

export function cleanInput(input: string): string[] {
  return input.split(' ').filter((word) => word.length);
}

export function startREPL() {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const command = words[0];

    const commands = getCommands();
    if (commands[command]) {
      commands[command].callback(commands);
    } else {
      console.log(`Unknown command.`);
    }

    rl.prompt();
  });
}
