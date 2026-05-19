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

const activeTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isActive === true);

const ActiveToursPage = () => (
  <CategoryToursPage
    tours={activeTours}
    title={<>Активные <span className="italic">туры</span></>}
    subtitle="Походы, треккинг, восхождения, каякинг и другие путешествия для тех, кто любит движение"
    breadcrumbLabel="Активные туры"
  />
);

export default ActiveToursPage;
