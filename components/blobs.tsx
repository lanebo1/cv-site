/*
 * Живые градиентные пятна фона (CSS-дрейф, GPU-friendly).
 * Своя конфигурация blob'ов для каждой сцены.
 */

type Blob = {
  size: number; // rem
  color: string;
  opacity?: number;
  anim: "a" | "b" | "c";
  duration?: number;
  delay?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

export function SceneBlobs({ blobs }: { blobs: Blob[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="flame-blob"
          style={{
            width: `${b.size}rem`,
            height: `${b.size}rem`,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            opacity: b.opacity ?? 0.5,
            animation: `flame-drift-${b.anim} ${b.duration ?? 22 + i * 4}s ease-in-out ${
              b.delay ? `${b.delay}s ` : ""
            }infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
