import { Link, NavLink } from "react-router-dom";
import { Menu, X, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Report Complaint", path: "/report" },
  { name: "Track Complaint", path: "/track" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-shadow ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          to="/"
          className="shrink-0 leading-none"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="block text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
            CityPulse <span className="text-orange">AI</span>
          </span>

          <span className="mt-1 hidden text-[10px] font-medium tracking-[0.18em] text-slate-500 sm:block">
            SMART CITIES. SMARTER FUTURE.
          </span>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-5 xl:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative whitespace-nowrap py-7 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-navy"
                    : "text-slate-600 hover:text-navy"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-orange transition-all duration-200 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Login */}

        <Link
          to="/login"
          className="hidden items-center gap-2 rounded-lg border border-navy/30 px-4 py-2.5 text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-white xl:flex"
        >
          <UserRound size={18} />
          Login
        </Link>

        {/* Mobile Menu Button */}

        <button
          type="button"
          className="rounded-lg p-2 text-navy transition hover:bg-slate-100 xl:hidden"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}

      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 xl:hidden ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 font-semibold text-navy"
                    : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-900"
          >
            <UserRound size={18} />
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;