import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import oceaniaHero from "@/assets/oceania-hero.jpg";

const OceaniaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Австралия и Океания")}
    title={<>Круизы по <span className="italic">Австралии и Океании</span></>}
    subtitle="Тропические острова и коралловые рифы"
    breadcrumbLabel="Круизы по Австралии и Океании"
    fallbackHeroImage={oceaniaHero}
    hideSpecialOfferTag
  />
);

export default OceaniaCruisesPage;
