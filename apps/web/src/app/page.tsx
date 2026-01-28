import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
              <Link href="/features" className="text-slate-600 hover:text-slate-900">
                Features
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
                Pricing
              </Link>
              <Link href="/docs" className="text-slate-600 hover:text-slate-900">
                Docs
              </Link>
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Started
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
              href="/signup"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/demo"
              className="bg-white text-slate-900 px-8 py-3 rounded-lg text-lg font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
            >
              Live Demo
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
                  <div className="mt-4 h-32 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                    [Chart Placeholder]
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
            {[
              {
                title: "AI-Native",
                description: "Ask questions in natural language. Get instant insights without writing SQL.",
                icon: "AI",
              },
              {
                title: "Open Source",
                description: "MIT licensed core. Self-host or use our cloud. No vendor lock-in.",
                icon: "OS",
              },
              {
                title: "Auto-Capture",
                description: "Zero-config event tracking. Just install the SDK and start analyzing.",
                icon: "AC",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl border border-slate-200"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-primary-600 font-bold">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-slate-600">{feature.description}</p>
              </div>
            ))}
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
