// Every site image lives in the "rootss-images" Lovable Cloud folder and is served from
// this site at /images/<folder>/<file> (see src/routes/images.$.tsx), so each one has a
// stable, shareable link. Folders: catalogue/, lifestyle/, brand/, products/ (admin uploads).
export const IMAGE_BUCKET = "rootss-images";
export const imageFolders = ["catalogue", "products", "lifestyle", "brand"] as const;
export type ImageFolder = (typeof imageFolders)[number];

export function imageUrl(path: string): string {
  return `/images/${path.replace(/^\/+/, "")}`;
}

/** Catalogue photograph by name, e.g. photo("durga-parivar"). */
export function photo(name: string): string {
  return name === "the-rootss-logo" ? imageUrl("brand/the-rootss-logo.png") : imageUrl(`catalogue/${name}.jpg`);
}

export function lifestyle(name: string): string {
  return imageUrl(`lifestyle/${name}.jpg`);
}

/** Safe storage path check for the image route: lowercase folders/files, no traversal. */
export function isSafeImagePath(path: string): boolean {
  return (
    path.length > 0 &&
    path.length <= 300 &&
    /^[a-z0-9][a-z0-9/_.-]*$/i.test(path) &&
    !path.includes("..") &&
    !path.includes("//")
  );
}
