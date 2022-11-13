export const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

export const placementCooldown = 60_000;
