import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";

export default function UsersAdminPage() {
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({ queryKey: ["admin-users"], queryFn: api.users });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-users"] });

  const [addOpen, setAddOpen] = useState(false);
  const [nu, setNu] = useState({ email: "", name: "", password: "" });
  const [pwUser, setPwUser] = useState<any>(null);
  const [newPw, setNewPw] = useState("");

  const createMut = useMutation({
    mutationFn: () => api.createUser(nu),
    onSuccess: () => { toast.success("Пользователь добавлен"); setAddOpen(false); setNu({ email: "", name: "", password: "" }); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });
  const pwMut = useMutation({
    mutationFn: () => api.updateUser(pwUser.id, { newPassword: newPw }),
    onSuccess: () => { toast.success("Пароль обновлён"); setPwUser(null); setNewPw(""); },
    onError: (e: any) => toast.error(e.message),
  });
  const delMut = useMutation({
    mutationFn: (id: number) => api.deleteUser(id),
    onSuccess: () => { toast.success("Удалён"); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Пользователи админки</h1>
        <Button className="ml-auto" onClick={() => setAddOpen(true)}>+ Добавить пользователя</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2">Email</th><th className="p-2">Имя</th>
              <th className="p-2 w-44">Добавлен</th><th className="p-2 w-64 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u.id} className="border-t hover:bg-muted/30">
                  <td className="p-2 font-medium">{u.email}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2 text-muted-foreground">{new Date(u.created_at).toLocaleDateString("ru-RU")}</td>
                  <td className="p-2 text-right space-x-1">
                    <Button size="sm" variant="outline" onClick={() => { setPwUser(u); setNewPw(""); }}>Сбросить пароль</Button>
                    <Button size="sm" variant="ghost" className="text-destructive"
                      onClick={() => { if (confirm(`Удалить «${u.email}»?`)) delMut.mutate(u.id); }}>Удалить</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        Если кто-то забыл пароль — любой пользователь админки может сбросить его кнопкой «Сбросить пароль».
      </p>

      {/* Добавление пользователя */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Новый пользователь</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1.5"><Label>Email *</Label>
              <Input type="email" value={nu.email} onChange={(e) => setNu({ ...nu, email: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Имя</Label>
              <Input value={nu.name} onChange={(e) => setNu({ ...nu, name: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Пароль *</Label>
              <Input type="text" value={nu.password} onChange={(e) => setNu({ ...nu, password: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Отмена</Button>
            <Button onClick={() => createMut.mutate()} disabled={createMut.isPending}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Сброс пароля */}
      <Dialog open={!!pwUser} onOpenChange={(o) => !o && setPwUser(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Новый пароль для {pwUser?.email}</DialogTitle></DialogHeader>
          <div className="space-y-1.5"><Label>Новый пароль</Label>
            <Input type="text" value={newPw} onChange={(e) => setNewPw(e.target.value)} /></div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPwUser(null)}>Отмена</Button>
            <Button onClick={() => pwMut.mutate()} disabled={!newPw || pwMut.isPending}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
