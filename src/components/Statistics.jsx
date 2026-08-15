import { useEffect, useState } from "react";

function Statistics() {
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

  const criticalComplaints = complaints.filter(
    (complaint) => complaint.severity === "Critical"
  ).length;

  const statistics = [
    {
      type: "complaints",
      value: totalComplaints,
      title: "Total Complaints",
      description: "Currently Reported",
    },
    {
      type: "resolved",
      value: resolvedComplaints,
      title: "Resolved Complaints",
      description: "Currently Resolved",
    },
    {
      type: "critical",
      value: criticalComplaints,
      title: "Critical Issues",
      description: "Require Immediate Action",
    },
  ];

  // keep your existing JSX below this
}

export default Statistics;