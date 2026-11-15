import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getPost, posts } from "@/lib/catalog";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Story not found — Rootss" }, { name: "robots", content: "noindex" }] };
    return {
      meta: [
        { title: `${p.title} — Rootss Journal` },
        { name: "description", content: p.dek },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.dek },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="text-5xl">Story not found</h1>
      <Link to="/journal" className="eyebrow mt-8 inline-block border-b border-foreground pb-1">Back to the journal</Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const next = posts.find((p) => p.slug !== post.slug);
  return (
    <article>
      <header className="mx-auto max-w-3xl px-6 pb-12 pt-14 text-center">
        <Link to="/journal" className="eyebrow inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3.5 w-3.5" /> Journal
        </Link>
        <p className="eyebrow mt-10 text-primary">{post.category} · {post.readTime}</p>
        <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">{post.title}</h1>
        <p className="mt-6 text-xl text-muted-foreground">{post.dek}</p>
      </header>
      <img src={post.img} alt={post.title} className="mx-auto aspect-[16/9] w-full max-w-6xl object-cover" />
      <div className="mx-auto max-w-2xl space-y-6 px-6 py-20 text-lg leading-relaxed">
        {post.body.map((para, i) => (
          <p key={i} className={i === 0 ? "font-display text-2xl leading-snug" : "text-muted-foreground"}>
            {para}
          </p>
        ))}
      </div>
      {next && (
        <div className="border-t border-border">
          <Link to="/journal/$slug" params={{ slug: next.slug }} className="group mx-auto block max-w-3xl px-6 py-16 text-center">
            <p className="eyebrow text-muted-foreground">Read next</p>
            <p className="mt-3 font-display text-4xl group-hover:text-primary">{next.title}</p>
          </Link>
        </div>
      )}
    </article>
  );
}
