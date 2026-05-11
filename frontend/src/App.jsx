import Dashboard from './components/Dashboard.jsx'
import HookTools from './components/HookTools.jsx'
import Landing from './components/Landing.jsx'

export default function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-radial-grid text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Landing />
      <Dashboard />
      <HookTools />
      <footer className="px-6 pb-10 text-center text-sm text-slate-500">
        Built for creators diagnosing low reach, retention drops, synthetic-feeling edits, and upload-method risk.
      </footer>
    </main>
  )
}
