# MediCare Clinic — Appointment Dashboard

A frontend-only hospital appointment dashboard built with React and Vite for the Module 26 React Batch-9 assignment.

## Current Progress

Part 1: Project setup, dashboard foundation, seed data, reusable UI components, doctor cards, search, department filters, and summary statistics.

## Features Implemented

- React application created with Vite
- Reusable Card, Button, Badge, and EmptyState components
- Eight seeded doctors across five departments
- Search doctors by name
- Filter doctors by department
- Select doctors and highlight the selected card
- Show doctor availability
- Summary statistics derived from seed data
- Responsive dashboard layout
- Seed appointment preview

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Git and GitHub

## Setup Instructions

Install Node.js, then run:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── layout/
│   ├── ui/
│   ├── stats/
│   ├── doctors/
│   ├── appointments/
│   └── error/
├── data/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## React Concepts

Part 1 demonstrates reusable components, JSX, `.map()` with stable keys, props, callback props, `children`, a render prop, derived values, controlled search input, and lifted state for doctor selection.

Additional required concepts and their final file/line mappings will be documented after Parts 2–4 are completed.

## Screenshots

Final screenshots will be added before submission the project

## Prop Drilling

Prop drilling happens when a value or callback is passed through intermediate components that do not need to use it. In the doctor selection flow, the selected doctor ID and selection callback could be passed through `<span>DoctorPanel</span>` to `<span>DoctorList</span>` and then to `<span>DoctorCard</span>`. I changed `<span>DoctorPanel</span>` to use a render prop. It now filters doctors and calls the renderer supplied by `<span>App</span>`, where `<span>DoctorList</span>` is created directly with the required state and callback. This avoids passing those props through `<span>DoctorPanel</span>` and keeps the state in the common parent.The final implementation and explanation will be added after the component composition/render-prop solution is complete

## Error Handling

The final implementation and explanation will be added after the Error Boundary, fallback UI, logger, and global error handlers are implemented.

## Assignment

React Batch-9 — Module 26
MediCare Clinic Appointment Dashboard
