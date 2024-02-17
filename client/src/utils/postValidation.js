export const hasOnlySpaces = (string) => string.trim().length === 0;

export const characterLimitReached = (string, limit) => string.length > limit;

export const invalidContentDisablesButton = (string, limit) => hasOnlySpaces(string) || characterLimitReached(string, limit);