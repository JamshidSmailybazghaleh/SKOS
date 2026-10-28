(function (root) {
  'use strict';

  function createDefaultModel(width = 12, depth = 10) {
    return {
      schemaVersion: 1,
      units: 'm',
      width,
      depth,
      floors: 1,
      openings: [
        { id: 'window-living', type: 'window', roomId: 'living', side: 'top', offset: 1, width: 1.4 },
        { id: 'door-living', type: 'door', roomId: 'living', side: 'bottom', offset: 2, width: 0.9 },
        { id: 'window-kitchen', type: 'window', roomId: 'kitchen', side: 'top', offset: 0.8, width: 1.2 },
        { id: 'window-bedroom-1', type: 'window', roomId: 'bedroom-1', side: 'left', offset: 0.8, width: 1.2 }
      ],
      wallThickness: {
        exterior: 0.25,
        interior: 0.12
      },
      rooms: [
        { id: 'living', name: 'پذیرایی', x: 0.2, y: 0.2, width: 5.8, depth: 4 },
        { id: 'kitchen', name: 'آشپزخانه', x: 6.2, y: 0.2, width: 3, depth: 3 },
        { id: 'dining', name: 'ناهارخوری', x: 9.4, y: 0.2, width: 2.4, depth: 3 },
        { id: 'bedroom-1', name: 'اتاق خواب ۱', x: 0.2, y: 4.4, width: 3.6, depth: 3 },
        { id: 'bedroom-2', name: 'اتاق خواب ۲', x: 4, y: 4.4, width: 3.2, depth: 3 },
        { id: 'bathroom', name: 'حمام', x: 7.4, y: 3.4, width: 2, depth: 2 },
        { id: 'toilet', name: 'سرویس بهداشتی', x: 9.6, y: 3.4, width: 2.2, depth: 1.4 },
        { id: 'hall', name: 'راهرو', x: 7.4, y: 5.6, width: 4.4, depth: 1.8 },
        { id: 'balcony', name: 'بالکن', x: 0.2, y: 7.6, width: 4, depth: 2.2 },
        { id: 'staircase', name: 'راه‌پله', x: 4.4, y: 7.6, width: 2.6, depth: 2.2 },
        { id: 'lightwell', name: 'نورگیر', x: 7.2, y: 7.6, width: 2, depth: 2 },
        { id: 'terrace', name: 'تراس', x: 9.4, y: 7.6, width: 2.4, depth: 2.2 }
      ]
    };
  }

  function validateModel(model) {
    const errors = [];
    if (!model || !Number.isFinite(model.width) ||
        !Number.isFinite(model.depth) ||
        model.width <= 0 || model.depth <= 0) {
      return ['ابعاد ساختمان نامعتبر است.'];
    }

    if (!Array.isArray(model.rooms) || model.rooms.length === 0) {
      return ['حداقل یک فضا باید تعریف شود.'];
    }

    const ids = new Set();
    for (const room of model.rooms) {
      if (!room.id || ids.has(room.id)) {
        errors.push('شناسهٔ فضا باید یکتا باشد.');
      }
      ids.add(room.id);

      if (!room.name || ![
        room.x, room.y, room.width, room.depth
      ].every(Number.isFinite) ||
          room.x < 0 || room.y < 0 ||
          room.width <= 0 || room.depth <= 0 ||
          room.x + room.width > model.width ||
          room.y + room.depth > model.depth) {
        errors.push('ابعاد یا موقعیت فضای «' +
          (room.name || room.id || 'بدون نام') + '» نامعتبر است.');
      }
    }
    for (let i = 0; i < model.rooms.length; i++) {
      const a = model.rooms[i];
      if (![a.x, a.y, a.width, a.depth].every(Number.isFinite) ||
          a.width <= 0 || a.depth <= 0) continue;

      for (let j = i + 1; j < model.rooms.length; j++) {
        const b = model.rooms[j];
        if (![b.x, b.y, b.width, b.depth].every(Number.isFinite) ||
            b.width <= 0 || b.depth <= 0) continue;

        const overlapX =
          Math.min(a.x + a.width, b.x + b.width) -
          Math.max(a.x, b.x);
        const overlapY =
          Math.min(a.y + a.depth, b.y + b.depth) -
          Math.max(a.y, b.y);

        if (overlapX > 0.01 && overlapY > 0.01) {
          errors.push(
            'هم‌پوشانی فضای «' + a.name +
            '» و «' + b.name + '»؛ موقعیت یا ابعاد را اصلاح کنید.'
          );
        }
      }
    }

    const openings = Array.isArray(model.openings) ? model.openings : [];
    const openingIds = new Set();

    for (const o of openings) {
      const room = model.rooms.find(r => r.id === o.roomId);

      if (!o.id || openingIds.has(o.id)) {
        errors.push('شناسهٔ در یا پنجره باید یکتا باشد.');
      }
      openingIds.add(o.id);

      if (!room || !['door', 'window'].includes(o.type) ||
          !['top', 'right', 'bottom', 'left'].includes(o.side) ||
          !Number.isFinite(o.offset) || !Number.isFinite(o.width) ||
          o.offset < 0 || o.width <= 0) {
        errors.push('مشخصات یکی از درها یا پنجره‌ها نامعتبر است.');
        continue;
      }

      const sideLength = ['top', 'bottom'].includes(o.side)
        ? room.width : room.depth;

      if (o.offset + o.width > sideLength) {
        errors.push('بازشو در فضای «' + room.name + '» خارج از دیوار است.');
      }
    }

    return [...new Set(errors)];
  }

  function renderFloorPlanSvg(model) {
    const errors = validateModel(model);
    if (errors.length) throw new Error(errors.join(' '));

    const scale = 50;
    const margin = 32;
    const exteriorWall =
      (model.wallThickness?.exterior ?? 0.25) * scale;
    const interiorWall =
      (model.wallThickness?.interior ?? 0.12) * scale;
    const width = model.width * scale;
    const height = model.depth * scale;
    const esc = value => String(value).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;',
      '"': '&quot;', "'": '&apos;'
    })[c]);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${width + margin * 2} ${height + margin * 2}"
      width="100%" role="img" aria-label="پلان چندفضایی ساختمان">`;
    svg += `<rect width="100%" height="100%" fill="#fff"/>`;
    svg += `<rect x="${margin}" y="${margin}" width="${width}"
      height="${height}" fill="#f8fafc" stroke="#0a2342"
      stroke-width="${exteriorWall}"/>`;

    for (const room of model.rooms) {
      const x = margin + room.x * scale;
      const y = margin + room.y * scale;
      const w = room.width * scale;
      const h = room.depth * scale;

      svg += `<rect x="${x}" y="${y}" width="${w}" height="${h}"
        fill="#e8eef5" stroke="#0a2342"
        stroke-width="${interiorWall}"/>`;
      svg += `<text x="${x + w / 2}" y="${y + h / 2 - 4}"
        text-anchor="middle" dominant-baseline="middle"
        font-size="12" fill="#0a2342">${esc(room.name)}</text>`;
      svg += `<text x="${x + w / 2}" y="${y + h / 2 + 13}"
        text-anchor="middle" font-size="10" fill="#526579">${
          room.width.toFixed(1)} × ${room.depth.toFixed(1)} m</text>`;
    }

    for (const o of (model.openings || [])) {
      const room = model.rooms.find(r => r.id === o.roomId);
      if (!room) continue;

      const x = margin + room.x * scale;
      const y = margin + room.y * scale;
      const rw = room.width * scale;
      const rh = room.depth * scale;
      const horizontal = o.side === 'top' || o.side === 'bottom';
      const start = o.offset * scale;
      const length = o.width * scale;

      const x1 = horizontal
        ? x + start
        : (o.side === 'left' ? x : x + rw);
      const y1 = horizontal
        ? (o.side === 'top' ? y : y + rh)
        : y + start;
      const x2 = horizontal ? x1 + length : x1;
      const y2 = horizontal ? y1 : y1 + length;

      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="#ffffff" stroke-width="${Math.max(5, interiorWall + 4)}"/>`;

      if (o.type === 'window') {
        const shiftX = horizontal ? 0 : -3;
        const shiftY = horizontal ? -3 : 0;
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
          stroke="#168aad" stroke-width="2.5"/>`;
        svg += `<line x1="${x1 + shiftX}" y1="${y1 + shiftY}"
          x2="${x2 + shiftX}" y2="${y2 + shiftY}"
          stroke="#168aad" stroke-width="1"/>`;
       } else {
        const leafX = horizontal ? x1 :
          (o.side === 'left' ? x1 + length : x1 - length);
        const leafY = horizontal ?
          (o.side === 'top' ? y1 + length : y1 - length) : y1;
        const arcStartX = horizontal ? x2 : x1;
        const arcStartY = horizontal ? y1 : y2;
        const arcEndX = horizontal ? x1 : leafX;
        const arcEndY = horizontal ? leafY : y1;
        const sweep = ['top', 'left'].includes(o.side) ? 0 : 1;

        svg += `<line x1="${x1}" y1="${y1}"
          x2="${leafX}" y2="${leafY}"
          stroke="#b45309" stroke-width="2"/>`;
        svg += `<path d="M ${arcStartX} ${arcStartY}
          A ${length} ${length} 0 0 ${sweep} ${arcEndX} ${arcEndY}"
          fill="none" stroke="#b45309" stroke-width="1.5"/>`;
      }
    }

    svg += `<text x="${margin + width / 2}" y="${margin + height + 22}"
      text-anchor="middle" font-size="12" fill="#0a2342">${
        model.width} × ${model.depth} m</text></svg>`;
    return svg;
  }

  root.SKOSBuildingModel = {
    createDefaultModel,
    validateModel,
    renderFloorPlanSvg
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
