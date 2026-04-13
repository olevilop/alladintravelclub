

## Исправление отображения контента на всех страницах туров

### Проблема

Все страницы туров (не только «Классическая Япония 2») показывают hero-секцию, превью фото и breadcrumbs, но основной контент (описание, маршрут, сайдбар) визуально невидим, хотя присутствует в DOM. Контент рендерится с `opacity: 0` и `y: 30` через framer-motion `initial="hidden"`, но анимация `whileInView="visible"` никогда не срабатывает. Это связано с тем, что `IntersectionObserver` не обнаруживает элементы как видимые из-за `overflow-x-hidden` на корневом контейнере.

### Решение

**`src/pages/TourDetail.tsx`** — заменить `whileInView` на `animate` для всех `motion.div` в основном контенте:

1. Секция «О путешествии» (строка ~103): `whileInView="visible"` → `animate="visible"`
2. Секция «Маршрут по дням» (строка ~111): `whileInView="visible"` → `animate="visible"`
3. Секция «Дополнительно» (строка ~137): `whileInView="visible"` → `animate="visible"`
4. Секция «Что включено» (строка ~150): `whileInView="visible"` → `animate="visible"`
5. Элементы дней маршрута (строка ~122): убрать `whileInView`, добавить `animate`

Это гарантирует, что анимации запускаются при рендере, а не зависят от IntersectionObserver.

### Технические детали

- Все `motion.div` с `initial="hidden" whileInView="visible"` заменяются на `initial="hidden" animate="visible"`
- Убираем `viewport={{ once: true }}` (не нужен при `animate`)
- Анимации дней маршрута: `whileInView={{ opacity: 1, x: 0 }}` → `animate={{ opacity: 1, x: 0 }}`

