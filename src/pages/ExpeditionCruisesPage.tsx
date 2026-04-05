import CategoryToursPage from "./CategoryToursPage";
import { tours } from "@/data/tours";

const ExpeditionCruisesPage = () => (
  <CategoryToursPage
    tours={tours.slice(0, 4)}
    title={<>Экспедиционные <span className="italic">круизы</span></>}
    subtitle="Путешествия к краю земли"
    breadcrumbLabel="Экспедиционные круизы"
    category="expedition"
  />
);

export default ExpeditionCruisesPage;
