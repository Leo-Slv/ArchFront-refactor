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
 * Existing structure/content/style preserved.
 *
 * Implemented:
 * 1) Typewriter in Hero() for "arquitetura." (60ms/char, cursor blinks 2s then disappears)
 * 2) Workflow() trace graph: sequential line reveal (400ms), fade+translate, accent pulse, IntersectionObserver
 * 3) New ArchTaskGraph() section between Features() and Workflow(): SVG draw lines + node pulse (IntersectionObserver threshold 0.4)
 *
 * Also: removed horizontal scroll (global + CodeBlock)
 */

const PURPLE_PRIMARY = "#6D28D9";
const PURPLE_LINE = "#7C3AED";
const PURPLE_PIN = "#6D28D9";

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
        tones[tone] || tones.default
      )}
    >
      {children}
    </span>
  );
};

const Card = ({ children, className }) => (
  <div
    className={cx(
      "relative rounded-2xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-md",
      "shadow-[0_0_0_1px_rgba(255,255,255,.02),0_24px_70px_rgba(0,0,0,.55)]",
      className
    )}
  >
    <div className="relative">{children}</div>
  </div>
);

const Divider = () => <div className="my-14 h-px w-full bg-white/10" />;

/** removed horizontal scroll: no overflow-x-auto; allow wrap */
const CodeBlock = ({ children }) => (
  <pre className="overflow-x-hidden whitespace-pre-wrap break-words rounded-2xl bg-black/60 p-5 text-[12px] leading-relaxed text-white/80 ring-1 ring-white/10">
    <code className="whitespace-pre-wrap break-words">{children}</code>
  </pre>
);

const Icon = ({ as: As, className }) => (
  <As
    className={cx(
      "h-4 w-4 text-white/80 group-hover:text-[var(--af-pin)] transition",
      className
    )}
    aria-hidden="true"
  />
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
          align === "center" && "justify-center"
        )}
      >
        <span className="group inline-flex items-center">
          <Icon as={IconComp} className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium tracking-wide text-white/70">
          {eyebrow}
        </p>
      </div>
    )}
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
      {title}
    </h2>
    {desc && (
      <p className="mt-3 text-base leading-relaxed text-white/70">{desc}</p>
    )}
  </div>
);

const LogoPill = ({ children, icon: IconComp = Sparkles }) => (
  <div className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 hover:text-white transition">
    <Icon as={IconComp} className="h-4 w-4" />
    {children}
  </div>
);

const CheckRow = ({ children }) => (
  <div className="group flex items-start gap-3">
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center">
      <Icon as={CheckCircle2} className="h-5 w-5" />
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
        <div
          className="animate-[marquee_22s_linear_infinite] flex items-center gap-3 py-4 pr-6"
          aria-hidden="true"
        >
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function Navbar() {
  const links = [
    { label: "Produto", href: "#produto" },
    { label: "Pilares", href: "#pilares" },
    { label: "Features", href: "#features" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Stack", href: "#stack" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="group inline-flex items-center gap-2">
          <Icon as={Sparkles} className="h-5 w-5" />
          <span className="text-sm font-semibold tracking-tight text-white">
            ArchFlow<span className="text-white/60">.io</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-white hover:underline hover:decoration-[var(--af-primary)] hover:decoration-2 hover:underline-offset-8 transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#cta"
            className="group hidden sm:inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 hover:text-white ring-1 ring-white/10 hover:ring-[var(--af-line)]/70 bg-white/5 hover:bg-white/8 transition"
          >
            <Icon as={ArrowRight} className="h-4 w-4" />
            Ver demo
          </a>
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/15 hover:ring-[var(--af-line)]/80 hover:text-[var(--af-primary)] transition"
          >
            <Icon as={ArrowRight} className="h-4 w-4" />
            Começar
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  // 1) Typewriter for "arquitetura."
  const fullWord = "arquitetura.";
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [blinkCursor, setBlinkCursor] = useState(false);

  useEffect(() => {
    let i = 0;
    let intervalId = null;
    let timeoutId = null;

    // reset (in case of hot reload)
    setTyped("");
    setShowCursor(true);
    setBlinkCursor(false);

    intervalId = setInterval(() => {
      i += 1;
      setTyped(fullWord.slice(0, i));

      if (i >= fullWord.length) {
        clearInterval(intervalId);
        intervalId = null;

        setBlinkCursor(true);
        timeoutId = setTimeout(() => {
          setShowCursor(false);
          setBlinkCursor(false);
        }, 2000);
      }
    }, 60);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div
        className="relative mx-auto max-w-6xl px-4 pt-16 pb-10 md:pt-24 md:pb-16"
        id="top"
      >
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
              {showCursor && (
                <span
                  style={{
                    color: "var(--af-primary)",
                    animation: blinkCursor
                      ? "afCursorBlink 700ms linear infinite"
                      : "none",
                  }}
                >
                  |
                </span>
              )}
            </span>{" "}
            Não só tasks.
          </h1>

          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-white/75">
            O <span className="text-white font-medium">ArchFlow</span> coloca{" "}
            <Accent>decisões arquiteturais</Accent>, <Accent>diagramas</Accent> e{" "}
            <Accent>schema</Accent> no centro da gestão ágil — com rastreabilidade
            completa do conceito ao deploy.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#cta"
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/15 hover:ring-[var(--af-line)]/80 hover:text-[var(--af-primary)] transition"
            >
              <Icon as={ArrowRight} className="h-4 w-4" />
              Solicitar acesso
            </a>
            <a
              href="#produto"
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/85 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 transition"
            >
              <Icon as={ChevronRight} className="h-4 w-4" />
              Ver como funciona
            </a>
          </div>

          <div className="mt-4 grid w-full gap-4 md:grid-cols-3">
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Layers} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Menos fragmentação
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    ADRs, diagramas, board e schema no mesmo produto — reduz
                    context switching.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={BookText} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Documentação viva
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Versionamento por sprint e vínculo com execução: menos drift.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Target} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Onboarding rápido
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Contexto técnico acessível por card: por que foi feito assim?
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-8 w-full">
            <Marquee />
          </div>
        </div>
      </div>
    </section>
  );
}

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
            <Card className="group p-6 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Target} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    A questão central
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Como construir software de qualidade se as suas ferramentas
                    não entendem arquitetura?
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
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={ShieldCheck} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Fonte única</p>
                  <p className="mt-1 text-sm text-white/70">
                    Tudo versionado e vinculado ao trabalho real.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={GitBranch} className="h-5 w-5 mt-0.5" />
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
          <Card
            key={p.title}
            className="group p-6 hover:ring-[var(--af-line)]/40 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <Icon as={p.icon} className="h-5 w-5 mt-0.5" />
            </div>

            <div className="mt-4 space-y-3">
              {p.bullets.map((b) => (
                <div key={b} className="group flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center">
                    <Icon as={ChevronRight} className="h-4 w-4" />
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

        <Card className="group p-6 lg:w-[420px] hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start gap-3">
            <Icon as={Layers} className="h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                Por que isso é diferente?
              </p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Em vez de “linkar” arquitetura em algum lugar, o produto trata
                arquitetura como entidade de primeira classe — com versionamento,
                diffs e rastreabilidade.
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
          <Card
            key={f.title}
            className="group p-6 hover:ring-[var(--af-line)]/40 transition"
          >
            <div className="flex items-start gap-3">
              <Icon as={f.icon} className="h-5 w-5 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {f.desc}
                </p>

                <div className="mt-5">
                  <a
                    href="#cta"
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-[var(--af-primary)] transition"
                  >
                    Ver exemplo{" "}
                    <ArrowRight className="h-4 w-4 text-white/80 group-hover:text-[var(--af-pin)] transition" />
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

/**
 * 3) Seção visual: Arquitetura ↔ Tasks — nova seção entre Features() e Workflow()
 * - IntersectionObserver threshold 0.4
 * - Lines draw sequentially (600ms each, staggered)
 * - Nodes pulse after all lines drawn (staggered)
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
      { threshold: 0.4 }
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
    []
  );

  const lines = useMemo(
    () => [
      { x1: 88, y1: 70, x2: 152, y2: 70, delay: 0 },
      { x1: 208, y1: 70, x2: 272, y2: 70, delay: 600 },
      { x1: 328, y1: 70, x2: 392, y2: 70, delay: 1200 },
      { x1: 448, y1: 70, x2: 512, y2: 70, delay: 1800 },
      { x1: 568, y1: 70, x2: 632, y2: 70, delay: 2400 },
    ],
    []
  );

  const afterLinesMs = 600 * lines.length + 200;

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-4 py-4">
      <SectionTitle
        eyebrow="Fluxo visual"
        title="De uma decisão ao deploy — conectados."
      />

      <div className="mt-8">
        <Card className="p-6">
          <div className="flex justify-center">
            <svg
              viewBox="0 0 720 140"
              className="w-full max-w-4xl"
              role="img"
              aria-label="ADR to Deploy flow graph"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* connections */}
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

              {/* nodes */}
              {nodes.map((n, idx) => (
                <g
                  key={n.label}
                  className="cursor-pointer"
                  style={{
                    transformOrigin: `${n.x}px 70px`,
                    animation: start
                      ? `nodePulse 2000ms ease-in-out infinite`
                      : "none",
                    animationDelay: start
                      ? `${afterLinesMs + idx * 180}ms`
                      : "0ms",
                  }}
                  onClick={() => {
                    // placeholder interaction; you can wire routing later
                    // eslint-disable-next-line no-console
                    console.log(`Clicked node: ${n.label}`);
                  }}
                >
                  <title>{n.label}</title>
                  <circle
                    cx={n.x}
                    cy={70}
                    r={28}
                    fill="#0a0a0a"
                    stroke="var(--af-line)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={n.x}
                    y={74}
                    textAnchor="middle"
                    fontSize="8"
                    fill="rgba(255,255,255,0.75)"
                    style={{ userSelect: "none" }}
                  >
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="text-xs text-white/50 text-center mt-4">
            Cada nó é rastreável: clique para ver ADR, diagrama, migration e PR
            vinculados.
          </p>
        </Card>
      </div>

      <Divider />
    </section>
  );
}

/**
 * 2) Workflow trace animation
 * - IntersectionObserver triggers when section enters viewport
 * - reveal each line every 400ms
 * - fade-in + translateY(8px → 0) w/ transition 0.35s
 * - final "rastreável + versionado" in var(--af-primary) + pulse after appear
 */
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
    []
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
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let idx = 0;
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
            <Card
              key={s.k}
              className="group p-6 hover:ring-[var(--af-line)]/40 transition"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-sm font-semibold text-white/80 hover:ring-[var(--af-line)]/70 hover:text-[var(--af-primary)] transition">
                    {s.k}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-white">
                      {s.title}
                    </h3>
                    <span className="group inline-flex items-center">
                      <Icon as={s.icon} className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-white/70 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="group p-6 hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">
                Traceability graph (exemplo)
              </p>
              <p className="mt-1 text-sm text-white/70">
                Um “mapa” simples do fluxo que o ArchFlow torna navegável.
              </p>
            </div>
            <Badge tone="accent">One-click context</Badge>
          </div>

          <div className="mt-5">
            {/* Replaces static CodeBlock: sequential reveal lines */}
            <CodeBlock>
              {traceLines.map((l, i) => {
                const isVisible = i < visibleCount;
                const isAccent = l.kind === "accent";

                return (
                  <div
                    key={i}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0px)"
                        : "translateY(8px)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      color: isAccent ? "var(--af-primary)" : undefined,
                      animation:
                        isAccent && isVisible
                          ? "afPulse 2s ease-in-out infinite"
                          : "none",
                      whiteSpace: "pre", // keep the linked node layout intact
                    }}
                  >
                    {l.text}
                  </div>
                );
              })}
            </CodeBlock>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="group rounded-xl bg-white/4 p-4 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Target} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white/80">Benefício</p>
                  <p className="mt-1 text-sm text-white/70">
                    Menos “por que isso existe?” no time.
                  </p>
                </div>
              </div>
            </div>
            <div className="group rounded-xl bg-white/4 p-4 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={BookText} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-white/80">Benefício</p>
                  <p className="mt-1 text-sm text-white/70">
                    Menos documentação obsoleta.
                  </p>
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
          <Card
            key={r.phase}
            className="group p-6 hover:ring-[var(--af-line)]/40 transition"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon as={r.icon} className="h-5 w-5" />
                <h3 className="text-base font-semibold text-white">{r.phase}</h3>
              </div>
              <Badge tone="solid">{idx === 0 ? "Agora" : "Depois"}</Badge>
            </div>

            <div className="mt-4 space-y-3">
              {r.items.map((it) => (
                <div key={it} className="group flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center">
                    <Icon as={ChevronRight} className="h-4 w-4" />
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
                <Icon as={s.icon} className="h-4 w-4" />
                {s.name}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Sparkles} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Performance</p>
                  <p className="mt-1 text-sm text-white/70">
                    UI “snappy” com layout limpo e foco no que importa.
                  </p>
                </div>
              </div>
            </Card>
            <Card className="group p-5 hover:ring-[var(--af-line)]/40 transition">
              <div className="flex items-start gap-3">
                <Icon as={Cpu} className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Escalabilidade
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    Arquitetura e schema versionados ajudam a escalar sem perder
                    contexto.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="group p-6 hover:ring-[var(--af-line)]/40 transition">
          <div className="flex items-start gap-3">
            <Icon as={Database} className="h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">
                Exemplo: geração de migration
              </p>
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
      <Card className="group overflow-hidden hover:ring-[var(--af-line)]/40 transition">
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
                Se você quer uma ferramenta ágil que realmente entende software
                (decisões, diagramas e schema), o ArchFlow foi feito pra isso.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/15 hover:ring-[var(--af-line)]/80 hover:text-[var(--af-primary)] transition"
                >
                  <Icon as={ArrowRight} className="h-4 w-4" />
                  Solicitar acesso
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white/85 hover:text-white bg-white/5 hover:bg-white/8 ring-1 ring-white/10 hover:ring-[var(--af-line)]/60 transition"
                >
                  <Icon as={ChevronRight} className="h-4 w-4" />
                  Falar com o time
                </a>
              </div>

              <p className="mt-4 text-xs text-white/55">
                Sem spam. Você recebe um email quando o acesso estiver pronto.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="group rounded-2xl bg-black/50 p-6 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
                <div className="flex items-start gap-3">
                  <Icon as={ShieldCheck} className="h-5 w-5 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white/70">
                      O que você ganha
                    </p>
                    <div className="mt-4 space-y-3">
                      <CheckRow>Rastreabilidade real do ADR ao deploy</CheckRow>
                      <CheckRow>
                        Documentação viva e versionada por sprint
                      </CheckRow>
                      <CheckRow>Menos drift em diagramas e schema</CheckRow>
                      <CheckRow>
                        Menos contexto perdido — mais velocidade com qualidade
                      </CheckRow>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl bg-white/4 p-6 ring-1 ring-white/10 hover:ring-[var(--af-line)]/40 transition">
                <div className="flex items-start gap-3">
                  <Icon as={Target} className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      “Arquitetura{" "}
                      <span className="text-white/90 hover:text-[var(--af-primary)] transition">
                        É
                      </span>{" "}
                      o projeto.”
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      No ArchFlow, arquitetura deixa de ser anexo e vira parte do
                      fluxo — rastreável, versionada e útil.
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
          <div className="group flex items-center gap-2">
            <Icon as={Sparkles} className="h-5 w-5" />
            <div>
              <p className="text-sm font-semibold text-white">ArchFlow</p>
              <p className="text-xs text-white/55">
                Architecture-First Project Management
              </p>
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
      className="min-h-screen w-full overflow-x-hidden bg-black text-white"
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

        html, body { height: 100%; overflow-x: hidden; }
        body { margin: 0; }

        /* 1) Hero cursor blink */
        @keyframes afCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* 2) Trace label pulse */
        @keyframes afPulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        /* 3) SVG line draw */
        @keyframes drawLine {
          from { stroke-dashoffset: 120; }
          to { stroke-dashoffset: 0; }
        }

        /* 3) SVG node pulse */
        @keyframes nodePulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Pillars />
        <Features />

        {/* 3) new section between Features and Workflow */}
        <ArchTaskGraph />

        {/* 2) Workflow with trace animation */}
        <Workflow />

        <Roadmap />
        <Stack />
        <CTA />
      </main>
    </div>
  );
}