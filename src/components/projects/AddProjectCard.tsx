import { Plus } from "lucide-react";

interface AddProjectCardProps {
  onAdd?: () => void;
}

export default function AddProjectCard({ onAdd }: AddProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="af-surface-lg af-surface-hover af-focus-ring group flex min-h-[10.75rem] w-full flex-col items-center justify-center gap-2 bg-white/[0.02] p-4 text-center text-white/65 transition hover:text-white focus-visible:outline-none"
      style={{
        borderStyle: "dashed",
        borderColor: "var(--border-color)",
      }}
    >
      <span className="af-surface-sm inline-flex h-8 w-8 items-center justify-center bg-white/5 text-white/80">
        <Plus className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium">Adicionar projeto</span>
      <span className="text-[11px] text-white/45">Preview</span>
    </button>
  );
}
