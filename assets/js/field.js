// A static field of samples on an undulating surface. Redraw only on resize.
const canvas = document.querySelector('.hero canvas');
function drawField() {
  const {width, height} = canvas.getBoundingClientRect();
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);
  for (let row = 0; row < 88; row++) {
    const v = row / 87;
    for (let col = 0; col < 138; col++) {
      const u = col / 137;
      const phase = u * 7 - v * 3;
      const x = width * (u * 1.12 - .04 + .06 * Math.sin(v * 6 + u * 3));
      const y = height * (.35 + v * .49 + .22 * Math.sin(phase) + .12 * Math.cos(v * 7 + u * 3));
      const alpha = Math.max(0, Math.min(1, u * 2.4 - .25)) * (.26 + .68 * Math.pow(Math.cos(phase), 2));
      ctx.fillStyle = 'rgba(' + (245 - Math.round(60*v)) + ',' + (191 - Math.round(58*v)) + ',' + (127 + Math.round(72*v)) + ',' + alpha + ')';
      ctx.beginPath();
      ctx.arc(x, y, .55 + .5*v, 0, Math.PI*2);
      ctx.fill();
    }
  }
}
new ResizeObserver(drawField).observe(canvas);
