import { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, Cell
} from "recharts";
import {
  products, weeklyRatings, weeklyBSR, wowDeltas,
  o25Daily, COLORS, ALL_SKUS
} from "./data.js";

const statusColor = (s) => {
  if (s === "GREEN") return { bg: "#0D2818", border: "#22C55E", text: "#4ADE80" };
  if (s === "WATCH") return { bg: "#2D2305", border: "#EAB308", text: "#FACC15" };
  return { bg: "#2D0A0A", border: "#EF4444", text: "#F87171" };
};

const TrendArrow = ({ value, suffix = "" }) => {
  if (value == null) return <span style={{ color: "#6B7280" }}>--</span>;
  const color = value > 0 ? "#4ADE80" : value < 0 ? "#F87171" : "#9CA3AF";
  const arrow = value > 0 ? "\u25B2" : value < 0 ? "\u25BC" : "\u2014";
  return (
    <span style={{ color, fontWeight: 600, fontFamily: "monospace", fontSize: 13 }}>
      {arrow}{Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
};

const DeltaCell = ({ value, inverted = false, suffix = "" }) => {
  if (value == null)
    return <td style={{ padding: "10px 14px", color: "#6B7280", borderBottom: "1px solid #1E293B", textAlign: "right" }}>--</td>;
  const isGood = inverted ? value < 0 : value > 0;
  const isBad = inverted ? value > 0 : value < 0;
  const color = isGood ? "#4ADE80" : isBad ? "#F87171" : "#E2E8F0";
  const bg = isGood ? "rgba(34,197,94,0.08)" : isBad ? "rgba(239,68,68,0.08)" : "transparent";
  return (
    <td style={{
      padding: "10px 14px", color, background: bg, borderBottom: "1px solid #1E293B",
      fontFamily: "monospace", fontWeight: 500, fontSize: 12, textAlign: "right"
    }}>
      {value > 0 ? "+" : ""}{value.toFixed(1)}{suffix}
    </td>
  );
};

const PAGES = ["Scorecard", "Rating Trends", "Review Volume", "BSR Tracking", "WoW Deltas"];

const th = {
  textAlign: "left", padding: "10px 14px", fontSize: 11, color: "#6B7280",
  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
  borderBottom: "2px solid #334155"
};
const td = { padding: "10px 14px", borderBottom: "1px solid #1E293B" };

// ---- Page components ----

function Scorecard({ sorted }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 24 }}>
        {sorted.map((p) => {
          const sc = statusColor(p.status);
          return (
            <div key={p.sku} style={{
              background: sc.bg, border: `1px solid ${sc.border}33`,
              borderRadius: 12, padding: "18px 22px", borderLeft: `4px solid ${sc.border}`
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: sc.text, letterSpacing: "0.08em" }}>{p.sku}</span>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: "#94A3B8" }}>{p.name}</p>
                  {p.amazonsChoice && (
                    <span style={{
                      display: "inline-block", marginTop: 4, fontSize: 9, fontWeight: 700,
                      padding: "2px 8px", borderRadius: 3, letterSpacing: "0.04em",
                      background: "#1A2332", color: "#F59E0B", border: "1px solid #F59E0B44"
                    }}>AMAZON'S CHOICE</span>
                  )}
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 20,
                  background: `${sc.border}22`, color: sc.text, border: `1px solid ${sc.border}44`,
                  height: "fit-content"
                }}>{p.status}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "monospace", fontSize: 34, fontWeight: 800, color: sc.text }}>
                  {p.amazonRating?.toFixed(1) ?? "--"}
                </span>
                <span style={{ fontSize: 12, color: "#64748B" }}>/5.0</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, color: "#64748B", marginRight: 6 }}>This week's avg:</span>
                <span style={{
                  fontFamily: "monospace", fontSize: 13, fontWeight: 600,
                  color: p.weeklyRating >= 4 ? "#4ADE80" : p.weeklyRating >= 3 ? "#FACC15" : "#F87171"
                }}>{p.weeklyRating.toFixed(2)}</span>
                {p.ratingDelta != null && (
                  <span style={{ marginLeft: 8 }}><TrendArrow value={p.ratingDelta} suffix="%" /></span>
                )}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[
                  { l: "Reviews", v: p.reviews?.toLocaleString() ?? "-" },
                  { l: "Avg/Day 30d", v: p.avgDaily30d != null ? p.avgDaily30d.toFixed(1) : "NEW" },
                  { l: "BSR", v: p.bsr ? `#${p.bsr}` : "-" },
                ].map((m, i) => (
                  <div key={i}>
                    <p style={{ margin: 0, fontSize: 9, color: "#64748B", textTransform: "uppercase" }}>{m.l}</p>
                    <p style={{ margin: "2px 0 0", fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>{m.v}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#111827", border: "1px solid #374151", borderRadius: 12, padding: "18px 24px" }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 14, color: "#F8FAFC", fontWeight: 600 }}>
          Weekly New Review Ratings (not cumulative Amazon rating)
        </h3>
        <p style={{ margin: "0 0 12px", fontSize: 11, color: "#64748B" }}>
          Low-volume weeks (1-2 reviews) cause large swings in weekly weighted average
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["SKU", "Amazon", "Wk Avg", "Delta", "Net New", "BSR"].map((h) => (
                <th key={h} style={{ ...th, textAlign: h === "SKU" ? "left" : "right" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.filter((p) => p.status !== "GREEN").map((p) => (
              <tr key={p.sku}>
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 700, color: statusColor(p.status).text }}>{p.sku}</td>
                <td style={{
                  ...td, fontFamily: "monospace", fontWeight: 700, textAlign: "right",
                  color: p.amazonRating >= 4.4 ? "#4ADE80" : p.amazonRating >= 4 ? "#FACC15" : "#F87171"
                }}>{p.amazonRating?.toFixed(1) ?? "--"}</td>
                <td style={{
                  ...td, fontFamily: "monospace", fontWeight: 600, textAlign: "right",
                  color: p.weeklyRating >= 4 ? "#4ADE80" : p.weeklyRating >= 3 ? "#FACC15" : "#F87171"
                }}>{p.weeklyRating.toFixed(2)}</td>
                <DeltaCell value={p.ratingDelta} suffix="%" />
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 600, textAlign: "right", color: p.netNew > 10 ? "#4ADE80" : "#E2E8F0" }}>{p.netNew}</td>
                <td style={{ ...td, fontFamily: "monospace", textAlign: "right" }}>#{p.bsr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RatingTrends() {
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Weekly Rating Trends</h2>
      <p style={{ fontSize: 12, color: "#64748B", marginBottom: 20 }}>
        Weighted avg of new reviews per week - equivalent to column BF, BN, etc.
      </p>
      <div style={{ background: "#111827", borderRadius: 12, padding: "24px 20px", border: "1px solid #1E293B", marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weeklyRatings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
            <YAxis domain={[0.5, 5.5]} stroke="#64748B" fontSize={11} ticks={[1, 2, 3, 4, 5]} />
            <Tooltip
              contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }}
              formatter={(v) => v?.toFixed(2)}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <ReferenceLine y={4.4} stroke="#22C55E" strokeDasharray="6 4" strokeWidth={1.5} />
            <ReferenceLine y={4.0} stroke="#EAB308" strokeDasharray="6 4" strokeWidth={1.5} />
            {ALL_SKUS.map((s) => (
              <Line key={s} type="monotone" dataKey={s} stroke={COLORS[s]}
                strokeWidth={s === "O25" ? 3 : 1.5} dot={{ r: s === "O25" ? 4 : 2 }} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#111827", borderRadius: 12, padding: "20px 24px", border: "1px solid #1E293B" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600 }}>Rating Heatmap</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#6B7280", fontSize: 11 }}>SKU</th>
                {weeklyRatings.map((w) => (
                  <th key={w.week} style={{ textAlign: "center", padding: "8px", color: "#6B7280", fontSize: 10 }}>{w.week}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_SKUS.map((sku) => (
                <tr key={sku}>
                  <td style={{ padding: "8px 12px", fontFamily: "monospace", fontWeight: 700, color: COLORS[sku], borderBottom: "1px solid #1E293B" }}>{sku}</td>
                  {weeklyRatings.map((w, i) => {
                    const v = w[sku];
                    if (!v) return <td key={i} style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #1E293B", color: "#4B5563" }}>--</td>;
                    const bg = v >= 4.4 ? "rgba(34,197,94,0.25)" : v >= 4 ? "rgba(234,179,8,0.15)" : v >= 3 ? "rgba(249,115,22,0.15)" : "rgba(239,68,68,0.25)";
                    const c = v >= 4.4 ? "#4ADE80" : v >= 4 ? "#FACC15" : v >= 3 ? "#FB923C" : "#F87171";
                    return (
                      <td key={i} style={{
                        textAlign: "center", padding: "8px", background: bg, color: c,
                        fontFamily: "monospace", fontSize: 11, fontWeight: 600, borderBottom: "1px solid #1E293B"
                      }}>{v.toFixed(1)}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReviewVolume() {
  const totalReviews = o25Daily.reduce((s, d) => s + d.total, 0);
  const totalS5 = o25Daily.reduce((s, d) => s + d.s5, 0);
  const totalS1 = o25Daily.reduce((s, d) => s + d.s1, 0);
  const wtdSum = o25Daily.reduce((s, d) => s + d.s1 + d.s2 * 2 + d.s3 * 3 + d.s4 * 4 + d.s5 * 5, 0);

  const kpis = [
    { l: "Reviews", v: totalReviews },
    { l: "Avg/Active Day", v: (totalReviews / o25Daily.length).toFixed(1) },
    { l: "% 5-Star", v: ((totalS5 / totalReviews) * 100).toFixed(0) + "%" },
    { l: "% 1-Star", v: ((totalS1 / totalReviews) * 100).toFixed(0) + "%" },
    { l: "Wtd Avg", v: (wtdSum / totalReviews).toFixed(2) },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>O25 Daily Review Volume</h2>
      <p style={{ fontSize: 12, color: "#64748B", marginBottom: 20 }}>
        Days with reviews only (Jan-Mar 2026) - stacked by star rating
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <div key={i} style={{ background: "#111827", borderRadius: 10, padding: "14px 16px", border: "1px solid #1E293B", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: 9, color: "#64748B", textTransform: "uppercase" }}>{k.l}</p>
            <p style={{ margin: "6px 0 0", fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: "#F8FAFC" }}>{k.v}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#111827", borderRadius: 12, padding: "24px 20px", border: "1px solid #1E293B" }}>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={o25Daily}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={10} />
            <YAxis stroke="#64748B" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="s1" stackId="a" fill="#DC2626" name="1-Star" />
            <Bar dataKey="s2" stackId="a" fill="#F97316" name="2-Star" />
            <Bar dataKey="s3" stackId="a" fill="#EAB308" name="3-Star" />
            <Bar dataKey="s4" stackId="a" fill="#84CC16" name="4-Star" />
            <Bar dataKey="s5" stackId="a" fill="#22C55E" name="5-Star" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BSRTracking() {
  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>BSR Tracking</h2>
      <p style={{ fontSize: 12, color: "#64748B", marginBottom: 20 }}>Best Sellers Rank - lower is better</p>
      <div style={{ background: "#111827", borderRadius: 12, padding: "24px 20px", border: "1px solid #1E293B", marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={weeklyBSR}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis dataKey="week" stroke="#64748B" fontSize={11} />
            <YAxis reversed stroke="#64748B" fontSize={11} domain={[0, 50]} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            {["O15", "O25", "E25", "B42", "H20"].map((s) => (
              <Line key={s} type="monotone" dataKey={s} stroke={COLORS[s]} strokeWidth={2} dot={{ r: 3 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#111827", borderRadius: 12, padding: "20px 24px", border: "1px solid #1E293B" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600 }}>Current BSR Rankings (Feb 23)</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["#", "SKU", "Product", "BSR", "Rating", "Reviews"].map((h) => (
                <th key={h} style={{ ...th, textAlign: ["#", "SKU", "Product"].includes(h) ? "left" : "right" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...products].filter((p) => p.bsr).sort((a, b) => a.bsr - b.bsr).map((p, i) => (
              <tr key={p.sku}>
                <td style={{ ...td, fontFamily: "monospace", color: "#64748B", fontWeight: 700 }}>{i + 1}</td>
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 700, color: COLORS[p.sku] || "#E2E8F0" }}>{p.sku}</td>
                <td style={{ ...td, color: "#CBD5E1" }}>{p.name}</td>
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 700, color: "#3B82F6", textAlign: "right" }}>#{p.bsr}</td>
                <td style={{
                  ...td, fontFamily: "monospace", fontWeight: 600, textAlign: "right",
                  color: p.amazonRating >= 4.4 ? "#4ADE80" : p.amazonRating >= 4 ? "#FACC15" : "#F87171"
                }}>{p.amazonRating?.toFixed(1) ?? "--"}</td>
                <td style={{ ...td, fontFamily: "monospace", textAlign: "right" }}>{p.reviews?.toLocaleString() ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WoWDeltas() {
  const sortedDeltas = [...wowDeltas].sort((a, b) => (a.ratingDelta ?? 999) - (b.ratingDelta ?? 999));
  const barData = [...wowDeltas].sort((a, b) => b.netNew - a.netNew);

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>Week-over-Week Comparison</h2>
      <p style={{ fontSize: 12, color: "#64748B", marginBottom: 20 }}>Week of Feb 23 vs Week of Feb 16</p>
      <div style={{ background: "#111827", borderRadius: 12, padding: "20px 24px", border: "1px solid #1E293B", marginBottom: 24, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["SKU", "Wk Rating", "Rating Delta", "Reviews", "Rev Delta", "Net New", "BSR", "BSR Chg"].map((h) => (
                <th key={h} style={{ ...th, textAlign: h === "SKU" ? "left" : "right" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedDeltas.map((r) => (
              <tr key={r.sku}>
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 700, color: COLORS[r.sku] || "#E2E8F0" }}>{r.sku}</td>
                <td style={{
                  ...td, fontFamily: "monospace", fontWeight: 600, textAlign: "right",
                  color: r.rating >= 4 ? "#4ADE80" : r.rating >= 3 ? "#FACC15" : "#F87171"
                }}>{r.rating.toFixed(2)}</td>
                <DeltaCell value={r.ratingDelta} suffix="%" />
                <td style={{ ...td, fontFamily: "monospace", textAlign: "right" }}>{r.reviews.toLocaleString()}</td>
                <DeltaCell value={r.reviewsDelta} suffix="%" />
                <td style={{ ...td, fontFamily: "monospace", fontWeight: 600, textAlign: "right", color: r.netNew > 10 ? "#4ADE80" : "#E2E8F0" }}>
                  {r.netNew > 0 ? "+" : ""}{r.netNew}
                </td>
                <td style={{ ...td, fontFamily: "monospace", textAlign: "right" }}>#{r.bsr}</td>
                <DeltaCell value={r.bsrDelta} inverted />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ background: "#111827", borderRadius: 12, padding: "24px 20px", border: "1px solid #1E293B" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 14, fontWeight: 600 }}>Net New Reviews - Feb 23</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
            <XAxis type="number" stroke="#64748B" fontSize={11} />
            <YAxis type="category" dataKey="sku" stroke="#64748B" fontSize={12} width={50} />
            <Tooltip contentStyle={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="netNew" radius={[0, 6, 6, 0]}>
              {barData.map((e, i) => (
                <Cell key={i} fill={COLORS[e.sku] || "#6B7280"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ---- Main App ----

export default function App() {
  const [page, setPage] = useState(0);

  const sorted = useMemo(() => {
    const o = { WATCH: 0, GREEN: 1 };
    return [...products].sort(
      (a, b) => (o[a.status] ?? 9) - (o[b.status] ?? 9) || (a.weeklyRating ?? 99) - (b.weeklyRating ?? 99)
    );
  }, []);

  return (
    <div style={{ background: "#0B0F1A", minHeight: "100vh", color: "#E2E8F0", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#0F172A,#1E1B4B)", borderBottom: "1px solid #334155",
        padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#F8FAFC" }}>
            Raycon Amazon Dashboard
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#64748B" }}>
            Data through March 2, 2026 - synced daily at 6 AM EST
          </p>
        </div>
        <div style={{ display: "flex", gap: 3, background: "#1E293B", borderRadius: 8, padding: 3 }}>
          {PAGES.map((p, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              padding: "8px 14px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: page === i ? 600 : 400,
              background: page === i ? "#3B82F6" : "transparent",
              color: page === i ? "#FFF" : "#94A3B8"
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 32px", maxWidth: 1440, margin: "0 auto" }}>
        {page === 0 && <Scorecard sorted={sorted} />}
        {page === 1 && <RatingTrends />}
        {page === 2 && <ReviewVolume />}
        {page === 3 && <BSRTracking />}
        {page === 4 && <WoWDeltas />}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1E293B", padding: "16px 32px", marginTop: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 1440, margin: "24px auto 0"
      }}>
        <span style={{ fontSize: 11, color: "#475569" }}>
          Raycon Amazon Dashboard - Data through March 2, 2026
        </span>
        <a
          href="mailto:kdecubellis@rayconglobal.com?subject=Raycon%20Amazon%20Dashboard%20-%20Feedback"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 6, border: "1px solid #334155",
            background: "#1E293B", color: "#94A3B8", fontSize: 12, fontWeight: 500,
            textDecoration: "none", cursor: "pointer"
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Bugs / Feedback
        </a>
      </div>
    </div>
  );
}
