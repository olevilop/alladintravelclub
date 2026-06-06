// Клиент REST API. База берётся из VITE_API_URL (на проде "/api" через Nginx).
const BASE = (import.meta.env.VITE_API_URL as string) || "/api";
const TOKEN_KEY = "atc_admin_token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

type Opts = { method?: string; body?: unknown; auth?: boolean; form?: FormData };

async function request<T = any>(path: string, opts: Opts = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.auth) {
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
  }
  let body: BodyInit | undefined;
  if (opts.form) {
    body = opts.form;
  } else if (opts.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(opts.body);
  }
  const res = await fetch(BASE + path, { method: opts.method || "GET", headers, body });
  if (res.status === 401 && opts.auth) {
    clearToken();
    if (!location.pathname.startsWith("/admin/login")) location.href = "/admin/login";
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data && data.error) || `Ошибка ${res.status}`);
  return data as T;
}

export const api = {
  // ── Публичные ──
  getTours: (params?: Record<string, string>) =>
    request(`/tours${params ? "?" + new URLSearchParams(params) : ""}`),
  getTour: (id: string) => request(`/tours/${id}`),
  getLiners: () => request(`/liners`),
  getLiner: (slug: string) => request(`/liners/${slug}`),
  getRoute: (tourId: string) => request(`/routes/${tourId}`),
  getHero: () => request<any[]>(`/hero`),
  getSections: () => request<any[]>(`/sections`),
  submitLead: (payload: unknown) => request(`/leads`, { method: "POST", body: payload }),

  // ── Авторизация ──
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>(`/admin/login`, { method: "POST", body: { email, password } }),
  me: () => request<{ user: any }>(`/admin/me`, { auth: true }),
  updateAccount: (payload: { email?: string; name?: string; currentPassword: string; newPassword?: string }) =>
    request<{ token: string; user?: any }>(`/admin/account`, { method: "PUT", body: payload, auth: true }),

  // ── Пользователи админки ──
  users: () => request<any[]>(`/admin/users`, { auth: true }),
  createUser: (u: { email: string; password: string; name?: string }) =>
    request(`/admin/users`, { method: "POST", body: u, auth: true }),
  updateUser: (id: number, u: { name?: string; newPassword?: string }) =>
    request(`/admin/users/${id}`, { method: "PUT", body: u, auth: true }),
  deleteUser: (id: number) => request(`/admin/users/${id}`, { method: "DELETE", auth: true }),

  // ── Программы (админ) ──
  adminTours: () => request<any[]>(`/admin/tours`, { auth: true }),
  adminTour: (id: string) => request(`/admin/tours/${id}`, { auth: true }),
  createTour: (tour: unknown) => request(`/admin/tours`, { method: "POST", body: tour, auth: true }),
  updateTour: (id: string, tour: unknown) =>
    request(`/admin/tours/${id}`, { method: "PUT", body: tour, auth: true }),
  setTourActive: (id: string, isActive: boolean) =>
    request(`/admin/tours/${id}/active`, { method: "PATCH", body: { isActive }, auth: true }),
  reorderTours: (ids: string[]) =>
    request(`/admin/tours-reorder`, { method: "PUT", body: { ids }, auth: true }),
  deleteTour: (id: string) => request(`/admin/tours/${id}`, { method: "DELETE", auth: true }),

  // ── Лайнеры (админ) ──
  adminLiners: () => request<any[]>(`/admin/liners`, { auth: true }),
  createLiner: (l: unknown) => request(`/admin/liners`, { method: "POST", body: l, auth: true }),
  updateLiner: (slug: string, l: unknown) =>
    request(`/admin/liners/${slug}`, { method: "PUT", body: l, auth: true }),
  deleteLiner: (slug: string) => request(`/admin/liners/${slug}`, { method: "DELETE", auth: true }),

  // ── Hero-слайды (админ) ──
  adminHero: () => request<any[]>(`/admin/hero`, { auth: true }),
  createHero: (s: unknown) => request(`/admin/hero`, { method: "POST", body: s, auth: true }),
  updateHero: (id: number, s: unknown) => request(`/admin/hero/${id}`, { method: "PUT", body: s, auth: true }),
  deleteHero: (id: number) => request(`/admin/hero/${id}`, { method: "DELETE", auth: true }),
  reorderHero: (ids: number[]) => request(`/admin/hero-reorder`, { method: "PUT", body: { ids }, auth: true }),

  // ── Разделы главной (админ) ──
  adminSections: () => request<any[]>(`/admin/sections`, { auth: true }),
  createSection: (s: unknown) => request(`/admin/sections`, { method: "POST", body: s, auth: true }),
  updateSection: (id: number, s: unknown) => request(`/admin/sections/${id}`, { method: "PUT", body: s, auth: true }),
  deleteSection: (id: number) => request(`/admin/sections/${id}`, { method: "DELETE", auth: true }),
  reorderSections: (ids: number[]) => request(`/admin/sections-reorder`, { method: "PUT", body: { ids }, auth: true }),

  // ── Заявки (админ) ──
  leads: (type?: string) =>
    request<any[]>(`/admin/leads${type ? "?type=" + type : ""}`, { auth: true }),
  markLead: (id: string, isRead: boolean) =>
    request(`/admin/leads/${id}/read`, { method: "PATCH", body: { isRead }, auth: true }),
  deleteLead: (id: string) => request(`/admin/leads/${id}`, { method: "DELETE", auth: true }),

  // ── Загрузка фото ──
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return request<{ url: string }>(`/admin/upload`, { method: "POST", form, auth: true });
  },
};
