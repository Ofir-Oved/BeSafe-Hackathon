
import { Link } from "react-router-dom";


import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { apiPost } from "../lib/api";
import { saveToken } from "../lib/auth";

export default function SignUpPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setStatus({ type: "error", message: "Please fill all fields" });
      return;
    }

    try {
      setStatus({ type: "loading", message: "" });

      const res = await apiPost("/auth/signup", {
        fullName,
        email,
        password,
      });

      
      if (res.token) {
        saveToken(res.token);
        navigate("/profile-setup");
        return;
      }

      
      setStatus({
        type: "ok",
        message: "Account created! Please continue.",
      });

      navigate("/profile-setup");
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Signup failed",
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-sm text-white/60">
          Join BeSafe-Hackathon
        </p>
      </div>

      <div className="space-y-4">

        
        <div>
          <label className="text-xs text-white/60">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="
              mt-1 w-full rounded-xl bg-white/5 border border-white/10
              px-4 py-3 text-white placeholder:text-white/40
              focus:outline-none focus:ring-2
              focus:ring-pink-400/60 focus:border-pink-400/40
            "
            placeholder="Your name"
          />
        </div>

       
        <div>
          <label className="text-xs text-white/60">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="
              mt-1 w-full rounded-xl bg-white/5 border border-white/10
              px-4 py-3 text-white placeholder:text-white/40
              focus:outline-none focus:ring-2
              focus:ring-sky-400/60 focus:border-sky-400/40
            "
            placeholder="you@gmail.com"
          />
        </div>

       
        <div>
          <label className="text-xs text-white/60">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="
              mt-1 w-full rounded-xl bg-white/5 border border-white/10
              px-4 py-3 text-white placeholder:text-white/40
              focus:outline-none focus:ring-2
              focus:ring-pink-400/60 focus:border-pink-400/40
            "
            placeholder="At least 6 chars"
          />
        </div>

       
        <button
          onClick={handleSignup}
          disabled={status.type === "loading"}
          className="
            w-full mt-2 rounded-xl
            bg-gradient-to-r from-sky-400 to-pink-400
            hover:from-sky-500 hover:to-pink-500
            disabled:opacity-60
            text-slate-900 font-semibold py-3 transition
          "
        >
          {status.type === "loading" ? "Creating..." : "Create Account"}
        </button>

       
        {status.message && (
          <p
            className={`text-sm ${
              status.type === "error"
                ? "text-red-300"
                : "text-emerald-200"
            }`}
          >
            {status.message}
          </p>
        )}

        
        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link
            to="/"
            className="bg-gradient-to-r from-sky-400 to-pink-400 bg-clip-text text-transparent hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
