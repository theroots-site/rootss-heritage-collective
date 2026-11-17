/** "the rootSS" wordmark: the second S is mirrored in rust, as in the brand logo. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-medium leading-none tracking-tight ${className}`}>
      the root<span>S</span>
      <span className="mirror-s text-rust">S</span>
    </span>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex aspect-square items-center justify-center rounded-full border border-current font-display font-medium leading-none ${className}`}
    >
      <span>S</span>
      <span className="mirror-s -ml-[0.12em] text-rust">S</span>
    </span>
  );
}
