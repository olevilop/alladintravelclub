import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import asiaHero from "@/assets/asia-cruises-hero.jpg";

const AsiaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t =>
      regionToContinent[t.region] === "Азия"
      && (t.category === "expedition" || t.category === "classic")
      && t.region !== "Россия"
      && t.region !== "Ближний Восток"
    )}
    title={<>Круизы по <span className="italic">Азии</span></>}
    subtitle="От Японии до Юго-Восточной Азии"
    breadcrumbLabel="Круизы по Азии"
    fallbackHeroImage={asiaHero}
    hideSpecialOfferTag
  />
);

export default AsiaCruisesPage;
