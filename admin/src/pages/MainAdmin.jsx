import React, { useState } from "react";

// Realistic Login Form with Logo (single-file React component)
// Features:
// - Email/Username and Password fields
// - Show/hide password
// - Logo at top (customizable via props or replace path)
// - Client-side validation with helpful error messages
// - Remember Me checkbox
// - Async submit simulation
// - Tailwind CSS styling for realism

export default function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Email or username is required";
    if (!form.password.trim()) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      // Simulated async login (replace with real API call)
      await new Promise((res) => setTimeout(res, 1200));

      if (
        form.email === "demo@example.com" &&
        form.password === "password123"
      ) {
        setMessage("✅ Login successful! Redirecting...");
        // In real app: redirect or store token here
      } else {
        setErrors({ form: "Invalid credentials. Please try again." });
      }
    } catch (err) {
      setErrors({ form: "Network error. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="App Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-500">Login to your account</p>
        </div>

        {errors.form && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 p-3 rounded">
            {errors.form}
          </div>
        )}

        {message && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 p-3 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email or Username
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border rounded-md p-2 focus:outline-none focus:ring ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full border rounded-md p-2 pr-24 focus:outline-none focus:ring ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create one
          </a>
        </div>

        <div className="mt-8 text-xs text-center text-gray-400">
          © {new Date().getFullYear()} Inskart. All rights reserved.
        </div>
      </div>
    </div>
  );
}
