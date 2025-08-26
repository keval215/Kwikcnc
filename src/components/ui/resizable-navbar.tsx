"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Container for the whole navbar (fixed, blurred background)
export function Navbar({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-black/10",
        "bg-white/80 backdrop-blur-md dark:bg-industrial-black/60",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-3">{children}</div>
    </nav>
  );
}

// Desktop layout row
export function NavBody({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("hidden md:flex items-center justify-between gap-6", className)}>
      {children}
    </div>
  );
}

// Simple KWIKCNC logo text (stencil)
export function NavbarLogo({ className }: { className?: string }) {
  return (
    <a href="#" className={cn("font-stencil text-2xl md:text-3xl font-bold text-industrial-black dark:text-white", className)}>
      KWIKCNC
    </a>
  );
}

// Desktop nav items (hidden on small screens)
export function NavItems({ items, className }: { items: { name: string; link: string }[]; className?: string }) {
  return (
    <div className={cn("hidden md:flex items-center gap-8", className)}>
      {items.map((item, idx) => (
        <a
          key={`nav-link-${idx}`}
          href={item.link}
          className={cn(
            "text-industrial-black/80 hover:text-industrial-black transition-colors",
            "font-stencil"
          )}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}

// Button with variants. Primary = black -> white on hover. Secondary = outline.
export function NavbarButton({
  variant = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }) {
  const base = "px-6 py-3 font-stencil-display font-bold transition-all duration-300 pill-cut-corner";
  const variants = {
    primary: cn(
      "bg-industrial-black text-white hover:bg-white hover:text-industrial-black hover:ring-2 hover:ring-industrial-black"
    ),
    secondary: cn(
      "bg-white text-industrial-black border-2 border-industrial-black hover:bg-industrial-black hover:text-white"
    ),
  } as const;

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

// Mobile containers
export function MobileNav({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("md:hidden", className)}>{children}</div>;
}

export function MobileNavHeader({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("flex items-center justify-between", className)}>{children}</div>;
}

export function MobileNavToggle({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      aria-label="Toggle Menu"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10",
        "bg-white/80 hover:bg-white transition-colors"
      )}
    >
      <span className="sr-only">Toggle Menu</span>
      <div className="flex flex-col items-center justify-center gap-1.5">
        <span className={cn("block h-0.5 w-5 bg-industrial-black transition-transform", isOpen && "translate-y-1.5 rotate-45")}></span>
        <span className={cn("block h-0.5 w-5 bg-industrial-black transition-opacity", isOpen && "opacity-0")}></span>
        <span className={cn("block h-0.5 w-5 bg-industrial-black transition-transform", isOpen && "-translate-y-1.5 -rotate-45")}></span>
      </div>
    </button>
  );
}

export function MobileNavMenu({ isOpen, className, children, onClose }: React.PropsWithChildren<{ isOpen: boolean; className?: string; onClose?: () => void }>) {
  return (
    <div
      className={cn(
        "mt-3 grid grid-cols-1 gap-4 overflow-hidden rounded-lg border border-black/10 bg-white/95 p-4 shadow-sm",
        isOpen ? "block" : "hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
