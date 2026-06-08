import CategoryToursPage from "./CategoryToursPage";
import { russiaTours } from "@/data/tours";

const RussiaToursPage = () => (
  <CategoryToursPage
    tours={russiaTours}
    source="russiaTours"
    title={<>Туры по <span className="italic">России</span></>}
    subtitle="От Байкала до Камчатки"
    breadcrumbLabel="Туры по России"
  />
);

export default RussiaToursPage;
