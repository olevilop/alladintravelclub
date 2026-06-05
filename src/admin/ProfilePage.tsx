import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, setToken } from "@/lib/api";

// Профиль текущего администратора: смена email, имени и пароля.
export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.me().then(({ user }) => { setEmail(user.email || ""); setName(user.name || ""); }).catch(() => {});
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) { toast.error("Введите текущий пароль для подтверждения"); return; }
    setSaving(true);
    try {
      const res = await api.updateAccount({ email, name, currentPassword, newPassword: newPassword || undefined });
      if (res.token) setToken(res.token);
      setCurrentPassword(""); setNewPassword("");
      toast.success("Сохранено");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <form onSubmit={save} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Email для входа</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Имя</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <hr />
        <div className="space-y-1.5">
          <Label>Новый пароль (оставьте пустым, если не меняете)</Label>
          <Input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            placeholder="новый пароль" autoComplete="new-password" />
        </div>
        <div className="space-y-1.5">
          <Label>Текущий пароль (для подтверждения) *</Label>
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </div>
        <Button type="submit" disabled={saving}>{saving ? "Сохранение…" : "Сохранить"}</Button>
      </form>
    </div>
  );
}
