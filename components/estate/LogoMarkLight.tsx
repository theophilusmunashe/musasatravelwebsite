import { cn } from "@/lib/utils";

export default function LogoMarkLight({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const sizes = { sm: "h-9 w-9 text-sm", md: "h-11 w-11 text-base" };
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-estate-border bg-estate-warm font-medium tracking-tight text-estate-green",
        sizes[size],
        className
      )}
    >
      KE
    </span>
  );
}
