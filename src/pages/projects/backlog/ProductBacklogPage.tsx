import ProjectShell from "../../../components/layout/ProjectShell";
import { currentUserProfile, mockProjects, type Project } from "../_mocks/projects.mock";
import { mockProductBacklog } from "./_mocks/productBacklog.mock";

interface ProductBacklogPageProps {
  projectId?: string;
}

const fallbackProject: Project = mockProjects[1] ?? mockProjects[0];

function formatStatusLabel(status: string): string {
  if (status === "in-progress") return "Em andamento";
  if (status === "done") return "Concluída";
  return "A fazer";
}

function formatValueLabel(value: string): string {
  if (value === "high") return "alto";
  if (value === "medium") return "médio";
  return "baixo";
}

function formatComplexityLabel(complexity: string): string {
  if (complexity === "high") return "alta";
  if (complexity === "medium") return "média";
  return "baixa";
}

export default function ProductBacklogPage({
  projectId,
}: ProductBacklogPageProps) {
  const backlog = mockProductBacklog;

  let projectFromParam: Project | undefined;
  if (projectId) {
    projectFromParam = mockProjects.find((project) => project.id === projectId);
  }

  const currentProject: Project = projectFromParam ?? fallbackProject;
  const effectiveProjectId = projectId ?? backlog.projectId;

  const totalStories = backlog.epics.reduce(
    (sum, epic) => sum + epic.userStories.length,
    0,
  );

  return (
    <ProjectShell
      projectId={effectiveProjectId}
      projectName={currentProject.name}
      projectOwnerName={currentProject.ownerName}
      projectOwnerLabel={`Owner • ${currentProject.ownerName}`}
      projectCode="AP"
      projectBadgeLabel={String(currentProject.members.length)}
      activeNavItem="backlog"
      pageTitle="Product Backlog"
      pageSubtitle="Epics e User Stories do projeto, organizados por prioridade e prontidão."
      pageContextLabel="Backlog do produto"
      userName={currentUserProfile.name}
      userInitials={currentUserProfile.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")}
      mainColumn={
        <div className="space-y-4 lg:space-y-5">
          {backlog.epics.map((epic) => {
            const storyCount = epic.userStories.length;

            return (
              <article
                key={epic.id}
                className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4"
              >
                <header className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-sm font-semibold text-white">
                        {epic.name}
                      </h2>

                      <span className="af-surface-sm inline-flex items-center bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                        {epic.priority}
                      </span>
                    </div>

                    <p className="text-xs text-white/60">{epic.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-white/55">
                    <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-1 text-[10px] text-white/70">
                      {storyCount} stories
                    </span>
                  </div>
                </header>

                <div className="mt-3 space-y-2">
                  <div className="af-separator-b flex items-center justify-between gap-3 pb-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                      Epics &amp; User Stories
                    </p>
                  </div>

                  <div className="af-surface-md bg-black/20 px-3 py-2.5">
                    <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/44">
                      <span>Story</span>
                      <span>Assignee</span>
                      <span>Status</span>
                      <span>Value</span>
                      <span>Complexity</span>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      {epic.userStories.slice(0, 3).map((story) => (
                        <div
                          key={story.id}
                          className="grid grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)] items-center gap-3 rounded-none bg-white/[0.02] px-2 py-1.5 text-[11px] text-white/76"
                        >
                          <span className="truncate">{story.title}</span>
                          <span className="truncate text-white/68">
                            {story.assignee}
                          </span>
                          <span className="text-white/70">
                            {formatStatusLabel(story.status)}
                          </span>
                          <span className="text-white/70">
                            {formatValueLabel(story.value)}
                          </span>
                          <span className="text-white/70">
                            {formatComplexityLabel(story.complexity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      }
      sideColumn={
        <>
          <section className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
            <header className="af-separator-b pb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Refinement
                  </h2>
                  <p className="mt-1 text-xs text-white/60">
                    Próximos passos para manter o fluxo saudável.
                  </p>
                </div>

                <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                  Backlog
                </span>
              </div>
            </header>

            <ul className="mt-3 space-y-2.5 text-xs text-white/72">
              <li className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                <p>Manter epics pequenos e stories bem definidos.</p>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                <p>Usar critérios de aceitação objetivos para priorizar.</p>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                <p>Priorizar por valor de negócio e risco mitigado.</p>
              </li>
              <li className="flex gap-2">
                <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                <p>Evitar dependências críticas sem plano de mitigação.</p>
              </li>
            </ul>
          </section>

          <section className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
            <header className="af-separator-b pb-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-white">Métricas</h2>
                  <p className="mt-1 text-xs text-white/60">
                    Visão rápida do backlog.
                  </p>
                </div>

                <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72">
                  Snapshot
                </span>
              </div>
            </header>

            <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="af-surface-md bg-white/5 px-3 py-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Stories
                </dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  {totalStories}
                </dd>
              </div>

              <div className="af-surface-md bg-white/5 px-3 py-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Epics
                </dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  {backlog.epics.length}
                </dd>
              </div>
            </dl>
          </section>
        </>
      }
    />
  );
}

// TODO: Wire this page into the router once a client-side routing strategy
// (e.g. react-router) is introduced. Intended path:
//   /projects/:projectId/backlog -> ProductBacklogPage

