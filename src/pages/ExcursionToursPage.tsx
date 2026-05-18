import CategoryToursPage from "./CategoryToursPage";
import {
  tours,
  japanTours,
  koreaTours,
  chinaTours,
  northKoreaTours,
  russiaTours,
  eventTours,
  type Tour,
} from "@/data/tours";

const isExcursion = (t: Tour) =>
  (t.category === "Групповой тур" && t.badge === "Экскурсионный тур") ||
  (t.category !== "expedition" &&
    t.category !== "classic" &&
    t.category !== "Групповой тур");

const excursionTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter(isExcursion);

const ExcursionToursPage = () => (
  <CategoryToursPage
    tours={excursionTours}
    title={<>Экскурсионные <span className="italic">туры</span></>}
    subtitle="Групповые и индивидуальные программы с насыщенной экскурсионной составляющей"
    breadcrumbLabel="Экскурсионные туры"
  />
);

export default ExcursionToursPage;
