
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";



export default function ContentPage() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      const { data } = await supabase.from('content').select('*').order('created_at', { ascending: false });
      setContent(data || []);
      setLoading(false);
    }
    fetchContent();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18181b] to-[#23272f] text-white flex flex-col items-center px-4 py-0">
      {/* Hero/Profile Section */}
      <section className="w-full max-w-xl flex flex-col items-center py-12">
        <img src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/safwan-hero.jpg" alt="Safwan M P" className="w-32 h-32 rounded-full border-4 border-[#1DB954] shadow-lg mb-4 object-cover" />
        <h1 className="text-4xl font-extrabold font-montserrat mb-2 tracking-tight text-center">Safwan M P</h1>
        <p className="text-lg text-gray-300 mb-4 text-center max-w-md">Fitness Influencer & Trainer. Transforming lives with science-backed fitness, nutrition, and motivation. Join the journey!</p>
        <div className="flex gap-4 mb-2">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition"><img src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/instagram.svg" alt="Instagram" className="w-7 h-7" /></a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition"><img src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/youtube.svg" alt="YouTube" className="w-7 h-7" /></a>
          {/* Add more socials as needed */}
        </div>
      </section>

      {/* Content Links Section */}
      <section className="w-full max-w-xl flex flex-col gap-4 pb-16">
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : content.length === 0 ? (
          <div className="text-center py-8">No content found.</div>
        ) : (
          content.map(item => (
            <div
              key={item.id}
              className="bg-[#23272f] border border-[#23272f] hover:border-[#1DB954] rounded-2xl shadow-lg flex items-center gap-4 px-4 py-3 transition group hover:scale-[1.02]"
            >
              {/* Preview image */}
              {item.file_url ? (
                <img
                  src={item.file_url}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl border border-[#1DB954] bg-[#18181b]"
                  loading="lazy"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ) : item.link ? (
                <img
                  src={`https://opengraph.githubassets.com/1/${encodeURIComponent(item.link)}`}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-xl border border-[#1DB954] bg-[#18181b]"
                  loading="lazy"
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              ) : null}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate text-white group-hover:text-[#1DB954] transition">{item.title}</h3>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
                {item.price > 0 && (
                  <span className="text-xs font-bold text-[#FFD700]">
                    {item.currency === 'INR' ? '₹' : item.currency === 'USD' ? '$' : item.currency === 'EUR' ? '€' : item.currency === 'GBP' ? '£' : item.currency}
                    {item.price}
                  </span>
                )}
              </div>
              {/* Action button */}
              {item.price === 0 ? (
                item.type === 'file' && item.file_url ? (
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-4 py-2 rounded-full font-bold bg-[#1DB954] text-white hover:bg-[#169c46] transition shadow"
                  >
                    Download
                  </a>
                ) : item.type === 'link' && item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-4 py-2 rounded-full font-bold bg-[#1DB954] text-white hover:bg-[#169c46] transition shadow"
                  >
                    Visit Link
                  </a>
                ) : null
              ) : (
                <button
                  className="ml-2 px-4 py-2 rounded-full font-bold bg-[#FFD700] text-black hover:bg-[#e6c200] transition shadow"
                  onClick={async () => {
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        title: item.title,
                        price: item.price,
                        file_url: item.file_url,
                        link: item.link,
                        type: item.type,
                        currency: item.currency || 'USD',
                      }),
                    });
                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                  }}
                >
                  Buy Now
                </button>
              )}
            </div>
          ))
        )}
      </section>
    </main>
  );
}
