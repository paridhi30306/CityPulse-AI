import { useEffect, useState } from "react";
import {
  FileText,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const statusOptions = [
  "Submitted",
  "AI Analysis",
  "Assigned",
  "In Progress",
  "Resolved",
];

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    const storedComplaints = JSON.parse(
      localStorage.getItem("citypulse_complaints") || "[]"
    );

    setComplaints(storedComplaints);
  };

  const updateStatus = (id, newStatus) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id
        ? {
            ...complaint,
            status: newStatus,
          }
        : complaint
    );

    setComplaints(updatedComplaints);

    localStorage.setItem(
      "citypulse_complaints",
      JSON.stringify(updatedComplaints)
    );

    const updatedComplaint = updatedComplaints.find(
      (complaint) => complaint.id === id
    );

    if (updatedComplaint) {
      localStorage.setItem(
        `complaint_${id}`,
        JSON.stringify(updatedComplaint)
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-emerald-100 text-emerald-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "AI Analysis":
        return "bg-purple-100 text-purple-700";

      case "Assigned":
        return "bg-orange-100 text-orange-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

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
              Complaint Management
            </h1>

            <p className="mt-2 text-slate-500">
              Review citizen complaints and update their progress.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Municipal Control Panel
          </div>

        </div>

        {/* Summary */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                <FileText size={21} className="text-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total
                </p>

                <p className="text-2xl font-bold text-navy">
                  {complaints.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                <Clock3 size={21} className="text-orange-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <p className="text-2xl font-bold text-navy">
                  {
                    complaints.filter(
                      (complaint) =>
                        complaint.status !== "Resolved"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Resolved
                </p>

                <p className="text-2xl font-bold text-navy">
                  {
                    complaints.filter(
                      (complaint) =>
                        complaint.status === "Resolved"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                <AlertTriangle
                  size={21}
                  className="text-red-600"
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Critical
                </p>

                <p className="text-2xl font-bold text-navy">
                  {
                    complaints.filter(
                      (complaint) =>
                        complaint.severity === "Critical"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Complaints */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="text-xl font-bold text-navy">
              Citizen Complaints
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update complaint status as municipal teams process
              the issue.
            </p>

          </div>

          {complaints.length === 0 ? (

            <div className="p-12 text-center">

              <FileText
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 font-semibold text-slate-600">
                No complaints yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Submitted complaints will appear here.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-slate-100">

              {complaints.map((complaint) => (

                <div
                  key={complaint.id}
                  className="p-6 transition hover:bg-slate-50"
                >

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    {/* Complaint information */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="font-bold text-navy">
                          {complaint.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                            complaint.status
                          )}`}
                        >
                          {complaint.status}
                        </span>

                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">

                        <span>
                          ID:{" "}
                          <strong className="text-slate-700">
                            {complaint.id}
                          </strong>
                        </span>

                        <span>
                          Category:{" "}
                          <strong className="text-slate-700">
                            {complaint.category}
                          </strong>
                        </span>

                        <span>
                          Severity:{" "}
                          <strong className="text-slate-700">
                            {complaint.severity}
                          </strong>
                        </span>

                      </div>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                        {complaint.description}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {complaint.location}
                      </p>

                    </div>

                    {/* Status control */}

                    <div className="w-full lg:w-52">

                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Update Status
                      </label>

                      <select
                        value={complaint.status}
                        onChange={(e) =>
                          updateStatus(
                            complaint.id,
                            e.target.value
                          )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        ))}
                      </select>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default AdminComplaints;