import { v4 as uuidv4 } from "uuid";

export const randomSlugGenerator = (): string => {
  return uuidv4()
    .replace(/-/g, "") // remove hyphens
    .slice(0, 3) // take first 3 chars
    .toLowerCase();
};

export const randomInviteCodeGenerator = (): string => {
  return uuidv4().replace(/-/g, "").slice(0, 10);
};
