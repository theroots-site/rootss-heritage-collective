export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-3xl font-medium tracking-tight ${className}`}>
      Root<span className="italic text-primary">ss</span>
    </span>
  );
}
