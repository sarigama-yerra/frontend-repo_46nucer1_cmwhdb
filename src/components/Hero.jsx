function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(59,130,246,.25)_0,transparent_40%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,.25)_0,transparent_40%)]" />
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Hire top tech talent in minutes
          </h1>
          <p className="mt-4 text-lg text-blue-100/90">
            TechINDIA is a modern marketplace connecting businesses with expert developers, designers, and AI specialists. Start your project today.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#gigs" className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 transition">Explore Gigs</a>
            <a href="#how" className="rounded-xl bg-white/10 hover:bg-white/20 text-white px-5 py-3 transition border border-white/20">How it works</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl p-6">
            <div className="grid grid-cols-3 gap-3 h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-xl bg-white/5 border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
