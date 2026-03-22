import { Briefcase } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight">
              JobBoard<span className="text-primary">.</span>
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved. Built with React & Replit.
          </div>
        </div>
      </div>
    </footer>
  );
}
