import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend only for now.
    // Backend authentication will be connected later.
    console.log("Login data:", formData);
  };

  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">

      <div className="w-full max-w-md">

        {/* Header */}

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange">
            CityPulse AI
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-navy">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Login to manage and track your civic complaints.
          </p>

        </div>

        {/* Login Card */}

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl sm:p-8">

          <form onSubmit={handleSubmit}>

            {/* Email */}

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Password */}

            <div className="mt-5">

              <div className="flex items-center justify-between">

                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  onClick={() =>
                    alert("Password reset will be connected later.")
                  }
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative mt-2">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember Me */}

            <div className="mt-5 flex items-center gap-2">

              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-500"
              >
                Remember me
              </label>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 font-semibold text-slate-500 shadow-lg shadow-blue-900/20 transition hover:bg-blue-800"
            >
              <LogIn size={19} />
              Login
            </button>

          </form>

          {/* Register */}

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">

            <p className="text-sm text-slate-500">
              Don't have an account?
            </p>

            <Link
              to="/report"
              className="mt-1 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Continue as Citizen
            </Link>

          </div>

        </div>

        {/* Footer Note */}

        <p className="mt-6 text-center text-xs text-slate-400">
          CityPulse AI • Smart Civic Complaint Management
        </p>

      </div>

    </section>
  );
}

export default Login;