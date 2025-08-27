"use client";
import { supabase } from '@/utils/supabaseClient';
import { useEffect, useState } from 'react';
import { fetchOGImage } from '@/utils/fetchOGImage';

export default function AdminDashboard() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [priceError, setPriceError] = useState<string | null>(null);

  // Stripe minimums: USD/EUR/GBP = 0.50, INR = 50
  const getMinPrice = (curr: string) => {
    switch (curr) {
      case 'INR': return 50;
      case 'USD':
      case 'EUR':
      case 'GBP': return 0.5;
      default: return 0.5;
    }
  };

  useEffect(() => {
    if (price > 0 && price < getMinPrice(currency)) {
      setPriceError(`Minimum for ${currency} is ${getMinPrice(currency)}`);
    } else {
      setPriceError(null);
    }
  }, [price, currency]);
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState(""); 
  const [type, setType] = useState<'file' | 'link'>('file');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const { data } = await supabase.from('content').select('*');
      setContent(data || []);
      setLoading(false);
    }
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setError("");
    let file_url = null;
    if (type === 'file' && file) {
      const { data, error: uploadError } = await supabase.storage.from('content-files').upload(`${Date.now()}-${file.name}`, file);
      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }
      file_url = data?.path ? supabase.storage.from('content-files').getPublicUrl(data.path).data.publicUrl : null;
    } else if (type === 'link' && link) {
      // If link is provided, try to fetch its Open Graph image
      const ogImage = await fetchOGImage(link);
      file_url = ogImage || link; // fallback to link if no og:image found
    }
    if (editId) {
      // Update existing item
      const { error: updateError } = await supabase.from('content').update({ title, description, price, currency, file_url, link, type }).eq('id', editId);
      if (updateError) {
        setError(updateError.message);
      } else {
        setEditId(null);
        setTitle("");
        setDescription("");
        setPrice(0);
        setCurrency('USD');
        setFile(null);
        setLink("");
        setType('file');
        setPreviewUrl(null);
        // Refresh content list
        const { data } = await supabase.from('content').select('*');
        setContent(data || []);
      }
    } else {
      // Insert new item
      const { error: insertError } = await supabase.from('content').insert([
        { title, description, price, currency, file_url, link, type }
      ]);
      if (insertError) {
        setError(insertError.message);
      } else {
        setTitle("");
        setDescription("");
        setPrice(0);
        setCurrency('USD');
        setFile(null);
        setLink("");
        setType('file');
        setPreviewUrl(null);
        // Refresh content list
        const { data } = await supabase.from('content').select('*');
        setContent(data || []);
      }
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#18181b] to-[#23272f] text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#18181b] border-r border-[#23272f] py-8 px-6 min-h-screen shadow-xl">
        <div className="flex flex-col items-center mb-10">
          <img src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/safwan-hero.jpg" alt="Safwan M P" className="w-16 h-16 rounded-full border-4 border-[#1DB954] shadow mb-2 object-cover" />
          <h2 className="text-xl font-bold">Dashboard</h2>
          <span className="text-xs text-gray-400">Admin</span>
        </div>
        <nav className="flex flex-col gap-4 mt-4">
          <a href="/admin/dashboard" className="font-semibold text-[#1DB954]">Content</a>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-10 px-2 md:px-10">
        <h1 className="text-3xl font-bold mb-8 font-montserrat">Content Management</h1>
        {/* Modern content creation form */}
        <form onSubmit={handleSubmit} className="bg-[#23272f]/80 backdrop-blur-md p-8 rounded-2xl mb-10 flex flex-col gap-4 w-full max-w-lg shadow-xl border border-[#23272f]">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="type" value="file" checked={type === 'file'} onChange={() => setType('file')} /> File
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="type" value="link" checked={type === 'link'} onChange={() => setType('link')} /> Link
            </label>
          </div>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954]" required />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954]" required />
          {type === 'link' && (
            <input type="url" placeholder="Link" value={link} onChange={e => setLink(e.target.value)} className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954]" required />
          )}
          {type === 'file' && (
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954]" required />
          )}
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="w-full h-32 object-cover rounded border border-[#1DB954]" />
          )}
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Price (0 for free)"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954] flex-1"
                min={0}
                step="any"
                required
              />
              <select value={currency} onChange={e => setCurrency(e.target.value)} className="p-3 rounded bg-[#18181b] text-white border border-[#23272f] focus:border-[#1DB954]">
                <option value="USD">$ USD</option>
                <option value="INR">₹ INR</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
              </select>
            </div>
            {price > 0 && priceError && (
              <span className="text-xs text-red-400 mt-1">{priceError}</span>
            )}
          </div>
          <button type="submit" className="bg-[#1DB954] text-white font-bold py-2 rounded-full hover:shadow-[0_0_10px_#1DB954] transition" disabled={uploading}>{uploading ? "Uploading..." : "Upload"}</button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.length === 0 ? (
          <div className="text-center col-span-2 py-8">No content found.</div>
        ) : (
          content.map(item => (
            <div key={item.id} className="bg-[#23272f] border border-[#23272f] rounded-2xl shadow-lg flex flex-col gap-2 p-4">
              <div className="flex items-center gap-4">
                {item.file_url ? (
                  <img src={item.file_url} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-[#1DB954] bg-[#18181b]" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
                ) : item.link ? (
                  <img src={`https://opengraph.githubassets.com/1/${encodeURIComponent(item.link)}`} alt={item.title} className="w-16 h-16 object-cover rounded-xl border border-[#1DB954] bg-[#18181b]" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }} />
                ) : null}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg truncate text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 truncate">{item.description}</p>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold w-fit ${item.price === 0 ? 'bg-[#1DB954] text-white' : 'bg-[#FFD700] text-black'}`}>
                    {item.price === 0 ? 'Free' : `Premium (${item.currency === 'INR' ? '₹' : item.currency === 'USD' ? '$' : item.currency === 'EUR' ? '€' : item.currency === 'GBP' ? '£' : item.currency}: ${item.price})`}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold"
                    onClick={() => {
                      setEditId(item.id);
                      setTitle(item.title);
                      setDescription(item.description);
                      setPrice(item.price);
                      setCurrency(item.currency || 'USD');
                      setLink(item.link || "");
                      setPreviewUrl(item.file_url || null);
                      setFile(null);
                      setType(item.type || 'file');
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-full font-bold"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this item?')) {
                        await supabase.from('content').delete().eq('id', item.id);
                        // Optionally delete file from storage
                        if (item.file_url) {
                          const path = item.file_url.split('/content-files/')[1];
                          if (path) {
                            await supabase.storage.from('content-files').remove([path]);
                          }
                        }
                        // Refresh content list
                        const { data } = await supabase.from('content').select('*');
                        setContent(data || []);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      </main>
    </div>
  );
}
