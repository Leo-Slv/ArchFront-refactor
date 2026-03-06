import ProjectShell from "../../../components/layout/ProjectShell";
import StorySprintCard from "../../../components/sprint-backlog/StorySprintCard";
import WorkloadPanel from "../../../components/sprint-backlog/WorkloadPanel";
import {
  currentUserProfile,
  mockProjects,
  type Project,
} from "../_mocks/projects.mock";
import { buildSprintBacklogView } from "./_mocks/sprintBacklog.mock";

interface SprintBacklogPageProps {
  projectId?: string;
}

const fallbackProject: Project = mockProjects[1] ?? mockProjects[0];

function formatDate(dateISO: string): string {
  const date = new Date(dateISO);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function buildPeriodLabel(startDate: string, endDate: string): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

export default function SprintBacklogPage({
  projectId,
}: SprintBacklogPageProps) {
  const sprintBacklogView = buildSprintBacklogView();
  const {
    sprint,
    stories,
    assignees,
    storyCount,
    taskCount,
    estimatedHours,
    doneHours,
    remainingHours,
  } = sprintBacklogView;

  let projectFromParam: Project | undefined;
  if (projectId) {
    projectFromParam = mockProjects.find((project) => project.id === projectId);
  }

  const currentProject: Project = projectFromParam ?? fallbackProject;
  const effectiveProjectId = projectId ?? sprint.projectId;
  const periodLabel = buildPeriodLabel(sprint.startDate, sprint.endDate);

  return (
    <ProjectShell
      projectId={effectiveProjectId}
      projectName={currentProject.name}
      projectOwnerName={currentProject.ownerName}
      projectOwnerLabel={`Owner • ${currentProject.ownerName}`}
      projectCode="AP"
      projectBadgeLabel={String(currentProject.members.length)}
      activeNavItem="sprint-backlog"
      pageTitle="Sprint Backlog"
      pageSubtitle="Stories planejadas para entrega nesta sprint, com tarefas e distribuição por responsável."
      pageContextLabel={`${sprint.name} - itens planejados`}
      userName={currentUserProfile.name}
      userInitials={currentUserProfile.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")}
      mainColumn={
        <section className="af-surface-lg bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
          <header className="af-separator-b pb-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">
                  User Stories na Sprint
                </h2>
                <p className="mt-1 text-xs text-white/60">
                  Itens planejados para entrega em {periodLabel}.
                </p>
              </div>

              <span className="af-surface-sm inline-flex items-center bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/72">
                {storyCount} stories
              </span>
            </div>
          </header>

          <div className="mt-3 space-y-3">
            {stories.map((story) => (
              <StorySprintCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      }
      sideColumn={
        <WorkloadPanel
          assignees={assignees}
          storyCount={storyCount}
          taskCount={taskCount}
          estimatedHours={estimatedHours}
          doneHours={doneHours}
          remainingHours={remainingHours}
        />
      }
    />
  );
}
