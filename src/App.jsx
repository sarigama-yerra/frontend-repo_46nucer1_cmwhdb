import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GigCard from './components/GigCard'
import CreateGigModal from './components/CreateGigModal'

function App() {
  const [gigs, setGigs] = useState([])
  const [filtered, setFiltered] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState({ q: '', category: '' })

  const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetchGigs()
  }, [])

  useEffect(() => {
    const { q } = query
    let res = gigs
    if (q) {
      const s = q.toLowerCase()
      res = res.filter((g) => g.title.toLowerCase().includes(s) || g.description.toLowerCase().includes(s))
    }
    setFiltered(res)
  }, [query, gigs])

  const fetchGigs = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (query.q) params.set('q', query.q)
      if (query.category) params.set('category', query.category)
      const res = await fetch(`${BASE}/gigs?${params.toString()}`)
      const data = await res.json()
      setGigs(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term) => setQuery((s) => ({ ...s, q: term }))

  const createGig = async (body) => {
    const res = await fetch(`${BASE}/gigs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error('Failed to create gig')
    await fetchGigs()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar onSearch={handleSearch} onOpenCreate={() => setOpen(true)} />
      <Hero />

      <section id="gigs" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-semibold">Popular gigs</h2>
          <button onClick={fetchGigs} className="text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl px-3 py-1.5">Refresh</button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-slate-300 bg-white/5 border border-white/10 rounded-2xl p-10">
            No gigs yet. Be the first to post one!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((gig) => (
              <GigCard key={gig.id || gig._id} gig={gig} />)
            )}
          </div>
        )}
      </section>

      <footer id="how" className="border-t border-white/10 py-10 text-center text-slate-400">
        <p>Built with love in TechINDIA. Post a gig, hire fast, deliver faster.</p>
      </footer>

      <CreateGigModal open={open} onClose={() => setOpen(false)} onCreate={createGig} />
    </div>
  )
}

export default App
