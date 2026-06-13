import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { api } from "@/lib/api";

// Переключатели сайта. key — то, что хранится в БД; включено, если значение не "false".
const TOGGLES: { key: string; title: string; hint: string }[] = [
  {
    key: "lamp_quiz_enabled",
    title: "Кнопка-квиз «Потри лампу» на главной",
    hint: "Показывать на главной кнопку, которая открывает квиз-помощник по подбору тура.",
  },
];

export default function SettingsAdminPage() {
  const qc = useQueryClient();
  const { data: settings = {}, isLoading } = useQuery({ queryKey: ["admin-settings"], queryFn: api.adminSettings });

  const mut = useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) => api.setSetting(key, value),
    onSuccess: () => { toast.success("Сохранено"); qc.invalidateQueries({ queryKey: ["admin-settings"] }); },
    onError: (e: any) => toast.error(e.message),
  });

  const isOn = (key: string) => settings[key] !== "false";

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-bold">Настройки</h1>
      {isLoading ? <p className="text-muted-foreground">Загрузка…</p> : (
        <div className="space-y-3">
          {TOGGLES.map((t) => (
            <div key={t.key} className="flex items-start justify-between gap-4 border rounded-lg p-4">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-muted-foreground">{t.hint}</div>
              </div>
              <Switch
                checked={isOn(t.key)}
                onCheckedChange={(v) => mut.mutate({ key: t.key, value: v ? "true" : "false" })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
