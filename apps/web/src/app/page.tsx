import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DW</span>
              </div>
              <span className="font-semibold text-xl text-slate-900">
                Data Wings
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/app"
                className="text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                App
              </Link>
              <Link
                href="/app/ask"
                className="text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Ask AI
              </Link>
              <a
                href="https://github.com/MARUCIE/data-wings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                GitHub
              </a>
              <Link
                href="/login"
                className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                Create account
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
            Ask your data
            <br />
            <span className="text-primary-600">in plain English</span>
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            AI-native analytics platform. No SQL required.
            Just ask questions and get insights instantly.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/app/ask"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Try AI Query
            </Link>
            <Link
              href="/signup"
              className="bg-white text-slate-900 px-8 py-3 rounded-lg text-lg font-medium border border-slate-300 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* AI Query Demo */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="ml-4 text-sm text-slate-500">AI Analytics</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 text-sm">?</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-medium">
                    What was our DAU trend last week?
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-sm">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-600">
                    Your DAU increased by <span className="text-green-600 font-semibold">+12%</span> last week,
                    from 45,230 to 50,658 daily active users. The peak was on Thursday with 54,120 users.
                  </p>
                  <div className="mt-4 h-32 bg-slate-50 rounded-lg flex items-end gap-1 p-4">
                    {[45, 52, 48, 61, 54, 58, 50].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-primary-400 rounded-t transition-all hover:bg-primary-500"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Why Data Wings?
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">AI-Native</h3>
              <p className="mt-2 text-slate-600">Ask questions in natural language. Get instant insights without writing SQL.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Open Source</h3>
              <p className="mt-2 text-slate-600">MIT licensed core. Self-host or use our cloud. No vendor lock-in.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Auto-Capture</h3>
              <p className="mt-2 text-slate-600">Zero-config event tracking. Just install the SDK and start analyzing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">DW</span>
              </div>
              <span className="font-medium text-slate-900">Data Wings</span>
            </div>
            <p className="text-slate-500 text-sm">
              2025 Data Wings. Open source under MIT license.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
