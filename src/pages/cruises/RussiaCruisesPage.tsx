import CategoryToursPage from "../CategoryToursPage";
import { tours } from "@/data/tours";
import russiaHero from "@/assets/russia-cruises-hero.jpg";

const RussiaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(
      (t) => t.region === "Россия" && (t.category === "classic" || t.category === "expedition")
    )}
    title={<>Круизы по <span className="italic">России</span></>}
    subtitle="Речные и морские маршруты по России"
    breadcrumbLabel="Россия"
    fallbackHeroImage={russiaHero}
    hideSpecialOfferTag
  />
);

export default RussiaCruisesPage;
