import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Building2, MapPin, DollarSign, Clock, Briefcase, Calendar, Link as LinkIcon, Share2, Loader2, CheckCircle2 } from "lucide-react";
import { useGetJob } from "@workspace/api-client-react";
import { useApplyForJob } from "@/hooks/use-jobs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function JobDetails({ id }: { id: string }) {
  const jobId = parseInt(id, 10);
  const { data: job, isLoading, error } = useGetJob(jobId);
  const { mutate: applyForJob, isPending: isApplying, isSuccess: hasApplied, error: applyError } = useApplyForJob();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl font-bold font-display text-foreground">Job not found</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/">
            <Button className="mt-8 gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const postedDate = new Date(job.postedAt);
  const timeAgo = !isNaN(postedDate.getTime()) 
    ? formatDistanceToNow(postedDate, { addSuffix: true })
    : "Recently";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        {/* Simple Header Banner */}
        <div className="bg-primary h-48 w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-pattern.png)`, backgroundSize: 'cover' }} />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-white/90 hover:text-white mb-6 backdrop-blur-sm bg-black/10 px-3 py-1.5 rounded-full transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to all jobs
          </Link>

          <div className="bg-card rounded-3xl shadow-xl border border-border p-6 md:p-10">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-border">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="h-24 w-24 shrink-0 rounded-2xl border-4 border-card bg-secondary flex items-center justify-center overflow-hidden shadow-lg -mt-16 md:mt-0 relative z-20">
                  {job.logo ? (
                    <img src={job.logo} alt={`${job.company} logo`} className="h-full w-full object-cover bg-white" />
                  ) : (
                    <Building2 className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {job.title}
                  </h1>
                  <div className="text-xl text-muted-foreground font-medium mt-1 flex items-center gap-2">
                    {job.company}
                    {job.featured && (
                      <Badge variant="default" className="text-xs px-2 py-0.5 ml-2">Featured</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm font-medium text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-primary" /> {job.type}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="h-4 w-4 text-primary" /> {job.salary}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0 md:w-48">
                <Button 
                  size="lg" 
                  className="w-full text-lg shadow-primary/20"
                  disabled={isApplying || hasApplied}
                  onClick={() => applyForJob(job.id)}
                >
                  {isApplying ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Applying...</>
                  ) : hasApplied ? (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Applied</>
                  ) : (
                    "Apply Now"
                  )}
                </Button>
                {applyError && <p className="text-xs text-destructive text-center">{applyError.message}</p>}
                
                <Button variant="outline" className="w-full gap-2">
                  <Share2 className="h-4 w-4" /> Share Job
                </Button>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
              
              {/* Left Col: Description */}
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-2xl font-bold font-display mb-4">About the Role</h3>
                  {/* Using whitespace-pre-wrap to respect newlines in the simple string description */}
                  <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </div>
                </section>
              </div>

              {/* Right Col: Meta Info */}
              <div className="space-y-6">
                <div className="bg-secondary/40 rounded-2xl p-6 border border-border">
                  <h4 className="font-bold text-lg mb-4 font-display">Job Overview</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Calendar className="h-3.5 w-3.5" /> Posted
                      </span>
                      <p className="font-medium text-foreground">{timeAgo}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                        <MapPin className="h-3.5 w-3.5" /> Location
                      </span>
                      <p className="font-medium text-foreground">{job.location}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                        <Briefcase className="h-3.5 w-3.5" /> Job Type
                      </span>
                      <p className="font-medium text-foreground">{job.type}</p>
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                        <LinkIcon className="h-3.5 w-3.5" /> Category
                      </span>
                      <p className="font-medium text-foreground">{job.category}</p>
                    </div>

                    {job.salary && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1">
                          <DollarSign className="h-3.5 w-3.5" /> Salary
                        </span>
                        <p className="font-medium text-foreground">{job.salary}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 text-center">
                  <h4 className="font-bold text-lg mb-2 font-display text-primary">Need Help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">Contact our support team if you have any questions about this application.</p>
                  <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                    Contact Support
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
