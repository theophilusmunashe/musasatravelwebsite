"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { JUMPSHARE_VIDEO_EMBED } from "@/lib/estate-tokens";
import doorwayPoster from "@/assets/doorway_welcome_desktop.jpg";

export default function EstateHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [useIframe, setUseIframe] = useState(false);

  useEffect(() => {
    fetch("/api/estate-video-url")
      .then((res) => res.json())
      .then((data: { url?: string }) => {
        if (data.url) setSrc(data.url);
        else setUseIframe(true);
      })
      .catch(() => setUseIframe(true));
  }, []);

  useEffect(() => {
    if (!src || !videoRef.current) return;
    videoRef.current.play().catch(() => {});
  }, [src]);

  if (useIframe) {
    return (
      <iframe
        src={JUMPSHARE_VIDEO_EMBED}
        title="Estate showcase"
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
      />
    );
  }

  return (
    <>
      {!src && (
        <Image
          src={doorwayPoster}
          alt="Kumusha Ekhayalethu estate"
          fill
          className="object-cover"
          priority
          sizes="(max-width:768px) 280px, 320px"
        />
      )}
      {src && (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={doorwayPoster.src}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}
