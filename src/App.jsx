import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BookText,
  Boxes,
  GitBranch,
  Database,
  KanbanSquare,
  Search,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Workflow as WorkflowIcon,
  Target,
} from "lucide-react";

/**
 * ArchFlow Landing Page (Vite + React + Tailwind) — FLAT THEME + LUCIDE ICONS
 */

const PURPLE_PRIMARY = "#6D28D9"; // --af-primary
const PURPLE_LINE = "#7C3AED"; // --af-line
const PURPLE_PIN = "#6D28D9"; // --af-pin

const cx = (...c) => c.filter(Boolean).join(" ");

const Accent = ({ children }) => (
  <span className="text-white">
    <span className="text-white/90 hover:text-[var(--af-primary)] transition">
      {children}
    </span>
  </span>
);

const Badge = ({ children, tone = "default" }) => {
  const tones = {
    default: "bg-white/5 text-white/80 ring-1 ring-white/10 hover:bg-white/8",
    accent:
      "bg-white/5 text-white/80 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 hover:text-[var(--af-primary)]",
    solid:
      "bg-white/5 text-white ring-1 ring-white/15 hover:ring-[var(--af-line)]/70 hover:text-[var(--af-primary)] hover:bg-white/7",
    subtle: "bg-white/4 text-white/70 ring-1 ring-white/8 hover:bg-white/6",
  };
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition",
        tones[tone] || tones.default,
      )}
    >
      {children}
    </span>
  );
};

const Card = ({ children, className }) => (
  <div
    className={cx(
      "relative rounded-2xl bg-[#14121a] ring-1 ring-white/10 backdrop-blur-md",
      "shadow-[0_0_0_1px_rgba(255,255,255,.02),0_24px_70px_rgba(0,0,0,.55)]",
      className,
    )}
  >
    <div className="relative">{children}</div>
  </div>
);

const Divider = () => <div className="my-14 h-px w-full bg-white/10" />;

/** removed horizontal scroll */
const CodeBlock = ({ children }) => (
  <pre className="overflow-x-hidden whitespace-pre-wrap break-words rounded-2xl bg-black/60 p-5 text-[12px] leading-relaxed text-white/80 ring-1 ring-white/10">
    <code className="whitespace-pre-wrap break-words">{children}</code>
  </pre>
);

/**
 * ✅ IMPORTANT:
 * - Removido group-hover daqui.
 * - Agora o hover é LOCAL: você aplica hover:* no elemento específico ou group-hover:* em um group específico.
 */
const Icon = ({ as: As, className }) => (
  <As className={cx("h-4 w-4 text-white/80 transition", className)} aria-hidden="true" />
);

const SectionTitle = ({
  eyebrow,
  title,
  desc,
  align = "left",
  icon: IconComp = Sparkles,
}) => (
  <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
    {eyebrow && (
      <div
        className={cx(
          "mb-3 inline-flex items-center gap-2",
          align === "center" && "justify-center",
        )}
      >
        <span className="group inline-flex items-center">
          <Icon as={IconComp} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
        </span>
        <p className="text-sm font-medium tracking-wide text-white/70">{eyebrow}</p>
      </div>
    )}
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
      {title}
    </h2>
    {desc && <p className="mt-3 text-base leading-relaxed text-white/70">{desc}</p>}
  </div>
);

const LogoPill = ({ children, icon: IconComp = Sparkles }) => (
  <div className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 hover:text-white transition">
    <Icon as={IconComp} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
    {children}
  </div>
);

const CheckRow = ({ children }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center">
      <Icon as={CheckCircle2} className="h-5 w-5 hover:text-[var(--af-pin)]" />
    </span>
    <p className="text-sm text-white/75">{children}</p>
  </div>
);

const steps = [
  {
    k: "01",
    title: "Decisão arquitetural (ADR) vira contexto real",
    desc: "ADRs como entidades do produto: versionadas, buscáveis e vinculáveis à execução.",
    icon: BookText,
  },
  {
    k: "02",
    title: "Diagramas nativos (C4 / Event Storming) conectados ao trabalho",
    desc: "Arquitetura deixa de ser link perdido — passa a ser parte do fluxo.",
    icon: Boxes,
  },
  {
    k: "03",
    title: "Stories com rastreabilidade fim-a-fim",
    desc: "Da decisão ao deploy: Story ↔ Schema ↔ Commit/PR ↔ Incidente.",
    icon: GitBranch,
  },
  {
    k: "04",
    title: "Schema e migrations no mesmo lugar",
    desc: "ERD visual + geração de migrations/entities; reduz drift e retrabalho.",
    icon: Database,
  },
];

const pillars = [
  {
    title: "Architecture-First Project Management",
    icon: Layers,
    bullets: [
      "ADRs integrados (workflow: Proposed → Accepted → Deprecated → Superseded)",
      "C4 Model nativo (Context/Container/Component/Code) com versionamento",
      "Event Storming digital vinculado a stories",
    ],
  },
  {
    title: "Database Schema como cidadão de primeira classe",
    icon: Database,
    bullets: [
      "ERD visual → SQL otimizado (Postgres/MySQL/SQL Server)",
      "Geração de Migrations (ex.: .NET EF Core) e Entities",
      "Diff de schema entre versões (v1 → v2) com rastreio",
    ],
  },
  {
    title: "Agilidade que entende arquitetura",
    icon: KanbanSquare,
    bullets: [
      "Scrumban: fluidez do Kanban + cadência do Scrum",
      "WIP e métricas mais inteligentes (ex.: esforço, fluxo, throughput)",
      "Board com contexto técnico no card (ADR/Diagrama/Schema)",
    ],
  },
  {
    title: "Rastreabilidade real (não só links)",
    icon: Target,
    bullets: [
      "Story ↔ ADR ↔ Diagrama ↔ Migration ↔ Commit/PR ↔ Deploy",
      "Snapshot por sprint: estado do sistema e evolução do design",
      "Onboarding mais rápido: contexto disponível em 1 clique",
    ],
  },
  {
    title: "Plataforma que dev quer usar",
    icon: Search,
    bullets: [
      "Menos burocracia, mais sinal: UI rápida e direta",
      "Busca semântica de decisões e mudanças",
      "Fonte única da verdade: menos drift, menos context switching",
    ],
  },
];

const mvpFeatures = [
  {
    title: "ADRs integrados",
    icon: BookText,
    desc: "Templates e workflow para decisões. Versionamento e timeline por projeto/epic.",
  },
  {
    title: "C4 Diagrams nativos",
    icon: Boxes,
    desc: "Editor por nível, versionamento por sprint e export (PNG/SVG/Mermaid).",
  },
  {
    title: "Event Storming",
    icon: WorkflowIcon,
    desc: "Board colaborativo para eventos/agregados/bounded contexts, ligados a stories.",
  },
  {
    title: "ERD visual + geração de código",
    icon: Code2,
    desc: "Modelagem de tabelas/relacionamentos com geração de SQL, migrations e entities.",
  },
  {
    title: "Scrumban Board",
    icon: KanbanSquare,
    desc: "Cards com contexto técnico, WIP e métricas de fluxo.",
  },
  {
    title: "Rastreabilidade fim-a-fim",
    icon: ShieldCheck,
    desc: "Do ADR ao deploy/incidente: tudo vinculado e auditável.",
  },
];

const roadmap = [
  {
    phase: "MVP",
    icon: Sparkles,
    items: [
      "ADRs + workflow",
      "C4 (Context/Container) + versionamento",
      "Kanban/Scrumban + rastreabilidade básica",
      "ERD + geração inicial de migrations",
    ],
  },
  {
    phase: "V1",
    icon: Cpu,
    items: [
      "C4 completo (Component/Code) + diffs visuais",
      "Event Storming avançado",
      "Diff de schema e governança",
      "Integrações (Git, CI/CD) e automações",
    ],
  },
  {
    phase: "V2",
    icon: Layers,
    items: [
      "Assistentes de IA (sugestões e validações)",
      "Insights de arquitetura e impacto",
      "Auditoria e compliance por trilha de mudanças",
      "Marketplace de templates e extensões",
    ],
  },
];

const stack = [
  { name: "Vite + React", icon: Sparkles },
  { name: "Tailwind CSS", icon: Layers },
  { name: ".NET (API) / Node (opcional)", icon: Cpu },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Boxes },
  { name: "CI/CD", icon: GitBranch },
];

/* ----------------------------- HERO PANEL ----------------------------- */

function HeroAnimatedPanel() {
  const screens = useMemo(
    () => [
      { key: "adr", title: "ADR — decisão versionada" },
      { key: "c4", title: "C4 — containers conectados" },
      { key: "erd", title: "ERD — schema rastreável" },
      { key: "kb", title: "Kanban — execução com contexto" },
    ],
    [],
  );

  const transitionMs = 500;
  const screenDurationMs = 7500;
  const autoplayIntervalMs = screenDurationMs + transitionMs;

  const [idx, setIdx] = useState(0);
  const pauseUntilRef = useRef(0);

  const [runs, setRuns] = useState([0, 0, 0, 0]);
  const lastIdxRef = useRef(-1);

  useEffect(() => {
    if (lastIdxRef.current === idx) return;
    lastIdxRef.current = idx;

    setRuns((prev) => {
      const next = [...prev];
      next[idx] = (next[idx] ?? 0) + 1;
      return next;
    });
  }, [idx]);

  useEffect(() => {
    const t = setInterval(() => {
      const now = Date.now();
      if (now < pauseUntilRef.current) return;
      setIdx((v) => (v + 1) % screens.length);
    }, autoplayIntervalMs);

    return () => clearInterval(t);
  }, [screens.length, autoplayIntervalMs]);

  const goTo = (i) => {
    setIdx(i);
    pauseUntilRef.current = Date.now() + autoplayIntervalMs * 2;
  };

  return (
    <Card
      className={cx(
        "p-0 overflow-hidden h-[420px]",
        "bg-[#0a0a0a] ring-1 ring-[var(--af-line)]/35",
      )}
    >
      <div className="h-12 flex items-center justify-between px-4 border-b border-white/10">
        <div className="relative h-5 w-full">
          {screens.map((s, i) => {
            const isActive = i === idx;
            return (
              <div
                key={s.key}
                className={cx(
                  "absolute inset-0 flex items-center transition-all",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none",
                )}
                style={{
                  transitionDuration: `${transitionMs}ms`,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                <span className="text-sm font-semibold">{s.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative h-[calc(420px-48px)]">
        <PanelScreen active={idx === 0}>
          <ScreenADR key={`adr-${runs[0]}`} active={idx === 0} />
        </PanelScreen>

        <PanelScreen active={idx === 1}>
          <ScreenC4 key={`c4-${runs[1]}`} active={idx === 1} />
        </PanelScreen>

        <PanelScreen active={idx === 2}>
          <ScreenERD key={`erd-${runs[2]}`} active={idx === 2} />
        </PanelScreen>

        <PanelScreen active={idx === 3}>
          <ScreenKanban key={`kb-${runs[3]}`} active={idx === 3} />
        </PanelScreen>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          {screens.map((s, i) => {
            const isActive = i === idx;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${s.key}`}
                className={cx(
                  "transition-all duration-300 rounded-full",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--af-line)]/50",
                  isActive
                    ? "bg-[var(--af-pin)] w-4 h-1.5"
                    : "bg-white/20 w-1.5 h-1.5",
                )}
              />
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function PanelScreen({ active, children }) {
  return (
    <div
      className={cx(
        "absolute inset-0 p-4 flex flex-col transition-all duration-500",
        active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      style={{ transform: active ? "translateY(0px)" : "translateY(12px)" }}
    >
      <div className="flex-1 min-h-0 w-full">{children}</div>
    </div>
  );
}

/* ----------------------------- SCREEN 1: ADR ----------------------------- */

function ScreenADR({ active }) {
  const fullTitle = "Usar CQRS para separar leitura/escrita";
  const [typed, setTyped] = useState("");
  const [titleDone, setTitleDone] = useState(false);

  const [showCtx, setShowCtx] = useState(false);
  const [showDecision, setShowDecision] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusAccepted, setStatusAccepted] = useState(false);

  const [showMore, setShowMore] = useState(false);
  const [showDeep, setShowDeep] = useState(false);

  useEffect(() => {
    if (!active) {
      setTyped("");
      setTitleDone(false);
      setShowCtx(false);
      setShowDecision(false);
      setShowStatus(false);
      setStatusAccepted(false);
      setShowMore(false);
      setShowDeep(false);
      return;
    }

    let i = 0;
    let intervalId = null;

    intervalId = setInterval(() => {
      i += 1;
      setTyped(fullTitle.slice(0, i));
      if (i >= fullTitle.length) {
        clearInterval(intervalId);
        intervalId = null;
        setTitleDone(true);
      }
    }, 50);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [active]);

  useEffect(() => {
    if (!active || !titleDone) return;

    const t1 = setTimeout(() => setShowCtx(true), 800);
    const t2 = setTimeout(() => setShowDecision(true), 1400);
    const t3 = setTimeout(() => setShowStatus(true), 2000);
    const t4 = setTimeout(() => setStatusAccepted(true), 2400);
    const t5 = setTimeout(() => setShowMore(true), 2800);
    const t6 = setTimeout(() => setShowDeep(true), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [active, titleDone]);

  const Field = ({ label, value, visible }) => (
    <div
      className={cx(
        "transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
      style={{ color: "rgba(255,255,255,0.85)" }}
    >
      <div className="flex gap-2 font-mono text-xs">
        <span style={{ color: "rgba(255,255,255,0.50)" }}>{label}:</span>
        <span>{value}</span>
      </div>
    </div>
  );

  const RevealBlock = ({ show, children }) => (
    <div
      className={cx(
        "transition-all duration-500",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      {children}
    </div>
  );

  const TinyList = ({ title, items }) => (
    <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
      <p className="text-[10px] font-semibold text-white/70">{title}</p>
      <ul className="mt-1 space-y-1">
        {items.map((it) => (
          <li key={it} className="text-[10px] text-white/50 leading-snug">
            • {it}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="h-full min-h-0">
      <div className="h-full min-h-0 rounded-2xl bg-black/40 ring-1 ring-white/10 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/80 ring-1 ring-white/10">
              ADR #5
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold ring-1 ring-white/10">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#4ade80" }}
              />
              <span style={{ color: "rgba(255,255,255,0.85)" }}>Accepted</span>
            </span>

            <span className="hidden sm:inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-white/60 ring-1 ring-white/10">
              Impact: Medium
            </span>
          </div>

          <span className="text-[10px] text-white/40">v1.0 • 2025-01-15</span>
        </div>

        <div className="px-4 py-4 flex-1 min-h-0 flex flex-col">
          <div
            className="text-sm font-semibold min-h-[22px]"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {typed}
            <span
              className={cx(
                "ml-0.5 inline-block w-[1px] h-[14px] align-middle",
                titleDone ? "opacity-0" : "opacity-100",
              )}
              style={{
                background: "var(--af-pin)",
                animation: titleDone ? "none" : "afCursorBlink 700ms linear infinite",
              }}
            />
          </div>

          <div className="mt-4 space-y-3">
            <Field
              label="Problema"
              value="Leitura saturando API e banco em picos"
              visible={showCtx}
            />
            <Field
              label="Contexto"
              value="Sistema com alta carga de leitura (orders)"
              visible={showCtx}
            />
            <Field
              label="Decisão"
              value="Event Sourcing + CQRS (read model separado)"
              visible={showDecision}
            />

            <div
              className={cx(
                "transition-all duration-500",
                showStatus ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              )}
            >
              <div className="flex items-center gap-2 font-mono text-xs">
                <span style={{ color: "rgba(255,255,255,0.50)" }}>Status:</span>
                <div className="relative h-5 w-24">
                  <span
                    className={cx(
                      "absolute inset-0 inline-flex items-center justify-center rounded-full px-2 text-[10px] ring-1 ring-white/10 bg-white/5 transition-opacity duration-500",
                      statusAccepted ? "opacity-0" : "opacity-100",
                    )}
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Proposed
                  </span>
                  <span
                    className={cx(
                      "absolute inset-0 inline-flex items-center justify-center rounded-full px-2 text-[10px] ring-1 ring-white/10 bg-white/5 transition-opacity duration-500",
                      statusAccepted ? "opacity-100" : "opacity-0",
                    )}
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    Accepted
                  </span>
                </div>
              </div>
            </div>

            <RevealBlock show={showMore}>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <TinyList
                  title="Alternativas"
                  items={[
                    "Cache agressivo (Redis) + invalidation",
                    "Read replicas + tuning",
                    "CQRS sem Event Sourcing",
                  ]}
                />
                <TinyList
                  title="Trade-offs"
                  items={[
                    "Mais componentes para operar",
                    "Consistência eventual em leitura",
                    "Mais complexidade de debug",
                  ]}
                />
                <TinyList
                  title="Impacto"
                  items={[
                    "API Gateway: rotas read/write",
                    "Order Service: handlers/consumers",
                    "Read Model: projeções",
                  ]}
                />
                <TinyList
                  title="Observabilidade"
                  items={[
                    "Tracing por correlation-id",
                    "Lag da projeção (SLO)",
                    "Alertas de falha de consumer",
                  ]}
                />
              </div>
            </RevealBlock>

            <RevealBlock show={showDeep}>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                  <p className="text-[10px] font-semibold text-white/70">Plano de rollout</p>
                  <p className="mt-1 text-[10px] text-white/50 leading-snug">
                    1) Read model em paralelo · 2) Shadow traffic · 3) Cutover por feature flag
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                  <p className="text-[10px] font-semibold text-white/70">Critérios de aceite</p>
                  <p className="mt-1 text-[10px] text-white/50 leading-snug">
                    p95 read &lt; 120ms · erro &lt; 0.5% · lag &lt; 5s
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                  <p className="text-[10px] font-semibold text-white/70">Riscos</p>
                  <p className="mt-1 text-[10px] text-white/50 leading-snug">
                    Projeção inconsistente · reprocessamento · duplicidade de eventos
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
                  <p className="text-[10px] font-semibold text-white/70">Links</p>
                  <p className="mt-1 text-[10px] text-white/50 leading-snug">
                    Story • PR • Migration • Runbook
                  </p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1">
                {["CQRS", "Event Sourcing", "Orders", "Read Model"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center rounded-full bg-[var(--af-pin)]/20 px-2 py-0.5 text-[9px] font-semibold text-[var(--af-pin)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </RevealBlock>
          </div>

          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SCREEN 2: C4 ----------------------------- */

function ScreenC4({ active }) {
  const mountKey = active ? "on" : "off";

  const nodes = [
    { id: "user", x: 22, y: 50, title: "User", sub: "[Person]", delay: 0 },
    { id: "fe", x: 138, y: 50, title: "Frontend", sub: "[Container]", delay: 300 },
    { id: "gw", x: 254, y: 50, title: "API Gateway", sub: "[Container]", delay: 600 },
    { id: "svc", x: 254, y: 124, title: "Order Service", sub: "[Container]", delay: 900 },
    { id: "db", x: 254, y: 194, title: "PostgreSQL", sub: "[DB]", delay: 1200 },
  ];

  const edges = [
    { id: "e1", x1: 22 + 80, y1: 50 + 18, x2: 138, y2: 50 + 18, delay: 450 },
    { id: "e2", x1: 138 + 80, y1: 50 + 18, x2: 254, y2: 50 + 18, delay: 750 },
    { id: "e3", x1: 254 + 40, y1: 50 + 36, x2: 254 + 40, y2: 124, delay: 1050 },
    { id: "e4", x1: 254 + 40, y1: 124 + 36, x2: 254 + 40, y2: 194, delay: 1350 },
  ];

  return (
    <div key={mountKey} className="h-full min-h-0">
      <div className="h-full min-h-0 rounded-2xl bg-black/40 ring-1 ring-white/10 p-3 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <p className="text-[10px] font-semibold text-white/70">
            Container diagram (simplificado)
          </p>
          <span className="text-[10px] text-white/40">v2.3</span>
        </div>

        <div className="mt-2 flex-1 min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 340 260" className="w-full max-w-[360px]" preserveAspectRatio="xMidYMid meet">
            {edges.map((e) => (
              <line
                key={e.id}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke="var(--af-line)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.85"
                strokeDasharray="120"
                strokeDashoffset="120"
                style={{
                  animation: active ? `c4Draw 600ms ease forwards` : "none",
                  animationDelay: active ? `${e.delay}ms` : "0ms",
                }}
              />
            ))}

            {nodes.map((n) => (
              <g
                key={n.id}
                style={{
                  opacity: 0,
                  transform: "scale(0.88)",
                  transformOrigin: `${n.x + 40}px ${n.y + 18}px`,
                  animation: active ? "c4In 500ms ease forwards" : "none",
                  animationDelay: active ? `${n.delay}ms` : "0ms",
                }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width="80"
                  height="36"
                  rx="8"
                  fill="#0a0a0a"
                  stroke="var(--af-line)"
                  strokeWidth="1.2"
                />
                <text x={n.x + 40} y={n.y + 15} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.8)">
                  {n.title}
                </text>
                <text x={n.x + 40} y={n.y + 28} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">
                  {n.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 px-2 pb-2">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
            <p className="text-[10px] font-semibold text-white/70">Fluxo</p>
            <p className="mt-1 text-[10px] text-white/50">
              User → FE → Gateway → Service → DB
            </p>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
            <p className="text-[10px] font-semibold text-white/70">Motivo</p>
            <p className="mt-1 text-[10px] text-white/50">
              Separar responsabilidades e escalar leitura
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes c4In { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
        @keyframes c4Draw { from { stroke-dashoffset: 120; opacity: 0.15; } to { stroke-dashoffset: 0; opacity: 0.85; } }
      `}</style>
    </div>
  );
}

/* ----------------------------- SCREEN 3: ERD ----------------------------- */

function ScreenERD({ active }) {
  const tables = [
    { id: "users", x: 22, y: 30, name: "users", delay: 0, fields: ["id (PK)", "name", "email"] },
    { id: "orders", x: 190, y: 30, name: "orders", delay: 500, fields: ["id (PK)", "user_id (FK)", "status"] },
    { id: "items", x: 190, y: 128, name: "order_items", delay: 1000, fields: ["id (PK)", "order_id(FK)", "product_id"] },
  ];

  const [visibleFields, setVisibleFields] = useState({ users: 0, orders: 0, items: 0 });
  const runIdRef = useRef(0);

  useEffect(() => {
    runIdRef.current += 1;
    const runId = runIdRef.current;

    setVisibleFields({ users: 0, orders: 0, items: 0 });
    if (!active) return;

    const timers = [];
    tables.forEach((t) => {
      t.fields.forEach((_, i) => {
        const tid = setTimeout(() => {
          if (runIdRef.current !== runId) return;
          setVisibleFields((prev) => ({ ...prev, [t.id]: Math.max(prev[t.id], i + 1) }));
        }, t.delay + 250 + i * 80);
        timers.push(tid);
      });
    });

    return () => timers.forEach(clearTimeout);
  }, [active]);

  const Table = ({ t }) => {
    const count = visibleFields[t.id] ?? 0;
    return (
      <g
        style={{
          opacity: 0,
          transform: "translateY(12px)",
          transformOrigin: `${t.x + 70}px ${t.y + 55}px`,
          animation: active ? "erdIn 500ms ease forwards" : "none",
          animationDelay: active ? `${t.delay}ms` : "0ms",
        }}
      >
        <rect x={t.x} y={t.y} width="140" height="92" rx="10" fill="#0a0a0a" stroke="rgba(255,255,255,0.10)" />
        <rect x={t.x} y={t.y} width="140" height="24" rx="10" fill="#0a0a0a" stroke="var(--af-line)" strokeWidth="1.2" />
        <text x={t.x + 10} y={t.y + 16} fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.85)">
          {t.name}
        </text>
        <line x1={t.x} y1={t.y + 26} x2={t.x + 140} y2={t.y + 26} stroke="rgba(255,255,255,0.10)" />

        {t.fields.map((f, i) => {
          const visible = i < count;
          const isPK = f.includes("(PK)");
          const isFK = f.includes("(FK)");
          return (
            <text
              key={f}
              x={t.x + 10}
              y={t.y + 44 + i * 14}
              fontSize="8"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
              fill={visible ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0)"}
              style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
            >
              {(isPK || isFK) && (
                <tspan fill="var(--af-pin)">{isPK ? "PK " : isFK ? "FK " : ""}</tspan>
              )}
              <tspan>{f.replace("(PK)", "").replace("(FK)", "")}</tspan>
            </text>
          );
        })}
      </g>
    );
  };

  const Relationship = ({ x1, y1, x2, y2, delay }) => {
    const dash = 220;
    return (
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        fill="none"
        stroke="var(--af-line)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
        strokeDasharray={dash}
        strokeDashoffset={dash}
        style={{
          animation: active ? "erdDraw 600ms ease forwards" : "none",
          animationDelay: active ? `${delay}ms` : "0ms",
        }}
      />
    );
  };

  return (
    <div className="h-full min-h-0">
      <div className="h-full min-h-0 rounded-2xl bg-black/40 ring-1 ring-white/10 p-3 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <p className="text-[10px] font-semibold text-white/70">ERD (exemplo)</p>
          <span className="text-[10px] text-white/40">schema v1</span>
        </div>

        <div className="mt-2 flex-1 min-h-0 flex items-center justify-center">
          <svg viewBox="0 0 340 250" className="w-full max-w-[360px]" preserveAspectRatio="xMidYMid meet">
            <Relationship x1={22 + 140} y1={34 + 52} x2={190} y2={34 + 52} delay={850} />
            <Relationship x1={190 + 70} y1={30 + 92} x2={190 + 70} y2={128} delay={1500} />
            {tables.map((t) => (
              <Table key={t.id} t={t} />
            ))}
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3 px-2 pb-2">
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
            <p className="text-[10px] font-semibold text-white/70">Regras</p>
            <p className="mt-1 text-[10px] text-white/50">
              users 1—N orders, orders 1—N items
            </p>
          </div>
          <div className="rounded-xl bg-white/5 ring-1 ring-white/10 p-3">
            <p className="text-[10px] font-semibold text-white/70">Geração</p>
            <p className="mt-1 text-[10px] text-white/50">
              Migration + Entity + Types vinculados
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes erdIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0px); } }
        @keyframes erdDraw { from { stroke-dashoffset: 220; opacity: 0.15; } to { stroke-dashoffset: 0; opacity: 0.85; } }
      `}</style>
    </div>
  );
}

/* ----------------------------- SCREEN 4: KANBAN ----------------------------- */

function ScreenKanban({ active }) {
  const columns = [
    {
      name: "To Do",
      count: 4,
      cards: [
        { t: "Implement CQRS Handler", tag: "ADR" },
        { t: "Update Container Diagram", tag: "C4" },
        { t: "Add idempotency keys", tag: "ADR" },
        { t: "Define retry policy", tag: "ADR" },
      ],
    },
    {
      name: "In Progress",
      count: 2,
      cards: [
        { t: "Create orders_events table", tag: "ERD", focus: true },
        { t: "Wire gateway routes", tag: "C4" },
      ],
    },
    {
      name: "Review",
      count: 2,
      cards: [
        { t: "Validate projections lag", tag: "ERD" },
        { t: "ADR impact sign-off", tag: "ADR" },
      ],
    },
    {
      name: "Done",
      count: 4,
      cards: [
        { t: "Define Auth boundaries", tag: "ADR" },
        { t: "Schema v1 migration", tag: "ERD" },
        { t: "Add health checks", tag: "C4" },
        { t: "Baseline dashboard", tag: "ERD" },
      ],
    },
  ];

  const cardDelay = (ci, i) => {
    let idx = 0;
    for (let c = 0; c < ci; c++) idx += columns[c].cards.length;
    idx += i;
    return idx * 150;
  };

  return (
    <div className="h-full min-h-0">
      <div className="h-full min-h-0 rounded-2xl bg-black/40 ring-1 ring-white/10 p-3 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <p className="text-[10px] font-semibold text-white/70">Board (scrumban)</p>
          <span className="text-[10px] text-white/40">Sprint 12</span>
        </div>

        <div
          className={cx(
            "mt-3 flex-1 min-h-0 flex gap-2.5 transition-opacity duration-500",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          {columns.map((col, ci) => (
            <div key={col.name} className="w-[84px] flex flex-col min-h-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-white/60">{col.name}</span>
                <span className="rounded-full bg-white/10 px-1.5 text-[9px] text-white/60">{col.count}</span>
              </div>

              <div className="mt-2 space-y-2 min-h-0 overflow-hidden">
                {col.cards.map((c, i) => {
                  const isFocus = !!c.focus;
                  const d = cardDelay(ci, i);

                  return (
                    <div
                      key={`${col.name}-${i}`}
                      className={cx(
                        "relative rounded-lg bg-white/5 ring-1 ring-white/10 p-2.5 text-[9px] text-white/75",
                        isFocus && "border-l-2 border-[var(--af-line)] pl-2",
                      )}
                      style={{
                        opacity: 0,
                        transform: "translateY(-10px)",
                        animation: active ? "kbCardIn 450ms ease forwards" : "none",
                        animationDelay: active ? `${d}ms` : "0ms",
                      }}
                    >
                      <div className="truncate">{c.t}</div>
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-full bg-[var(--af-pin)]/20 px-1.5 py-[2px] text-[8px] font-semibold text-[var(--af-pin)]">
                          {c.tag}
                        </span>
                      </div>

                      {isFocus && (
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            animation: active ? "afPulse 2s ease-in-out infinite" : "none",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes kbCardIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0px); } }
        `}</style>
      </div>
    </div>
  );
}

/* ----------------------------- HERO / NAV / ETC ----------------------------- */

function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
      <div className="flex whitespace-nowrap">
        <div className="animate-[marquee_22s_linear_infinite] flex items-center gap-3 py-4 pr-6">
          <LogoPill icon={Layers}>Architecture-First</LogoPill>
          <LogoPill icon={BookText}>ADRs</LogoPill>
          <LogoPill icon={Boxes}>C4 Model</LogoPill>
          <LogoPill icon={WorkflowIcon}>Event Storming</LogoPill>
          <LogoPill icon={Database}>ERD → Migrations</LogoPill>
          <LogoPill icon={KanbanSquare}>Scrumban</LogoPill>
          <LogoPill icon={ShieldCheck}>Traceability</LogoPill>
          <LogoPill icon={Search}>Single Source of Truth</LogoPill>
        </div>
        <div className="animate-[marquee_22s_linear_infinite] flex items-center gap-3 py-4 pr-6" aria-hidden="true">
          <LogoPill icon={Layers}>Architecture-First</LogoPill>
          <LogoPill icon={BookText}>ADRs</LogoPill>
          <LogoPill icon={Boxes}>C4 Model</LogoPill>
          <LogoPill icon={WorkflowIcon}>Event Storming</LogoPill>
          <LogoPill icon={Database}>ERD → Migrations</LogoPill>
          <LogoPill icon={KanbanSquare}>Scrumban</LogoPill>
          <LogoPill icon={ShieldCheck}>Traceability</LogoPill>
          <LogoPill icon={Search}>Single Source of Truth</LogoPill>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

/**
 * ✅ Navbar corrigida:
 * - clique nos itens faz scroll suave para a seção correta
 * - offset do header é calculado pelo próprio header (ref) (não “chutado”)
 */
function Navbar() {
  const headerRef = useRef(null);

  const links = [
    { label: "Produto", id: "produto" },
    { label: "Pilares", id: "pilares" },
    { label: "Features", id: "features" },
    { label: "Roadmap", id: "roadmap" },
    { label: "Stack", id: "stack" },
  ];

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - headerH - 12; // +12 “respira”

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#top"
          className="inline-flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("top");
          }}
        >
          <img src="/archflow-logo.png" alt="ArchFlow" className="h-12 w-12  object-contain" />
          <span className="text-sm font-semibold tracking-tight text-white">
            ArchFlow<span className="text-white/60">.io</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(l.id);
              }}
              className="text-sm text-white/70 hover:text-white hover:underline hover:decoration-[var(--af-primary)] hover:decoration-2 hover:underline-offset-8 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const fullWord = "arquitetura.";
  const [typed, setTyped] = useState("");
  const [titleDone, setTitleDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let intervalId = null;

    setTyped("");
    setTitleDone(false);

    intervalId = setInterval(() => {
      i += 1;
      setTyped(fullWord.slice(0, i));
      if (i >= fullWord.length) {
        clearInterval(intervalId);
        intervalId = null;
        setTitleDone(true);
      }
    }, 60);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-16" id="top">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Architecture-First</Badge>
              <Badge>Agile by Design</Badge>
              <Badge>Traceability</Badge>
            </div>

            <h1 className="max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight text-white">
              A ferramenta ágil que entende{" "}
              <span className="text-white">
                <span>{typed}</span>
                <span
                  className={cx("ml-1 inline-block w-[1px] h-[1em] align-middle", titleDone && "opacity-0")}
                  style={{
                    background: "var(--af-pin)",
                    animation: titleDone ? "none" : "afCursorBlink 700ms linear infinite",
                  }}
                />
              </span>{" "}
              Não só tasks.
            </h1>

            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
              O <span className="text-white font-medium">ArchFlow</span> coloca{" "}
              <Accent>decisões arquiteturais</Accent>, <Accent>diagramas</Accent> e{" "}
              <Accent>schema</Accent> no centro da gestão ágil — com rastreabilidade completa do conceito ao deploy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/15 hover:ring-[var(--af-line)]/80 hover:text-[var(--af-primary)] transition"
              >
                <Icon as={ArrowRight} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
                Solicitar acesso
              </a>
              <a
                href="#produto"
                className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/85 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 transition"
              >
                <Icon as={ChevronRight} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
                Ver como funciona
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <HeroAnimatedPanel />
          </div>
        </div>

        <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
          <Card className="p-5 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-start gap-3">
              <Icon as={Layers} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
              <div>
                <p className="text-sm font-medium text-white">Menos fragmentação</p>
                <p className="mt-1 text-sm text-white/70">
                  ADRs, diagramas, board e schema no mesmo produto — reduz context switching.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-start gap-3">
              <Icon as={BookText} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
              <div>
                <p className="text-sm font-medium text-white">Documentação viva</p>
                <p className="mt-1 text-sm text-white/70">
                  Versionamento por sprint e vínculo com execução: menos drift.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-start gap-3">
              <Icon as={Target} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
              <div>
                <p className="text-sm font-medium text-white">Onboarding rápido</p>
                <p className="mt-1 text-sm text-white/70">
                  Contexto técnico acessível por card: por que foi feito assim?
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-6 w-full">
          <Marquee />
        </div>
      </div>
    </section>
  );
}

/* -------------------- SECTIONS -------------------- */

function ProblemSolution() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14" id="produto">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionTitle
            icon={Search}
            eyebrow="O problema real"
            title="Ferramentas ágeis não entendem software — só trabalho."
            desc="Jira/Confluence/diagramas/schema vivem separados. A arquitetura vira link perdido e a documentação fica obsoleta."
          />

          <div className="mt-6 space-y-3">
            <CheckRow>Decisões arquiteturais somem em wikis</CheckRow>
            <CheckRow>Diagramas ficam desatualizados</CheckRow>
            <CheckRow>Schema não conversa com backlog</CheckRow>
            <CheckRow>Ninguém sabe o PORQUÊ das escolhas</CheckRow>
          </div>

          <div className="mt-8">
            <Card className="p-6 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Target} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                <div>
                  <p className="text-sm font-semibold text-white">A questão central</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Como construir software de qualidade se as suas ferramentas não entendem arquitetura?
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <SectionTitle
            icon={Layers}
            eyebrow="A solução"
            title="Architecture-First, Agile by Design."
            desc="No ArchFlow, o backlog nasce do contexto técnico: ADR → Diagrama → Story → Schema → Card → Deploy."
          />

          <div className="mt-6">
            <CodeBlock>{`ADR #5: "Usar CQRS para separar leitura/escrita"
├─ Contexto: Sistema com alta carga de leitura
├─ Decisão: Implementar CQRS com Event Sourcing
├─ Consequências: +Escalabilidade, +Complexidade
└─ Status: Aceito (2025-01-15)

Story: "Implementar Command Handler para CreateOrder"
├─ Vinculada a: ADR #5, Container Diagram v2.3
└─ Schema necessário: Tabela orders_events

Kanban Card:
├─ 📐 ADR vinculado (1 clique)
├─ 🎨 Diagrama atualizado (v2.3)
├─ 🗄️ Migration gerada
└─ ✅ Critérios e testes com contexto`}</CodeBlock>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card className="p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={ShieldCheck} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                <div>
                  <p className="text-sm font-semibold text-white">Fonte única</p>
                  <p className="mt-1 text-sm text-white/70">
                    Tudo versionado e vinculado ao trabalho real.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={GitBranch} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                <div>
                  <p className="text-sm font-semibold text-white">Menos drift</p>
                  <p className="mt-1 text-sm text-white/70">
                    Diagramas e schema evoluem junto com o sprint.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Divider />
    </section>
  );
}

function Pillars() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4" id="pilares">
      <SectionTitle
        icon={Layers}
        eyebrow="Diferenciais"
        title="5 pilares que mudam a forma como times constroem software"
        desc="Arquitetura deixa de ser um anexo e vira o centro do fluxo: decisão, design, execução e evolução — rastreáveis."
        align="center"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {pillars.map((p) => (
          <Card key={p.title} className="p-6 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <Icon as={p.icon} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
            </div>

            <div className="mt-4 space-y-3">
              {p.bullets.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center">
                    <Icon as={ChevronRight} className="h-4 w-4 hover:text-[var(--af-pin)]" />
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Divider />
    </section>
  );
}

function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4" id="features">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <SectionTitle
          icon={Sparkles}
          eyebrow="MVP"
          title="Features desenhadas para reduzir fricção e aumentar contexto"
          desc="O ArchFlow conecta gestão ágil com arquitetura e banco — do jeito que dev trabalha."
        />

        <Card className="p-6 lg:w-[420px] hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start gap-3">
            <Icon as={Layers} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
            <div>
              <p className="text-sm font-semibold text-white">Por que isso é diferente?</p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Em vez de “linkar” arquitetura em algum lugar, o produto trata arquitetura como entidade de primeira classe — com
                versionamento, diffs e rastreabilidade.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="accent">ADRs</Badge>
                <Badge tone="accent">C4</Badge>
                <Badge tone="accent">ERD</Badge>
                <Badge tone="accent">Scrumban</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mvpFeatures.map((f) => (
          <Card key={f.title} className="p-6 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-start gap-3">
              <Icon as={f.icon} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
              <div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{f.desc}</p>

                <div className="mt-5">
                  {/* ✅ group só aqui (link), não no card */}
                  <a
                    href="#cta"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-[var(--af-primary)] transition"
                  >
                    Ver exemplo
                    <ArrowRight className="h-4 w-4 text-white/80 transition group-hover:text-[var(--af-pin)]" />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Divider />
    </section>
  );
}

/* Keeping your existing sections below as-is (ArchTaskGraph, Workflow, Roadmap, Stack, CTA)
   — (mantive o resto igual, só ajustando "group" onde causava hover global)
*/

function ArchTaskGraph() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setStart(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const nodes = useMemo(
    () => [
      { label: "ADR", x: 60 },
      { label: "Diagrama C4", x: 180 },
      { label: "User Story", x: 300 },
      { label: "Migration", x: 420 },
      { label: "Card", x: 540 },
      { label: "Deploy", x: 660 },
    ],
    [],
  );

  const lines = useMemo(
    () => [
      { x1: 88, y1: 70, x2: 152, y2: 70, delay: 0 },
      { x1: 208, y1: 70, x2: 272, y2: 70, delay: 600 },
      { x1: 328, y1: 70, x2: 392, y2: 70, delay: 1200 },
      { x1: 448, y1: 70, x2: 512, y2: 70, delay: 1800 },
      { x1: 568, y1: 70, x2: 632, y2: 70, delay: 2400 },
    ],
    [],
  );

  const afterLinesMs = 600 * lines.length + 200;

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-4 py-4">
      <SectionTitle eyebrow="Fluxo visual" title="De uma decisão ao deploy — conectados." />

      <div className="mt-8">
        <Card className="p-6">
          <div className="flex justify-center">
            <svg viewBox="0 0 720 140" className="w-full max-w-4xl" role="img" aria-label="ADR to Deploy flow graph" preserveAspectRatio="xMidYMid meet">
              {lines.map((l, idx) => (
                <line
                  key={idx}
                  x1={l.x1}
                  y1={l.y1}
                  x2={l.x2}
                  y2={l.y2}
                  stroke="var(--af-line)"
                  opacity="0.3"
                  strokeWidth="1.5"
                  strokeDasharray="120"
                  strokeDashoffset="120"
                  style={{
                    animation: start ? `drawLine 600ms ease forwards` : "none",
                    animationDelay: start ? `${l.delay}ms` : "0ms",
                  }}
                />
              ))}

              {nodes.map((n, idx) => (
                <g
                  key={n.label}
                  className="cursor-pointer"
                  style={{
                    transformOrigin: `${n.x}px 70px`,
                    animation: start ? `nodePulse 2000ms ease-in-out infinite` : "none",
                    animationDelay: start ? `${afterLinesMs + idx * 180}ms` : "0ms",
                  }}
                >
                  <circle cx={n.x} cy={70} r={28} fill="#0a0a0a" stroke="var(--af-line)" strokeWidth="1.5" />
                  <text x={n.x} y={74} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.75)" style={{ userSelect: "none" }}>
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="text-xs text-white/50 text-center mt-4">
            Cada nó é rastreável: clique para ver ADR, diagrama, migration e PR vinculados.
          </p>
        </Card>
      </div>

      <Divider />
    </section>
  );
}

function Workflow() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const traceLines = useMemo(
    () => [
      { text: "Decisão (ADR)", kind: "normal" },
      { text: "  ↓", kind: "normal" },
      { text: "Diagrama (C4 / Event Storming)", kind: "normal" },
      { text: "  ↓", kind: "normal" },
      { text: "User Story", kind: "normal" },
      { text: "  ↓", kind: "normal" },
      { text: "Database Schema (ERD/Migration)", kind: "normal" },
      { text: "  ↓", kind: "normal" },
      { text: "Card (Scrumban / Sprint)", kind: "normal" },
      { text: "  ↓", kind: "normal" },
      { text: "Commit → PR → Deploy → Incident", kind: "normal" },
      { text: "  ↑____________________________________|", kind: "normal" },
      { text: "           rastreável + versionado", kind: "accent" },
    ],
    [],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let idx = 0;
    setVisibleCount(0);

    const interval = setInterval(() => {
      idx += 1;
      setVisibleCount(idx);
      if (idx >= traceLines.length) clearInterval(interval);
    }, 400);

    return () => clearInterval(interval);
  }, [started, traceLines.length]);

  return (
    <section ref={sectionRef} className="mx-auto max-w-6xl px-4 py-4">
      <SectionTitle
        icon={WorkflowIcon}
        eyebrow="Fluxo de trabalho"
        title="Como funciona na prática"
        desc="Do ADR ao card: cada etapa mantém o contexto técnico e reduz retrabalho."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {steps.map((s) => (
            <Card key={s.k} className="p-6 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-sm font-semibold text-white/80 hover:ring-[var(--af-line)]/70 hover:text-[var(--af-primary)] transition">
                    {s.k}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-white">{s.title}</h3>
                    <span className="inline-flex items-center">
                      <Icon as={s.icon} className="h-5 w-5 hover:text-[var(--af-pin)]" />
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Traceability graph (exemplo)</p>
              <p className="mt-1 text-sm text-white/70">
                Um “mapa” simples do fluxo que o ArchFlow torna navegável.
              </p>
            </div>
            <Badge tone="accent">One-click context</Badge>
          </div>

          <div className="mt-5">
            <CodeBlock>
              {traceLines.map((l, i) => {
                const isVisible = i < visibleCount;
                const isAccent = l.kind === "accent";

                return (
                  <div
                    key={i}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0px)" : "translateY(8px)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      color: isAccent ? "var(--af-primary)" : undefined,
                      animation: isAccent && isVisible ? "afPulse 2s ease-in-out infinite" : "none",
                      whiteSpace: "pre",
                    }}
                  >
                    {l.text}
                  </div>
                );
              })}
            </CodeBlock>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/4 p-4 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Target} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                <div>
                  <p className="text-xs font-semibold text-white/80">Benefício</p>
                  <p className="mt-1 text-sm text-white/70">Menos “por que isso existe?” no time.</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white/4 p-4 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={BookText} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                <div>
                  <p className="text-xs font-semibold text-white/80">Benefício</p>
                  <p className="mt-1 text-sm text-white/70">Menos documentação obsoleta.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Divider />
    </section>
  );
}

function Roadmap() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4" id="roadmap">
      <SectionTitle
        icon={GitBranch}
        eyebrow="Evolução"
        title="Roadmap orientado a valor (e não a vanity features)"
        desc="Começamos com o núcleo: arquitetura + fluxo + schema. Depois, automações e inteligência."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {roadmap.map((r, idx) => (
          <Card key={r.phase} className="p-6 hover:ring-[var(--af-line)]/40 transition">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon as={r.icon} className="h-5 w-5 hover:text-[var(--af-pin)]" />
                <h3 className="text-base font-semibold text-white">{r.phase}</h3>
              </div>
              <Badge tone="solid">{idx === 0 ? "Agora" : "Depois"}</Badge>
            </div>

            <div className="mt-4 space-y-3">
              {r.items.map((it) => (
                <div key={it} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center">
                    <Icon as={ChevronRight} className="h-4 w-4 hover:text-[var(--af-pin)]" />
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{it}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Divider />
    </section>
  );
}

function Stack() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4" id="stack">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionTitle
            icon={Cpu}
            eyebrow="Tecnologia"
            title="Stack moderna, com foco em performance e DX"
            desc="A base é simples: UI rápida, API sólida e banco robusto. O resto é integração e rastreabilidade."
          />

          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s.name}
                className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 transition"
              >
                <Icon as={s.icon} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
                {s.name}
              </span>
            ))}
          </div>
        </div>

        <Card className="p-6 hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start gap-3">
            <Icon as={Database} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
            <div>
              <p className="text-sm font-semibold text-white">Exemplo: geração de migration</p>
              <p className="mt-1 text-sm text-white/70">
                Quando o schema muda, você quer menos drift e mais rastreabilidade.
              </p>

              <div className="mt-5">
                <CodeBlock>{`Dev adiciona coluna avatar_url em users
↓
Gera automaticamente:
- SQL ALTER TABLE
- Migration (.NET EF Core)
- Entity (C#)
- Type (TS)
- Vínculo com Story + ADR`}</CodeBlock>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge tone="accent">PostgreSQL</Badge>
                <Badge tone="accent">EF Core Migrations</Badge>
                <Badge tone="accent">Entities</Badge>
                <Badge tone="accent">Diff</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Divider />
    </section>
  );
}

function CTA() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pb-20" id="cta">
      <Card className="overflow-hidden hover:ring-[var(--af-line)]/40 transition">
        <div className="relative p-8 md:p-10">
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold text-white/80 hover:text-[var(--af-primary)] transition">
                Ready to ship with context?
              </p>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
                Pare de gerenciar tasks.
                <br />
                Comece a gerenciar{" "}
                <span className="text-white/90 hover:text-[var(--af-primary)] transition">
                  arquitetura + execução
                </span>
                .
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
                Se você quer uma ferramenta ágil que realmente entende software (decisões, diagramas e schema), o ArchFlow foi feito pra isso.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/15 hover:ring-[var(--af-line)]/80 hover:text-[var(--af-primary)] transition"
                >
                  <Icon as={ArrowRight} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
                  Solicitar acesso
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/85 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 transition"
                >
                  <Icon as={ChevronRight} className="h-4 w-4 group-hover:text-[var(--af-pin)]" />
                  Falar com o time
                </a>
              </div>

              <p className="mt-4 text-xs text-white/55">
                Sem spam. Você recebe um email quando o acesso estiver pronto.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-black/50 p-6 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
                <div className="flex items-start gap-3">
                  <Icon as={ShieldCheck} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white/70">O que você ganha</p>
                    <div className="mt-4 space-y-3">
                      <CheckRow>Rastreabilidade real do ADR ao deploy</CheckRow>
                      <CheckRow>Documentação viva e versionada por sprint</CheckRow>
                      <CheckRow>Menos drift em diagramas e schema</CheckRow>
                      <CheckRow>Menos contexto perdido — mais velocidade com qualidade</CheckRow>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/4 p-6 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
                <div className="flex items-start gap-3">
                  <Icon as={Target} className="h-5 w-5 mt-0.5 hover:text-[var(--af-pin)]" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      “Arquitetura{" "}
                      <span className="text-white/90 hover:text-[var(--af-primary)] transition">É</span>{" "}
                      o projeto.”
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      No ArchFlow, arquitetura deixa de ser anexo e vira parte do fluxo — rastreável, versionada e útil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <footer className="mt-10 border-t border-white/10 pt-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <img src="/archflow-logo.png" alt="ArchFlow" className="h-10 w-10 object-contain" />
            <div>
              <p className="text-sm font-semibold text-white">ArchFlow</p>
              <p className="text-xs text-white/55">Architecture-First Project Management</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              ["Produto", "#produto"],
              ["Pilares", "#pilares"],
              ["Features", "#features"],
              ["Roadmap", "#roadmap"],
              ["Stack", "#stack"],
            ].map(([label, href]) => (
              <React.Fragment key={href}>
                <a
                  href={href}
                  className="text-sm text-white/65 hover:text-white hover:underline hover:decoration-[var(--af-primary)] hover:decoration-2 hover:underline-offset-8 transition"
                >
                  {label}
                </a>
                {href !== "#stack" && <span className="text-white/20">•</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} ArchFlow. All rights reserved.
        </p>
      </footer>
    </section>
  );
}

export default function ArchFlowLanding() {
  return (
    <div
      className="min-h-screen w-full bg-[#16171d] text-white"
      style={{
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        ["--af-primary"]: PURPLE_PRIMARY,
        ["--af-line"]: PURPLE_LINE,
        ["--af-pin"]: PURPLE_PIN,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root { color-scheme: dark; }

        html, body { height: 100%; overflow-x: hidden; }
        body { margin: 0; background: #000; }
        html { scroll-behavior: smooth; }

        /* ✅ garante âncora com offset (fallback, caso alguém use #id direto) */
        section[id] { scroll-margin-top: 96px; }

        :root{
          --sb-track: rgba(255,255,255,0.03);
          --sb-thumb-a: rgba(0,0,0,0.22);
          --sb-thumb-b: rgba(0,0,0,0.48);
          --sb-thumb-hover-a: rgba(0,0,0,0.38);
          --sb-thumb-hover-b: rgba(0,0,0,0.68);
          --sb-border: rgba(0,0,0,0.85);
        }

        html, body {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.60) rgba(255,255,255,0.03);
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar,
        *::-webkit-scrollbar { width: 10px; height: 10px; }

        html::-webkit-scrollbar-track,
        body::-webkit-scrollbar-track,
        *::-webkit-scrollbar-track {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04));
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
        }

        html::-webkit-scrollbar-thumb,
        body::-webkit-scrollbar-thumb,
        *::-webkit-scrollbar-thumb {
          border-radius: 999px;
          border: 2px solid var(--sb-border);
          background:
            radial-gradient(80% 120% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 55%),
            linear-gradient(180deg, var(--sb-thumb-a), var(--sb-thumb-b));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06);
        }

        html::-webkit-scrollbar-thumb:hover,
        body::-webkit-scrollbar-thumb:hover,
        *::-webkit-scrollbar-thumb:hover {
          background:
            radial-gradient(80% 120% at 50% 0%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.00) 55%),
            linear-gradient(180deg, var(--sb-thumb-hover-a), var(--sb-thumb-hover-b));
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 10px 26px rgba(0,0,0,0.22),
            inset 0 0 0 1px rgba(255,255,255,0.08);
        }

        html::-webkit-scrollbar-button,
        body::-webkit-scrollbar-button,
        *::-webkit-scrollbar-button { width: 0; height: 0; display: none; }

        html::-webkit-scrollbar-corner,
        body::-webkit-scrollbar-corner,
        *::-webkit-scrollbar-corner { background: transparent; }

        @keyframes afCursorBlink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes afPulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        @keyframes drawLine { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }
        @keyframes nodePulse { 0% { transform: scale(1); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
      `}</style>

      <Navbar />

      <main className="overflow-x-hidden">
        <Hero />
        <ProblemSolution />
        <Pillars />
        <Features />
        <ArchTaskGraph />
        <Workflow />
        <Roadmap />
        <Stack />
        <CTA />
      </main>
    </div>
  );
}