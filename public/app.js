
const jobList = document.getElementById("jobList");
const jobCount = document.getElementById("jobCount");
const message = document.getElementById("message");

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

function renderJobs(jobs) {
  jobList.replaceChildren();
  jobCount.textContent = `${jobs.length} opportunities`;

  if (!jobs.length) {
    message.textContent = "No opportunities found. Try another search.";
    return;
  }

  message.textContent = "";

  jobs.forEach((job) => {
    const card = createElement("article", "job-card", "");
    const tag = createElement("span", "tag", job.category);
    const title = createElement("h3", "", job.title);
    const company = createElement("p", "company", job.company);
    const location = createElement("p", "job-meta", `📍 ${job.location}`);
    const salary = createElement("p", "job-meta", `💰 ${job.salary || "Not specified"}`);
    const description = createElement(
      "p", "job-meta", job.description || "Explore this opportunity."
    );
    const apply = createElement("button", "", "Apply Now");

    apply.type = "button";
    apply.addEventListener("click", () => applyForJob(job._id));

    card.append(tag, title, company, location, salary, description, apply);
    jobList.append(card);
  });
}

async function loadJobs() {
  message.textContent = "Loading opportunities...";

  const params = new URLSearchParams();
  const search = document.getElementById("search").value.trim();
  const location = document.getElementById("location").value.trim();
  const category = document.getElementById("category").value;

  if (search) params.set("search", search);
  if (location) params.set("location", location);
  if (category) params.set("category", category);

  try {
    const jobs = await request(`/api/jobs?${params.toString()}`);
    renderJobs(jobs);
  } catch (error) {
    jobCount.textContent = "";
    message.textContent = `${error.message}. Check the server and database.`;
  }
}

async function applyForJob(jobId) {
  const name = prompt("Enter your full name:");
  if (!name || !name.trim()) return;

  const email = prompt("Enter your email address:");
  if (!email || !email.trim()) return;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    const result = await request("/api/applications", {
      method: "POST",
      body: JSON.stringify({
        jobId,
        name: name.trim(),
        email: email.trim()
      })
    });

    alert(result.message);
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  loadJobs();
});

document.getElementById("jobForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formMessage = document.getElementById("formMessage");
  const formData = new FormData(form);
  const job = Object.fromEntries(formData.entries());

  try {
    await request("/api/jobs", {
      method: "POST",
      body: JSON.stringify(job)
    });

    form.reset();
    formMessage.textContent = "Opportunity added successfully!";
    await loadJobs();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

loadJobs();
