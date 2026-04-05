import CategoryToursPage from "./CategoryToursPage";
import { tours } from "@/data/tours";

const ClassicCruisesPage = () => (
  <CategoryToursPage
    tours={tours.filter(t => t.category === "classic")}
    title={<>Классические <span className="italic">круизы</span></>}
    subtitle="Откройте мир с комфортом"
    breadcrumbLabel="Классические круизы"
    category="classic"
  />
);

export default ClassicCruisesPage;
