"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  Video,
} from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { showNotification } = useNotification();

  // Password strength validation
  const getPasswordStrength = (password: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[A-Z]/, text: "One uppercase letter" },
      { regex: /[a-z]/, text: "One lowercase letter" },
      { regex: /\d/, text: "One number" },
      { regex: /[^A-Za-z0-9]/, text: "One special character" },
    ];

    return requirements.map((req) => ({
      ...req,
      met: req.regex.test(password),
    }));
  };

  const passwordRequirements = getPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      showNotification("Registration successful! Please log in.", "success");
      router.push("/login");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Registration failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 relative pt-12">
      {/* Animated Background Elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div> */}

      {/* Main Register Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center flex-col text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <Video className="w-12 h-12 text-white" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                ImageKit
              </h1>
              <p className="text-purple-300/80 text-sm font-medium -mt-1">
                ReelsPro
              </p>
            </div>
          </div>
          <p className="text-white/70 text-lg">Join ImageKit ReelsPro today</p>
        </div>

        {/* Register Form */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl shadow-purple-900/20 p-8">
          <div className="flex items-center space-x-2 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-white/10 backdrop-blur-sm">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/90"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-white/70 font-medium">
                    Password requirements:
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {req.met ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span
                          className={`text-xs ${
                            req.met ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/90"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-12 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 ${
                    confirmPassword && passwordsMatch
                      ? "border-green-500/50 focus:ring-green-500/50 focus:border-green-500/50"
                      : confirmPassword && !passwordsMatch
                      ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50"
                      : "border-white/20 focus:ring-purple-500/50 focus:border-purple-500/50"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70 transition-colors duration-200"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="flex items-center space-x-2 mt-2">
                  {passwordsMatch ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-xs text-red-400">
                        Passwords do not match
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            {/* <div className="flex items-start space-x-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-white/30 rounded bg-white/10"
              />
              <label htmlFor="terms" className="text-sm text-white/80">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-purple-300 hover:text-purple-200 underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-purple-300 hover:text-purple-200 underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div> */}

            {/* Register Button */}
            <button
              type="submit"
              disabled={
                isLoading ||
                !passwordsMatch ||
                !passwordRequirements.every((req) => req.met)
              }
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </div>

              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-300 hover:text-purple-200 font-medium transition-colors duration-200 hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/40 text-sm">
          <p>© 2025 ImageKit ReelsPro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
