import { useState, useEffect } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock3,
  AlertTriangle,
  TrendingUp,
  MapPin,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const departmentData = [
  { department: "Roads", resolved: 82 },
  { department: "Sanitation", resolved: 74 },
  { department: "Lighting", resolved: 79 },
  { department: "Water", resolved: 68 },
  { department: "Drainage", resolved: 71 },
];

const COLORS = [
  "#2563eb",
  "#10b981",
  "#f97316",
  "#8b5cf6",
  "#64748b",
];

function StatCard({ title, value, subtitle, icon: Icon, iconBg }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-extrabold text-navy">
            {value}
          </h3>

          <p className="mt-2 text-xs text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={23} className="text-white" />
        </div>

      </div>
    </div>
  );
}

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints = JSON.parse(
      localStorage.getItem("citypulse_complaints") || "[]"
    );

    setComplaints(storedComplaints);
  }, []);

  const totalComplaints = complaints.length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Submitted" ||
      complaint.status === "Pending"
  ).length;

  const criticalComplaints = complaints.filter(
    (complaint) => complaint.severity === "Critical"
  ).length;

  const resolutionRate =
    totalComplaints > 0
      ? ((resolvedComplaints / totalComplaints) * 100).toFixed(1)
      : "0.0";

  const issueDistribution = Object.entries(
   complaints.reduce((acc, complaint) => {
    const category = complaint.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {})

).map(([name, value]) => ({
  name,
  value,
}));

const mapComplaints = complaints
  .map((complaint) => {
    if (!complaint.location) return null;

    const [latitude, longitude] = complaint.location
      .split(",")
      .map(Number);

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return null;
    }

    return {
      ...complaint,
      position: [latitude, longitude],
    };
  })
  .filter(Boolean);

  const hasComplaints = complaints.length > 0;

  const complaintTrend = (() => {
  const months = {};

  complaints.forEach((complaint) => {
    if (!complaint.submittedAt) return;

    const date = new Date(complaint.submittedAt);

    if (Number.isNaN(date.getTime())) return;

    const month = date.toLocaleString("en-US", {
      month: "short",
    });

    if (!months[month]) {
      months[month] = {
        complaints: 0,
        resolved: 0,
      };
    }

    months[month].complaints += 1;

    if (complaint.status === "Resolved") {
      months[month].resolved += 1;
    }
  });

  return Object.entries(months).map(([month, data]) => ({
    month,
    complaints: data.complaints,
    resolved: data.resolved,
  }));
})();


  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

          <div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
              CityPulse AI
            </p>

            <h1 className="mt-2 text-4xl font-extrabold text-navy">
              Municipal Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Real-time overview of city infrastructure and citizen complaints.
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            System Operational
          </div>

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Complaints"
            value={totalComplaints}
            subtitle="All submitted complaints"
            icon={BarChart3}
            iconBg="bg-blue-600"
          />

          <StatCard
            title="Resolved"
            value={resolvedComplaints}
            subtitle={`${resolutionRate}% resolution rate`}
            icon={CheckCircle2}
            iconBg="bg-emerald-500"
          />

          <StatCard
            title="Pending"
            value={pendingComplaints}
            subtitle="Currently active"
            icon={Clock3}
            iconBg="bg-orange"
          />

          <StatCard
            title="Critical Issues"
            value={criticalComplaints}
            subtitle="Require immediate action"
            icon={AlertTriangle}
            iconBg="bg-red-500"
          />

        </div>

        {/* Charts */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">

          {/* Complaint Trends */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-navy">
                  Complaint Trends
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Monthly complaints vs resolutions
                </p>
              </div>

              <TrendingUp
                size={22}
                className="text-blue-600"
              />

            </div>

            <div className="mt-6 h-72">

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complaintTrend}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="complaints"
                    stroke="#2563eb"
                    strokeWidth={3}
                    name="Complaints"
                  />

                  <Line
                    type="monotone"
                    dataKey="resolved"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Resolved"
                  />

                </LineChart>
              </ResponsiveContainer>

            </div>

          </div>

          {/* Issue Distribution */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-bold text-navy">
              Issue Distribution
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complaints by category
            </p>

            <div className="mt-4 h-72">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={issueDistribution}
                    cx="50%"
                    cy="45%"
                    outerRadius={90}
                    dataKey="value"
                    label
                  >
                    {issueDistribution.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Map */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-navy">
                Complaint Locations
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Live infrastructure complaints across the city
              </p>
            </div>

            <MapPin
              size={22}
              className="text-blue-600"
            />

          </div>

         <div className="mt-5 h-[420px] overflow-hidden rounded-xl">
  {mapComplaints.length > 0 ? (
    <MapContainer
      center={[25.4358, 81.8463]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mapComplaints.map((complaint) => (
        <Marker
          key={complaint.id}
          position={complaint.position}
        >
          <Popup>
            <strong>{complaint.title}</strong>
            <br />
            Category: {complaint.category}
            <br />
            ID: {complaint.id}
            <br />
            Severity: {complaint.severity}
            <br />
            Status: {complaint.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  ) : (
    <div className="flex h-full items-center justify-center bg-slate-100">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
          <MapPin
            size={24}
            className="text-slate-400"
          />
        </div>

        <h3 className="mt-4 font-bold text-slate-700">
          No complaint locations yet
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Locations will appear on the city map when citizens
          submit complaints with coordinates.
        </p>
      </div>
    </div>
  )}
</div>

        {/* Department Performance */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-lg font-bold text-navy">
            Department Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Complaint resolution rate by department
          </p>

          <div className="mt-6 h-80">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Bar
                  dataKey="resolved"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  name="Resolution %"
                />

              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>

      </div>
    </section>
  );
}

export default Dashboard;