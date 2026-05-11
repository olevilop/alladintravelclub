import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import africaHero from "@/assets/africa-hero.jpg";

const AfricaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Африка")}
    title={<>Круизы по <span className="italic">Африке</span></>}
    subtitle="Вдоль побережья чёрного континента"
    breadcrumbLabel="Круизы по Африке"
    fallbackHeroImage={africaHero}
    hideSpecialOfferTag
  />
);

export default AfricaCruisesPage;
