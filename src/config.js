export const production = !(
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
);

export const treeDimensions = {
  width: 720,
  height: 1280,
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

export const hiddenBulbs = [0, 1, 2, 3, 4, 5, 6];
export const placementCooldown = 1_000;
