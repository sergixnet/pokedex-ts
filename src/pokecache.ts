export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const newEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val,
    };

    this.#cache.set(key, newEntry);
  }

  get<T>(key: string) {
    const entry = this.#cache.get(key);
    if (entry !== undefined) {
      return entry.val as T;
    }
  }

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < now - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
