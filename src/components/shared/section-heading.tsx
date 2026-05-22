import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  className
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {kicker}
      </p>
      <h2 className="mt-3 font-heading text-3xl leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
