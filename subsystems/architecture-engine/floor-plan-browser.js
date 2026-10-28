(function (root) {
  'use strict';

  function createFloorPlanSvg(width, depth, thickness) {
    if (![width, depth, thickness].every(Number.isFinite)) {
      throw new TypeError('Dimensions must be finite numbers');
    }

    if (
      width <= 0 ||
      depth <= 0 ||
      thickness <= 0 ||
      2 * thickness >= Math.min(width, depth)
    ) {
      throw new RangeError('Invalid room dimensions');
    }

    const t = thickness;
    const corners = [
      [[t / 2, t / 2], [width - t / 2, t / 2]],
      [[width - t / 2, t / 2], [width - t / 2, depth - t / 2]],
      [[width - t / 2, depth - t / 2], [t / 2, depth - t / 2]],
      [[t / 2, depth - t / 2], [t / 2, t / 2]]
    ];

    const scale = 40;
    const margin = 12;
    const points = (a, b) => {
      const dx = b[0] - a[0];
      const dy = b[1] - a[1];
      const length = Math.hypot(dx, dy);
      const ox = -dy / length * t / 2;
      const oy = dx / length * t / 2;

      return [
        [a[0] + ox, a[1] + oy],
        [b[0] + ox, b[1] + oy],
        [b[0] - ox, b[1] - oy],
        [a[0] - ox, a[1] - oy]
      ].map(([x, y]) =>
        `${(margin + x * scale).toFixed(2)},${(margin + y * scale).toFixed(2)}`
      ).join(' ');
    };

    const walls = corners.map(([a, b]) =>
      `<polygon points="${points(a, b)}" fill="#0a2342"/>`
    ).join('');

    const svgWidth = width * scale + 2 * margin;
    const svgHeight = depth * scale + 2 * margin;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" role="img" aria-label="پلان دوبعدی اتاق"><rect width="100%" height="100%" fill="#fff"/>${walls}<text x="${svgWidth / 2}" y="${svgHeight - 2}" font-size="10" text-anchor="middle" fill="#0a2342">${width} × ${depth} m</text></svg>`;
  }

  root.SKOSFloorPlan = { createFloorPlanSvg };
})(typeof globalThis !== 'undefined' ? globalThis : this);
