import { useState, useEffect } from "react";
import {
  Upload,
  MapPin,
  Send,
  X,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  "Roads & Potholes",
  "Street Lights",
  "Garbage & Sanitation",
  "Water Supply",
  "Drainage",
  "Traffic & Signals",
  "Public Parks",
  "Other",
];

function ReportComplaint() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    severity: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Maximum image size: 5 MB
  if (file.size > 5 * 1024 * 1024) {
    alert("Image size must be less than 5 MB.");
    e.target.value = "";
    return;
  }

  setImage(file);
  setImagePreview(URL.createObjectURL(file));
};

const removeImage = () => {
  if (imagePreview) {
    URL.revokeObjectURL(imagePreview);
  }

  setImage(null);
  setImagePreview(null);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);

    // Temporary mock submission.
    // Later this will call the backend API.

    setTimeout(() => {
      const generatedId =
        "CPI-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(100000 + Math.random() * 900000);

      const complaint = {
  id: generatedId,
  ...formData,
  imageName: image?.name || null,
  status: "Submitted",
  submittedAt: new Date().toLocaleString(),
};

localStorage.setItem(
  `complaint_${generatedId}`,
  JSON.stringify(complaint)
);

// Store all complaints for Dashboard
const existingComplaints = JSON.parse(
  localStorage.getItem("citypulse_complaints") || "[]"
);

existingComplaints.push(complaint);

localStorage.setItem(
  "citypulse_complaints",
  JSON.stringify(existingComplaints)
);

setComplaintId(generatedId);
setSubmitting(false);
setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">

        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2
              size={42}
              className="text-emerald-600"
            />
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-navy">
            Complaint Submitted!
          </h1>

          <p className="mt-3 text-slate-500">
            Your complaint has been successfully registered
            with CityPulse AI.
          </p>

          <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <p className="text-sm font-medium text-blue-600">
              Your Complaint ID
            </p>

            <p className="mt-2 text-2xl font-extrabold tracking-wider text-navy">
              {complaintId}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Save this ID to track your complaint.
            </p>

          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

           <Link
            to={`/track?id=${complaintId}`}
            className="flex-1 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
            > 
            Track Complaint
            </Link>

            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  category: "",
                  title: "",
                  description: "",
                  severity: "",
                  location: "",
                });
                setImage(null);
                setImagePreview(null);
              }}
              className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Report Another
            </button>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-80px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            Citizen Portal
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-navy sm:text-5xl">
            Report an Infrastructure Issue
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Help improve your city by reporting roads, lighting,
            sanitation, water and other infrastructure problems.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl bg-white p-6 shadow-lg sm:p-8 lg:p-10"
        >

          {/* Basic Information */}

          <div>

            <h2 className="text-xl font-bold text-navy">
              Complaint Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell us what is wrong.
            </p>

          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            {/* Category */}

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Issue Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select issue category
                </option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity */}

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Severity *
              </label>

              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  Select severity
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

                <option value="Critical">
                  Critical
                </option>
              </select>
            </div>

            {/* Title */}

            <div className="md:col-span-2">

              <label className="text-sm font-semibold text-slate-700">
                Complaint Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Example: Large pothole near main road"
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <label className="text-sm font-semibold text-slate-700">
                Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the problem in detail..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Provide enough detail for the municipal team to
                understand the issue.
              </p>

            </div>

          </div>

          {/* Image Upload */}

          <div className="mt-10 border-t border-slate-100 pt-8">

            <h2 className="text-xl font-bold text-navy">
              Evidence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a photo of the infrastructure issue.
            </p>

            {!imagePreview ? (
              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center transition hover:border-blue-400 hover:bg-blue-50">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                  <Upload
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                <p className="mt-4 font-semibold text-slate-700">
                  Upload issue image
                </p>

                <p className="mt-1 text-sm text-slate-400">
                PNG, JPG or JPEG • Maximum 5 MB
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>
            ) : (
              <div className="relative mt-5 overflow-hidden rounded-2xl border border-slate-200">

                <img
                  src={imagePreview}
                  alt="Complaint preview"
                  className="max-h-96 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-black"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-2 bg-white px-4 py-3 text-sm text-slate-600">
                  <ImageIcon size={17} />
                  {image?.name}
                </div>

              </div>
            )}

          </div>

       {/* Location */}

<div className="mt-10 border-t border-slate-100 pt-8">

  <h2 className="text-xl font-bold text-navy">
    Location
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Tell us where the issue is located.
  </p>

  <div className="mt-5 flex flex-col gap-3 sm:flex-row">

    {/* Location Input */}

    <div className="relative flex-1">

      <MapPin
        size={19}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        placeholder="Example: Civil Lines, Prayagraj"
        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>

    {/* Use My Location */}

    <button
      type="button"
      disabled={locationLoading}
      onClick={() => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  setLocationLoading(true);

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude.toFixed(5);
      const longitude = position.coords.longitude.toFixed(5);

      setFormData((prev) => ({
        ...prev,
        location: `${latitude}, ${longitude}`,
      }));

      setLocationLoading(false);
    },
    (error) => {
      console.error("Location error:", error);

      setLocationLoading(false);

      if (error.code === 1) {
        alert(
          "Location permission was denied. Please allow location access for localhost."
        );
      } else if (error.code === 2) {
        alert("Your location could not be determined.");
      } else if (error.code === 3) {
        alert("Location request timed out. Please try again.");
      } else {
        alert("Unable to get your location.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
}}
      className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100"
    >
      {locationLoading ? (
  <>
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700" />
    Detecting Location...
  </>
) : (
  <>
    <MapPin size={18} />
    Use My Location
  </>
)}
    </button>

  </div>

</div>

          {/* Submit */}

          <div className="mt-10 border-t border-slate-100 pt-8">

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-700 px-6 py-4 font-semibold text-black shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >

              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing Complaint...
                </>
              ) : (
                <>
                  <Send size={19} />
                  Submit Complaint
                </>
              )}

            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Your complaint will be securely registered and
              assigned a unique complaint ID.
            </p>

          </div>

        </form>

      </div>

    </section>
  );
}

export default ReportComplaint;