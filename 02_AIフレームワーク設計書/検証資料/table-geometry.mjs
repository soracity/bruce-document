export function tableCornerGeometry(width, height, cells, requestedRadius) {
  const finiteNonNegative = n => Number.isFinite(n) && n >= 0;
  if (![width,height,requestedRadius].every(finiteNonNegative)) throw Error('BRUCE_TABLE_GEOMETRY');
  let clip = `M0 0H${width}V${height}H0Z`;
  const arcsByWidth = new Map();
  for (const cell of cells) {
    if (![cell.x,cell.y].every(Number.isFinite) || ![cell.width,cell.height,cell.borderWidth].every(finiteNonNegative)) throw Error('BRUCE_TABLE_GEOMETRY');
    if (![0,0.5,1,2,4].includes(cell.borderWidth)) throw Error('BRUCE_TABLE_GEOMETRY');
    if (!['none','top-left','top-right','bottom-left','bottom-right','left','right','all'].includes(cell.radiusPosition)) throw Error('BRUCE_TABLE_RADIUS');
    const desired = cell.radius ?? requestedRadius;
    if (!finiteNonNegative(desired)) throw Error('BRUCE_TABLE_RADIUS');
    const r = Math.min(desired, cell.width/2, cell.height/2);
    if (r === 0 || cell.radiusPosition === 'none') continue;
    const corners = [
      ['top-left','left',cell.x,cell.y,1,1],
      ['top-right','right',cell.x+cell.width,cell.y,-1,1],
      ['bottom-left','left',cell.x,cell.y+cell.height,1,-1],
      ['bottom-right','right',cell.x+cell.width,cell.y+cell.height,-1,-1],
    ];
    for (const [position,side,x,y,sx,sy] of corners) {
      if (![position,side,'all'].includes(cell.radiusPosition)) continue;
      const sweep = sx*sy === 1 ? 0 : 1;
      const half = cell.borderWidth/2, inner = Math.max(0,r-half);
      clip += `M${x-sx*half} ${y-sy*half}`+
        `L${x+sx*r} ${y-sy*half}`+
        `L${x+sx*r} ${y+sy*half}`+
        `A${inner} ${inner} 0 0 ${sweep} ${x+sx*half} ${y+sy*r}`+
        `L${x-sx*half} ${y+sy*r}Z`;
      if (cell.borderWidth > 0) {
        const path = `M${x+sx*r} ${y}A${r} ${r} 0 0 ${sweep} ${x} ${y+sy*r}`;
        arcsByWidth.set(cell.borderWidth,(arcsByWidth.get(cell.borderWidth) ?? '')+path);
      }
    }
  }
  return {clip,arcs:[...arcsByWidth].map(([strokeWidth,path])=>({strokeWidth,path}))};
}
