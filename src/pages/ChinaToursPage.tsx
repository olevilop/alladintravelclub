import CategoryToursPage from "./CategoryToursPage";
import { chinaTours } from "@/data/tours";

const ChinaToursPage = () => (
  <CategoryToursPage
    tours={chinaTours}
    source="chinaTours"
    title={<>Туры по <span className="italic">Китаю</span></>}
    subtitle="Империя тысячелетий"
    breadcrumbLabel="Туры по Китаю"
  />
);

export default ChinaToursPage;
