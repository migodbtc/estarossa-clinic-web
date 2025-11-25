"use client";

import AuthLayout from "../../../components/layouts/AuthLayout";

const Page = () => {
  return (
    <AuthLayout>
      <div className="bg-white/95 rounded-xl shadow-lg backdrop-blur-sm mx-auto w-full sm:w-[90%] md:w-[60%] lg:w-[30vw]">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">
            Sign in to your account
          </h1>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-brand focus:ring-brand"
                />
                <label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </label>
              </div>

              <a href="#" className="text-sm text-slate-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-4 py-2 font-medium hover:bg-slate-800"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Page;
