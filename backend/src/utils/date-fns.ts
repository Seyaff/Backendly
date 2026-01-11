import { add, addMinutes } from "date-fns";

export const calculateExpirationDate = (
  expiresIn: string = "15m"
): Date => {
  const match = expiresIn.match(/^(\d+)([mhd])$/);

  if (!match) {
    throw new Error('Invalid format. Use "15m", "1h", or "30d".');
  }

  const [, value, unit] = match;
  const amount = parseInt(value, 10);

  switch (unit) {
    case "m":
      return add(new Date(), { minutes: amount });
    case "h":
      return add(new Date(), { hours: amount });
    case "d":
      return add(new Date(), { days: amount });
    default:
      throw new Error("Invalid expiration unit");
  }
};

export const fortyFiveMinutesFromNow = (minutes: number): Date => {
  return addMinutes(new Date(), minutes);
};
