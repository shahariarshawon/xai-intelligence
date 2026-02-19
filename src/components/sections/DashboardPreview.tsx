"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["overview", "models", "insights"];

const mockMetrics = [
  { label: "Data Processed", value: "2.4 TB", change: "+18%" },
  { label: "Active Models", value: "47", change: "+5" },
  { label: "Insights Generated", value: "1,892", change: "+32%" },
];

const mockTable = [
  { id: 1, model: "Churn Predictor", status: "Active", accuracy: "91%" },
  { id: 2, model: "Revenue Forecaster", status: "Training", accuracy: "87%" },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section className="relative py-32 bg-linear-to-b from-[#08090a] via-[#333437] to-[#252628]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-semibold text-center text-white mb-20">
          Intelligence Dashboard Preview
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-[#12161d] shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-[240px_1fr] min-h-[520px]">
            {/* Sidebar */}
            <aside className="border-r border-white/10 p-6 space-y-6 bg-[#0f131a]">
              <h3 className="text-sm uppercase tracking-widest text-white/40">
                Navigation
              </h3>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm transition
                      ${
                        activeTab === tab
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main className="p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "overview" && (
                    <div className="space-y-10">
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-6">
                        {mockMetrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-lg border border-white/10 bg-[#161b22] p-6 hover:border-white/20 transition"
                          >
                            <p className="text-sm text-white/50 mb-2">
                              {metric.label}
                            </p>
                            <div className="flex items-end justify-between">
                              <p className="text-2xl font-semibold text-white">
                                {metric.value}
                              </p>
                              <span className="text-sm text-emerald-400">
                                {metric.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chart Mock */}
                      <div className="rounded-lg border border-white/10 bg-[#161b22] p-6">
                        <p className="text-sm text-white/50 mb-4">
                          Insight Trend
                        </p>

                        <div className="flex items-end gap-3 h-40">
                          {[30, 50, 40, 70, 60, 80].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ delay: i * 0.05 }}
                              className="flex-1 bg-indigo-500/70 rounded-sm hover:bg-indigo-400 transition"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "models" && (
                    <div className="rounded-lg border border-white/10 bg-[#161b22] overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="border-b border-white/10 text-white/50">
                          <tr>
                            <th className="px-6 py-4 text-left">Model</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Accuracy</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockTable.map((row) => (
                            <tr
                              key={row.id}
                              className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                              <td className="px-6 py-4 text-white">
                                {row.model}
                              </td>
                              <td className="px-6 py-4 text-white/70">
                                {row.status}
                              </td>
                              <td className="px-6 py-4 text-emerald-400">
                                {row.accuracy}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === "insights" && (
                    <div className="space-y-6">
                      {[
                        "Revenue Spike Detected",
                        "Churn Risk Cluster Identified",
                      ].map((insight, i) => (
                        <div
                          key={i}
                          className="p-6 rounded-lg border border-white/10 bg-[#161b22] hover:border-white/20 transition"
                        >
                          <p className="text-white">{insight}</p>
                          <p className="text-sm text-white/50 mt-2">
                            Generated by anomaly detection model.
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
