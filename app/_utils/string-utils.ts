export const toCapitalCase = (text: string) =>
  text[0].toUpperCase().concat(text.slice(1));

export const truncateLong = (input: string) =>
  input?.length > 50 ? `${input.substring(0, 45)}...` : input;

export const truncateShort = (input: string) =>
  input?.length > 35 ? `${input.substring(0, 30)}...` : input;
