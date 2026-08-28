# MERN Stack Personal Portfolio

A production-quality MERN application structure for a personal portfolio website.

## Tech Stack

*   **Frontend**: React (Vite), Tailwind CSS, React Router DOM, Axios, Lucide React
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose)
*   **Development**: npm, Git, dotenv, CORS, Nodemon, Concurrently

## Project Architecture

```text
portfolio/
│
├── client/                 # Frontend React Application
│   ├── public/             # Static public assets
│   └── src/
│       ├── assets/         # Images, icons, and downloadable documents (e.g. resume)
│       ├── components/     # Reusable global components (common, layout, ui)
│       ├── pages/          # Page-level components
│       ├── sections/       # Portfolio-specific layout sections (Hero, About, etc.)
│       ├── services/       # API communication Layer (Axios)
│       ├── hooks/          # Custom hooks
│       ├── context/        # React context providers
│       ├── utils/          # Frontend utility functions
│       ├── constants/      # App-wide constants (routes, menu links)
│       └── routes/         # Centralized React Router Configuration
│
├── server/                 # Backend Node/Express API Service
│   ├── config/             # DB and service configurations
│   ├── controllers/        # Request/response handlers
│   ├── middleware/         # Custom Express middleware (errors, auth)
│   ├── models/             # Mongoose schemas/models
│   ├── routes/             # Express API endpoints
│   ├── services/           # DB interactions & business logic
│   ├── utils/              # Backend utility functions
│   ├── validators/         # Input validation middleware
│   └── constants/          # Static server constants
```

## Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm (v9+)
*   MongoDB Instance (Local or Atlas)

### Installation

1.  Clone the repository and go to the `portfolio` folder:
    ```bash
    cd portfolio
    ```
2.  Install root dependencies:
    ```bash
    npm install
    ```
3.  Install client dependencies:
    ```bash
    cd client
    npm install
    cd ..
    ```
4.  Install server dependencies:
    ```bash
    cd server
    npm install
    cd ..
    ```

### Running Locally

You can run both client and server concurrently from the root directory:

```bash
npm run dev
```

Alternatively, run them separately:

*   **Client only**: `npm run client` (starts Vite on port `5173`)
*   **Server only**: `npm run server` (starts Express/Nodemon on port `5000`)
