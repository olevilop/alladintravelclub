import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import southAmericaHero from "@/assets/south-america-hero.jpg";

const SouthAmericaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Южная Америка")}
    title={<>Круизы по <span className="italic">Южной Америке</span></>}
    subtitle="Патагония, Амазонка и Галапагосы"
    breadcrumbLabel="Круизы по Южной Америке"
    fallbackHeroImage={southAmericaHero}
    hideSpecialOfferTag
  />
);

export default SouthAmericaCruisesPage;
