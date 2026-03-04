import "./App.css";

import ArchFlowLanding from "./pages/ArchFlowLanding/ArchFlowLanding";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProjectsHubPage from "./pages/projects/ProjectsHubPage";

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  // TODO: Replace this pathname switch with the project's router config if a client-side router is introduced.
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
