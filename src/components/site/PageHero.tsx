import type { ReactNode } from "react";

/** Editorial page opener: kicker, large serif title, intro, optional banner image. */
export function PageHero({
  kicker,
  title,
  intro,
  image,
  imageAlt = "",
  children,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  if (image) {
    return (
      <section className="relative isolate overflow-hidden bg-forest-deep text-forest-foreground">
        <img src={image} alt={imageAlt} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-90" />
        <div className="bg-hero-fade absolute inset-0 -z-10" />
        <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-end px-6 pb-16 pt-28 md:px-10 md:pb-20">
          <p className="eyebrow animate-rise text-brass">{kicker}</p>
          <h1 className="animate-rise mt-5 max-w-3xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
          {intro && <div className="animate-rise mt-6 max-w-xl text-lg opacity-85">{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </section>
    );
  }
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:px-10 md:pt-24">
      <p className="eyebrow animate-rise text-rust">{kicker}</p>
      <h1 className="animate-rise mt-5 max-w-4xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
      {intro && <div className="animate-rise mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</div>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow text-rust ${align === "center" ? "dot-rule justify-center" : ""}`}>{kicker}</p>
      <h2 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{title}</h2>
      {intro && <div className="mt-5 text-lg text-muted-foreground">{intro}</div>}
    </div>
  );
}
