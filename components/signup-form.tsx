"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", { email, password })
  }

  const handleGoogleSignUp = () => {
    // Handle Google sign up
    console.log("Google sign up clicked")
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Join Podcast2Newsletter
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Create your free account and start turning podcasts into beautiful newsletters.
        </p>
      </div>

      {/* Sign Up Card */}
      <div className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-2xl p-8">
        <div className="space-y-2 pb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
          <p className="text-gray-600">Welcome! Please fill in the details to get started.</p>
        </div>

        <div className="space-y-6">
          {/* Google Sign Up Button */}
          <button
            type="button"
            className="w-full h-12 flex items-center justify-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            onClick={handleGoogleSignUp}
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <hr className="w-full border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Email and Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="h-12 border border-gray-200 rounded-lg px-3 focus:border-purple-500 focus:ring-purple-500 w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="h-12 pr-12 border border-gray-200 rounded-lg px-3 focus:border-purple-500 focus:ring-purple-500 w-full"
                  required
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              Continue →
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-medium text-purple-600 hover:text-purple-700 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Security Badge */}
          <div className="text-center pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secured by Clerk</span>
            </div>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-600">
                Development mode
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
