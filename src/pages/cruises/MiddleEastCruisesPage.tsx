import CategoryToursPage from "../CategoryToursPage";
import { tours } from "@/data/tours";
import middleEastHero from "@/assets/middle-east-hero.jpg";

const MiddleEastCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => t.region === "Ближний Восток")}
    title={<>Круизы на <span className="italic">Ближний Восток</span></>}
    subtitle="Древние цивилизации и современная роскошь"
    breadcrumbLabel="Ближний Восток"
    fallbackHeroImage={middleEastHero}
    hideSpecialOfferTag
  />
);

export default MiddleEastCruisesPage;
