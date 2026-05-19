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

const authorTours: Tour[] = [
  ...tours,
  ...japanTours,
  ...koreaTours,
  ...chinaTours,
  ...northKoreaTours,
  ...russiaTours,
  ...eventTours,
].filter((t) => t.isAuthor === true);

const AuthorToursPage = () => (
  <CategoryToursPage
    tours={authorTours}
    title={<>Авторские <span className="italic">туры</span></>}
    subtitle="Уникальные маршруты, разработанные нашими экспертами и проводниками клуба"
    breadcrumbLabel="Авторские туры"
  />
);

export default AuthorToursPage;
