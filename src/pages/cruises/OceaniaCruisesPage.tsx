import CategoryToursPage from "../CategoryToursPage";
import { tours, regionToContinent } from "@/data/tours";
import oceaniaHero from "@/assets/oceania-hero.jpg";

const OceaniaCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => regionToContinent[t.region] === "Австралия и Океания")}
    title={<>Круизы в <span className="italic">Австралию и Океанию</span></>}
    subtitle="Тропические острова и коралловые рифы"
    breadcrumbLabel="Австралия и Океания"
    fallbackHeroImage={oceaniaHero}
    hideSpecialOfferTag
  />
);

export default OceaniaCruisesPage;
