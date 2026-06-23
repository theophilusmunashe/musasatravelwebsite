export const PRELANDING_STORAGE_KEY = "kumusha-prelanding-entered";

export const ENTRANCE_SEQUENCE = {
  background: 0,
  headline: 0.55,
  supporting: 0.95,
} as const;

/** How long headline + description stay on screen after animating in */
export const COPY_HOLD_MS = 4000;

/** Duration of the graceful copy fade-out */
export const COPY_FADE_S = 1.2;

/** Slow cinematic door zoom toward the viewer */
export const DOOR_ZOOM_DURATION_S = 28;
export const DOOR_ZOOM_SCALE = 1.14;

export const EXIT_DURATION_MS = 1200;

const SUPPORTING_ANIMATION_MS = ENTRANCE_SEQUENCE.supporting * 1000 + 900;

function getHoldMs(reducedMotion: boolean) {
  return reducedMotion ? 1800 : COPY_HOLD_MS;
}

function getCopyFadeMs(reducedMotion: boolean) {
  return reducedMotion ? 600 : COPY_FADE_S * 1000;
}

/** When copy begins to fade away */
export function getCopyFadeStartMs(reducedMotion: boolean): number {
  return SUPPORTING_ANIMATION_MS + getHoldMs(reducedMotion);
}

/** When the Enter control appears (after copy has faded) */
export function getEnterRevealDelayMs(reducedMotion: boolean): number {
  return getCopyFadeStartMs(reducedMotion) + getCopyFadeMs(reducedMotion);
}
