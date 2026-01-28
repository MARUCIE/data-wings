"use client";

import { useState, useRef, useEffect } from "react";
import { api, type AskResponse } from "@/lib/api";

/** Message type for chat history */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  response?: AskResponse;
  timestamp: Date;
}

/** Format SQL for display */
function formatSQL(sql: string): string {
  return sql
    .replace(/\b(SELECT|FROM|WHERE|GROUP BY|ORDER BY|LIMIT|AND|OR|AS|JOIN|LEFT|RIGHT|INNER|ON|HAVING|WITH)\b/gi, "\n$1")
    .replace(/^\n/, "")
    .trim();
}

/** SQL Code Block Component */
function SQLBlock({ sql }: { sql: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
        <span className="text-xs text-slate-400 font-mono">SQL</span>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-100 overflow-x-auto">
        <code>{formatSQL(sql)}</code>
      </pre>
    </div>
  );
}

/** Data Table Component */
function DataTable({ data }: { data: Array<Record<string, unknown>> }) {
  if (!data.length) {
    return (
      <div className="text-sm text-slate-500 italic">No results</div>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.slice(0, 10).map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-4 py-2 text-sm text-slate-900 whitespace-nowrap"
                >
                  {String(row[col] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > 10 && (
        <p className="text-xs text-slate-500 mt-2 px-4">
          Showing 10 of {data.length} rows
        </p>
      )}
    </div>
  );
}

/** Message Component */
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-3xl rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-primary-600 text-white"
            : "bg-white border border-slate-200 shadow-sm"
        }`}
      >
        <p className={isUser ? "text-white" : "text-slate-900"}>
          {message.content}
        </p>

        {message.response && !isUser && (
          <div className="mt-4 space-y-4">
            {/* Confidence */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Confidence:</span>
              <span
                className={`text-xs font-medium ${
                  message.response.confidence >= 0.8
                    ? "text-green-600"
                    : message.response.confidence >= 0.5
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {(message.response.confidence * 100).toFixed(0)}%
              </span>
            </div>

            {/* Explanation */}
            {message.response.explanation && (
              <p className="text-sm text-slate-600">
                {message.response.explanation}
              </p>
            )}

            {/* SQL */}
            {message.response.sql && (
              <SQLBlock sql={message.response.sql} />
            )}

            {/* Results */}
            {message.response.data && message.response.data.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">
                  Results
                </h4>
                <DataTable data={message.response.data} />
              </div>
            )}

            {/* Error */}
            {message.response.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {message.response.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Ask Page */
export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const question = input.trim();
    if (!question || loading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Call API
    const response = await api.analytics.ask(question);

    // Add assistant message
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response.error
        ? "I encountered an error processing your question."
        : "Here's what I found:",
      response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Example questions
  const exampleQuestions = [
    "How many users visited yesterday?",
    "What are the top 10 events this week?",
    "Show me DAU trend for the last 7 days",
    "Which pages have the highest bounce rate?",
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Ask AI
              </h1>
              <p className="text-sm text-slate-500">
                Ask questions about your data in natural language
              </p>
            </div>
            <a
              href="/dashboard"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                What would you like to know?
              </h2>
              <p className="text-slate-500 mb-8">
                Ask questions about your analytics data using natural language
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {exampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(q)}
                    className="p-3 text-left text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question about your data..."
              className="flex-1 resize-none rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Thinking..." : "Ask"}
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-2 text-center">
            AI may make mistakes. Please verify important information.
          </p>
        </div>
      </footer>
    </div>
  );
}
