import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 md:pt-24">
      <div className="animate-rise max-w-3xl">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-5 text-5xl leading-[1.02] md:text-7xl">{title}</h1>
        {children && <div className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}
