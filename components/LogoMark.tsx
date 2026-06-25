import Image from "next/image";

import logo from "@/assets/kumusha_light_pure.png";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-10 w-auto",
  md: "h-12 w-auto",
  lg: "h-16 w-auto",
  xl: "h-20 w-auto",
  hero: "h-auto w-[min(72vw,18rem)] max-h-[min(16vh,7.5rem)]",
};

const tones = {
  default: "",
  intro: "drop-shadow-[0_8px_48px_rgba(0,0,0,0.45)]",
};

export default function LogoMark({
  size = "md",
  tone = "default",
  className,
}: {
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <Image
      src={logo}
      alt=""
      aria-hidden
      className={cn("object-contain", sizes[size], tones[tone], className)}
      priority={size === "lg" || size === "hero"}
    />
  );
}
