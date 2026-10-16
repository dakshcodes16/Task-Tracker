# Task Tracker — Modern Personal & Team Workflow Manager

A clean, responsive, and high-performance **Task Tracker** web application built with **React** (functional components and hooks) and **Tailwind CSS**. Designed for effortless daily task organization, status tracking, and workflow management running entirely client-side in the browser with automatic `localStorage` persistence.

---

## ✨ Features

- **Intuitive Task Creation**: Quickly capture tasks with keyboard shortcuts (`Enter`), optional priority flags (High, Medium, Low), and tags (Work, Engineering, Design, General).
- **Interactive Status Management**: Toggle tasks between `'Completed'` and `'Pending'` with interactive custom checkboxes, strikethrough styling, and pill badges.
- **Real-Time Productivity Dashboard**:
  - **Total Tasks**: Immediate count of all tracked tasks.
  - **Completed**: Green highlight indicating completed milestones.
  - **Pending**: Amber/orange highlight indicating pending action items.
  - **Progress Visualizer**: Completion rate progress bar with dynamic motivation notes.
- **Segmented Filtering & Instant Search**: Filter by **All**, **Pending**, or **Completed**, and filter instantaneously by keywords.
- **Inline Editing**: Click the pencil icon to rename and update tasks in place.
- **Local Persistence & Auto-Sync**: Automatically saves state changes to browser `localStorage` (`tasktracker_workspace_tasks`) with a live status indicator.
- **Safety with Undo**: Delete tasks with a red trash can icon and quickly restore accidental deletions via the undo toast notification.
- **Data Export**: Download your entire task list as a formatted JSON backup anytime.
- **Modern Responsive Design**: Centered card layout with soft shadows and subtle borders, optimized for mobile, tablet, and desktop viewports.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Installation
1. Clone or download the repository:
   ```bash
   git clone <repo-url>
   cd task-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

### Production Build
To create a production-ready bundle:
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```text
task-tracker/
├── index.html                  # HTML entry point with Inter font & metadata
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Tailwind CSS theme & content configuration
├── postcss.config.js           # PostCSS setup
├── vite.config.js              # Vite bundler configuration
└── src/
    ├── main.jsx                # Application bootstrap
    ├── index.css               # Tailwind directives & base styling
    ├── App.jsx                 # Top-level state, filter logic, local storage sync
    └── components/
        ├── Header.jsx          # Dark blue navigation bar with Task Tracker branding
        ├── TaskInput.jsx       # Task input, priority & tag selectors, validation
        ├── TaskStats.jsx       # Metric cards & progress visualizer
        ├── TaskFilter.jsx      # Filter buttons, search bar & auto-save indicator
        ├── TaskList.jsx        # Subheader banner & task list container
        ├── TaskItem.jsx        # Task row, status badge, checkbox & inline editing
        └── Footer.jsx          # Shortcuts, backup export & sample reset
```

---

## 💾 Local Storage Schema
Tasks are serialized as JSON objects in `localStorage` under the key `'tasktracker_workspace_tasks'`:

```typescript
interface Task {
  id: string;                      // Unique identifier timestamp
  text: string;                    // Task description
  status: 'Completed' | 'Pending'; // Current task status
  priority?: 'High' | 'Medium' | 'Low';
  category?: string;
}
```

---

## 🛠️ Tech Stack
- **Framework:** React 19 (Functional Components, Hooks)
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React
- **Bundler:** Vite v8
- **Typography:** Inter (via Google Fonts)
