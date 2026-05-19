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

const divingTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isDiving === true);

const DivingToursPage = () => (
  <CategoryToursPage
    tours={divingTours}
    title={<>Дайвинг <span className="italic">туры</span></>}
    subtitle="Погружения в лучших точках мира: коралловые рифы, подводные пещеры и встречи с морской жизнью"
    breadcrumbLabel="Дайвинг туры"
  />
);

export default DivingToursPage;
