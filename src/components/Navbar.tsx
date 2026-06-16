import { Link, NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">

        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center border border-primary bg-primary/10 text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            MentorHub
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {[
            { to: "/", label: "Mentores" },
            { to: "/quiero-ser-mentor", label: "Quiero ser mentor" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                cn(
                  "font-mono text-[11px] tracking-[0.2em] uppercase transition-colors",
                  isActive ? "text-primary" : "text-muted hover:text-white"
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/quiero-ser-mentor"
          className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
        >
          Aplicar como mentor
        </Link>

        <Link to="/quiero-ser-mentor" className="font-mono text-[11px] uppercase tracking-widest text-primary sm:hidden">
          Aplicar
        </Link>
      </div>
    </header>
  );
}
