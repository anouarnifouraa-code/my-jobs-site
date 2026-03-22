import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { jobsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/jobs", async (req, res) => {
  const { category, location, type } = req.query as Record<string, string | undefined>;

  let query = db.select().from(jobsTable);
  const jobs = await query;

  let filtered = jobs;
  if (category) filtered = filtered.filter(j => j.category.toLowerCase() === category.toLowerCase());
  if (location) filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
  if (type) filtered = filtered.filter(j => j.type.toLowerCase() === type.toLowerCase());

  res.json(filtered.map(j => ({
    id: j.id,
    title: j.title,
    company: j.company,
    location: j.location,
    type: j.type,
    category: j.category,
    salary: j.salary,
    description: j.description,
    logo: j.logo,
    postedAt: j.postedAt,
    featured: j.featured,
  })));
});

router.get("/jobs/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid job ID" });
    return;
  }

  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, id));

  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }

  res.json({
    id: job.id,
    title: job.title,
    company: job.company,
    location: job.location,
    type: job.type,
    category: job.category,
    salary: job.salary,
    description: job.description,
    logo: job.logo,
    postedAt: job.postedAt,
    featured: job.featured,
  });
});

export default router;
