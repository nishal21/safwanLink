"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && isMounted) {
  router.replace("/admin");
      } else {
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && isMounted) {
  router.replace("/admin");
      }
    });
    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [router, supabase]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white">Checking authentication...</div>;
  }

  return <>{children}</>;
}
