"use client";

import { useRef, useState } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import type { ViewerAPI } from "react-photo-sphere-viewer";
import { GyroscopePlugin } from "@photo-sphere-viewer/gyroscope-plugin";
import { Footprints, Compass } from "lucide-react";
import panoramaImage from "@/assets/360_Example.jpg";

type EstatePanoramaViewerProps = {
  onReady?: () => void;
};

export default function EstatePanoramaViewer({ onReady }: EstatePanoramaViewerProps) {
  const viewerRef = useRef<ViewerAPI>(null);
  const [gyroSupported, setGyroSupported] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const getGyroPlugin = () =>
    viewerRef.current?.getPlugin<GyroscopePlugin>(GyroscopePlugin) ?? null;

  const handleReady = async () => {
    onReady?.();

    const gyro = getGyroPlugin();
    if (!gyro) return;

    try {
      const supported = await gyro.isSupported();
      setGyroSupported(supported);
    } catch {
      setGyroSupported(false);
    }

    gyro.addEventListener("gyroscope-updated", (e) => {
      setGyroEnabled(e.gyroscopeEnabled);
    });
  };

  const handleFullscreen = () => {
    viewerRef.current?.enterFullscreen();
  };

  // Must run inside a user gesture so iOS 13+ shows the motion permission prompt.
  const handleToggleGyro = async () => {
    const gyro = getGyroPlugin();
    if (!gyro) return;

    if (gyro.isEnabled()) {
      gyro.stop();
    } else {
      await gyro.start();
    }
  };

  return (
    <div className="relative h-full w-full">
      <ReactPhotoSphereViewer
        ref={viewerRef}
        src={panoramaImage.src}
        height="100%"
        width="100%"
        navbar={false}
        containerClass="estate-panorama-viewer"
        mousewheel
        mousemove
        touchmoveTwoFingers
        plugins={[GyroscopePlugin]}
        onReady={handleReady}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
        {gyroSupported && (
          <button
            type="button"
            onClick={handleToggleGyro}
            aria-pressed={gyroEnabled}
            aria-label={
              gyroEnabled
                ? "Turn off motion controls"
                : "Move your phone to look around"
            }
            className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold shadow-lg shadow-black/40 backdrop-blur-md transition-all ${
              gyroEnabled
                ? "border-amber-400 bg-amber-500 text-black"
                : "border-amber-500/40 bg-black/60 text-amber-400 hover:border-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-amber-500/25"
            }`}
          >
            <Compass className="h-5 w-5" aria-hidden />
            <span className="hidden sm:inline">
              {gyroEnabled ? "Motion on" : "Move to look"}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={handleFullscreen}
          aria-label="Enter fullscreen estate walkthrough"
          className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/60 px-4 py-3 text-sm font-semibold text-amber-400 shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-amber-500/25"
        >
          <Footprints className="h-5 w-5" aria-hidden />
          <span className="hidden sm:inline">Walk through</span>
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-5 left-5 z-10 max-w-[10rem] text-xs text-white/60 sm:max-w-xs">
        {gyroEnabled
          ? "Move your phone to look around"
          : gyroSupported
            ? "Tap “Move to look” or drag to explore"
            : "Drag to look around · Tap footprints for fullscreen"}
      </p>
    </div>
  );
}
