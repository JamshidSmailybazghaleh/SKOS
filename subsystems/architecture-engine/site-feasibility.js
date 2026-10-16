'use strict';

function calculateSiteFeasibility(input) {
  if (!input || typeof input !== 'object') {
    throw new TypeError('input must be an object');
  }

  const { plotAreaM2, coverageRatio, farRatio, maxFloors } = input;

  if (!Number.isFinite(plotAreaM2) || plotAreaM2 <= 0) {
    throw new RangeError('plotAreaM2 must be greater than zero');
  }
  if (!Number.isFinite(coverageRatio) ||
      coverageRatio <= 0 || coverageRatio > 1) {
    throw new RangeError('coverageRatio must be in (0, 1]');
  }
  if (!Number.isFinite(farRatio) || farRatio < 0) {
    throw new RangeError('farRatio must be zero or greater');
  }
  if (!Number.isInteger(maxFloors) || maxFloors < 1) {
    throw new RangeError('maxFloors must be a positive integer');
  }

  const footprintCapM2 = plotAreaM2 * coverageRatio;
  const openAreaM2 = plotAreaM2 - footprintCapM2;
  const farCapM2 = plotAreaM2 * farRatio;
  const floorCapM2 = footprintCapM2 * maxFloors;
  const maxBuildableGfaM2 = Math.min(farCapM2, floorCapM2);

  let limitingConstraint = 'none';
  if (farCapM2 < floorCapM2) limitingConstraint = 'far';
  if (floorCapM2 < farCapM2) limitingConstraint = 'floors';
  if (farCapM2 === floorCapM2) limitingConstraint = 'far_and_floors';

  return {
    plotAreaM2,
    footprintCapM2,
    openAreaM2,
    farCapM2,
    floorCapM2,
    maxBuildableGfaM2,
    maxFloors,
    equivalentFullFootprintFloors:
      footprintCapM2 > 0 ? maxBuildableGfaM2 / footprintCapM2 : 0,
    limitingConstraint,
    status: 'PRELIMINARY_ESTIMATE',
    legalApproval: false
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateSiteFeasibility };
}
if (typeof globalThis !== 'undefined') {
  globalThis.calculateSiteFeasibility = calculateSiteFeasibility;
}
