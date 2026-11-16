// Catalogue photographs are CDN asset pointers; this maps "durga-parivar" -> its URL.
const pointers = import.meta.glob<{ url: string }>("../assets/catalogue/*.asset.json", {
  eager: true,
  import: "default",
});

const byName: Record<string, string> = {};
for (const [path, pointer] of Object.entries(pointers)) {
  const file = path.split("/").pop() ?? "";
  const name = file.replace(/\.(jpg|png)\.asset\.json$/, "");
  byName[name] = pointer.url;
}

export function photo(name: string): string {
  const url = byName[name];
  if (!url) throw new Error(`Missing catalogue photo: ${name}`);
  return url;
}
