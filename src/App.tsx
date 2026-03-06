import { useEffect, useState } from "react";

import "./App.css";

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
  if (segments[0] === "projects" && segments[2] === "sprint-backlog") {
    const projectId = segments[1];
    return <SprintBacklogPage projectId={projectId} />;
  }

  if (segments[0] === "projects" && segments[2] === "kanban") {
    const projectId = segments[1];
    return <KanbanPage projectId={projectId} />;
  }

  if (segments[0] === "projects" && segments[2] === "sprint") {
    const projectId = segments[1];
    return <SprintPage projectId={projectId} />;
  }

  if (segments[0] === "projects" && segments[2] === "backlog") {
    const projectId = segments[1];
    return <ProductBacklogPage projectId={projectId} />;
  }

  if (pathname === "/signin") {
    return <SignIn />;
  }

  if (pathname === "/signup") {
    return <SignUp />;
  }

  if (pathname === "/projects") {
    return <ProjectsHubPage />;
  }

  return <ArchFlowLanding />;
}
