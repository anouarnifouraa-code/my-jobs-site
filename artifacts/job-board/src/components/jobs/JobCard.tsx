import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { MapPin, DollarSign, Clock, Star } from "lucide-react";
import { type Job } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/ui/company-logo";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const postedDate = new Date(job.postedAt);
  const timeAgo = !isNaN(postedDate.getTime()) 
    ? formatDistanceToNow(postedDate, { addSuffix: true })
    : "Recently";

  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <div className={`
        relative overflow-hidden rounded-2xl bg-card p-6 
        border-2 transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-y-1
        ${job.featured 
          ? 'border-primary/30 shadow-primary/5 hover:border-primary/60 hover:shadow-primary/10 bg-primary/[0.02]' 
          : 'border-border shadow-sm hover:border-primary/30'}
      `}>
        {job.featured && (
          <div className="absolute top-0 right-0">
            <div className="bg-primary/10 text-primary text-xs font-bold px-3 py-1.5 rounded-bl-xl flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary" />
              Featured
            </div>
          </div>
        )}

        <div className="flex items-start gap-5">
          <CompanyLogo logo={job.logo ?? null} company={job.company} size="md" />
          
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {job.title}
            </h3>
            <p className="text-muted-foreground font-medium mt-1 truncate">
              {job.company}
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              {job.salary && (
                <div className="flex items-center text-sm text-muted-foreground gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">{job.type}</Badge>
                <Badge variant="secondary">{job.category}</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground gap-1.5 shrink-0">
                <Clock className="h-3 w-3" />
                {timeAgo}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
