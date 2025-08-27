import AuthForm from "@/components/AuthForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] to-[#23272f] relative overflow-hidden">
      {/* Subtle background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1DB954]/10 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl z-0" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src="https://igjphytreikmiivddqxh.supabase.co/storage/v1/object/public/content-files/safwan-hero.jpg" alt="Safwan M P" className="w-20 h-20 rounded-full border-4 border-[#1DB954] shadow-lg mb-2 object-cover" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Admin Login</h1>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
