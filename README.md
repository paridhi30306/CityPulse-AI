# CityPulse AI 🏙️

### AI-Powered Civic Complaint Reporting & Tracking Platform

CityPulse AI is a smart civic platform designed to make reporting and tracking municipal infrastructure issues simpler, faster, and more transparent.

Citizens can report problems such as potholes, street lights, garbage, water supply, drainage, traffic issues, and public infrastructure problems. The platform provides complaint tracking, location-based reporting, and a municipal dashboard for monitoring reported issues.

> **Current Status:** Frontend prototype  
> Backend and AI services will be integrated in the next phase.

---

## 🚀 Features

### 👤 Citizen Portal

- Report infrastructure complaints
- Select complaint category and severity
- Add complaint title and detailed description
- Upload an image as evidence
- Enter location manually
- Use current device location
- Receive a unique complaint ID
- Track complaint progress

### 📊 Municipal Dashboard

- View total complaints
- View resolved complaints
- View pending complaints
- View critical issues
- Complaint category distribution
- Complaint trend visualization
- Department performance visualization
- Complaint locations displayed on an interactive map

### 🤖 AI-Ready Architecture

The platform is designed to support AI-assisted:

- Complaint classification
- Severity analysis
- Department assignment
- Infrastructure issue identification

The AI/backend integration will be added in the next development phase.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router

### Visualization

- Recharts
- Leaflet
- React Leaflet
- OpenStreetMap

### Icons

- Lucide React

### Current Data Storage

- Browser LocalStorage for frontend demonstration

### Planned Backend

- REST API
- Database
- AI/ML complaint classification
- Authentication and authorization

---

## 📂 Project Structure

```text
CityPulse-AI/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── Statistics.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── ReportComplaint.jsx
│   │   └── TrackComplaint.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── vercel.json
└── README.md