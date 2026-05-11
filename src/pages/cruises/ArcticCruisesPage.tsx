import CategoryToursPage from "../CategoryToursPage";
import { tours } from "@/data/tours";

const ArcticCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => t.region === "Арктика")}
    title={<>Круизы по <span className="italic">Арктике</span></>}
    subtitle="Путешествия к вершине мира"
    breadcrumbLabel="Круизы по Арктике"
    hideSpecialOfferTag
  />
);

export default ArcticCruisesPage;
