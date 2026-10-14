# CareerTrack – Job & Internship Portal 🚀

CareerTrack is a beginner-friendly full-stack web application that helps students explore job opportunities and internships. Users can search for jobs, filter opportunities, and submit applications through a simple and responsive interface.

## ✨ Features

- 📋 Browse job and internship listings
- 🔍 Search jobs by title and company
- 📍 Filter opportunities by location
- 🏷️ Filter by job category
- ➕ Add new job opportunities
- 📩 Apply for jobs using name and email
- 💾 Store jobs and applications in MongoDB
- 📱 Responsive user interface
- 🔗 REST API integration

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Tools**
- Visual Studio Code
- Git and GitHub

## 📂 Project Structure

```text
CareerTrack/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CareerTrack.git
```

### 2. Navigate to the Project Folder

```bash
cd CareerTrack
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/careertrack
```

Make sure MongoDB is installed and running locally. Alternatively, use your MongoDB Atlas connection string.

### 5. Start the Application

```bash
npm run dev
```

### 6. Open in Browser

Visit: http://localhost:5000

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check server status |
| GET | `/api/jobs` | Get and search jobs |
| POST | `/api/jobs` | Create a job |
| PATCH | `/api/jobs/:id` | Update a job |
| DELETE | `/api/jobs/:id` | Delete a job |
| POST | `/api/applications` | Submit an application |
| GET | `/api/applications` | View applications |

## 🎯 Learning Outcomes

- Understanding frontend and backend integration
- Building REST APIs using Express.js
- Connecting MongoDB with Mongoose
- Working with asynchronous JavaScript and Fetch API
- Performing CRUD operations
- Using Git and GitHub for version control

## 🔒 Security Note

This is a learning project. Authentication, role-based authorization, and production-level security still need to be implemented before public deployment. The demo job-creation and application-listing endpoints are not protected.

Never upload your `.env` file or database credentials to GitHub.

## 🚀 Future Improvements

- Student registration and login
- JWT-based authentication
- Student and admin dashboards
- Save/bookmark jobs
- Application status tracking
- Pagination and advanced filters
- Online deployment

## 👨‍💻 Author

**Ayush Singh**

B.Tech Computer Science Engineering Student

GitHub: [@rajputayushsingh](https://github.com/rajputayushsingh)

---

⭐ If you find this project useful, consider giving it a star!

Built with ❤️ as a full-stack development learning project.
