export const MIN_ZOOM = 1;
export const DESKTOP_ZOOM = 2;
export const MAX_ZOOM = 3;
export const PAN_LIMIT_BASE = 180;

export function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

export function clampPan(value: number, zoomScale: number) {
  const limit = Math.max(0, (zoomScale - 1) * PAN_LIMIT_BASE);
  return Math.max(-limit, Math.min(limit, value));
}

export function getTouchDistance(
  firstTouch: { clientX: number; clientY: number },
  secondTouch: { clientX: number; clientY: number }
) {
  return Math.hypot(
    secondTouch.clientX - firstTouch.clientX,
    secondTouch.clientY - firstTouch.clientY
  );
}
