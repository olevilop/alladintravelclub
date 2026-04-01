import CategoryToursPage from "./CategoryToursPage";
import { tours } from "@/data/tours";

const ClassicCruisesPage = () => (
  <CategoryToursPage
    tours={tours.slice(4)}
    title={<>Классические <span className="italic">круизы</span></>}
    subtitle="Откройте мир с комфортом"
  />
);

export default ClassicCruisesPage;
