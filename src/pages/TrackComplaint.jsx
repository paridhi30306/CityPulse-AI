import {useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  CheckCircle2,
  Clock3,
  MapPin,
  FileText,
  Brain,
} from "lucide-react";

const getTimeline = (status, submittedAt) => {
  const statuses = [
    "Submitted",
    "AI Analysis",
    "Assigned",
    "In Progress",
    "Resolved",
  ];

  const currentIndex = {
    Submitted: 0,
    "AI Analysis": 1,
    Assigned: 2,
    "In Progress": 3,
    Resolved: 4,
  };

  const index = currentIndex[status] ?? 0;

  return [
    {
      title: "Complaint Submitted",
      description:
        "Your complaint has been successfully registered.",
      date: submittedAt,
      completed: index >= 0,
    },
    {
      title: "AI Analysis Complete",
      description:
        "The complaint has been analyzed and classified.",
      date: index >= 1 ? "Completed" : "Pending",
      completed: index >= 1,
    },
    {
      title: "Assigned to Department",
      description:
        "The complaint has been assigned to the responsible department.",
      date: index >= 2 ? "Completed" : "Pending",
      completed: index >= 2,
    },
    {
      title: "In Progress",
      description:
        "The municipal team is currently working on the issue.",
      date: index >= 3 ? "In Progress" : "Pending",
      completed: index >= 3,
    },
    {
      title: "Resolved",
      description:
        "The complaint has been resolved after verification.",
      date: index >= 4 ? "Completed" : "Pending",
      completed: index >= 4,
    },
  ];
};

function TrackComplaint() {
  const [searchParams] = useSearchParams();
 const [complaintId, setComplaintId] = useState("");
const [complaint, setComplaint] = useState(null);
const [searchError, setSearchError] = useState("");
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (!idFromUrl) return;
    setComplaintId(idFromUrl);
    const storedComplaint = localStorage.getItem(
      `complaint_${idFromUrl}`
    );
    if (storedComplaint) {
      setComplaint(JSON.parse(storedComplaint));
    }
  }, [searchParams]);

const handleSearch = (e) => {
  e.preventDefault();

  const id = complaintId.trim();

  if (!id) {
    setSearchError("Please enter your Complaint ID.");
    setComplaint(null);
    return;
  }

  const storedComplaint = localStorage.getItem(
    `complaint_${id}`
  );

  if (storedComplaint) {
    setComplaint(JSON.parse(storedComplaint));
    setSearchError("");
  } else {
    setComplaint(null);
    setSearchError(
      "Complaint not found. Please check your Complaint ID and try again."
    );
  }
};

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Citizen Portal
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-navy sm:text-5xl">
            Track Your Complaint
          </h1>

         <h3 className="mt-4 text-lg font-bold text-navy">
  Track your complaint
</h3>

<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
  Enter the unique Complaint ID you received after submitting
  your report to view its current status and progress.
</p>

        </div>

        {/* Search Box */}

        <form
          onSubmit={handleSearch}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-lg sm:flex-row">

            <div className="relative flex-1">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={complaintId}
                onChange={(e) =>
                  setComplaintId(e.target.value)
                }
                placeholder="Enter Complaint ID"
                className="w-full rounded-xl border border-slate-200 py-4 pl-12 pr-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-700 px-7 py-4 font-semibold text-slate-600 transition hover:bg-blue-800"
            >
              Track Complaint
            </button>

          </div>
        </form>

        {searchError && (
  <div className="mx-auto mt-4 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
    {searchError}
  </div>
)}

        {/* Empty State */}

        {!complaint && (
          <div className="mt-14 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Search
                size={28}
                className="text-blue-600"
              />
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Enter your complaint ID above to see its status.
            </p>

          </div>
        )}

        {/* Complaint Result */}

        {complaint && (
          <div className="mt-10 space-y-6">

            {/* Complaint Summary */}

            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

                <div>

                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FileText size={16} />
                    Complaint ID
                  </div>

                  <h2 className="mt-1 text-2xl font-bold tracking-wide text-navy">
                    {complaint.id}
                  </h2>

                </div>

                <span className="w-fit rounded-full bg-orange/10 px-4 py-2 text-sm font-semibold text-orange">
                  {complaint.status}
                </span>

              </div>

              <div className="mt-7 grid gap-6 border-t border-slate-100 pt-7 sm:grid-cols-3">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Issue
                  </p>

                  <p className="mt-2 font-semibold text-slate-700">
                    {complaint.title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Category
                  </p>

                  <p className="mt-2 font-semibold text-slate-700">
                    {complaint.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Severity
                  </p>

                  <p className="mt-2 font-semibold text-red-600">
                    {complaint.severity}
                  </p>
                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={17} />
                {complaint.location}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                {complaint.description}
              </p>

            </div>

            {/* Progress Timeline */}

            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-xl font-bold text-navy">
                Complaint Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Follow the progress of your complaint.
              </p>

              <div className="mt-8">

                {getTimeline(complaint.status, complaint.submittedAt).map(
                (item, index) => (
                  <div
                    key={item.title}
                    className="relative flex gap-5"
                  >

                    {/* Connecting Line */}

                   {index < getTimeline(complaint.status, complaint.submittedAt).length - 1 && (
                      <div
                        className={`absolute left-[15px] top-8 h-full w-0.5 ${
                          item.completed
                            ? "bg-emerald-400"
                            : "bg-slate-200"
                        }`}
                      />
                    )}

                    {/* Status Icon */}

                    <div className="relative z-10 shrink-0">

                      {item.completed ? (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle2
                            size={19}
                            className="text-emerald-600"
                          />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                          <Clock3
                            size={17}
                            className="text-slate-400"
                          />
                        </div>
                      )}

                    </div>

                    {/* Timeline Content */}

                    <div className="pb-7">

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">

                        <h3
                          className={`font-semibold ${
                            item.completed
                              ? "text-navy"
                              : "text-slate-400"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <span className="text-xs text-slate-400">
                          {item.date}
                        </span>

                      </div>

                      <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* AI Analysis */}

            <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                <Brain
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>

                <h3 className="font-bold text-blue-900">
                  CityPulse AI Analysis
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-700">
                  AI analysis helps classify infrastructure
                  issues and route complaints to the appropriate
                  municipal department.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default TrackComplaint;