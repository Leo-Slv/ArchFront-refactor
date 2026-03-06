interface KanbanBadgesProps {
  items: string[];
  tone?: "default" | "subtle";
}

export default function KanbanBadges({
  items,
  tone = "default",
}: KanbanBadgesProps) {
  const backgroundClassName =
    tone === "subtle" ? "bg-black/20 text-white/60" : "bg-white/5 text-white/72";

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={`af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] ${backgroundClassName}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
