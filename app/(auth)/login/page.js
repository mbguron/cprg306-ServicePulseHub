"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      // sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // look up this user's role in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("No user profile found for this account.");
        return;
      }

      const userData = userSnap.data();
      const userRole = userData.role || "customer";

      // keep localStorage for now because the rest of your app already uses it
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.email || email);
      localStorage.setItem("userRole", userRole);

      if (userRole === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled.");
          break;
        default:
          setError("Unable to sign in. Please try again.");
      }
    }
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden lg:flex flex-col justify-center bg-slate-900 px-12 text-white">
          <div className="max-w-lg">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              ServicePulse Hub
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              Seamless Repairs. Smarter Service.
            </h1>

            <p className="mt-5 text-base text-slate-300">
              From booking to completion, we make your repair experience smooth
              and transparent.
            </p>

            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>Quick and easy appointment booking</p>
              <p>Reliable service for all your devices</p>
              <p>Get back to what matters faster</p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-8 text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
                Sign In
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Sign in to continue to ServicePulse Hub.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black outline-none transition focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-black outline-none transition focus:border-orange-500"
                  required
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              <span>Don't have an account? </span>
              <Link
                href="/register"
                className="font-semibold text-orange-600 hover:underline"
              >
                Sign Up
              </Link>
            </div>

            <div className="mt-3 text-center text-sm text-slate-600">
              <span>Return to site </span>
              <Link
                href="/"
                className="font-semibold text-orange-600 hover:underline"
              >
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}