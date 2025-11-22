import type { ReactNode } from "react";
import Logo from "../ui/Logo.tsx";

export default function NavBar({ children }: { children: ReactNode }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
