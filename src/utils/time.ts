export const sleep = (seconds = 1) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
