import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import europeHero from "@/assets/europe-hero.jpg";

const EuropeCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Европа")}
    title={<>Круизы по <span className="italic">Европе</span></>}
    subtitle="Средиземноморье, фьорды и культурные столицы"
    breadcrumbLabel="Круизы по Европе"
    fallbackHeroImage={europeHero}
    hideSpecialOfferTag
  />
);

export default EuropeCruisesPage;
