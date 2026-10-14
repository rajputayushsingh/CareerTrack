
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  category: { type: String, default: "Internship" },
  salary: { type: String, default: "Not specified" },
  description: { type: String, default: "" }
}, { timestamps: true });

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  status: { type: String, default: "Applied" }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
const Application = mongoose.model("Application", applicationSchema);

app.get("/api/jobs", async (req, res) => {
  try {
    const { search = "", category = "", location = "" } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }

    if (category) filter.category = category;
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Could not fetch jobs" });
  }
});

app.post("/api/jobs", async (req, res) => {
  try {
    const { title, company, location } = req.body;

    if (!title?.trim() || !company?.trim() || !location?.trim()) {
      return res.status(400).json({
        message: "Title, company and location are required"
      });
    }

    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch {
    res.status(400).json({ message: "Could not create job" });
  }
});

app.patch("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch {
    res.status(400).json({ message: "Invalid job ID or data" });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    await Application.deleteMany({ jobId: job._id });
    res.json({ message: "Job deleted successfully" });
  } catch {
    res.status(400).json({ message: "Could not delete job" });
  }
});

app.post("/api/applications", async (req, res) => {
  try {
    const { jobId, name, email } = req.body;

    if (!mongoose.isValidObjectId(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }
    if (!name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const application = await Application.create({
      jobId, name: name.trim(), email: email.trim()
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch {
    res.status(500).json({ message: "Could not submit application" });
  }
});

app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title company")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch {
    res.status(500).json({ message: "Could not fetch applications" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
