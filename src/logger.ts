export const createLogger = (prefix: string = "") => ({
  info: (...args: any[]) => console.log("[Glassify]", prefix, ...args),
  debug: (...args: any[]) => console.debug("[Glassify]", prefix, ...args),
  warn: (...args: any[]) => console.trace("[Glassify]", prefix, ...args),
  trace: (...args: any[]) => console.trace("[Glassify]", prefix, ...args),
  error: (...args: any[]) => console.error("[Glassify]", prefix, ...args),
});

export const logger = createLogger();
