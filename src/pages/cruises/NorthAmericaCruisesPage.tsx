import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import northAmericaHero from "@/assets/north-america-hero.jpg";

const NorthAmericaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Северная Америка")}
    title={<>Круизы по <span className="italic">Северной Америке</span></>}
    subtitle="От Аляски до Карибских островов"
    breadcrumbLabel="Северная Америка"
    fallbackHeroImage={northAmericaHero}
    hideSpecialOfferTag
  />
);

export default NorthAmericaCruisesPage;
