/*
 * Кобальтовые blob-пятна: размытые поля за секциями.
 * Дрейф ВДОЛЬ страницы — вертикальный, по ходу скролла.
 */

type Blob = {
  size: number; // rem
  color: string;
  opacity?: number;
  anim: "a" | "b";
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
          className="blob"
          style={{
            width: `${b.size}rem`,
            height: `${b.size}rem`,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            opacity: b.opacity ?? 0.5,
            animation: `drift-${b.anim} ${b.duration ?? 26 + i * 6}s ease-in-out ${
              b.delay ? `${b.delay}s ` : ""
            }infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
