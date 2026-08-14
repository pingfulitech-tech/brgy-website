# Barangay San Isidro — Official Website

A full-stack barangay (village) website built with **React (Vite)** on the frontend,
**Node.js/Express** on the backend, and **MongoDB Atlas** as the database. The project
is split into two independent folders — `frontend/` and `backend/` — so you can open
either one on its own in VS Code, or open the root folder to see both.

## Features

- **Home** — hero section, office-hours/hotline ticker, latest announcements, popular services
- **About** — barangay history, vision, mission, profile
- **Officials** — Punong Barangay, Kagawads, SK Chairperson, Secretary, Treasurer
- **Announcements** — filterable by category (Health, Event, Advisory, Disaster, Job), with detail pages
- **Services** — document requirements, fees, and processing time (Barangay Clearance, Indigency, etc.)
- **Contact** — resident inquiry form saved to the database
- **Admin Dashboard** — login-protected panel to post announcements, manage officials/services, and view inbox messages

## Project Structure

```
brgy-website/
├── backend/     Express API + Mongoose models (connects to MongoDB Atlas)
└── frontend/    React app (Vite) that consumes the API
```

## 1. Set up MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/cloud/atlas
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add your current IP (or `0.0.0.0/0` for development).
4. Click **Connect → Drivers** and copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/brgy_db?retryWrites=true&w=majority
   ```

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and paste your MongoDB Atlas connection string into `MONGODB_URI`, and set
a random `JWT_SECRET`.

```bash
npm run seed   # populates sample officials, services, announcements, and an admin account
npm run dev    # starts the API on http://localhost:5000
```

Default admin login created by the seed script:
- **Username:** `admin`
- **Password:** `ChangeMe123!`

Change this password (or create a new admin) before deploying publicly.

## 3. Run the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
cp .env.example .env   # already points to http://localhost:5000/api
npm run dev             # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` in your browser. The site pulls live data from the
backend, which pulls from MongoDB Atlas.

## Opening in VS Code

- Open the `brgy-website` root folder for both projects at once, **or**
- Open `backend/` and `frontend/` as separate VS Code windows/workspaces if you prefer
  fully independent environments (each has its own `package.json`, `node_modules`, and
  `.env`).

## Customizing

- Replace the placeholder barangay name ("San Isidro"), address, hotline numbers, and
  seal artwork in `frontend/src/components/Seal.jsx`, `Navbar.jsx`, and `Footer.jsx`.
- Edit `backend/seed.js` to change the starting officials, services, and announcements.
- All colors/fonts are defined as CSS variables at the top of `frontend/src/index.css`.

## Tech Stack

| Layer     | Technology                                   |
|-----------|-----------------------------------------------|
| Frontend  | React 18, Vite, React Router, Axios            |
| Backend   | Node.js, Express, Mongoose, JWT, bcryptjs       |
| Database  | MongoDB Atlas                                   |
