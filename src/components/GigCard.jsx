function GigCard({ gig }) {
  return (
    <div className="group rounded-2xl bg-slate-800/60 border border-white/10 hover:border-white/20 transition overflow-hidden">
      {gig.cover_image ? (
        <img src={gig.cover_image} alt={gig.title} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-gradient-to-br from-slate-700 to-slate-800" />
      )}
      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-1">{gig.title}</h3>
        <p className="text-slate-300/80 text-sm line-clamp-2 mt-1">{gig.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-400">{gig.category}</span>
          <span className="text-emerald-300 font-bold">${gig.price}</span>
        </div>
      </div>
    </div>
  )
}

export default GigCard
