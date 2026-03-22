import { useState, useMemo } from "react";
import { Search, MapPin, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useListJobs } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/JobCard";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const CATEGORIES = ["All", "Engineering", "Design", "Marketing", "Product", "Sales"];

export default function Home() {
  const [keywordFilter, setKeywordFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  
  const [activeCategory, setActiveCategory] = useState("All");
  
  // We use the generated hook from Orval
  // The API supports category, location, type. We map our state to the API query.
  const { data: jobs, isLoading, error } = useListJobs({
    category: activeCategory !== "All" ? activeCategory : undefined,
    location: locationFilter || undefined,
  });

  // Since keyword search isn't in the ListJobsParams schema, we filter the results client-side for UX completeness
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    if (!keywordFilter) return jobs;
    const lowerKeyword = keywordFilter.toLowerCase();
    return jobs.filter((job) => 
      job.title.toLowerCase().includes(lowerKeyword) || 
      job.company.toLowerCase().includes(lowerKeyword)
    );
  }, [jobs, keywordFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] pt-24 pb-32">
          {/* Abstract Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-pattern.png)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent top-auto h-32" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-blue-100 backdrop-blur-md border border-white/10 mb-8">
                <Sparkles className="h-4 w-4" />
                Over 10,000+ jobs added this week
              </span>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-sm max-w-4xl mx-auto leading-tight">
                Find your next <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">dream job</span> today
              </h1>
              <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
                Discover thousands of job opportunities with all the information you need to make the right decision.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-3 shadow-2xl shadow-blue-900/20 flex flex-col md:flex-row gap-3">
                <div className="flex-1 flex items-center bg-transparent px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors focus-within:bg-slate-50 group">
                  <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={keywordFilter}
                    onChange={(e) => setKeywordFilter(e.target.value)}
                    placeholder="Job title or company..."
                    className="w-full bg-transparent border-none focus:ring-0 px-4 text-foreground placeholder:text-muted-foreground font-medium outline-none"
                  />
                </div>
                <div className="hidden md:block w-px bg-border my-2" />
                <div className="flex-1 flex items-center bg-transparent px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors focus-within:bg-slate-50 group">
                  <MapPin className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="City, state, or 'Remote'"
                    className="w-full bg-transparent border-none focus:ring-0 px-4 text-foreground placeholder:text-muted-foreground font-medium outline-none"
                  />
                </div>
                <Button size="lg" className="rounded-2xl shadow-blue-600/30 md:w-32">
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold">Latest Opportunities</h2>
              <p className="text-muted-foreground mt-2 font-medium">Explore the most recent jobs posted on our board.</p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
                    ${activeCategory === category 
                      ? "bg-foreground text-background shadow-md shadow-black/10 scale-105" 
                      : "bg-secondary text-secondary-foreground hover:bg-border"}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Job List */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4 text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="font-medium text-lg">Loading amazing jobs...</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Something went wrong</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                We couldn't load the jobs right now. The API might not be implemented on the backend yet.
              </p>
            </div>
          ) : filteredJobs && filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-border rounded-3xl bg-slate-50/50">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-muted-foreground mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-display">No jobs found</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Try adjusting your search filters or check back later for new opportunities.
              </p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => {
                  setKeywordFilter("");
                  setLocationFilter("");
                  setActiveCategory("All");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
