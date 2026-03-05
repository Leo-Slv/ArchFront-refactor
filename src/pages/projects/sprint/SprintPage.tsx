import ProjectShell from "../../../components/layout/ProjectShell";
import BurndownChart from "../../../components/sprint/BurndownChart";
import SprintSummaryCard from "../../../components/sprint/SprintSummaryCard";
import SprintTasksPanel from "../../../components/sprint/SprintTasksPanel";
import {
  buildMockSprintView,
  type Sprint,
} from "./_mocks/sprint.mock";
import {
  currentUserProfile,
  mockProjects,
  type Project,
} from "../_mocks/projects.mock";

interface SprintPageProps {
  projectId?: string;
}

function formatDate(dateISO: string): string {
  const date = new Date(dateISO);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function buildPeriodLabel(sprint: Sprint): string {
  return `${formatDate(sprint.startDate)} – ${formatDate(sprint.endDate)}`;
}

const fallbackProject: Project = mockProjects[1] ?? mockProjects[0];

export default function SprintPage({ projectId }: SprintPageProps) {
  const sprintView = buildMockSprintView();
  const { sprint, taskViews, burndownPoints, scopeHours, burnedHours, remainingHours } =
    sprintView;

  let projectFromParam: Project | undefined;
  if (projectId) {
    projectFromParam = mockProjects.find((project) => project.id === projectId);
  }

  const currentProject: Project = projectFromParam ?? fallbackProject;
  const effectiveProjectId = projectId ?? sprint.projectId;

  const periodLabel = buildPeriodLabel(sprint);

  return (
    <ProjectShell
      projectId={effectiveProjectId}
      projectName={currentProject.name}
      projectOwnerName={currentProject.ownerName}
      projectOwnerLabel={`Owner • ${currentProject.ownerName}`}
      projectCode="AP"
      projectBadgeLabel={String(currentProject.members.length)}
      activeNavItem="sprint"
      pageTitle="Sprint"
      pageSubtitle={sprint.goal}
      pageContextLabel={`${sprint.name} • ${periodLabel}`}
      userName={currentUserProfile.name}
      userInitials={currentUserProfile.name
        .split(" ")
        .map((part) => part.charAt(0))
        .slice(0, 2)
        .join("")}
      mainColumn={
        <div className="space-y-4 lg:space-y-5">
          <SprintSummaryCard
            sprint={sprint}
            scopeHours={scopeHours}
            burnedHours={burnedHours}
            remainingHours={remainingHours}
            periodLabel={periodLabel}
          />

          <section className="af-surface-lg min-w-0 w-full bg-[#14121a]/70 px-4 py-4 sm:px-5 sm:py-4">
            <BurndownChart
              points={burndownPoints}
              scopeHours={scopeHours}
              burnedHours={burnedHours}
              remainingHours={remainingHours}
            />
          </section>
        </div>
      }
      sideColumn={<SprintTasksPanel tasks={taskViews} />}
    />
  );
}

