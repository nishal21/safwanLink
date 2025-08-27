// Fetch Open Graph image from a URL using a public Open Graph API
// This is a simple client-side fallback. For production, use your own serverless function or a paid OG API.

export async function fetchOGImage(url: string): Promise<string | null> {
  try {
    // Use a free Open Graph API proxy (for demo only, subject to rate limits)
    const api = `https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=demo`;
    const res = await fetch(api);
    if (!res.ok) return null;
    const data = await res.json();
    // Try to get og:image
    return data.openGraph?.image?.url || null;
  } catch {
    return null;
  }
}
