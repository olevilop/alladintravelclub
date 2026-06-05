import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api, getToken } from "@/lib/api";

// Пускает дальше только при валидном токене; иначе — на страницу входа.
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"checking" | "ok" | "no">("checking");

  useEffect(() => {
    if (!getToken()) {
      setState("no");
      return;
    }
    api.me().then(() => setState("ok")).catch(() => setState("no"));
  }, []);

  if (state === "checking") {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Загрузка…</div>;
  }
  if (state === "no") return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
