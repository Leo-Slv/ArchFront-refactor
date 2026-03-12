import { useEffect, useState } from "react";

import "./App.css";

import LoadingScreen from "./components/ui/LoadingScreen";
import { ProjectSprintProvider } from "./contexts/ProjectSprintContext";
import { useGlobalLoadingVisibility } from "./hooks/useGlobalLoading";
import ArchFlowLanding from "./pages/ArchFlowLanding/ArchFlowLanding";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProjectsHubPage from "./pages/projects/ProjectsHubPage";
import ProductBacklogPage from "./pages/projects/backlog/ProductBacklogPage";
import KanbanPage from "./pages/projects/kanban/KanbanPage";
import SprintBacklogPage from "./pages/projects/sprint-backlog/SprintBacklogPage";
import SprintPage from "./pages/projects/sprint/SprintPage";

function getPathname(): string {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export default function App() {
  const [pathname, setPathname] = useState(getPathname);
  const isGlobalLoadingVisible = useGlobalLoadingVisibility();

  useEffect(() => {
    function handleLocationChange() {
      setPathname(getPathname());
    }

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const segments = pathname.split("/").filter(Boolean);

  // TODO: Replace this pathname switch with the project's router config if a client-side router is introduced.
  let page = <ArchFlowLanding />;

  if (segments[0] === "projects" && segments[1]) {
    const projectId = segments[1];

    let projectPage = null;

    if (segments[2] === "sprint-backlog") {
      projectPage = <SprintBacklogPage projectId={projectId} />;
    } else if (segments[2] === "kanban") {
      projectPage = <KanbanPage projectId={projectId} />;
    } else if (segments[2] === "sprint") {
      projectPage = <SprintPage projectId={projectId} />;
    } else if (segments[2] === "backlog") {
      projectPage = <ProductBacklogPage projectId={projectId} />;
    }

    if (projectPage) {
      page = <ProjectSprintProvider>{projectPage}</ProjectSprintProvider>;
    }
  }

  if (pathname === "/signin") {
    page = <SignIn />;
  }

  if (pathname === "/signup") {
    page = <SignUp />;
  }

  if (pathname === "/projects") {
    page = <ProjectsHubPage />;
  }

  return (
    <>
      {page}
      <LoadingScreen isVisible={isGlobalLoadingVisible} />
    </>
  );
}
