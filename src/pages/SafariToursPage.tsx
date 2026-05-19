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

const safariTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isSafari === true);

const SafariToursPage = () => (
  <CategoryToursPage
    tours={safariTours}
    title={<>Сафари <span className="italic">туры</span></>}
    subtitle="Уникальные сафари-программы и встречи с дикой природой в самых живописных уголках планеты"
    breadcrumbLabel="Сафари туры"
  />
);

export default SafariToursPage;
