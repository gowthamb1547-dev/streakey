# 📚 Daily Learning Streak Tracker

A clean and modern productivity web app to help users **track daily learning goals**, maintain **streaks**, visualize **weekly progress**, and stay motivated.  
Built using **React, Tailwind CSS, Chart.js**, and **LocalStorage** — no backend required.

---

## 🚀 Live Demo
👉 (Add your deployed link here later – Netlify / Vercel)

---

## 📌 Features

### ✅ Learning Goals
- Create multiple learning goals (HTML, CSS, JavaScript, DSA, React, etc.)
- Each goal tracks:
  - Current streak
  - Best streak
  - Daily completion status

### 🔥 Daily Streak System
- Mark goals as **Done** or **Missed** once per day
- Streak automatically:
  - Increases when marked *Done*
  - Breaks when a day is missed
- Date-based logic prevents cheating

### 📊 Dashboard & Analytics
- Total goals overview
- Active streak count
- Best streak achieved
- Today's progress summary

### 📈 Weekly Progress Chart
- Visualizes last 7 days of activity
- Shows completed vs missed days using **Chart.js**

### 💬 Motivational Messages
- Dynamic messages based on current streak length
- Encourages consistency and habit-building

### 💾 Persistent Storage
- All data is saved in **LocalStorage**
- Progress remains intact after page refresh or browser restart

### 🎨 Modern UI
- Clean, card-based dashboard layout
- Built with **Tailwind CSS**
- Fully responsive (mobile & desktop)
- Minimal, professional, recruiter-friendly design

---

## 🛠 Tech Stack

- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Charts:** Chart.js
- **State & Storage:** React Hooks + LocalStorage
- **Icons:** Lucide / Heroicons

---

## 📂 Project Structure

daily-learning-streak-tracker/
│
├── src/
│ ├── components/
│ │ ├── Dashboard.jsx
│ │ ├── GoalCard.jsx
│ │ ├── GoalForm.jsx
│ │ ├── WeeklyChart.jsx
│ │ └── Motivation.jsx
│ │
│ ├── utils/
│ │ ├── localStorage.js
│ │ └── dateUtils.js
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── public/
├── package.json
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/daily-learning-streak-tracker.git
cd daily-learning-streak-tracker

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Open 👉 http://localhost:5173

🧠 How Streak Logic Works

Each goal stores:

Last updated date

Current streak count

Best streak

If the user:

Marks Done → streak +1

Misses a day → streak resets to 0

Streak updates are strictly date-based
