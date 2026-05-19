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

const wellnessTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isWellness === true);

const WellnessToursPage = () => (
  <CategoryToursPage
    tours={wellnessTours}
    title={<>Оздоровительные <span className="italic">программы</span></>}
    subtitle="Спа, термы, ретриты и программы восстановления в лучших курортных направлениях"
    breadcrumbLabel="Оздоровительные программы"
  />
);

export default WellnessToursPage;
