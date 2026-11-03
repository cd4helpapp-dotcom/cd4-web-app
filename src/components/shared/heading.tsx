import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HeadingProps {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function Heading({ kicker, title, description, align = "left", className }: HeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", align === "left" && "max-w-2xl", className)} data-reveal>
      <p className="kicker">{kicker}</p>
      <h2 className="display-2 mt-4 text-white">{title}</h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-[#b9cbe0] sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}
