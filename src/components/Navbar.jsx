import { useState } from 'react'

function Navbar({ onSearch, onOpenCreate }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <a href="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          TechINDIA
        </a>
        <form onSubmit={submit} className="hidden md:flex items-center gap-2 flex-1">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search services (e.g., logo design, website, AI bot)"
            className="w-full rounded-xl bg-slate-800/80 border border-white/10 px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 transition-colors">Search</button>
        </form>
        <button onClick={onOpenCreate} className="ml-auto rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 transition-colors">
          Post a Gig
        </button>
      </div>
    </header>
  )
}

export default Navbar
