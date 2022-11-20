export const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

export const treeDimensions = {
  width: 1280,
  height: 720,
};

export const lightAdjustment = {
  x: {
    scalar: 1,
    offset: 1,
  },
  y: {
    scalar: 1,
    offset: 1,
  },
};
export const placementCooldown = 60_000;
