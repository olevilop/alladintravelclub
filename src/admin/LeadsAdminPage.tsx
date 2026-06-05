import { Fragment, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const TYPE_LABEL: Record<string, string> = {
  hotel: "Отели", contact: "Контакты", newsletter: "Подписка", booking: "Бронирование",
};

export default function LeadsAdminPage() {
  const qc = useQueryClient();
  const [type, setType] = useState("");
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads", type],
    queryFn: () => api.leads(type || undefined),
  });
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin-leads"] });
  const [openId, setOpenId] = useState<string | null>(null);

  const delMut = useMutation({
    mutationFn: (id: string) => api.deleteLead(id),
    onSuccess: () => { toast.success("Удалено"); refresh(); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Заявки</h1>
        <Badge variant="secondary">{leads.length}</Badge>
        <select className="ml-auto h-9 border rounded-md px-3 bg-background text-sm"
          value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Все типы</option>
          {Object.entries(TYPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr><th className="p-2 w-36">Дата</th><th className="p-2 w-28">Тип</th><th className="p-2">Имя</th>
              <th className="p-2">Контакт</th><th className="p-2 w-44 text-right">Действия</th></tr>
            </thead>
            <tbody>
              {leads.map((l: any) => (
                <Fragment key={l.id}>
                  <tr className="border-t hover:bg-muted/30">
                    <td className="p-2 text-muted-foreground">{new Date(l.created_at).toLocaleString("ru-RU")}</td>
                    <td className="p-2">{TYPE_LABEL[l.type] || l.type}</td>
                    <td className="p-2 font-medium">{l.name || "—"}</td>
                    <td className="p-2">{l.phone || l.email || l.messenger || "—"}</td>
                    <td className="p-2 text-right space-x-1">
                      <Button size="sm" variant="outline" onClick={() => setOpenId(openId === l.id ? null : l.id)}>
                        {openId === l.id ? "Скрыть" : "Подробнее"}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-destructive"
                        onClick={() => { if (confirm("Удалить заявку?")) delMut.mutate(l.id); }}>Удалить</Button>
                    </td>
                  </tr>
                  {openId === l.id && (
                    <tr className="border-t bg-muted/20">
                      <td colSpan={5} className="p-3">
                        <pre className="text-xs whitespace-pre-wrap break-all">
                          {JSON.stringify({ source: l.source, ...l.payload }, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          {!leads.length && <p className="p-4 text-center text-muted-foreground">Заявок нет</p>}
        </div>
      )}
    </div>
  );
}
