import {
  ArrowRight,
  FilePenLine,
  Search,
  Phone,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Report an Issue",
    description: "Submit a new infrastructure complaint",
    icon: FilePenLine,
    iconBg: "bg-blue-900",
    path: "/report",
  },
  {
    title: "Track Complaint",
    description: "Track the status of your complaint",
    icon: Search,
    iconBg: "bg-emerald-500",
    path: "/track",
  },
  {
    title: "Emergency Contact",
    description: "Contact emergency support services",
    icon: Phone,
    iconBg: "bg-orange",
    path: "/contact",
  },
  {
    title: "Infrastructure Status",
    description: "View real-time infrastructure health",
    icon: BarChart3,
    iconBg: "bg-purple-500",
    path: "/dashboard",
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">

      {/* ========================================
          BACKGROUND VIDEO
      ======================================== */}

      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source
          src="/cityv1.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>

      {/* ========================================
          light BLUE OVERLAY
      ======================================== */}

      <div className="absolute inset-0 bg-[#063b7a]/35" />

      {/* ========================================
          LEFT → RIGHT GRADIENT
      ======================================== */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#062452]/75 via-[#063b7a]/35 to-transparent" />

      {/* ========================================
          BOTTOM GRADIENT
      ======================================== */}

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#062452]/60 to-transparent" />

      {/* ========================================
          AI NETWORK GLOW
      ======================================== */}

      <div className="absolute right-[25%] top-[20%] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="absolute left-[10%] top-[30%] h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      {/* ========================================
          HERO CONTENT
      ======================================== */}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">

        {/* ======================================
            LEFT CONTENT
        ====================================== */}

        <div className="flex flex-col justify-center">

          {/* Badge */}

          <div className="mb-7 inline-flex w-fit items-center rounded-full border border-cyan-300/30 bg-blue-950/40 px-5 py-2 text-xs font-semibold tracking-[0.18em] text-white backdrop-blur-md">
            AI POWERED
            <span className="mx-2 text-orange">•</span>
            REAL TIME
            <span className="mx-2 text-orange">•</span>
            SMART CITY
          </div>

          {/* Main heading */}

          <h1 className="text-5xl font-extrabold leading-[1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            CITYPULSE{" "}
            <span className="text-orange">AI</span>
          </h1>

          {/* Subtitle */}

          <h2 className="mt-6 max-w-3xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
            Smart Urban Infrastructure Monitoring
            <span className="block">
              & Municipal Response Platform
            </span>
          </h2>

          {/* Description */}

          <p className="mt-6 max-w-xl text-base leading-7 text-white sm:text-lg">
            Report infrastructure issues, track their status,
            and help us build better and smarter cities with
            the power of AI.
          </p>

          {/* CTA buttons */}

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/report"
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-950/40 transition duration-300 hover:-translate-y-1 hover:bg-blue-500"
            >
              <FilePenLine size={19} />

              Report Complaint

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/track"
              className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/50 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#062452]"
            >
              <Search size={19} />

              Track Complaint
            </Link>

          </div>

          {/* Feature highlights */}

          <div className="mt-12 grid max-w-2xl grid-cols-1 gap-6 border-t border-white/20 pt-8 sm:grid-cols-3">

            <div>
              <p className="font-semibold text-white">
                AI Powered
              </p>

              <p className="mt-1 text-sm text-white">
                Smart issue analysis
              </p>
            </div>

            <div>
              <p className="font-semibold text-white">
                24 × 7
              </p>

              <p className="mt-1 text-sm text-white">
                Complaint portal
              </p>
            </div>

            <div>
              <p className="font-semibold text-white">
                Smart
              </p>

              <p className="mt-1 text-sm text-white">
                Infrastructure monitoring
              </p>
            </div>

          </div>
        </div>

        {/* ======================================
            RIGHT SERVICES CARD
        ====================================== */}

        <div className="flex items-center">

          <div className="w-full rounded-2xl border border-white/30 bg-white/95 p-5 shadow-2xl backdrop-blur-xl sm:p-6">

            {/* Card heading */}

            <div className="mb-5">
              <h3 className="text-2xl font-bold text-[#062452]">
                Infrastructure Services
              </h3>

              <div className="mt-3 h-1 w-12 rounded-full bg-orange" />
            </div>

            {/* Service list */}

            <div className="space-y-3">

              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <Link
                    key={service.title}
                    to={service.path}
                    className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >

                    {/* Icon */}

                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white ${service.iconBg}`}
                    >
                      <Icon size={23} />
                    </div>

                    {/* Text */}

                    <div className="min-w-0 flex-1">

                      <h4 className="font-semibold text-[#062452]">
                        {service.title}
                      </h4>

                      <p className="mt-1 text-sm text-slate-500">
                        {service.description}
                      </p>

                    </div>

                    {/* Arrow */}

                    <ArrowRight
                      size={19}
                      className="shrink-0 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#062452]"
                    />

                  </Link>
                );
              })}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroSection;