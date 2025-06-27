import { startREPL } from './repl.js';
import { initSate } from './state.js';

async function main() {
  const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
  const state = initSate(FIVE_MINUTES_IN_MS);
  await startREPL(state);
}

main();
