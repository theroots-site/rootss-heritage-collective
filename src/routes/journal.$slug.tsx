import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getPost, posts } from "@/lib/catalog";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Story not found — the rootSS" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.post;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.dek,
      articleSection: p.category,
      publisher: { "@type": "Organization", name: "the rootSS" },
    };
    return {
      meta: [
        { title: `${p.title} — the rootSS Journal` },
        { name: "description", content: p.dek },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.dek },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">Story not found</h1>
      <Link to="/journal" className="eyebrow mt-8 inline-block bg-forest px-6 py-4 text-forest-foreground">All stories</Link>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-4xl">This story didn't load</h1>
      <p className="mt-3 text-muted-foreground">{error instanceof Error ? error.message : "Please try again."}</p>
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  return (
    <article>
      <header className="mx-auto max-w-3xl px-6 pb-12 pt-16 text-center md:pt-24">
        <Link to="/journal" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-rust">
          <ArrowLeft className="h-4 w-4" /> Journal
        </Link>
        <p className="eyebrow mt-10 text-rust">{post.category} · {post.readTime}</p>
        <h1 className="mt-5 text-5xl leading-[1.04] md:text-7xl">{post.title}</h1>
        <p className="mt-6 font-display text-2xl italic text-muted-foreground">{post.dek}</p>
      </header>
      <img src={post.img} alt="" className="mx-auto aspect-[16/9] w-full max-w-6xl object-cover" />
      <div className="mx-auto max-w-2xl space-y-6 px-6 py-16 text-lg leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-rust" : ""}>
            {para}
          </p>
        ))}
      </div>
      <section className="border-t border-border bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <p className="eyebrow text-rust">Keep reading</p>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} to="/journal/$slug" params={{ slug: p.slug }} className="group grid grid-cols-[8rem_minmax(0,1fr)] gap-6">
                <img src={p.img} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                <div>
                  <p className="eyebrow text-muted-foreground">{p.category}</p>
                  <h3 className="mt-2 text-2xl leading-tight group-hover:text-rust">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
