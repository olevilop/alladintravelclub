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

const corporateTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isCorporate === true);

const CorporateToursPage = () => (
  <CategoryToursPage
    tours={corporateTours}
    title={<>Корпоративные <span className="italic">туры</span></>}
    subtitle="Программы для команд и партнёров — выездные мероприятия, тимбилдинги и поощрительные поездки"
    breadcrumbLabel="Корпоративные туры"
  />
);

export default CorporateToursPage;
