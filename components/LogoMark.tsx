import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-10 w-10 text-base",
  md: "h-12 w-12 text-lg",
  lg: "h-16 w-16 text-2xl",
  xl: "h-20 w-20 text-3xl",
};

export default function LogoMark({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 font-black tracking-tight text-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.15)]",
        sizes[size],
        className
      )}
    >
      KE
    </span>
  );
}
