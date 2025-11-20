import { useState } from 'react'

function CreateGigModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    price: '100',
    seller_id: 'demo-seller',
    tags: '',
    cover_image: ''
  })
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const body = {
        ...form,
        price: parseFloat(form.price),
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }
      await onCreate(body)
      onClose()
      setForm({ title: '', description: '', category: 'Web Development', price: '100', seller_id: 'demo-seller', tags: '', cover_image: '' })
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Post a new Gig</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white">✕</button>
        </div>
        <form onSubmit={submit} className="p-4 grid grid-cols-1 gap-4">
          <input value={form.title} onChange={(e) => update('title', e.target.value)} placeholder="Title" className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" required />
          <textarea value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Description" rows={4} className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" required />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.category} onChange={(e) => update('category', e.target.value)} placeholder="Category" className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" required />
            <input value={form.price} onChange={(e) => update('price', e.target.value)} placeholder="Price" type="number" step="1" min="0" className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" required />
          </div>
          <input value={form.tags} onChange={(e) => update('tags', e.target.value)} placeholder="Tags (comma separated)" className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" />
          <input value={form.cover_image} onChange={(e) => update('cover_image', e.target.value)} placeholder="Cover Image URL (optional)" className="rounded-xl bg-slate-800 border border-white/10 px-4 py-2 text-white" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2">Cancel</button>
            <button disabled={loading} className="rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white px-4 py-2">{loading ? 'Creating...' : 'Create Gig'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateGigModal
