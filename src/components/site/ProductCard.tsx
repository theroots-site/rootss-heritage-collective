import { Link } from "@tanstack/react-router";

import { availabilityLabel, formatPrice, getCollection, type Product } from "@/lib/catalog";
import { ShortlistButton } from "./ShortlistButton";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const collection = getCollection(product.collection);
  return (
    <div className="group relative">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={`${product.name}, handmade Dhokra brass`}
            loading={priority ? "eager" : "lazy"}
            className="img-zoom aspect-[4/5] w-full object-cover"
          />
          {product.availability !== "on-enquiry" && (
            <span className="eyebrow absolute left-3 top-3 bg-forest px-3 py-1.5 text-forest-foreground">
              {availabilityLabel[product.availability]}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="eyebrow text-muted-foreground">{collection?.name}</p>
          <h3 className="mt-2 text-2xl leading-tight transition-colors group-hover:text-rust">{product.name}</h3>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {product.code && <span>{product.code}</span>}
            <span className="text-foreground">{formatPrice(product)}</span>
          </div>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <ShortlistButton slug={product.slug} name={product.name} />
      </div>
    </div>
  );
}
