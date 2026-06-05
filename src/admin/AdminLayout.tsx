import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { clearToken } from "@/lib/api";

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
  }`;

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-2">
          <span className="font-bold mr-4">Админка · Alladin Travel Club</span>
          <NavLink to="/admin" end className={linkCls}>Программы</NavLink>
          <NavLink to="/admin/liners" className={linkCls}>Лайнеры</NavLink>
          <NavLink to="/admin/leads" className={linkCls}>Заявки</NavLink>
          <NavLink to="/admin/users" className={linkCls}>Пользователи</NavLink>
          <NavLink to="/admin/profile" className={linkCls}>Профиль</NavLink>
          <div className="ml-auto flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="text-sm text-muted-foreground hover:underline">
              Открыть сайт ↗
            </a>
            <Button variant="outline" size="sm" onClick={logout}>Выйти</Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
