## Simple Task Management System (MERN)

A lightweight, secure task manager built with the MERN stack (MongoDB, Express, React, Node.js). Users can sign up, log in, and manage personal tasks. There are no admin/viewer roles—each user manages only their own tasks.

### Core Features

- **User Authentication**
  - JWT-based signup and login
  - Passwords hashed with bcrypt
  - Per-user data isolation (access only own tasks)

- **Task Management**
  - Create tasks with title, description, due date, priority
  - View a paginated list (5 per page)
  - View task details on a dedicated page
  - Edit task fields (title, description, due date, priority)
  - Delete tasks with confirmation
  - Update status: pending, in-progress, completed

- **Priority Management**
  - Group tasks by priority: High, Medium, Low
  - Drag-and-drop tasks between priority lists
  - Color-coded UI for quick recognition

- **Pagination & Filtering**
  - Server-backed pagination (5 tasks/page)
  - Search and filter by title, status, priority

- **Visual Representation**
  - Color-coded task cards by priority
  - Responsive UI (mobile & desktop)
  - Intuitive forms and modals for create/edit

- **Additional Features**
  - Overdue tasks highlighted in red
  - Progress bar showing % completed
  - Optional email reminders for upcoming due dates

### Project Workflows

- **Authentication**
  1. User signs up → credentials stored (hashed) in MongoDB
  2. User logs in → server issues JWT
  3. Client stores token (e.g., localStorage) → used for protected routes

- **Task Lifecycle**
  1. Create → task saved with status: pending
  2. List → user sees paginated, color-coded tasks
  3. Details → view full task info
  4. Edit → update fields instantly reflected
  5. Delete → confirm before removal
  6. Status → toggle pending ↔ in-progress ↔ completed
  7. Priority → drag-and-drop updates priority

- **Frontend**
  - Navigation via React Router: `/login`, `/signup`, `/tasks`, `/tasks/:id`
  - Data fetching with React Query / Axios (AJAX)
  - Tailwind CSS + DaisyUI for clean, responsive UI

- **Backend**
  - Express routes for CRUD and auth
  - JWT middleware to protect task routes
  - Morgan for request logging

```text
POST   /auth/signup         Register user
POST   /auth/login          Authenticate user

GET    /tasks               Fetch tasks (pagination & filtering)
POST   /tasks               Create task
GET    /tasks/:id           Task details
PUT    /tasks/:id           Update task
DELETE /tasks/:id           Delete task
PATCH  /tasks/:id/status    Update status
```

- **Database**
  - `Users` collection: email, hashed password, timestamps
  - `Tasks` collection: userId, title, description, dueDate, priority, status, timestamps
  - Queries always scoped to the authenticated `userId`

- **Deployment**
  - Frontend: Netlify/Vercel
  - Backend: Render/Heroku/AWS EC2
  - Database: MongoDB Atlas

### Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, React Query, Axios
- **Backend**: Node.js, Express.js, JWT, bcrypt, Morgan
- **Database**: MongoDB + Mongoose
- **Deployment**: Netlify/Vercel (frontend), Render/Heroku (backend), MongoDB Atlas (DB)

### Suggested Folder Structure

```text
/client
  /src
    /components
    /pages
    /contexts
    /hooks
    App.tsx
    index.tsx

/server
  /controllers
  /models
  /routes
  server.js
  config.js
```

### API & Query Notes

- **Pagination**: default 5 tasks per page (`?page=1&limit=5`)
- **Filtering**: `?title=...&status=pending|in-progress|completed&priority=low|medium|high`
- **Sorting (optional)**: `?sortBy=dueDate|createdAt&order=asc|desc`

### UI/UX Details

- **Priority colors**: High (red), Medium (yellow), Low (green)
- **Overdue tasks**: highlighted in red
- **Progress bar**: percentage completed across current query set
- **Drag-and-drop**: move tasks between priority columns; updates persisted

### Getting Started (Local)

- **Prerequisites**: Node.js LTS, npm/yarn, MongoDB (local or Atlas)

```bash
# Backend
cd server
npm install
cp .env.example .env    # add MONGO_URI, JWT_SECRET, and PORT
npm run dev             # or: npm start

# Frontend
cd ../client
npm install
npm run dev
```

### Environment Variables

- **Server**
  - `MONGO_URI` — MongoDB connection string
  - `JWT_SECRET` — secret key for signing tokens
  - `PORT` — server port (default 5000)

- **Client** (as needed)
  - `VITE_API_BASE_URL` — backend API base URL

### Deployment Tips

- Use environment variables for secrets in all environments
- Enable CORS between frontend and backend origins
- Configure production builds (Vite) and keep API base URL environment-driven
- Ensure indexes on common task filters (userId, status, priority, dueDate)

### Project Flow (At a Glance)

1. User authenticates (signup/login, JWT issued and stored)
2. User creates tasks (scoped to their `userId`)
3. User views paginated, filterable task list
4. User updates, deletes, or completes tasks
5. Priority changes via drag-and-drop are persisted
6. UI stays responsive and secure throughout



### Database Schema

- **Users**
  - `email`: string, required, unique, lowercased, indexed
  - `passwordHash`: string, required (bcrypt hash)
  - `name`: string, optional
  - `createdAt`/`updatedAt`: timestamps

- **Tasks**
  - `userId`: ObjectId → references `Users`, required, indexed
  - `title`: string, required, indexed (text)
  - `description`: string, optional
  - `dueDate`: Date, optional, indexed
  - `priority`: enum `low | medium | high`, default `medium`, indexed
  - `status`: enum `pending | in-progress | completed`, default `pending`, indexed
  - `isOverdue`: boolean, derived (virtual or computed in query), not persisted
  - `createdAt`/`updatedAt`: timestamps

```js
// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
```

```js
// server/models/Task.js
const mongoose = require('mongoose');

const PRIORITIES = ['low', 'medium', 'high'];
const STATUSES = ['pending', 'in-progress', 'completed'];

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    dueDate: { type: Date, index: true },
    priority: { type: String, enum: PRIORITIES, default: 'medium', index: true },
    status: { type: String, enum: STATUSES, default: 'pending', index: true },
  },
  { timestamps: true }
);

// Text search on title and description
taskSchema.index({ title: 'text', description: 'text' });

// Efficient filtering for list screens
taskSchema.index({ userId: 1, status: 1, priority: 1, dueDate: 1, createdAt: -1 });

// Virtual (example) for overdue flag
taskSchema.virtual('isOverdue').get(function () {
  return this.dueDate ? this.dueDate < new Date() && this.status !== 'completed' : false;
});

module.exports = mongoose.model('Task', taskSchema);
```

```json
{
  "Users": {
    "email": "user@example.com",
    "passwordHash": "$2b$10$...",
    "name": "Jane Doe",
    "createdAt": "2025-01-01T10:00:00.000Z",
    "updatedAt": "2025-01-01T10:00:00.000Z"
  },
  "Tasks": {
    "userId": "65f0c2...",
    "title": "Finish report",
    "description": "Quarterly metrics",
    "dueDate": "2025-02-10T00:00:00.000Z",
    "priority": "high",
    "status": "in-progress",
    "createdAt": "2025-02-01T09:00:00.000Z",
    "updatedAt": "2025-02-02T12:00:00.000Z"
  }
}
```

- **Querying Recommendations**
  - Always filter by `userId` to enforce data isolation
  - Use pagination with `limit` and `page` (or cursor-based with `createdAt` and `_id`)
  - Project only needed fields for list views (e.g., `title`, `priority`, `status`, `dueDate`)
  - Keep compound index `{ userId, status, priority, dueDate, createdAt }` to optimize filters


### Optimal App Structure

The structure below promotes clear separation of concerns, testability, and scalability.

```text
/client
  /src
    /app                 # app bootstrap (providers, router)
    /components          # shared UI components
    /features            # feature-based slices (tasks, auth)
      /auth
        LoginPage.tsx
        SignupPage.tsx
        hooks.ts         # useLogin, useSignup
        api.ts           # axios/react-query calls
      /tasks
        pages/
          TasksListPage.tsx
          TaskDetailPage.tsx
        components/
          TaskCard.tsx
          TaskForm.tsx
          PriorityColumns.tsx
        hooks.ts         # useTasksQuery, useTaskMutations
        api.ts           # list, create, update, delete, status
    /contexts            # AuthProvider, ThemeProvider
    /hooks               # shared hooks (useAuth, usePagination)
    /lib                 # axios instance, queryClient
    /routes              # route config
    /styles              # tailwind.css, DaisyUI config
    /types               # TS types shared on client
    App.tsx
    main.tsx

/server
  /config               # env, db connection, cors
    config.js
    db.js
  /routes               # express routers
    auth.routes.js
    tasks.routes.js
  /controllers          # http layer (req/res)
    auth.controller.js
    tasks.controller.js
  /services             # business logic
    auth.service.js
    tasks.service.js
  /repositories         # data access (Mongoose queries)
    user.repo.js
    task.repo.js
  /models               # mongoose schemas/models
    User.js
    Task.js
  /middleware           # auth, error handling, validation
    auth.middleware.js
    error.middleware.js
    validate.middleware.js
  /validators           # zod/yup/joi schemas
    auth.validator.js
    task.validator.js
  /utils                # helpers (jwt, hashing, dates)
    jwt.js
    password.js
    dates.js
  /tests                # unit/integration tests
  server.js             # express app bootstrap
```

- **Layering Guidelines**
  - Router → Controller → Service → Repository → Model
  - Controllers: map HTTP to use-cases; no business logic
  - Services: orchestrate business rules and validations
  - Repositories: data persistence, return plain objects (no HTTP)
  - Middleware: cross-cutting concerns (auth, validation, errors)

- **Validation**
  - Validate request bodies and query params (e.g., Joi/Zod)
  - Enforce enums for `priority` and `status`

- **Auth**
  - Protect all task routes via JWT middleware
  - Store token on client using httpOnly cookies or localStorage per your constraints

- **Client Data Layer**
  - Centralized Axios instance with interceptors for JWT
  - React Query for caching, pagination, and optimistic updates
  - Feature-based `api.ts` per domain (auth, tasks)

- **Performance**
  - Indexes for frequent queries (see schema above)
  - Paginate server-side; infinite scroll optional with cursors
  - Use projection to reduce payloads

- **Testing**
  - Unit test services and repositories
  - Integration test routes with supertest
  - E2E (optional) with Playwright/Cypress

### Step-by-Step Implementation Roadmap

1) Backend Bootstrap (Express + MongoDB)
   - Create `/server` with `package.json`, `server.js`, `config/db.js`, `config/config.js`
   - Install: express, mongoose, cors, morgan, dotenv, helmet, joi, jsonwebtoken, bcrypt, nodemon (dev)
   - Enable CORS, security headers, JSON parsing, request logging
   - Connect to MongoDB and start the server

2) Authentication
   - Add `User` model and validators
   - Implement `/auth/signup` and `/auth/login` with JWT issuance
   - Add auth middleware to protect `/tasks/*`

3) Tasks CRUD
   - Add `Task` model and validators
   - Implement list (pagination/filter), detail, create, update, delete, status
   - Scope all queries by `userId`; return only needed fields for lists

4) Frontend Scaffold
   - Vite React TS + Tailwind + DaisyUI + Router + React Query + Axios
   - Base layout, theme, `queryClient`, Axios instance

5) Auth Pages
   - `/login`, `/signup` forms + validation and API hooks
   - Token storage and route guards

6) Tasks UI
   - List and detail pages with React Query
   - Create/edit/delete with modals and confirmations

7) Drag-and-Drop & Priority
   - Priority columns and DnD between them
   - Persist priority updates via API

8) Pagination, Search, Filters
   - Query params, controls, server integration
   - Progress bar (% completed) and overdue highlighting

9) Polish & QA
   - Responsive tweaks, a11y, skeletons/spinners, toasts
   - Unit/integration tests for critical paths

10) Deployment
   - Production builds, environment variables, CORS, deploy FE/BE/DB

### Deployment Notes

- Backend (Render/Heroku/AWS)
  - Set env: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGIN`
  - Use start command `node server.js` (Procfile set for Heroku)
  - Ensure CORS allows your frontend origin

- Frontend (Vercel/Netlify)
  - Set env: `VITE_API_BASE_URL`
  - Build command: `npm run build`; publish `dist`

- MongoDB Atlas
  - Create cluster, database, and user; allow network access
  - Paste connection string into `MONGO_URI`

- Local quick start
  - Backend: create `server/.env` from `.env.example`, run `npm run dev`
  - Frontend: create `client/.env` with `VITE_API_BASE_URL`, run `npm run dev`

Current Task: 1) Backend Bootstrap
- [ ] Initialize `/server` folder with Node project and scripts
- [ ] Add Express app (`server.js`) with CORS, helmet, morgan, JSON parser
- [ ] Add config (`config/config.js`) and Mongo connection (`config/db.js`)
- [ ] Wire up health route (`GET /health`) and start server
- [ ] Verify local run
