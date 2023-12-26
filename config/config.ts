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

export const hiddenBulbs: number[] = [];
export const placementCooldown = 3_000;

export const projectClosed = true;
