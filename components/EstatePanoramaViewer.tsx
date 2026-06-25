"use client";

import { useRef } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import type { ViewerAPI } from "react-photo-sphere-viewer";
import { Footprints } from "lucide-react";
import panoramaImage from "@/assets/360_Example.jpg";

type EstatePanoramaViewerProps = {
  onReady?: () => void;
};

export default function EstatePanoramaViewer({ onReady }: EstatePanoramaViewerProps) {
  const viewerRef = useRef<ViewerAPI>(null);

  const handleFullscreen = () => {
    viewerRef.current?.enterFullscreen();
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
        onReady={() => onReady?.()}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

      <button
        type="button"
        onClick={handleFullscreen}
        aria-label="Enter fullscreen estate walkthrough"
        className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-full border border-amber-500/40 bg-black/60 px-4 py-3 text-sm font-semibold text-amber-400 shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-black hover:shadow-amber-500/25"
      >
        <Footprints className="h-5 w-5" aria-hidden />
        <span className="hidden sm:inline">Walk through</span>
      </button>

      <p className="pointer-events-none absolute bottom-5 left-5 z-10 hidden max-w-xs text-xs text-white/60 sm:block">
        Drag to look around · Tap footprints for fullscreen
      </p>
    </div>
  );
}
