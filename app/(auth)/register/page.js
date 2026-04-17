"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // create Firebase Authentication user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      // create matching Firestore user profile with customer role
      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        role: "customer",
        createdAt: serverTimestamp(),
      });

      // keep localStorage for now because the rest of your app already uses it
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.email || email);
      localStorage.setItem("userRole", "customer");

      router.push("/dashboard");
    } catch (error) {
      console.error("Register error:", error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError("That email is already in use.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password must be at least 6 characters.");
          break;
        default:
          setError("Unable to create account. Please try again.");
      }
    }
  }

  return (
    <div className="min-h-screen flex bg-orange-50">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white items-center justify-center px-12">
        <div className="max-w-lg">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
            ServicePulse Hub
          </p>

          <h1 className="text-4xl font-bold leading-tight">
            Join ServicePulse Hub
          </h1>

          <p className="mt-5 text-base text-slate-300">
            Create your account to book services, track repairs, and manage
            everything easily.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
            Create Account
          </h2>

          <p className="mb-6 text-center text-sm text-gray-600">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              className="w-full rounded-lg bg-orange-500 py-2 font-bold text-white transition hover:bg-orange-600"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-orange-600">
              Login
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray-600">
            <Link href="/" className="font-semibold text-orange-600">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}