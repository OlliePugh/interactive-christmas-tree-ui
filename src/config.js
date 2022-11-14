export const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

export const treeDimensions = {
  height: 2017,
  width: 939,
};

export const placementCooldown = 60_000;