import CategoryToursPage from "../CategoryToursPage";
import { russiaTours } from "@/data/tours";
import russiaHero from "@/assets/russia-cruises-hero.jpg";

const RussiaCruisesPage = () => (
  <CategoryToursPage
    tours={russiaTours}
    title={<>Круизы по <span className="italic">России</span></>}
    subtitle="Речные и морские маршруты по России"
    breadcrumbLabel="Россия"
    fallbackHeroImage={russiaHero}
    hideSpecialOfferTag
  />
);

export default RussiaCruisesPage;
