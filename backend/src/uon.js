// Отправка заявки в CRM U-ON.Travel (метод lead/create).
// Если ключ UON_API_KEY не задан — тихо пропускаем (заявка всё равно сохранена в БД).
import { config } from "./config.js";

export async function sendLeadToUon(lead) {
  if (!config.uonApiKey) return { skipped: true };

  const note = [
    "Заявка с сайта alladintravelclub.ru",
    lead.tourName ? `Тур/круиз: ${lead.tourName}` : null,
    lead.date ? `Даты: ${lead.date}` : null,
    lead.cabin ? `Каюта: ${lead.cabin}` : null,
    lead.messenger ? `Мессенджер: ${lead.messenger}` : null,
    lead.message ? `Пожелания: ${lead.message}` : null,
    lead.type ? `Тип: ${lead.type}` : null,
  ].filter(Boolean).join("\n");

  const params = new URLSearchParams();
  if (lead.name) params.set("u_name", lead.name);
  if (lead.phone) params.set("u_phone", lead.phone);
  if (lead.email) params.set("u_email", lead.email);
  params.set("note", note);
  params.set("source", lead.source
    ? `Сайт alladintravelclub.ru (${lead.source})`
    : "Сайт alladintravelclub.ru");

  const url = `https://api.u-on.ru/${config.uonApiKey}/lead/create.json`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const text = await res.text();
    if (!res.ok) {
      console.error(`U-ON ошибка ${res.status}: ${text.slice(0, 300)}`);
      return { ok: false, status: res.status };
    }
    return { ok: true, response: text.slice(0, 300) };
  } catch (e) {
    console.error("U-ON запрос не удался:", e.message);
    return { ok: false, error: e.message };
  }
}
