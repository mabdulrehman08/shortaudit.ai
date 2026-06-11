import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowRight, ClipboardCheck, Loader2, Sparkles } from "lucide-react";
import "./styles.css";

const apiUrl = import.meta.env.VITE_API_URL || "";

const initialForm = {
  platform: "TikTok",
  title: "",
  description: "",
  goal: "",
  transcript: ""
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [audit, setAudit] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const transcriptWords = useMemo(
    () => form.transcript.trim().split(/\s+/).filter(Boolean).length,
    [form.transcript]
  );

  async function submitAudit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${apiUrl}/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || payload.error || "Audit failed");
      }

      setAudit(payload.audit);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="app-shell">
      <section className="workspace">
        <div className="brand-row">
          <div className="brand-mark">
            <Sparkles size={20} />
          </div>
          <div>
            <h1>ShortAudit AI</h1>
            <p>Audit short-form scripts before they turn into expensive edits.</p>
          </div>
        </div>

        <form className="audit-form" onSubmit={submitAudit}>
          <div className="field-grid">
            <label>
              Platform
              <select value={form.platform} onChange={(event) => updateField("platform", event.target.value)}>
                <option>TikTok</option>
                <option>Instagram Reels</option>
                <option>YouTube Shorts</option>
                <option>LinkedIn</option>
              </select>
            </label>

            <label>
              Goal
              <input
                value={form.goal}
                onChange={(event) => updateField("goal", event.target.value)}
                placeholder="More saves, signups, comments..."
              />
            </label>
          </div>

          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="Working title or content angle"
            />
          </label>

          <label>
            Description
            <textarea
              className="compact"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Optional context, target audience, or offer"
            />
          </label>

          <label>
            Transcript
            <textarea
              className="transcript"
              value={form.transcript}
              onChange={(event) => updateField("transcript", event.target.value)}
              placeholder="Paste the spoken script or rough outline here..."
              required
            />
          </label>

          <div className="form-footer">
            <span>{transcriptWords} words</span>
            <button type="submit" disabled={loading || transcriptWords < 4}>
              {loading ? <Loader2 className="spin" size={18} /> : <ClipboardCheck size={18} />}
              Audit script
              <ArrowRight size={18} />
            </button>
          </div>

          {error ? <p className="error">{error}</p> : null}
        </form>
      </section>

      <aside className="results-panel">
        {audit ? <AuditResult audit={audit} /> : <EmptyState />}
      </aside>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <ClipboardCheck size={42} />
      <h2>Ready for a script.</h2>
      <p>The audit will return a score, the highest-impact fixes, hook rewrites, and a caption.</p>
    </div>
  );
}

function AuditResult({ audit }) {
  return (
    <div className="audit-result">
      <div className="score-row">
        <div>
          <span className="eyebrow">Score</span>
          <strong>{Math.round(audit.score)}</strong>
        </div>
        <p>{audit.verdict}</p>
      </div>

      <ResultList title="Strengths" items={audit.strengths} />
      <ResultList title="Fix First" items={audit.fixes} />
      <ResultList title="Hook Options" items={audit.hookOptions} />

      <div className="caption-box">
        <span className="eyebrow">Caption</span>
        <p>{audit.caption}</p>
      </div>
    </div>
  );
}

function ResultList({ title, items }) {
  return (
    <section className="result-section">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
