# 🎬 MovieLens AI

MovieLens AI is a web application that allows users to fetch movie insights by entering an IMDb movie ID. The application retrieves movie metadata, analyzes the movie using AI, and generates audience sentiment insights.

The project also includes a **credit-based usage system**, authentication, and a payment system for purchasing additional credits.

Users who are **not logged in receive 2 free credits** to try the application.
**Logged-in users receive 5 credits**, and each movie insight request consumes **1 credit**.

If a user runs out of credits, they must **purchase additional credits** in order to continue using the movie insight feature.


---

# 🚀 Live Demo

Frontend: https://movie-lens-ai.vercel.app

---

# 🛠 Tech Stack

## Frontend

* **Next.js** – React framework used for building the UI.
* **Redux Toolkit** – Global state management for user authentication and credit state.
* **Tailwind CSS** – Utility-first CSS framework for styling.
* **Framer Motion** – UI animations and transitions.

## Backend

* **Node.js** – JavaScript runtime for server-side logic.
* **Express.js** – Backend API framework.

## Database

* **PostgreSQL** – Relational database used for storing users and credits.
* **Prisma ORM** – Type-safe database client and schema management.

## AI Integration

* **Google Gemini API** – Used to generate AI insights and sentiment summaries.

## Payments

* **Razorpay** – Payment gateway integrated to allow users to purchase additional credits.
  *(Payment logic is implemented but may require further configuration for full production functionality.)*

## Deployment

* **Frontend Hosting:** Vercel
* **Backend Hosting:** AWS EC2

---

# ✨ Features

### Movie Insights

Users can search movies using an **IMDb ID** and get:

* Movie title
* Poster
* Cast list
* Release year
* IMDb rating
* Plot summary
* AI-generated audience sentiment summary
* Overall sentiment classification (**Positive / Mixed / Negative**)

---

# 💳 Credit System

The application uses a **credit-based system** to control API usage.

### Guest Users

Users who are **not logged in** can use the application **2 times**.

### Logged-in Users

Registered users receive **5 credits**.

Each request to fetch movie insights consumes **1 credit**.

### When Credits Reach 0

When credits are exhausted:

* Users cannot fetch new movie insights
* Users must **purchase additional credits**

---

# 💰 Payment System

The application integrates **Razorpay** for purchasing credits.

Implemented features:

* Credit purchase logic
* Razorpay payment initialization
* Backend payment verification
* Credit update after payment

⚠️ Note:
Payment integration logic exists in the codebase but may require additional configuration for production.

---

# 🧠 AI Insights

The application uses **Gemini AI** to generate:

* Audience sentiment summary
* Sentiment classification

Sentiment types:

```
Positive
Mixed
Negative
```

AI analyzes:

* Movie plot
* Movie rating
* Genre
* Available metadata

---

# 📂 Project Structure

```
movielens-ai
│
├── frontend
├── backend
└── README.md
```

---

# 📦 Backend Folder Structure

```
backend
│
├── dist
│   Compiled JavaScript output generated after TypeScript build.
│
├── node_modules
│   Installed project dependencies.
│
├── prisma
│   Prisma schema and migrations.
│
├── src
│
│   ├── controller
│   │
│   │   ├── auth.controller.ts
│   │   Handles login and signup logic.
│   │
│   │   ├── movie.controller.ts
│   │   Fetches movie data and AI insights.
│   │
│   │   ├── payment.controller.ts
│   │   Handles Razorpay payment and credit updates.
│   │
│   │   └── user.controller.ts
│   │   Handles user information and credit management.
│
│   ├── gemini
│   │
│   │   └── gemini.ts
│   │   Handles communication with Gemini AI API.
│
│   ├── lib
│   │
│   │   └── prisma.ts
│   │   Initializes Prisma client.
│
│   ├── middleware
│   │
│   │   └── protectRoute.ts
│   │   Middleware to protect authenticated routes.
│
│   ├── razorpay
│   │
│   │   └── razorpay.ts
│   │   Razorpay payment initialization.
│
│   ├── routes
│   │
│   │   ├── auth.routes.ts
│   │   Authentication routes.
│   │
│   │   ├── guest.routes.ts
│   │   Guest user routes and guest credit system.
│   │
│   │   ├── movie.routes.ts
│   │   Movie data API routes.
│   │
│   │   ├── payment.routes.ts
│   │   Credit purchase routes.
│   │
│   │   └── user.routes.ts
│   │   User information routes.
│
│   ├── services
│   │
│   │   └── auth.ts
│   │   Authentication service logic.
│
│   ├── types
│   │
│   │   └── globals.d.ts
│   │   Global TypeScript types.
│
│   ├── util
│   │
│   │   └── index.ts
│   │   Utility helper functions.
│
│   └── index.ts
│       Entry point of backend server.
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

# 🎨 Frontend Folder Structure

```
frontend
│
├── .next
│   Next.js build output.
│
├── app
│
│   ├── components
│   │
│   │   └── RazorPayButton.jsx
│   │   Razorpay payment UI component.
│
│   ├── login
│   │
│   │   └── page.jsx
│   │   Login page.
│
│   ├── signup
│   │
│   │   └── page.jsx
│   │   Signup page.
│
│   ├── favicon.ico
│
│   ├── globals.css
│   Global styling.
│
│   ├── Landing.jsx
│   Movie search UI.
│
│   ├── layout.jsx
│   Root layout component.
│
│   └── page.jsx
│   Main homepage.
│
├── components
│
│   └── ui
│
│       └── sonner.jsx
│       Toast notification UI.
│
├── lib
│
│   ├── redux
│   │   Redux store configuration.
│   │
│   └── utils.js
│       Helper functions.
│
├── providers
│
│   └── StoreProvider.jsx
│   Redux provider wrapper.
│
├── public
│   Static assets.
│
├── .gitignore
├── components.json
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
└── package-lock.json
```

---

# ⚙️ Installation

## Clone Repository

```
git clone https://github.com/Inikhil099/Movie-Lens-Ai.git
cd movielens-ai
```

---

# Backend Setup

Install dependencies

```
npm install
```

Create `.env`

```
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
PORT=3000
```

Generate Prisma client

```
npx prisma generate
```

Run migrations

```
npx prisma migrate deploy
```as

Build project

```
npm run build
```

Start server

```
node dist/index.js
```

---

# Frontend Setup

Navigate to frontend

```
cd frontend
npm install
npm run dev
```

Create `.env.local`

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

---

# 📡 Example API Response

Example request

```
GET /movie/tt0848228
```

Example response

```json
{
  "title": "The Avengers",
  "year": "2012",
  "rating": "8.0",
  "plot": "Earth's mightiest heroes must come together...",
  "aiSummary": "Audiences generally praise the action and performances...",
  "overallSentiment": "Positive"
}
```

---

# ☁️ Deployment

### Frontend

Deployed using **Vercel**

### Backend

Deployed on **Render**

Deployment steps:


---

# 🔮 Future Improvements

* Fix production Razorpay payment flow
* Add movie recommendation system
* Add user dashboards
* Implement caching
* Improve AI analysis
* Add watchlist feature

---



## ⚠️ Note on Razorpay Integration

The project includes the **complete Razorpay payment logic** for purchasing additional credits.
This includes:

* Payment initialization
* Razorpay order creation
* Backend payment verification
* Credit update logic after successful payment

However, the payment flow **may not work immediately after cloning the repository** because the Razorpay credentials used during development are not included in the project.

The issue occurs due to missing or invalid:

* Razorpay **Key ID**
* Razorpay **Secret Key**
* Payment configuration

These values are required in the backend environment variables and are intentionally excluded from the repository for security reasons.

To enable Razorpay payments, add valid credentials in the backend `.env` file:

```env id="q8c4dl"
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret_key
```

Once valid Razorpay credentials are configured, the existing payment logic in the project should function correctly.
