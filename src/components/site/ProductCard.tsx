import { Link } from "@tanstack/react-router";

import { formatPrice, getCraft, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
      <div className="overflow-hidden bg-muted">
        <img
          src={product.img}
          alt={product.name}
          width={896}
          height={1152}
          loading="lazy"
          className="img-zoom aspect-[4/5] w-full object-cover"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted-foreground">{getCraft(product.craft).name}</p>
          <h3 className="mt-1 text-2xl leading-tight transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-5 font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
