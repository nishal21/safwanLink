import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
        <img
          src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/safwan-hero.jpg"
          alt="Safwan M P"
          className="w-40 h-40 rounded-full object-cover border-4 border-[#1DB954] mb-6 shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-2">
          Transform Your Body, Transform Your Life
        </h1>
        <p className="text-lg mb-6 font-inter">
          with Safwan M P, Fitness Influencer & Trainer
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <a
            href="/content"
            className="bg-[#1DB954] text-white px-6 py-3 rounded-full font-bold hover:shadow-[0_0_10px_#1DB954] transition"
          >
            Content Page
          </a>
        </div>
      </section>
      {/* About Section */}
      <section className="w-full max-w-2xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-2 font-montserrat">About Safwan</h2>
        <p className="mb-2 font-inter">
          Safwan M P is a fitness influencer and trainer based in Perinthalmanna,
          Malappuram. Passionate about helping people transform their bodies and
          lives through science-backed training and nutrition.
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="https://www.instagram.com/_safwan_mp/"
            target="_blank"
            className="bg-[#2C2C2C] text-white px-6 py-3 rounded-full font-bold hover:shadow-[0_0_10px_#1DB954] transition"
          >
            Instagram
          </a>
          <a
            href="https://www.youtube.com/@Safwan.M.P"
            target="_blank"
            className="bg-[#2C2C2C] text-white px-6 py-3 rounded-full font-bold hover:shadow-[0_0_10px_#1DB954] transition"
          >
            YouTube
          </a>
        </div>
      </section>
            {/* Testimonials Section (Placeholder) */}
      <section className="w-full max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-4 font-montserrat">
          Transformations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#2C2C2C] rounded-lg p-6 shadow-lg">
            <p className="mb-2 font-inter">
              “I lost 15kg in 4 months with Safwan’s guidance. The plans are easy
              to follow and really work!”
            </p>
            <span className="text-[#1DB954] font-bold">– Razeen KP</span>
          </div>
          <div className="bg-[#2C2C2C] rounded-lg p-6 shadow-lg">
            <p className="mb-2 font-inter">
              “The premium training guides are worth every penny. Highly
              recommend!”
            </p>
            <span className="text-[#FFD700] font-bold">– Nishal</span>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-6 px-4 bg-[#121212] flex flex-col md:flex-row items-center justify-between border-t border-[#2C2C2C] mt-8">
        <span className="text-white text-sm">Contact: safwanmp@gmail.com</span>
        <span className="text-white text-xs mt-2 md:mt-0">
          © {new Date().getFullYear()} Safwan M P. All rights reserved.
        </span>
        <img
          src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/Stripe%20wordmark%20-%20Blurple.svg"
          alt="Stripe Secure"
          className="h-6 mt-2 md:mt-0"
        />
      </footer>
    </main>
  );
}
