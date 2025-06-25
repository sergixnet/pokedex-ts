import { startREPL } from './repl.js';
import { initSate } from './state.js';

async function main() {
  const state = initSate();
  await startREPL(state);
}

main();
