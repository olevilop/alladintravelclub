import CategoryToursPage from "./CategoryToursPage";
import { chinaTours } from "@/data/tours";

const ChinaToursPage = () => (
  <CategoryToursPage
    tours={chinaTours}
    title={<>Туры по <span className="italic">Китаю</span></>}
    subtitle="Империя тысячелетий"
  />
);

export default ChinaToursPage;
