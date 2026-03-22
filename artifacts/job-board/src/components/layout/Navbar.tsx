import { Link } from "wouter";
import { Briefcase, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PostJobDialog } from "@/components/jobs/PostJobDialog";

export function Navbar() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="font-display text-2xl font-bold tracking-tight">
                  JobBoard<span className="text-primary">.</span>
                </span>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Find Jobs
              </Link>
              <div className="h-6 w-px bg-border hidden sm:block"></div>
              <Button onClick={() => setIsPostModalOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Post a Job</span>
                <span className="sm:hidden">Post</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isPostModalOpen && (
        <PostJobDialog onClose={() => setIsPostModalOpen(false)} />
      )}
    </>
  );
}
