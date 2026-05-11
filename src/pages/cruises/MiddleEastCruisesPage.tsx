import CategoryToursPage from "../CategoryToursPage";
import { tours } from "@/data/tours";
import middleEastHero from "@/assets/middle-east-hero.jpg";

const MiddleEastCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => t.region === "Ближний Восток")}
    title={<>Круизы по <span className="italic">Ближнему Востоку</span></>}
    subtitle="Древние цивилизации и современная роскошь"
    breadcrumbLabel="Круизы по Ближнему Востоку"
    fallbackHeroImage={middleEastHero}
    hideSpecialOfferTag
  />
);

export default MiddleEastCruisesPage;
